const express = require ('express');
const server = express();
const nunjucks = require('nunjucks');
const db = require('./db');

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }));

nunjucks.configure('views',{
    express: server,
    noCache: true,
});

server.get("/",(req,res)=>{
    db.all(`SELECT * FROM ideas`,(err,rows)=>{
        if(err){
            console.log(err);
            return res.send("Erro ao acessar o banco de Dados")
        }

        let lastIdeas = [];
        const reversedIdeas = [...rows].reverse();
        
        for(let idea of reversedIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea);
            }
        }
    
       return res.render('index.html',{ ideas: lastIdeas });
    });
});

server.post("/",(req,res)=>{
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES(?,?,?,?,?);
    `;
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ];

    db.run(query,values,(err)=>{
        if(err){
            console.log(err);
            return res.send("Erro ao acessar o banco de Dados")
        }

        return res.redirect('/');
    });
});

server.get("/ideas",(req,res)=>{

    db.all(`SELECT * FROM ideas`,(err,rows)=>{
        if(err){
            console.log(err);
            return res.send("Erro ao acessar o banco de Dados")
        }

        const reversedIdeas = [...rows].reverse();

        return res.render('ideas.html',{ ideas: reversedIdeas });
    });
});

server.get("/delete/:id",(req,res)=>{
    db.run(`DELETE FROM ideas WHERE id = ?`,[req.params.id],(err)=>{
        if(err){
            console.log(err);
            return res.send("Erro ao acessar o banco de Dados")
        }

        return res.redirect('/');
    });
});

server.listen(3000);
