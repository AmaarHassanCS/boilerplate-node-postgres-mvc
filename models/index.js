const Sequelize = require('sequelize');

const defaultDatabaseConfig = {
  dialect: 'postgres',
  // dialectOptions: { ssl: true },
  logging: false,
};

const connectOpts = process.env.DATABASE_URL
  ? [process.env.DATABASE_URL, { ...defaultDatabaseConfig }]
  : [
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      ...defaultDatabaseConfig
    }
  ];

const sequelize = new Sequelize(...connectOpts);

console.log(connectOpts);
const models = {
  admin: require('./admin.model.js')(sequelize, Sequelize.DataTypes),
  membership: require('./membership.model.js')(sequelize, Sequelize.DataTypes)
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  Sequelize,
  models
};
