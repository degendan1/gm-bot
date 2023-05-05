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
    "Good morning, degen! Rise from your LED-lit cave and embrace the sun. You might be tired from a night of crypto vigilance, but remember, every new day is a chance to turn that messy apartment into a luxurious penthouse! 🌞🕶🌆💸",
    "Hey there, chart zombie! It's time to crawl out of your dark, disorganized lair and face the daylight. Sure, your eyes might sting a bit, but who knows, maybe today's the day your crypto dreams come true! Have an energizing morning, degen! 🌞🧟‍♂️📈💰",
    "Rise and shine, nocturnal degen! You may have spent the night glued to your screen, but now it's time to take a break from the chaos and enjoy some fresh air. Remember, a clear mind brings better crypto decisions. Have a refreshing morning! 🌞💻🍃🚀",
    "Top of the mornin', crypto cavern dweller! Time to stretch those cramped limbs, open the curtains, and let the sunlight chase away the shadows of your messy abode. Who knows, maybe today you'll strike crypto gold! Have an invigorating morning, degen! 🌞🦇🏠💎",
    "G'morning, fellow night owl! As you emerge from your screen-lit sanctuary, take a moment to envision a future of well-rested nights and crypto-fueled luxury. Embrace the day and seize those opportunities! Have a fantastic morning, degen! 🌞🦉🌇💹",
    "Hey there, LED-lit warrior! Peel yourself away from those charts and embrace the sunlight. Your apartment may be a mess, but there's a world of crypto success waiting for you out there. Have a bright and inspiring morning, degen! 🌞🛡🌍💰",
    "Good morning, bleary-eyed crypto enthusiast! It's time to rise from your dark, cluttered nest and face the world with renewed vigor. As you bask in the sunlight, remember that every day is a fresh start in the pursuit of crypto greatness! Have an uplifting morning, degen! 🌞👀🚀🌟",
    "Morning, screen-tanned degen! Time to take a break from your glowing gadgets, step out of your chaotic crypto cave, and soak up some real-life sunshine. Embrace the day and inch closer to those extravagant dreams! Have a vibrant morning! 🌞📱🌻🏰",
    "Hey, crypto hermit! The sun's calling your name, so emerge from your dimly lit, disheveled abode and take in the fresh air. Remember, even in the darkest of times, there's always a new opportunity just around the corner. Have a revitalizing morning, degen! 🌞🦀🌬🔮",
    "Rise and shine, LED-lit crypto dweller! It's time to swap the glow of your screens for the warmth of the sun. As you navigate the chaos of your apartment, remember that brighter days are ahead. Have a fantastic morning, degen! 🌞🖥🌈💰",
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
