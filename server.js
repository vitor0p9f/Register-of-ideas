const express = require ('express');
const server = express();
const nunjucks = require('nunjucks');

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/718/718870.svg",
        title: "Curso de hacking",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non id",
        url: "https://www.hackersecurity.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2934/2934905.svg",
        title: "Ir à praia",
        category: "Diversão",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non id",
        url: "https://www.hackersecurity.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2996/2996991.svg",
        title: "Matricular-se na academia",
        category: "Exercício",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non id",
        url: "https://www.hackersecurity.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/3224/3224955.svg",
        title: "Comprar sorvete",
        category: "Casual",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non id",
        url: "https://www.hackersecurity.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/3181/3181807.svg",
        title: "Comprar remédio",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non id",
        url: "https://www.hackersecurity.com"
    },
]

server.use(express.static('public'));

nunjucks.configure('views',{
    express: server,
    noCache: true,
})

server.get("/",(req,res)=>{
    let lastIdeas = [];
    const reversedIdeas = [...ideas].reverse();

    for(let idea of reversedIdeas){
        if(lastIdeas.length < 2){
            lastIdeas.push(idea);
        }
    }

    res.render('index.html',{ ideas: lastIdeas });
})

server.get("/ideas",(req,res)=>{
    const reversedIdeas = [...ideas].reverse();

    res.render('ideas.html',{ ideas: reversedIdeas });
})

server.listen(3000);
