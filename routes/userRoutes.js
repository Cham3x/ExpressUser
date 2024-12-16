const express = require('express');
const router = express.Router();
const {showUser, addAnnonce,addAnnonceView,deleteAnnonce,deleteAnnonceView} = require('../controllers/UserController');

router.get("/", (req,res)=>{
    if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}`);
    }else{
        res.redirect('/login');
    }
})
router.get("/:id", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        showUser(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}`);
    }else{
        res.redirect('/login');
    }
})
router.get("/:id/add", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        addAnnonceView(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/add`);
    }else{
        res.redirect('/login');
    }
})
router.post("/:id/add", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
        addAnnonce(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/add`);
    }else{
        res.redirect('/login');
    }
})

router.get("/:id/delete", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
       deleteAnnonceView(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/delete`);
    }else{
        res.redirect('/login');
    }
})
router.post("/:id/delete", (req,res)=>{
    if(req.session.loggedIn && req.session.userId==req.params.id){
       deleteAnnonce(req,res);
    }else if(req.session.loggedIn){
        res.redirect(`/user/${req.session.userId}/delete`);
    }else{
        res.redirect('/login');
    }
})
module.exports = router;