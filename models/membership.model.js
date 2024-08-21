
const MembershipModel = (sequelize, DataTypes) => {
  const Membership = sequelize.define(
    'Membership',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
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
      indexes: [{ fields: ['type'] }],
      underscored: true,
      hooks: {
        beforeCreate: async membership => {
          membership.createdAt = new Date();
        },
        beforeUpdate: async membership => {
          membership.updatedAt = new Date();
        },
        beforeDestroy: async membership => {
          membership.deletedAt = new Date();
        }
      }
    },
  );

  Membership.prototype.serialize = function serializeMembership() {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
    };
  };

  return Membership;
};

module.exports = MembershipModel;
