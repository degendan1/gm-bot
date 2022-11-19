// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 1;
const TelegramBot = require("node-telegram-bot-api");

const botOptions = {
  parse_mode: "html",
  disable_notification: true,
};
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

module.exports = async (request, response) => {
  try {
    const { body } = request;
    if (body.message) {
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

  const name = message.from.first_name;
  const replyArr = [
    `Hey ${name}, has anyone ever told you that you have a beautiful smile? Enjoy your morning and keep smiling!`,
    `Wow, an opportunity to get to say good morning to the amazing ${name} only comes around once in a lifetime. I better not mess this up. Good MORNING my little cutie patootie with tha bootie!! Hahaha.... I mean.. like.. (Oh F$%@ was that too much?!?) STUPID GM BOT. STUPID.`,
    `GOOD MORNIN' ${name.toUpperCase()}! 'OW THEM BITCORN PRICES LOOKIN'?`,
    `You know, if I wasn't a bot programmed to say this, I'd say it anyway. I hope you have a wonderful morning, ${name}.`,
    `You are worthless. You are a disgrace to your family. You are not my friend. Those are some sentences I would never have to say to ${name} because they are awesome and an all round fantastic human being! I hope you have a lovely morning :)`,
    `GOOD MORNING ${name.toUpperCase()} LETS FUCKING GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `What up Short King A.K.A ${name}. Hope you have a good morning and don't let being short get you down!`,
    `Gooooooooooood morning ${name}! Whatever you set your mind on, you will achieve.`,
    `YEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAA LETSSSSSSSSSSSSSSSSSSS GOOOOOOOOOOOOOOOOOOOO ${name.toUpperCase()}!!!!!!!!!!!!!!!!!!!!!! GET SOME BREAKKY INTO YA GUTS, SOME COFFEE AND A CIG AND LET'S MAKE SOME FUCKKKKKKKKKKKKKKINNNNG MOOOOOOOOOOOOOOOOOOOOOOOOONEEEYYYYYYYYYYYYYYYYYYY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`,
    `Ah, where do I begin. It's been a long time since I first met ${name} and when I first gazed upon their beauty. Their stunning features blew me away. ${name} was just a youngin' in those days, still with the world in the palms of their hands. But I knew something, I could tell - even then - what an impact ${name} was going to have. Over the years, I've noticed that same impact grow stronger and stronger, and so have the people that have had the pleasure of knowing ${name}. It wasn't until a few months ago that I truly wanted something for ${name}, to give back for all the monumental impacts they have had on the lives of their family, friends, girlfriends, boyfriends, strangers, whoever. And words, until now, have escaped me for what that something is. But I know now it's for ${name} to have a good morning.`,
    `Good morning ${name} Hey, you know that shitcoin you've been holding? Well it's gonna make you rich one day!`,
    `Good morning ${name}! You are a superstar destined for greatness.`,
    `A little birdie told me that you're due for some good luck ${name}. Hopefully that luck comes around today! Have a great morning!`,
    `Good morning ${name}! You are the brightest star in the darkest night <3`,
    `Good morning ${name}, today I see a pasture of green dildos for you ;)`,
    `I may be a bot, but it doesn't take someone pre-typing out this sentence to know that ${name} is a friggin legend!! You go get 'em today!`,
    `Ow, we need ${name}, we gotta have ${name}, c'mon, la la la la la, Doo doo doo doo doo doo doo, owww!`,
  ];

  const getRandomReply = function (textArr) {
    return textArr[Math.floor(Math.random() * textArr.length)];
  };

  const cmd = text.match(/(?<=\/).*?(?=$| |@)/);
  let reply = "";
  // Commands
  if (cmd == "gm") {
    reply = await getRandomReply(replyArr);
    await bot.sendMessage(id, reply, botOptions);
  }
}
