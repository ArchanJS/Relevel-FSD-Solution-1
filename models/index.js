const {Sequelize,DataTypes} = require('sequelize');
const dbConfig = require('../db/dbConfig');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operationsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
sequelize.authenticate().then(()=>console.log("DB connected!")).catch((err)=>console.log(err));
const db={
    Sequelize,
    sequelize
};
db.users=require('./User')(sequelize,DataTypes);
db.books=require('./Book')(sequelize,DataTypes);
db.sequelize.sync().then(()=>console.log("Sync successful!"));
module.exports=db;