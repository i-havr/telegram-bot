const axios = require("axios");

const { User } = require("../models/userModel");

const TelegramBot = require("node-telegram-bot-api");
const channels = ["channel1", "channel2", "channel3"];

// const bot = new TelegramBot(token, { polling: true });

const testController = async (req, res, next) => {
  const { email, telegramToken, message, newMessage, channelsList } = req.body;
  // const user = await User.findOne({ email });
  // if (user) {
  //   user.telegramToken = telegramToken;
  //   await user.save();
  // }
  // const bot = new TelegramBot(telegramToken, { polling: true });
  // subscribeToChannel(bot, channelsList);
  try {
    const params = new URLSearchParams({
      chat_id: channelsList,
    });
    const url = `https://api.telegram.org/bot${telegramToken}/getChat?${params}`;

    const { data } = await axios.get(url);
    console.log("=========>>>>>>>", data.result.id);

    if (data.ok) {
      const chatId = data.result.id;
      // Подписываемся на канал
      const joinParams = new URLSearchParams({
        chat_id: chatId,
        // chat_id: chatId.toString().slice(1),
      });
      const joinUrl = `https://api.telegram.org/bot${telegramToken}/joinChat`;
      console.log("testController -> joinUrl ===>>>> ", joinUrl);

      const { data: joinResponse } = await axios.post(joinUrl, joinParams);

      if (joinResponse.ok) {
        console.log(`Подписан на канал ${channelsList}`);
      } else {
        console.log(`Ошибка при подписке на канал`);
      }
    } else {
      console.log(
        `Ошибка при получении информации о канале: ${data.description}`
      );
    }
  } catch (error) {
    console.log("Произошла ошибка:", error);
  }
};

function subscribeToChannel(bot, channel) {
  bot
    .getChat(channel)
    .then((chat) => {
      console.dir(bot);
      bot.joinChat(chat.id);
      // bot.sendMessage(chat.id, "/start");
      console.log(`Подписан на канал ${chat.title}`);
    })
    .catch((error) => {
      console.log(`Ошибка при подписке на канал ${channel}: ${error.message}`);
    });
}

function autoSubscribe(channels) {
  channels.forEach((channel, index) => {
    setTimeout(() => {
      subscribeToChannel(channel);
    }, index * 120000);
  });
}

function startCommenting(bot) {
  bot.onText(/\/post (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const postId = msg.message_id;
    const commentText = match[1];
    bot.sendMessage(
      chatId,
      `Новый комментарий под постом ${postId}: ${commentText}`
    );
  });
}

/*

function subscribeToChannel(channel) {
  bot
    .getChat(channel)
    .then((chat) => {
      console.log(`Подписан на канал ${chat.title}`);
      bot.sendMessage(chat.id, "Привет! Я бот, и я подписался на этот канал.");
      bot.onText(/\/post/, (msg) => {
        const postId = msg.message_id;
        bot.sendMessage(chat.id, `Новый комментарий под постом ${postId}`);
      });
    })
    .catch((error) => {
      console.log(`Ошибка при подписке на канал ${channel}: ${error.message}`);
    });
}

function autoSubscribe() {
  const channel = channels[currentChannelIndex];
  subscribeToChannel(channel);
  currentChannelIndex = (currentChannelIndex + 1) % channels.length;
}

function replaceAccounts() {
  channels = ["new_channel1", "new_channel2", "new_channel3"];
  currentChannelIndex = 0;
}

setInterval(replaceAccounts, 24 * 60 * 60 * 1000);
autoSubscribe();

*/
module.exports = { testController, autoSubscribe, startCommenting };
