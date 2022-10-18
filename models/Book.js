module.exports=(sequelize,DataTypes)=>{
    const Book=sequelize.define('books',{
        isbnNo:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            unique:true
        },
        author:{
            type:DataTypes.STRING
        },
        publishedOn:{
            type:DataTypes.DATE,
            defaultValue:Date.now()
        },
        addedOn:{
            type:DataTypes.DATE,
            defaultValue:Date.now()
        },
        rentedBy:{
            type:DataTypes.INTEGER,
            defaultValue:0
        }
    });
    return Book;
};