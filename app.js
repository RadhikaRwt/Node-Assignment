const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const sequelize = require("./utils/database");

const authMiddleware =  require('./middlewares/is-auth');

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
     // key:'user_id',
      secret: "thisIsSecretForEncryption", //for signing hash which secretl stores our id to session
      saveUninitialized: true,
      cookie: {  secure: false  }
    })
  );

//   app.use( (req,res,next)=>{
//       if( req.cookies.user_id && !req.session.user)
//       {
//           console.log("fhfhfdfsafdgauhjhfsafdf....")
//         res.clearCookie('user_id');
//       }
//       next();
//   })
  const homeRoutes = require("./routes/home");
  const authRoutes = require("./routes/auth");

  
  app.use('/auth', authRoutes);
  app.use(authMiddleware,homeRoutes);
  
  

  sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync();

app.listen(3030, function() {
    console.log(`Server listening on port 3030`);
});