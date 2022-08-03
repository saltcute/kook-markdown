import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import * as md from './register'

class Register extends AppCommand {
    code = 'register'; // 只是用作标记
    trigger = 'register'; // 用于触发的文字
    help = '`.md register`'; // 帮助文字
    intro = 'Register';
    func: AppFunc<BaseSession> = async (session) => {
        md.register(session.channel.id, session.user.id);
        return session.reply(`已添加用户 ${session.user.nickname ? session.user.nickname : session.user.username}#${session.user.identifyNum} 在此频道中的消息至 markdown 转写列表`);
    };
}

export const register = new Register();