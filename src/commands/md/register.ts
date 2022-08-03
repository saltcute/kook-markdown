import fs from 'fs';
import upath from 'upath';

export var registerList: {
    [key: string]: {
        [key: string]: boolean
    }
} = {};
export async function load() {
    if (fs.existsSync(upath.join(__dirname, "reg.json"))) {
        registerList = JSON.parse(fs.readFileSync(upath.join(__dirname, "reg.json"), { encoding: "utf-8", flag: "r" }));
        console.log(`Loaded linkmap from local`);
    } else {
        save();
        console.log(`Linkmap not found, creating new`);
    }
}
export function save() {
    fs.writeFile(upath.join(__dirname, "reg.json"), JSON.stringify(registerList), (e) => {
        if (e) {
            console.error(`Saving linkmap failed, error message: `);
            console.error(e);
        }
        else {
            console.log(`Saved linkmap`);
        }
    });
}
export function register(channelId: string, userId: string) {
    if (!registerList[userId]) {
        registerList[userId] = {};
    }
    registerList[userId][channelId] = true;
}
export function remove(channelId: string, userId: string) {
    if (!registerList[userId]) {
        registerList[userId] = {};
    }
    registerList[userId][channelId] = false;
}
export function isRegistered(channelId: string, userId: string): boolean {
    if (registerList[userId]) {
        if (registerList[userId][channelId]) {
            return registerList[userId][channelId];
        } else {
            return false;
        }
    } else {
        return false;
    }
}