import * as md from 'commands/md/register';
import { bot } from 'init/client';
import { markdownMenu } from './commands/md/md.menu';
import schedule from 'node-schedule';
import axios from 'axios';
import auth from 'configs/auth';

bot.logger.fields.name = "kook-markdown";
bot.logger.addStream({ level: bot.logger.INFO, stream: process.stdout });
// bot.logger.addStream({ level: bot.logger.DEBUG, stream: process.stdout }); // DEBUG
bot.logger.info("kook-markdown initialization start");

md.load();

schedule.scheduleJob('15 * * * *', async () => {
    md.save();
})

bot.on("kmarkdownMessage", (event) => {
    if (md.isRegistered(event.channelId, event.author.id)) {
        var content = event.content
            .replaceAll("\\\\", "[doubleslash]")
            // .replaceAll("||", "(spl)")
            // .replaceAll("__", "(ins)")
            .replaceAll("\\", "")
            .replaceAll("[doubleslash]", "\\\\");
        const nativeLinks = content.match(/\[https?:.*\]\(https?:[^)]*\)/);
        if (nativeLinks) {
            for (const nativeLink of nativeLinks) {
                const link = nativeLink.match(/(?<=\[)(.*?)(?=\])/);
                if (link) {
                    content = content.replace(nativeLink, link[0]);
                }
            }
        }
        if (false
            || /(\*).+(\*)/.test(content)               // Match *italic*
            || /(\*\*).+(\*\*)/.test(content)           // Match **bold**
            || /\[[^\]]+\]\(https?:\/\/\S+\)/.test(content)  // Match [links with](http:// or https://)
            || /\`[^`^\n]+\`/.test(content)                 // Match `inline code`
            || /\`\`\`.*\n(.+\n)+\`\`\`/.test(content)      // Match ```language
            //                                                       code blocks
            //                                                       ```
            || /(\(ins\)).+(\(ins\))/.test(content)         // Match (ins)underscore(ins) or __underscore__
            || /(\(spl\)).+(\(spl\))/.test(content)         // Match (spl)spolier(spl) or ||spolier||
        ) {
            bot.API.message.create(9, event.channelId, content, event.msgId).then((val) => {
                if (val) bot.logger.info(`Translated: ${content}`);
            }).catch((e) => {
                if (e) bot.logger.error(e);
            })
        }
    }
})

bot.addCommands(markdownMenu);

bot.connect();

bot.logger.debug('system init success');

if (auth.useBotmarket) {
    botMarketStayOnline();
}

function botMarketStayOnline() {
    axios({
        url: 'http://bot.gekj.net/api/v1/online.bot',
        method: "POST",
        headers: {
            uuid: auth.botMarketUUID
        }
    }).then((res) => {
        if (res.data.code == 0) {
            bot.logger.info(`Bot Market online status updating success, remote returning: `);
            bot.logger.info(res.data);
            setTimeout(botMarketStayOnline, (res.data.data.onTime + 5) * 1000);
        } else if (res.data.code == -1) {
            bot.logger.warn(`Bot Market online status updating failed. Retring in 30 minutes. Error message: `);
            bot.logger.warn(res.data);
            setTimeout(botMarketStayOnline, 30 * 60 * 1000);
        }
    }).catch((e) => {
        bot.logger.warn(`Bot Market heartbeat request failed. Retring in 30 minutes. Error message: `);
        bot.logger.warn(e);
        setTimeout(botMarketStayOnline, 30 * 60 * 1000);
    })
}