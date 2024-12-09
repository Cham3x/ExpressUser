const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite',(err)=>{
    if(err){
        console.error('erreur de connexion :',err.message);
    }else{
        db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL)');
        console.log('connecté à la bdd');
    }
});

module.exports=db;