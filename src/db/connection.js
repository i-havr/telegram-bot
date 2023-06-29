const mongoose = require("mongoose");

const connectMongo = () => {
  mongoose.set("strictQuery", false);

  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectMongo,
};
