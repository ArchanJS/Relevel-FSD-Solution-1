const {createBook,getAllBooks,deleteRentReturn,getRentsByAnUser}=require('../controllers/private.con');
const {auth,checkAdmin}=require('../middlewares/protect');

const routes=(app)=>{
    // Create book
    app.post('/book/create',auth,checkAdmin,createBook);
    // Get all books
    app.get('/book/list',auth,getAllBooks);
    // Delete/Rent/Return
    app.post('/book',auth,checkAdmin,deleteRentReturn);
    // Books rented by a user
    app.get('/rented/:userId',auth,getRentsByAnUser);
}

module.exports=routes;