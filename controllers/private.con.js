const db=require('../models');
const User=db.users;
const Book=db.books;

exports.createBook=async(req,res)=>{
    try {
        let {name,author,publishedOn}=req.body;
        publishedOn=publishedOn||Date.now();
        const book=new Book({name,author,publishedOn});
        await book.save();
        res.status(201).json({message:"Book is added!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
}

exports.getAllBooks=async(req,res)=>{
    try {
        const books=await Book.findAll();
        res.status(200).send(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
}

exports.deleteRentReturn=async(req,res)=>{
    try {
        let del=req.query.delete,rent=req.query.rent,ret=req.query.return;
        if(del){
            let isbnNo=req.body.isbnNo;
            let book=await Book.findByPk(isbnNo);
            if(book&&book.rentedBy===0){
                await Book.destroy({where:{isbnNo:isbnNo}});
                res.status(200).json({message:"Book deleted!"});
            }
            else res.status(400).json({error:"Book has been rented by someone!"});
        }
        else if(rent){
            let {userId,isbnNo}=req.body;
            let book=await Book.findByPk(isbnNo);
            if(book.rentedBy===0){
                const books=await Book.findAll({where:{rentedBy:userId}});
                if(books.length<2){
                    await Book.update({rentedBy:userId},{where:{isbnNo:isbnNo}});
                    res.status(200).json({message:"Book rented!"});
                }
                else{
                    res.status(400).json({error:"Return before renting more -_-!"});
                }
            }
            else{
                res.status(400).json({message:"Book has been rented by someone else!"});
            }
        }
        else if(ret){
            let {isbnNo}=req.body;
            await Book.update({rentedBy:0},{where:{isbnNo:isbnNo}});
            res.status(200).json({message:"Book returned!"});
        }
        else{
            res.status(400).json({error:"Please provide a query parameter! :)"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
}

exports.getRentsByAnUser=async(req,res)=>{
    try {
        const {userId}=req.params;
        const books=await Book.findAll({where:{rentedBy:userId}});
        res.status(200).send(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
}