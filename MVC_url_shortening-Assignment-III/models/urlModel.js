const { url } = require("inspector");
const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
  eid: {
    type: Number,
    required: [true, "URL id is needed and it should be unique"],
    unique: true,
  },
  complete_url: {
    type: String,
    required: [true, "complete URL is needed and it should be unique"],
    unique: true,
  },
  shortened_url: {
    type: String,
    required: [true, "shortened URL is needed and it should be unique"],
    unique: true,
  },
});

const UrlModel = mongoose.model("urlSchema", urlSchema);

module.exports = UrlModel;
