require('dotenv').config();
const SlackBot = require('slackbots');
const axios = require('axios');
const cron = require('node-cron');

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

var task = cron.schedule('0 0 12 * * *', () => {
    console.log('>>>Execute Task...');
    ONLY_ONE_JOKE = 1;
    fetchJoke();
}, {
    scheduled: true,
});

// Error Handler
bot.on('error', (error) => {
    console.log(error);
    task.destroy();
});

// Respond to data
function fetchJoke() {
    console.log(">>>fetchJoke");
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