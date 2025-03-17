const Website = require("../models/website");
const { responseHandler } = require("../utils/responseHandler");
const { RESPONSE_MESSAGES } = require("../utils/constants");
const { default: mongoose } = require("mongoose");

exports.getWebsite = async (req, res) => {
  try {
    const website = await Website.findOne({ userId: req.user.userId });

    if (!website) {
      return responseHandler(
        res,
        404,
        false,
        RESPONSE_MESSAGES.WEBSITE_NOT_FOUND
      );
    }

    responseHandler(res, 200, true, "Website fetched successfully", website);
  } catch (error) {
    responseHandler(
      res,
      500,
      false,
      RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

exports.createWebsite = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return responseHandler(res, 401, false, RESPONSE_MESSAGES.UNAUTHORIZED);
    }

    const userId = req.user.userId;
    let website = await Website.findOne({ userId });

    if (website) {
      return responseHandler(
        res,
        403,
        false,
        RESPONSE_MESSAGES.WEBSITE_LIMIT_REACHED
      );
    }

    const newWebsite = new Website({ userId, ...req.body });
    await newWebsite.save();

    responseHandler(
      res,
      201,
      true,
      RESPONSE_MESSAGES.WEBSITE_CREATE_SUCCESS,
      newWebsite
    );
  } catch (error) {
    responseHandler(
      res,
      500,
      false,
      RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

exports.updateWebsite = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return responseHandler(res, 401, false, RESPONSE_MESSAGES.UNAUTHORIZED);
    }

    const userId = new mongoose.Types.ObjectId(req.user.userId);
    let website = await Website.findOneAndUpdate(
      { userId },
      { $set: req.body },
      { new: true, runValidators: true, upsert: false }
    );

    if (!website) {
      return responseHandler(
        res,
        404,
        false,
        RESPONSE_MESSAGES.WEBSITE_NOT_FOUND
      );
    }

    responseHandler(
      res,
      200,
      true,
      RESPONSE_MESSAGES.WEBSITE_UPDATE_SUCCESS,
      website
    );
  } catch (error) {
    responseHandler(
      res,
      500,
      false,
      RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

exports.deleteWebsite = async (req, res) => {
  try {
    const website = await Website.findOneAndDelete({ userId: req.user.userId });

    if (!website) {
      return responseHandler(
        res,
        404,
        false,
        RESPONSE_MESSAGES.WEBSITE_NOT_FOUND
      );
    }

    responseHandler(res, 200, true, RESPONSE_MESSAGES.WEBSITE_DELETE_SUCCESS);
  } catch (error) {
    responseHandler(
      res,
      500,
      false,
      RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};
