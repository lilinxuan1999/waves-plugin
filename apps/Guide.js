import plugin from '../../../lib/plugins/plugin.js'
import Wiki from '../components/Wiki.js';
import Render from '../model/render.js'

export class Guide extends plugin {
    constructor() {
        super({
            name: "鸣潮-图鉴",
            event: "message",
            priority: 1009,
            rule: [
                {
                    reg: "^(～|~|鸣潮)?.*图鉴$",
                    fnc: "guide"
                }
            ]
        })
    }

    async guide(e) {

        const match = e.msg.match(/(～|~|鸣潮)?(.*?)图鉴/);
        if (!match || !match[2]) {
            return false
        }

        const message = match[2]

        const wiki = new Wiki()
        const name = await wiki.getAlias(message)
        const entryData = await wiki.getEntry(name)

        if (!entryData.status) {
            logger.warn(`[Waves-Plugin] 未能获取图鉴内容：${message}`)
            if (e.msg.startsWith("~") || e.msg.startsWith("～") || e.msg.startsWith("鸣潮")) {
                await e.reply(`未能获取到${message}的图鉴，请检查输入是否正确`)
            }
            return false
        }

        let imageCard

        switch (entryData.type) {
            case "1105":
                imageCard = await Render.wikiRole(entryData.record)
                await e.reply(imageCard)
                break
            case "1106":
                imageCard = await Render.wikiWeapon(entryData.record)
                await e.reply(imageCard)
                break
            case "1107":
                imageCard = await Render.wikiRelics(entryData.record)
                await e.reply(imageCard)
                break
            // 合鸣效果
            case "1219":
                await e.reply([segment.image((await wiki.getRecord(name)).record.content.contentUrl), `暂时还没有合鸣效果：${message}的图鉴`])
                break
            // 敌人
            case "1158":
                await e.reply([segment.image((await wiki.getRecord(name)).record.content.contentUrl), `暂时还没有敌人：${message}的图鉴`])
                break
            case "1264":
                imageCard = await Render.wikiProps(entryData.record)
                await e.reply(imageCard)
                break
            case "1265":
                imageCard = await Render.wikiProps(entryData.record)
                await e.reply(imageCard)
                break
            case "1217":
                imageCard = await Render.wikiProps(entryData.record)
                await e.reply(imageCard)
                break
            case "1161":
                imageCard = await Render.wikiProps(entryData.record)
                await e.reply(imageCard)
                break
            case "1218":
                imageCard = await Render.wikiProps(entryData.record)
                await e.reply(imageCard)
                break
            case "1223":
                imageCard = await Render.wikiProps(entryData.record)
                await e.reply(imageCard)
                break
            default:
                return false
        }
        return true
    }
}