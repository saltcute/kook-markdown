import { Card, MenuCommand } from 'kbotify';
import { register } from './md.register.app';
import { remove } from './md.remove.app';

class MarkdownMenu extends MenuCommand {
    code = 'md';
    trigger = 'md';
    help = 'md';

    intro = 'Markdown Menu';
    menu = new Card({
        "type": "card",
        "theme": "info",
        "size": "lg",
        "modules": [
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "```plain\n.md register\n```\n将自己在这个频道的发言添加到 markdown 转写列表中"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "```plain\n.md remove\n```\n将自己在这个频道的发言移除出 markdown 转写列表"
                }
            }
        ]
    }).toString();
    useCardMenu = true; // 使用卡片菜单
}

export const markdownMenu = new MarkdownMenu(register, remove);
