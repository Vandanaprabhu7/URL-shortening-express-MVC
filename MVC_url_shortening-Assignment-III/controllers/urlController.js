const urlModel = require("./../models/urlModel");
const logger = require("../utils/logger");
const apiError = require("../utils/apiError");

exports.addNewUrl = async (req, res) => {
  try {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    const newUrl = await urlModel.create({
      eid: req.body.eid,
      complete_url: req.body.complete_url,
      shortened_url: `https://${result}.com`,
    });
    res.status(201).json({
      status: "Successful",
      message: "URL added successfully",
      data: {
        employee: newUrl,
      },
    });
    logger.log("info", "Url registered");
  } catch (err) {
    console.log("URL failed to save");
    res.status(400).json({
      status: "Fail",
      message: "URL registration failed",
    });
    logger.log("Error", "Url registration failed");
  }
};

exports.getAllUrl = async (req, res) => {
  try {
    const urls = await urlModel.find();
    res.status(200).json({
      status: "Success",
      results: urls.length,
      data: {
        urlDetails: urls,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      msg: err.message,
    });
  }
};

exports.getUrlbyId = async (req, res, next) => {
  const urls = await urlModel.findOne({ eid: req.params.id });
  if (urls) {
    res.status(200).json({
      status: "Success",
      data: {
        urlDetails: urls,
      },
    });
  } else {
    return next(new apiError(500, `id ${req.params.id} doesnt exists`));
  }
};

exports.updateUrl = async (req, res, next) => {
  const url = await urlModel.findOneAndUpdate(
    { eid: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
      includeResultMetadata: true,
    }
  );
  if (url.value) {
    res.status(200).json({
      status: "success",
      data: {
        newUrlDetails: url,
      },
    });
  } else {
    return next(new apiError(500, `id ${req.params.id} doesnt exists`));
  }
};

exports.deleteUrl = async (req, res, next) => {
  const response = await urlModel.findOneAndDelete({ eid: req.params.id });
  if (response) {
    res.status(200).json({
      status: "Deleted sucessfully",
      data: {
        dataDeleted: response,
      },
    });
  } else {
    return next(new apiError(500, `id ${req.params.id} doesnt exists`));
  }
};
