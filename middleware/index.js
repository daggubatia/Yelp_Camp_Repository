var Campground = require("../models/campground"),
    Comment    = require("../models/comment");
    
var middlewareObj = {};

middlewareObj.isAuthorizedOnCG = function(req, res, next){
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundground){
            if (err){
                req.flash("error", err.message + "==== I am from CG edit page");
                res.redirect("back");  
            } else {
                if(foundground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You are not authorized to edit this campground since you are not the owner of it...");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You are needed to login first to know whether you are authorized to edit this campground...");
        res.redirect("back");
    }
};

middlewareObj.isAuthorizedOnComment = function(req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You are not authorized to do that...");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You are required to login first to do that!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You are needed to login first in order to that...");
    res.redirect("back");
};

module.exports = middlewareObj;