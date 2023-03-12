import { bot } from 'init/client';
import { BaseCommand, BaseSession, CommandFunction } from 'kasumi.js';
import * as md from './register'

class Register extends BaseCommand {
    name = 'register';
    func: CommandFunction<BaseSession, any> = async (session) => {
        bot.logger.info(`Register message from ${session.author.nickname ? session.author.nickname : session.author.username}#${session.author.identify_num} in ${session.guildId}/${session.channelId}`);
        md.register(session.channelId, session.author.id);
        return session.reply(`已添加用户 ${session.author.nickname ? session.author.nickname : session.author.username}#${session.author.identify_num} 在此频道中的消息至 markdown 转写列表`);
    };
}

export const register = new Register();