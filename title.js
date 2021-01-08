function change(n) {
    if (process.platform == 'win32') {
        process.title = n;
    } else {
        process.stdout.write('\x1b]2;' + n + '\x1b\x5c');
    }
}

module.exports = { change }