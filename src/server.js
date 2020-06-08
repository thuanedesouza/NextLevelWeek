//arquivo a ser executado pelo node, criação do servidor

    const express = require ("express")//puxando do node mudules pra ca
    const server = express() /* Objeto de servidor usado para ligar o servidor */

    //pegar o banco de dados
    const db = require ("./database/db.js")

    //configurar pasta publica
    server.use(express.static("public"))


    //utilizando template engine

    const nunjucks = require("nunjucks")
    nunjucks.configure("src/views", {
        express: server,
        noCache: true
    })

    //configurar caminhos da minha aplicação
    //pagina inicial
    //get será chamado atraves da barra, req: requisição,  res: resposta
   
    server.get("/", (req, res) => {
        //Trocando agora q temos nunjucks     res.sendFile(__dirname + "/views/index.html") //concatena com o diretório sozinho
        return res.render("index.html", {title: "Um Título"})
    })

    server.get("/create-point", (req, res) => {
        //Trocando agora q temos nunjucks    res.sendFile(__dirname + "/views/create-point.html")
        return res.render("create-point.html")
    })
    
    server.get("/search", (req, res) => {
        //Trocando agora q temos nunjucks    res.sendFile(__dirname + "/views/create-point.html")
        return res.render("search-results.html")
    })
        
    //ligar servidor
    server.listen(3000)

     
