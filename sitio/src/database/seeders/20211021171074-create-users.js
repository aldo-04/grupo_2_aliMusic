'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      userName:"aldok",
      firstName: "aldo",
      lastName: "orden",
      email: "aldo@gmail.com",
      number: null,
      password: "$2a$10$xEayb5s2tF7YNVB6swkjG.7PBpL1C9nIL5Vbk8347eKpL90Xddi5S",
      avatar: "avatar_default.png",
      rol: 1,
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
