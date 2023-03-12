import { Card, BaseMenu } from 'kasumi.js';
import { register } from './md.register.app';
import { remove } from './md.remove.app';

class MarkdownMenu extends BaseMenu {
    name = 'md';
    prefix = './!';
}

export const markdownMenu = new MarkdownMenu(register, remove);
