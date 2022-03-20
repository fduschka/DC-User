import inquirer from 'inquirer';
import gradient from 'gradient-string';
import { User } from './user.js';
import { Clipboard } from './clipboard.js';

export class Runner {

    user: User;
    clipboard: Clipboard;

    constructor() {
        this.user = new User();
        this.clipboard = new Clipboard();
    }

    async run(): Promise<void> {
        this.printTemp();
        await this.askInputType();
    }

    async printTemp(): Promise<void> {
        console.clear();
        console.log(gradient.rainbow("Welcome to Discord User Info Cli!"));
        console.log("");
        console.log("You can use this tool to fetch user information from Discord's API.");
        console.log("");
    }

    async askInputType(): Promise<void> {
        const { inputType } = await inquirer.prompt([
            {
                type: 'list',
                name: 'inputType',
                message: 'Choose an input type:',
                choices: [
                    'User ID',
                    'Clipboard',
                ],
            },
        ]);
        if (inputType === 'User ID') {
            this.askUserID();
        } else if (inputType === 'Clipboard') {
            this.processUserID(this.clipboard.get());
        }
    }

    async askUserID(): Promise<void> {
        this.printTemp();

        const { userID } = await inquirer.prompt([
            {
                type: 'input',
                name: 'userID',
                message: 'Enter a user ID:',
            },
        ]);
        this.processUserID(userID);
    }

    async processUserID(ID: string): Promise<void> {
        this.user.setUserID(ID).populate().then(user => {
            this.user.printOutput();
            this.askCompleteOptions();
        })
    }

    async askCompleteOptions(): Promise<void> {
        const { option } = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: 'How would you like to complete the process?',
                choices: [
                    'Copy Avatar URL to clipboard',
                    'Exit',
                ],
            },
        ]);
        if (option === 'Copy Avatar URL to clipboard') {
            this.clipboard.set(this.user.getAvatarUrl());
        }
    }
}