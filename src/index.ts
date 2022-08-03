import * as md from 'commands/md/register';
import { bot } from 'init/client';
import { markdownMenu } from './commands/md/md.menu';
import schedule from 'node-schedule';

bot.messageSource.on('message', (e) => {
    bot.logger.debug(`received:`, e);
    // 如果想要在console里查看收到信息也可以用
    //console.log(e);
});

md.load();

schedule.scheduleJob('15 * * * *', async () => {
    md.save();
})

bot.on("kmarkdownMessage", (event) => {
    if (md.isRegistered(event.channelId, event.author.id)) {
        var content = event.content
            .replaceAll("\\\\", "[doubleslash]")
            .replaceAll("||", "(spl)")
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
            || /\s(\*).+(\*)\s/.test(content)               // Match *italic*
            || /\s(\*\*).+(\*\*)\s/.test(content)           // Match **bold**
            || /\[[^]]+\]\(https?:\/\/\S+\)/.test(content)  // Match [links with](http:// or https://)
            || /\`[^`^\n]+\`/.test(content)                 // Match `inline code`
            || /\`\`\`.*\n(.+\n)+\`\`\`/.test(content)      // Match ```language
            //                                                       code blocks
            //                                                       ```
            || /(\(ins\)).+(\(ins\))/.test(content)         // Match (ins)underscore(ins) or __underscore__
            || /(\(spl\)).+(\(spl\))/.test(content)         // Match (spl)spolier(spl) or ||spolier||
        ) {
            bot.API.message.create(9, event.channelId, content, event.msgId).then((val) => {
                if (val) console.log("Success");
            }).catch((e) => {
                console.log(e);
            })
        }
    }
})

bot.addCommands(markdownMenu);

bot.connect();

bot.logger.debug('system init success');
