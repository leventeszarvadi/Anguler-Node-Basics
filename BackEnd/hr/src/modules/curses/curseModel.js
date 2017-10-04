const sequelize=require('../../config/sequelize').init(null);
const Sequelize=require('sequelize');


const CursesModel =sequelize.define('CURSES',{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

module.exports = CursesModel;