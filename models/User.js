module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define('users',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:DataTypes.STRING,
        email:{
            type:DataTypes.STRING,
            unique:true
        },
        password:DataTypes.STRING,
        isAdmin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    });
    return User;
};