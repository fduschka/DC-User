import axios from "axios";
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';

export default class User {
    setUserID(userID) {
        this.userID = userID;
        return this;
    }

    populate() {
        return new Promise((resolve, reject) => {
            if (this.userID.length === 0) return reject(new Error('User ID is not set'));
            
            this.getUserInfo().then(userInfo => {
                this.userInfo = userInfo;
                resolve(this);
            }).catch(error => {
                reject(error);
            })
        });
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            const spinner = createSpinner('Fetching user Data...').start(); 

            if (this.userID.length === 0){
                spinner.error({ text: 'User ID is not set' });
                reject(new Error('User ID is not set'));
            } 
            axios.get(`https://discord.com/api/users/${this.userID}`, {
                headers: {
                    'Authorization': `Bot ${'OTE3OTgxMDI2ODAwNzk1Njcw.YbAmdA.zZ8SdMBQZzwx4zZqla6HguntSNs'}`,
                }
            })
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

    getAvatarUrl() {
        return `https://cdn.discordapp.com/avatars/${this.userID}/${this.userInfo.avatar}.png`;
    }

    printOutput() {
        console.log("");
        console.log(`${chalk.bgGreen.bold('Username:')} ${ this.userInfo.username }`);
        console.log(`${chalk.bgRed.bold('Discriminator:')} ${ this.userInfo.discriminator }`);
        console.log(`${chalk.bgBlue.bold('Avatar URL:')} ${ this.getAvatarUrl() }`);
        console.log("");
        return this;
    }
}

