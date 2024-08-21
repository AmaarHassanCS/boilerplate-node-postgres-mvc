const uuid = require('uuid/v4');
// const userModel = require('../models/Admin');

module.exports = class UserService {

  async checkDuplicateEmail(email, ownerUuid = null) {
    try {
      // const usersWithEmail = await userModel.getUserByEmail(email);
      // if (usersWithEmail && usersWithEmail.length) {
      //   if (ownerUuid) {
      //     if (usersWithEmail.length === 1) {
      //       const sameUser = usersWithEmail[0];
      //       if (sameUser.uuid === ownerUuid) {
      //         return false;
      //       }
      //     }
      //   }
      //   return true;
      // }
      return false
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAll(query) {
    try {
      // return await userModel.getAll(query);
    } catch (error) {
      throw new Error(error)
    }
  }

  async get(uuid) {
    try {
      if (!uuid) {
        throw new Error('Invalid uuid in params')
      }
      // return await userModel.get(uuid);
    } catch (error) {
      return new Error(error);
    }
  }

  async insert(user) {
    try {
      user.uuid = uuid();
      // const emailExists = await this.checkDuplicateEmail(user.email, user.uuid);
      // if (emailExists) {
      //   console.log('Duplicate email')
      //   return {
      //     status: 400,
      //     error: 'Duplicate email'
      //   };
      // }
      // return userModel.insert(user);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  async update(uuid, user) {
    try {
      // const emailExists = await this.checkDuplicateEmail(user.email, uuid);
      // if (emailExists) {
      //   console.log('Duplicate email')
      //   return {
      //     status: 400,
      //     error: 'Duplicate email'
      //   };
      // }
      // return userModel.update(uuid, user);
    } catch (error) {
      console.log(error)
      return new Error(error);
    }
  }
}