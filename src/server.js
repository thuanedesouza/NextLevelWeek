//arquivo a ser executado pelo node, criação do servidor

    const express = require ("express")//puxando do node mudules pra ca
    const server = express() /* Objeto de servidor usado para ligar o servidor */

    //pegar o banco de dados
    const db = require ("./database/db.js")

    //configurar pasta publica
    server.use(express.static("public"))

    //habilitar o uso o req bodyna nossa aplicação
    server.use(express.urlencoded({extended: true}))


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
        
        //req.query: Query strings da nossa url
        console.log(req.query)


        //Trocando agora q temos nunjucks    res.sendFile(__dirname + "/views/create-point.html")
        return res.render("create-point.html")
    })
    
    server.post("/savepoint", (req,res)=>{
        //req body: O corpo do nosso formulário
        //console.log(req.body)

        //inserir dados no banco de dados
        const query = `  
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);

        ) VALUES ();

    ` 
        const values =  [
            req.body.image,
            req.body.name,
            req.body.adress,
            req.body.adress2,
            req.body.state,
            req.body.city,
            req.body.items
        ]

        function afterInsertData(err){
            if(err){
                console.log(err)
                return  res.send("Erro no Cadastro!", {saved: false})
            }
            console.log("Cadastrado com Sucesso !")
            console.log(this)
            return res.render("create-point.html", { saved: true})
        }
        db.run(query, values, afterInsertData)
        
    })


    server.get("/search", (req, res) => {
        const search = req.query.search
        
        if(search == ""){
            return res.render("search-results.html", {total: 0})
        }


        //pegar os dados do banco de dados, copiando o metodo consulta do bd

        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
            if(err){
                return console.log(err)
            }
                    //teste:
                    //console.log("Aqui estão seus registros")
                    //console.log(rows)
               
                const total = rows.length
                    //mostrar a página html com os dados do banco de dados 
                    return res.render("search-results.html", {places: rows, total})
        })

        
    })
        
    //ligar servidor
    server.listen(3000)

     
