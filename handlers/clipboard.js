import clipboard from 'clipboardy';

export default class Clipboard {
    set(value) {
        clipboard.writeSync(value);
        return this;
    }

    get() {
        return clipboard.readSync()
    }
}