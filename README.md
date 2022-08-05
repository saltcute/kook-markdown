# kook-markdown

Based on [`kbotify`](https://github.com/fi6/kBotify), `kook-markdown` can translate your kmarkdown source code to rich text.

## Deploying

To deploy on your own, first clone this repo and install dependencies with

```
git clone https://github.com/potatopotat0/kook-markdown
npm install
```

Copy `./src/configs/template-auth.ts` to `./src/configs/auth.ts`. Fill in your KOOK bot token.

Start `kook-markdown` with

```
npm start
```

or with

```
npm run pm2 -- --name="KMarkdown"
```

to start using pm2

---

## Avaliable commands

Use `.md` to see a list of command.

Use `.md register` to tell kook-markdown to translate your kmarkdown code in current channel 

Use `.md remove` to tell kook-markdown to stop translating your kmarkdown code in current channel 

Please join our [official KOOK server](https://kook.top/iOOsLu) and try it out!
