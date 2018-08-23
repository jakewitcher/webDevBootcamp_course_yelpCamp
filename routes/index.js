const   express = require("express"),
        router = express.Router(),
        passport = require("passport"),
        User = require("../models/user");

//ROOT
router.get("/", (req, res) => {
    res.render("landing")
});

//REGISTER FORM
router.get("/register", (req, res) => {
    res.render("register");
});

//SIGN UP USER
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN FORM
router.get("/login", (req, res) => {
    res.render("login");
});

//LOGIN USER
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res) {
});

//LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

module.exports = router;