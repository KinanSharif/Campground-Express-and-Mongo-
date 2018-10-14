const express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
	seedDB = require("./seeds"),
	ejs = require('ejs');

const port = 3000;


// initiate mongoose
mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });

// ejs settings
ejs.delimiter = '?';
app.set("view engine","ejs");

// seeding db
//seedDB();

// static files
app.use(express.static(__dirname + "/assets"));

//body-parser
app.use(bodyParser.urlencoded({extended: true}));


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});





app.get('/', (req, res) => res.render('landing'));

app.get('/campgrounds', (req, res) => {
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}else{//console.log(allCampgrounds);
			console.log(req);
			res.render('campgrounds/index',{campgrounds:allCampgrounds});}
	});
	
	});

app.post('/campgrounds', (req, res) => {
	var name = req.body.name;
	var img = req.body.img;
	var description = req.body.description
	var newCampground = {name: name, img: img, description:description};

	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
	
	});



app.get('/campgrounds/new', (req, res) => res.render('campgrounds/new'));

	
// SHOW - shows more info about one campground
app.get("/campgrounds/:id",isLoggedIn, function(req, res){
    //find the campground with provided ID
	console.log('out here');
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
			
			console.log(req.session);
			console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


app.get('/campgrounds/:id/comments/new',isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, function(err,campground){
		if(err){console.log(err);}else{res.render("comments/new",{campground: campground });}
	});
	
	});
	
	app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});


app.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`))