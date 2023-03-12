import { bot } from 'init/client';
import { BaseCommand, BaseSession, CommandFunction } from 'kasumi.js';
import * as md from './register'

class Remove extends BaseCommand {
    code = 'remove'; // 只是用作标记
    trigger = 'remove'; // 用于触发的文字
    help = '`.md remove`'; // 帮助文字
    intro = 'Remove';
    func: CommandFunction<BaseSession, any> = async (session) => {
        bot.logger.info(`Remove message from ${session.author.nickname ? session.author.nickname : session.author.username}#${session.author.identify_num} in ${session.guildId}/${session.channelId}`);
        md.remove(session.channelId, session.author.id);
        return session.reply(`已从 markdown 转写列表中移除用户 ${session.author.nickname ? session.author.nickname : session.author.username}#${session.author.identify_num} 在此频道中的消息`);
    };
}

export const remove = new Remove();