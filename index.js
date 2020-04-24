require('dotenv').config();
const SlackBot = require('slackbots');
const axios = require('axios');
const express = require('express')
const app = express();

const PORT = process.env.PORT || 3000;

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
    ONLY_ONE_JOKE = 1;
    fetchJoke();
    // bot.postMessageToChannel('bot', 'Get ready for some giggles!', params);
});

// Error Handler
bot.on('error', (error) => {
    console.log(error);
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

app.listen(PORT, console.log(`Server started on PORT ${PORT}!  🎉`));