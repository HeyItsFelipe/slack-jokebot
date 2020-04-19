require('dotenv').config();
const SlackBot = require('slackbots');

let bot = new SlackBot({
    token: process.env.SLACKBOT_TOKEN,
    name: 'jokebot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ":smiley:"
    }

    bot.postMessageToChannel('bot', 'Get ready for some giggles!', params);
});

// Error Handler
bot.on('error', (error) => {
    console.log(error);
});