'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
      User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
      User.hasOne(models.Markdown, { foreignKey: 'doctorId' })

      User.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' })

      User.hasMany(models.Schedule, { foreignKey: 'doctorId', as: 'doctorData' })

      User.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' })

      User.hasMany(models.Comment, { foreignKey: 'id', as: 'userData' })

      User.hasMany(models.History, { foreignKey: 'id', as: 'patientHistoryData' })
      User.hasMany(models.History, { foreignKey: 'id', as: 'doctorHistoryData' })

      // define association here
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.TEXT,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,
    warning: DataTypes.INTEGER,
    birthday: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};