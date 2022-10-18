const {createBook,getAllBooks,deleteRentReturn,getRentsByAnUser}=require('../controllers/private.con');
const {auth,checkAdmin}=require('../middlewares/protect');

const routes=(app)=>{
    app.post('/book/create',auth,checkAdmin,createBook);
    app.get('/book/list',auth,getAllBooks);
    app.post('/book',auth,checkAdmin,deleteRentReturn);
    app.get('/rented/:userId',auth,getRentsByAnUser);
}

module.exports=routes;