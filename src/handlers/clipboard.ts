import clipboard from 'clipboardy';

export class Clipboard {

    set(value: string): Clipboard {
        clipboard.writeSync(value);
        return this;
    }

    get(): string {
        return clipboard.readSync()
    }
}