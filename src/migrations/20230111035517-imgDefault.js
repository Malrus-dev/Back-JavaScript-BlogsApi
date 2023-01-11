'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'image', {
      type: Sequelize.STRING,
      defaultValue: 'imagem.png'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'image', {
      type: Sequelize.STRING,
    });
  }
};
