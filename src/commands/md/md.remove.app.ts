import { bot } from 'init/client';
import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import * as md from './register'

class Remove extends AppCommand {
    code = 'remove'; // 只是用作标记
    trigger = 'remove'; // 用于触发的文字
    help = '`.md remove`'; // 帮助文字
    intro = 'Remove';
    func: AppFunc<BaseSession> = async (session) => {
        bot.logger.info(`Remove message from ${session.user.nickname ? session.user.nickname : session.user.username}#${session.user.identifyNum} in ${session.guildId}/${session.channel.id}`);
        md.remove(session.channel.id, session.user.id);
        return session.reply(`已从 markdown 转写列表中移除用户 ${session.user.nickname ? session.user.nickname : session.user.username}#${session.user.identifyNum} 在此频道中的消息`);
    };
}

export const remove = new Remove();