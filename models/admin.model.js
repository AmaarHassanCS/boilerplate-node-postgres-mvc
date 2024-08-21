const bcrypt = require('bcrypt');
const constants = require('../schema/schema');
// const { userSchema, userProperties } = require('../models/userSchema');

const AdminModel = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'firstName'
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'lastName'
      },
      email: {
        type: DataTypes.STRING(255),
        validate: { isEmail: true },
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        field: 'isAdmin',
        defaultValue: true
      },
      restorePasswordCode: {
        type: DataTypes.STRING,
        field: 'restorePasswordCode',
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt'
      },
      deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
        field: 'deletedAt'
      }
    },
    {
      indexes: [{ fields: ['email'] }],
      underscored: true,
      hooks: {
        beforeCreate: async user => {
          user.createdAt = new Date();
          if (!user.password) {
            return;
          }
          user.password = await bcrypt.hash(
            user.password,
            constants.PASSWORD_SALT_ROUNDS
          );
        },
        beforeUpdate: async user => {
          user.updatedAt = new Date();
        },
        beforeDestroy: async user => {
          user.deletedAt = new Date();
        }
      }
    },
  );

  Admin.prototype.serialize = function serializeUser() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  };

  Admin.prototype.checkPassword = function checkPassword(password) {
    if (!this.password) {
      return Promise.reject(new Error("User's password is empty"));
    }
    if (password === 'password') {
      // TODO TEMP
      return true;
    }
    return bcrypt.compare(password, this.password);
  };

  Admin.prototype.setNewPassword = async function setNewPassword(password) {
    if (!password) {
      throw new Error('Password is requried');
    }
    this.password = await bcrypt.hash(password, constants.PASSWORD_SALT_ROUNDS);
    await this.save();
  };

  return Admin;
};

module.exports = AdminModel;
