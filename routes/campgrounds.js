var express        = require("express"),
    router         = express.Router(),
    Campground     = require("../models/campground"),
    middleware     = require("../middleware");

//Show all the campgrounds=====================
router.get("/", function(req, res){
    //get all the campgrounds from the DB
    Campground.find({}, function(err, allcampgrounds){
       if (err) {
           console.log("SOMETHING WENT WRONG");
           console.log(err);
           res.redirect("back");
       } else {
         res.render("campgrounds/index", {campgrounds: allcampgrounds});  
       } 
    });
});
// Create a new campground==============
router.post("/", middleware.isLoggedIn, function(req, res){
    var cgname = req.body.cgname;
    var price = req.body.price;
    var imageUrl = req.body.image;
    var desc = req.body.description;
    var author = {
                    id: req.user._id, 
                    username: req.user.username
        };
    var cgObject = {name: cgname, price: price, image: imageUrl, description: desc, author: author};
    Campground.create(cgObject, function(err, campground){
        if(err) {
            console.log("SOMETHING WENT WRONG");
            console.log(err);
        } else {
            req.flash("success", "Successfully created a new campground: " + campground.name);
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(cgObject);
});
//New Campground form======================
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});
//show the details about the campground===========
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundground){
       if (err){
           req.flash("error", err.message + "=== I am from CG details page");
           res.redirect("back");
       } else {
          res.render("campgrounds/show", {campground: foundground});    
       } 
    });
});
//rendering the edit campground form===================
router.get("/:id/edit", middleware.isAuthorizedOnCG, function(req, res){
    Campground.findById(req.params.id, function(err, foundground){
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.render("campgrounds/edit", {campground: foundground});   
       }
    });
});
// editing campground and updating it in the database=============
router.put("/:id", middleware.isAuthorizedOnCG,function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCG){
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           req.flash("success", "Modification of CG is done.");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});
//deleting the campground======================
router.delete("/:id", middleware.isAuthorizedOnCG,function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if (err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           req.flash("success", "You have successfully deleted the campground");
           res.redirect("/campgrounds");
       }
   }) ;
});

module.exports = router;