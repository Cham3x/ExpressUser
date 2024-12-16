const User = require("../models/User");
const db = require("../db/db");
const Annonce = require("../models/Annonce");

function showUser(req, res){
    const userId = req.params.id;
    const query = 'SELECT * FROM users WHERE id=?';
    db.get(query,[userId],function (err,row){
        if(err){
            console.error('Erreur showUser');
            res.send('ERROR');
        }else{
            if(row){
                const user= new User(row.username,row.password);
                res.render('UserView', {title: 'User', loggedIn: req.session.loggedIn, user: user});
            }else{
                console.error('User introuvable');
                res.send('ERROR');
            }
        }
    })
    
}

function addAnnonceView(req, res) {

    res.render('UserView', {title: 'User',user:req.session.username, loggedIn: req.session.loggedIn, action: 'add'});
}
function addAnnonce(req, res) {
    console.log("test");
    const userName = req.session.username;
    console.log(req.session.username);
    const newAnnonce = new Annonce(userName, req.body);
    const query = "INSERT INTO annonces (userName,price,title,category,description) VALUES(?,?,?,?,?)";
    db.run(query, [newAnnonce.userName, newAnnonce.price, newAnnonce.title, newAnnonce.category, newAnnonce.description],
    (err) =>{
        if(err){
            console.error('création annonce échoué: ',err.message);
            throw err;
        }
        console.log('création d\'annonce');
        res.render('UserView', { title: 'User', user:userName, loggedIn: req.session.loggedIn, action: 'add'});
    })
}
/* function deleteAnnonceView(req, res) {
    const query = "SELECT * FROM annonces WHERE userName=? ";
    db.get(query, [], (err, rows) => {
        if (err) {
            console.error('erreur annonces');
            throw err;
        }
        if (rows) {
            res.render('UserView', { title: 'User', user: req.session.username, loggedIn: req.session.loggedIn, action: 'delete' })
        } else {
            res.render('UserView', { title: 'Home', loggedIn: req.session.loggedIn });
        })
} */
     function deleteAnnonceView(req, res){
         //console.log(annonceId)
         const userName = req.session.username;
         console.log(userName);
        const query = 'SELECT * FROM annonces WHERE userName=?';
        db.all(query,[userName], (err,row)=>{
            if(err){
                console.error('Erreur deleteAnnonceView');
                res.send('ERROR');
            } else {
                //console.log("réparé")
                if(row){
                    res.render('UserView', {title: 'User',user: req.session.username, loggedIn: req.session.loggedIn, datas: row, action: 'delete' });
                }else{
                    console.error('Annonce introuvable');
                    res.render('UserView', { title: 'User',user: req.session.username, loggedIn: req.session.loggedIn, action: 'delete' });
                }
            }
        })    
    }
function deleteAnnonce(req, res) {  
    const query = "DELETE FROM annonces WHERE id=?";
    db.run(query, [req.body.annonce],
        (err) => {
            if (err) {
                console.error('supp échoué: ', err.message);
                throw err;
            }
            console.log('supp d\'annonce');
           deleteAnnonceView(req,res);
        });
}
module.exports = { showUser,addAnnonceView,addAnnonce,deleteAnnonce,deleteAnnonceView};