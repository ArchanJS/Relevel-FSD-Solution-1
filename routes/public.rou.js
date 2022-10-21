const {signUp,verify,signIn}=require('../controllers/public.con');

const routes=(app)=>{
    // Signup
    app.post('/user/create',signUp);
    // SignIn
    app.post('/user/login',signIn);
}

module.exports=routes;