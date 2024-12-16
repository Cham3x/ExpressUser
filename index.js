const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

const bodyParser = require('body-parser');

// Routes
const registerRoutes = require('./routes/registerRoutes');
const logRoutes = require('./routes/logRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const AnnonceRoutes = require('./routes/AnnonceRoutes');
const HomeControllers = require('./controllers/HomeControllers');

// View engine
app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }))


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Session config
app.use(session({
    secret: 'secret_de_session',
    name:'uniqueSessionID',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use((req, res, next) => {
    if (!req.session) {
        return next(new Error('Session non initialisée'));
    }
    next();
});

// HOME
app.get("/", HomeControllers.showAnnonces);

  

app.use('/', logRoutes)
app.use('/user',userRoutes)
app.use('/register',registerRoutes)
app.use('/admin',adminRoutes)
app.use('/annonce',AnnonceRoutes)
app.use((req,res)=>{
    res.status(404).render('404', {title: '404'});
})

// Listen
app.listen(port,()=>{
    console.log("Listen to http://localhost:3000");
})