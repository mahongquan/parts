"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    // password: DataTypes.STRING,
    // first_name:DataTypes.STRING,
    // last_name: DataTypes.STRING,
    // email: DataTypes.STRING,
    // is_staff: DataTypes.BOOLEAN,
    // is_active: DataTypes.BOOLEAN,
    // date_joined: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task)
      }
    },
    //timestamps: false,
    //tableName: 'auth_user'
  });

  return User;
};
