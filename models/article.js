const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    unique: true
    // required: true
  },
  date: {
    type: String
    // required: true
  },
  URL: {
    type: String
    // required: true
  }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
