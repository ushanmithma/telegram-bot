const { Telegraf } = require('telegraf');
require('dotenv').config();
const fs = require('fs')

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
    ctx.reply("Hello there ✌");
});

bot.hears("Yo", (ctx) => {
    fs.writeFile("D:/T/test", JSON.stringify(ctx), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    ctx.reply("Hello there", {
        reply_to_message_id: ctx.update.message.message_id
    });
});

bot.use((ctx) => {

    if (ctx.update.message.text.match(/^(\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$/gm)) {
        ctx.reply("Hello bro!", {
            reply_to_message_id: ctx.update.message.message_id
        });
        setTimeout(() => {
            ctx.reply("I am you Cimarron!");
        }, 3000);
    }
    
    if (ctx.update.message.text.match(/(no way\s*)/gi)) {
        bot.telegram.sendVideo(ctx.chat.id, { source: "assets/01.mp4" });
    }

});

bot.launch();
