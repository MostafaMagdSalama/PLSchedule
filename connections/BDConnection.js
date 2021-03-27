const mongoose = require("mongoose");
const conString =
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.u90fu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(conString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
