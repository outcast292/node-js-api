const mongoose = require("mongoose");



mongoose.connect(
    "mongodb+srv://user:meriam123@cluster0.kvbk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
  );