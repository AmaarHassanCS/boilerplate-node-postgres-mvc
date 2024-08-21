const constants = require('../constants/schema');

const userSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING(255),
    validate: { isEmail: true },
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING
  }
};

const userProperties = {
  indexes: [{ fields: ['email'] }],
  underscored: true,
  hooks: {
    beforeCreate: async user => {
      if (!user.password) {
        return;
      }
      user.password = await bcrypt.hash(
        user.password,
        constants.PASSWORD_SALT_ROUNDS
      );
    }
  }
}

module.exports = {
  userSchema,
  userProperties
}