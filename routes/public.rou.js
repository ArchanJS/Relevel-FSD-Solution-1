const {signUp,verify,signIn}=require('../controllers/public.con');

const routes=(app)=>{
    app.post('/user/create',signUp);
    app.post('/user/login',signIn);
}

module.exports=routes;