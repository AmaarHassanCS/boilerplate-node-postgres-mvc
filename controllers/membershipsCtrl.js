const { models } = require('../models');

const getAll = async (req, res, next) => {
  try {
    const memberships = await models.membership.findAll({});
    res.status(200).json(memberships);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      success: false,
      message: error.message || 'Could not get memberships',
    });
  }
}

const get = async (req, res, next) => {
  try {

  } catch (error) {

  }
}

const insert = async (req, res, next) => {
  try {

  } catch (error) {

  }
}

const update = async (req, res, next) => {
  try {

  } catch (error) {

  }
}


module.exports = {
  getAll,
  get,
  insert,
  update,
}