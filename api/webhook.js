// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 1;
const TelegramBot = require("node-telegram-bot-api");
const { testMessage } = require("./actions");
const botOptions = {
  parse_mode: "html",
  disable_web_page_preview: true,
  disable_notification: true,
};
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const { testMessage } = require("./actions.js");

module.exports = async (request, response) => {
  try {
    const { body } = request;
    if (body.message) {
      console.log("logging body", body);
      await processMessage(body.message);
    }
  } catch (error) {
    console.error("Error sending message");
    console.log(error.toString());
  }
  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  response.send("OK");
};

// Bot logic
async function processMessage(message) {
  // Retrieve the ID for this chat
  // and the text that the user sent
  const {
    chat: { id },
    text,
  } = message;

  const cmd = text.match(/(?<=\/).*?(?=$| |@)/);
  const textArr = text.split(" ");

  const replyArr = ["Good morning "];

  const helpReply = `
<b>DeFiBot Commands:</b>
/tvl - protocols current TVL
/comp - compare 2 protocols current TVL
    `;
  // Commands
  if (cmd == "gm") {
    reply = "Good morning";
  } else if (cmd == "comp") {
    reply = await compTVL(textArr);
  } else if (cmd == "help") {
    reply = helpReply;
  } else if (cmd == "test") {
    reply = await testMessage();
  } else {
    console.log("Command not found: " + cmd + "Try typing /help");
  }

  // Send reply back in html and
  // wait for the request to finish
  await bot.sendMessage(id, reply, botOptions);
}
