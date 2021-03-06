/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const cors = require('cors') // Place this with other requires (like 'path' and 'express')
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://SpencerPilkington:Gs3d7fsbFSsdd122@cluster0.umk1b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
});

// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/prove08'); 
const ta04Routes = require('./routes/ta04');
const ta05Routes = require('./routes/ta05');
const userData = require('./routes/prove02-input');
const prove05adminRoute = require('./routes/prove05-admin');
const prove09Route = require('./routes/prove09');
const prove11Route = require('./routes/prove11');
const prove05shopRoute = require('./routes/prove05-shop');
const errorController = require('./controllers/error');
const csrfProtection = csrf();
const authRoutes = require('./routes/auth');

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   .use(bodyParser.urlencoded({extended: false})) // For parsing the body of a POST
  //  .use ((req,res,next) => {
  //    User.findById('')
  //    .then(user => {
  //      req.user = user;
  //      next();
  //    })
  //    .catch(err => console.log(err));
  //  })
   .use(session({
     secret: 'dfgdfsdfSSDFfg',
     resave: false,
     saveUninitialized: false,
     store: store
    })
   )
  //  .use(csrfProtection)
   .use(flash())

   
   .use((req,res,next) => {
     if(!req.session.user) {
       return next();;
     }
     User.findById(req.session.user._id)
     .then(user => {
       req.user = user;
       next();
     })
     .catch(err => console.log(err));
   })
  //  .use((req,res,next) => {
  //   res.locals.isAuthenticated = req.session.isLoggedIn;
  //   res.locals.csrfToken = req.csrfToken();
  //   next();
  // })
   
   
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)
   .use('/ta05', ta05Routes)
   .use(userData.routes)
   .get('/main',(req,res,next) => {
    const books = userData.books;
    const summaries = userData.summaries;
    res.render('pages/main', {
        title:"main",
        books: books,
        summaries: summaries,
        path: '/main'
    });
})
   .use('/admin', prove05adminRoute)
   .use(prove05shopRoute)
   .use(authRoutes)
   .use(prove09Route)
   .use(bodyParser.json())
   .use(prove11Route)
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
    })
   .use(errorController.get404)
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
   })
   

const corsOptions = {
    origin: "https://cse341prove02projectapp.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};


   
mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
     // This should be your user handling code implement following the course videos
    //  User.findOne()
    //  .then(user => {
    //    if(!user) {
    //      const user = new User({
    //        name: 'name',
    //        email: 'name@test.com',
    //        cart: {
    //          items: []
    //        }
    //      });
    //      user.save();
    //    }
    //  });
    const server = app.listen(PORT);
    const io = require('socket.io')(server);
    io.on('connection', (socket) => {
      console.log('CLient Connected!');

      socket.on('new-name', () => {
        socket.broadcast.emit('update-list');
      });
    });


  })
  .catch(err => {
    console.log(err);
  });

   //.listen(PORT, () => console.log(`Listening on ${ PORT }`));
