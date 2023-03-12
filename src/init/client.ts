import Kasumi from 'kasumi.js';
import { KasumiConfig } from 'kasumi.js/dist/type';
import auth from '../configs/auth';

let mode = <'websocket' | 'webhook'>auth.mode || 'websocket';
let config: KasumiConfig;
if (mode == 'websocket') {
    config = {
        type: 'websocket',
        vendor: 'botroot',
        token: auth.khltoken
    }
} else {
    config = {
        type: 'webhook',
        token: auth.khltoken,
        verifyToken: auth.khlverify,
        encryptKey: auth.khlkey,
        port: auth.khlport
    }
}
export const bot = new Kasumi(config);
