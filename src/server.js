//arquivo a ser executado pelo node, criação do servidor

    const express = require ("express")
    const server = express() /* Objeto de servidor usado para ligar o servidor */

    //configurar pasta publica
    server.use(express.static("public"))


    //configurar caminhos da minha aplicação
    //pagina inicial
    //get será chamado atraves da barra, req: requisição,  res: resposta
    server.get("/", (req, res) => {
        res.sendFile(__dirname + "/views/index.html") //concatena com o diretório sozinho
    })

    server.get("/create-point", (req, res) => {
        res.sendFile(__dirname + "/views/create-point.html")
    })
    
    //ligar servidor
    server.listen(3000)

     
