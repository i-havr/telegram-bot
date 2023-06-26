const TelegramBot = require("node-telegram-bot-api");
const token = "YOUR_TELEGRAM_BOT_TOKEN";
const channels = ["channel1", "channel2", "channel3"];

const bot = new TelegramBot(token, { polling: true });

function subscribeToChannel(channel) {
  bot
    .getChat(channel)
    .then((chat) => {
      bot.sendMessage(chat.id, "/start");
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

function startCommenting() {
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

// /////////////////

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

module.exports = { autoSubscribe, startCommenting };
