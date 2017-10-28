var express        = require("express"),
    router         = express.Router({mergeParams: true}),
    Campground     = require("../models/campground"),
    Comment        = require("../models/comment"),
    middleware     = require("../middleware");

// throw new comment form====================
router.get("/new", middleware.isLoggedIn ,function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});    
        }
    });
});
// create a new comment on campground=========================
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
               Comment.create(req.body.comment, function(err, comment){
                   if (err) {
                       console.log(err);
                   } else {
                       comment.author.id = req.user._id;
                       comment.author.username = req.user.username;
                       comment.save();
                       campground.comments.push(comment);
                       campground.save();
                       req.flash("success", "You have created a new comment for the CG: " + campground.name);
                       res.redirect("/campgrounds/" + campground._id);
                   }
               });
         }
    });
});
//editing comment================================
router.get("/:comment_id/edit", middleware.isAuthorizedOnComment, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});
//updating comment to the database================================
router.put("/:comment_id", middleware.isAuthorizedOnComment, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err){
            res.render("back");
        } else {
            req.flash("success", "You have successfully updated the comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});
//Deleting comment =================================
router.delete("/:comment_id", middleware.isAuthorizedOnComment, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if (err) {
          res.redirect("back");
      } else {
          req.flash("success", "Deletion of the comment is completed!");
          res.redirect("/campgrounds/" + req.params.id);
      }
   }); 
});

module.exports = router;