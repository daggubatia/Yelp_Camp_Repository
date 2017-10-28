var express                = require("express"),
    app                    = express(),
    expressSession         = require("express-session"),
    bodyParser             = require("body-parser"),
    flash                  = require("connect-flash"),
    mongoose               = require("mongoose"),
    Campground             = require("./models/campground"),
    Comment                = require("./models/comment"),
    passport               = require("passport"),
    passportLocal          = require("passport-local"),
    passportLocalMongoose  = require("passport-local-mongoose"),
    User                   = require("./models/user"),
    methodOverride         = require("method-override"),
    seedDB                 = require("./seed");

var campgroundRoutes       = require("./routes/campgrounds"),
    commentRoutes          = require("./routes/comments"),
    indexRoutes            = require("./routes/index");
    
mongoose.Promise = global.Promise;
//var dburl = process.env.DATABASEURL // you can either use this or below one. But below is more prominent one why because there is a probability to
                                      // loose system local variables such as DATABASEURL when events such as system crash/workspace restrart happened.
var dburl = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"; // If first is true it never goes to second statement I mean when ever DATABASEURL
                                                                        // exists it always picks the first statement.
mongoose.connect(dburl, {useMongoClient: true});
//mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
//mongoose.connect("mongodb://ajay:password@ds237855.mlab.com:37855/herokuyelpcamp", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(expressSession({
    secret: "How is the weather today",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//We should always declare the below function after the passport session method inorder to make currentUser available to all the views templates
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success     = req.flash("success");
    res.locals.error       = req.flash("error");
    next();
});
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// seedDB(); // seed the DB with the sample data to play with

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!!!");
});
