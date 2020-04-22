require('dotenv').config();
const SlackBot = require('slackbots');
const axios = require('axios');
const cron = require('node-cron');
const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send('Jokebot says hello!')
});

let bot = new SlackBot({
    token: process.env.SLACKBOT_TOKEN,
    name: 'jokebot'
});

let ONLY_ONE_JOKE = 1;

// Start Handler
bot.on('start', () => {
    // bot.postMessageToChannel('bot', 'Get ready for some giggles!', params);
});

// To run one task every minute, use '* * * * *'.
// To run task at 12pm every day, use '0 0 12 * * *'.
var task = cron.schedule('0 0 10 * * *', () => {
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

                bot.postMessageToChannel('bot', `${setup}`, (res) => {
                    console.log(res);

                    // This replies to the tread.
                    // Reference: https://api.slack.com/messaging/sending#threading
                    // Reference: https://api.slack.com/methods/chat.postMessage/test
                    axios.get('https://slack.com/api/chat.postMessage?token=' + process.env.SLACKBOT_TOKEN + '&channel=bot&text=' + punchline + '&thread_ts=' + res.ts + '&pretty=1')
                        .then(res => console.log(res.data)).catch(err => console.log(err));
                });
            });
    }
}