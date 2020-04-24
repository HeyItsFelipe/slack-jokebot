# slack-jokebot
A slack bot for telling jokes.

# Important
This code is using [Slackbots.js]('https://github.com/mishk0/slack-bot-api) which is not working with the new way Slack does Permissions configuration causing a not_allowed_token_type error.  The issue is located [here](https://github.com/mishk0/slack-bot-api/issues/147). A temporary work around is to use Slack to build a classic app.  The workaround can be found [here](https://github.com/slackapi/hubot-slack/issues/584#issuecomment-611808704).

## Team

- **Lead Developer**: [Felipe Fernandez](https://github.com/HeyItsFelipe)

## Latest Deployment
The latest deployment can be viewed here: [https://quiet-castle-41146.herokuapp.com/](https://quiet-castle-41146.herokuapp.com/)

## Prerequisites
Knowledge in the following technologies will be helpful:<br />
- Node
- Axios
- SlackBots.js

## Setup
Read Important section above.
You also need a bot token.  For that go to [https://api.slack.com/apps](https://api.slack.com/apps)<br />
Fork the repo to your own GitHub.<br />
Open your favorite terminal.<br />
Navigate to where you want to clone the repo.<br />
Clone the repo to your computer using the `git clone`.<br />
Navigate into the cloned repo.<br />
Type `npm install` to install dependencies.

## Run
Navigate to the cloned repo using your terminal if not done so already.<br />
Type `npm run start` to run the app.<br />

## Schedule
On deployment on Heroku, Heroku Scheduler was used to run this app once every 24 hours.  It also gets triggered when you visit deployed link (see link in Latest Deployment).