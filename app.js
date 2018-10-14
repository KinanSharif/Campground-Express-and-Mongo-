const express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash    = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
	seedDB = require("./seeds"),
	ejs = require('ejs');
	
	//seedDB();
	//requring routes
const commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index")

const port = 3000;


// initiate mongoose
mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });

// ejs settings
ejs.delimiter = '?';
app.set("view engine","ejs");



// static files
app.use(express.static(__dirname + "/assets"));

//body-parser
app.use(bodyParser.urlencoded({extended: true}));

//method override
app.use(methodOverride("_method"));

//flash
app.use(flash());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false,
	//cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});





app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));