import axios from "axios";
import { createSpinner } from 'nanospinner';
import gradient from 'gradient-string';

interface UserApiObj {
    id: number;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
    banner: string | null;
    banner_color: string | null;
    accent_color: string | null;
}

export class User {

    userID: string;
    userInfo: UserApiObj | null;

    constructor() {
        this.userID = "";
        this.userInfo = null;
    }

    setUserID(userID: string): User {
        this.userID = userID;
        return this;
    }

    populate(): Promise<User> {
        return new Promise((resolve, reject) => {
            if (this.userID.length === 0) return reject(new Error('User ID is not set'));
            
            this.getUserInfo().then((userInfo: any) => {
                this.userInfo = userInfo;
                resolve(this);
            }).catch(error => {
                reject(error);
            })
        });
    }

    getUserInfo(): Promise<UserApiObj> {
        return new Promise((resolve, reject) => {
            const spinner = createSpinner('Fetching user Data...').start(); 

            if (this.userID.length === 0){
                spinner.error({ text: 'User ID is not set' });
                reject(new Error('User ID is not set'));
            } 
            axios.get(`https://discord-user-api.ferdi5250.workers.dev?id=${this.userID}`)
            .then(response => {
                spinner.success({ text: 'User Data successfully fetched' });
                this.userInfo = response.data;
                resolve(response.data);
            }).catch(error => {
                spinner.error({ text: 'User Data could not be fetched' });
                reject(error);
            })
        })
    }

    getAvatarUrl(): string {
        if (this.userInfo === null) return "";
        return `https://cdn.discordapp.com/avatars/${this.userID}/${this.userInfo.avatar}.png`;
    }

    printOutput(): User {
        if (this.userInfo === null) return this;
        console.log("");
        console.log(`${gradient.cristal('Username:')} ${ this.userInfo.username }`);
        console.log(`${gradient.fruit('Discriminator:')} ${ this.userInfo.discriminator }`);
        console.log(`${gradient.mind('Avatar URL:')} ${ this.getAvatarUrl() }`);
        console.log("");
        return this;
    }
}

