require('dotenv').config();
const SlackBot = require('slackbots');
const axios = require('axios');

let bot = new SlackBot({
    token: process.env.SLACKBOT_TOKEN,
    name: 'jokebot'
});

let ONLY_ONE_JOKE = 1;

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ":smiley:"
    }
    // bot.postMessageToChannel('bot', 'Get ready for some giggles!', params);
});

// Error Handler
bot.on('error', (error) => {
    console.log(error);
});

// Message Handler
bot.on('message', data => {
    if (data.type !== 'message') {
        return;
    }
    fetchJoke(data.text);
});

// Respond to data
function fetchJoke() {
    if (ONLY_ONE_JOKE < 2) {
        ONLY_ONE_JOKE++;
        axios.get('https://official-joke-api.appspot.com/random_joke')
            .then(res => {
                let setup = res.data.setup;
                let punchline = res.data.punchline;
                const params = {
                    icon_emoji: ":laughing:"
                }

                bot.postMessageToChannel('bot', `${setup}\n${punchline}`, params);
            });
    }
}