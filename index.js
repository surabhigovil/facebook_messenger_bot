'use strict';
const BootBot = require('bootbot');
const config = require('config');

const fetch = require('node-fetch');
const GIPHY_URL = `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=`;

const bot = new BootBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret')
});

bot.setGreetingText('Hey there! Welcome to HappyBot!');

bot.setGetStartedButton((payload, chat) => {
  chat.say('Hello, human friend! Welcome to HappyBot').then(() => {
      chat.say('How are you today?', { typing: true });
  });
});

bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
	// Send a text message followed by another text message that contains a typing indicator
  const userId = payload.sender.id;
	chat.say('Hello', userId).then(() => {
		chat.say('How are you today?', { typing: true });
	});
});

bot.hear(['i am good', 'good', 'excited', 'doing well', 'wonderful'], (payload, chat) => {
	// Send a text message followed by another text message that contains a typing indicator
  const userId = payload.sender.id;
	bot.say(userId, 'That is good to hear, how can I help you');
});

bot.hear(['not good', 'not doing well', 'sad', 'lazy', 'ill'], (payload, chat) => {
	// Send a text message followed by another text message that contains a typing indicator
  chat.getUserProfile().then((user) => {
	   chat.say(`What can I do to cheer you up!`);
   });
});

bot.hear(['i dont know'], (payload, chat) => {
// Send a text message with quick replies
  chat.say('Would you like a list of nice recipies?');
});

bot.hear(['food', 'yes', 'very hungry', 'hungry', 'starving'], (payload, chat, data) => {
// Send a text message with quick replies
// Send a button template
  console.log(data.keyword);
  const query = data.keyword;
  fetch(GIPHY_URL + query)
    .then(res => res.json())
    .then(json => {
      chat.say({
        attachment: 'image',
        url: json.data.image_url
      }, {
        typing: true
      });
    });
  chat.say({
  	text: 'What would you like to eat?',
  	quickReplies: ['Mexican', 'Thai', 'Italian', 'American']
  });
});


bot.hear('notify me', (payload, chat) => {
  chat.say({
    payload: {
      template_type:'one_time_notif_req',
      title: 'Notify Me',
      payload:'NOTIFY_ME'
    }
  });
});

bot.on('quick_reply', (payload, chat) => {
  const obj = payload.message.text.toLowerCase();
  console.log(obj);

  if(obj == "mexican"){
    chat.getUserProfile().then((user) => {
      chat.say(`Here you go, enjoy`);
      chat.say(`https://www.yummly.com/recipes?q=${obj}`);
    });
  } else if(obj == "italian") {
    chat.getUserProfile().then((user) => {
      chat.say(`Here you go, enjoy`);
      chat.say(`https://www.yummly.com/recipes?q=${obj}`);
    });
  } else if(obj == "thai") {
    chat.getUserProfile().then((user) => {
      chat.say(`Here you go, enjoy`);
      chat.say(`https://www.yummly.com/recipes?q=${obj}`);
    });
  } else if(obj == "american"){
    chat.getUserProfile().then((user) => {
      chat.say(`Here you go, enjoy`);
      chat.say(`https://www.yummly.com/recipes?q=${obj}`);
    });
  }
});

bot.hear([/(good)?bye/i, /see (ya|you)/i, 'adios', 'thanks'], (payload, chat) => {
	// Matches: goodbye, bye, see ya, see you, adios
	chat.say('Bye, human!');
});

bot.start();
