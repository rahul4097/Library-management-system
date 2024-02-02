require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session= require('express-session');
const flash = require('connect-flash');
const connectDB = require('./server/config/db');
const path = require('path')


const app = express();
const port = 5000 || process.env.PORT;

connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'));

//static file
app.use(express.static('public'));


//express session
app.use(
    session({
        secret:'secret',
        resave: false,
        saveUninitialized:true,
        cookie:{
            maxAge: 1000 * 60 * 24 * 7, //1 week
        }
    })
);

//templating engine
app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));


//flash messgage

app.use(flash({sessionKeyName: 'flashmessage'}))

//Routes
app.use('/',require('./server/routes/memberRoutes'))
app.use('/book',require('./server/routes/bookRoutes'));
app.use('/bookRequest',require('./server/routes/bookRequestedRoutes'));

//handle 404
app.get('*',(req,res)=>{
    res.status(404).render('404');
});

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})