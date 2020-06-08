//criando banco de dados com sqlite


// importar a dependencia do sqlite 3
//verbose avisa que queremos ver mensagens no terminal
const sqlite3 = require("sqlite3").verbose()

//iniciar o objeto que irá fazer operações no banco de dados
//./ é pasta raiz
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// utilizar o objeto de banco de dados, para nossas operações


/*db.serialize(()=> {
    //Com comandos sql vou :

    //1) Criar uma tabela 
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT, 
            state TEXT, 
            city TEXT, 
            items TEXT
        );
    `)


    //2) Inserir dados 
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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim America",
        "Numero 260",
        "Santa Cataria",
        "Rio do Sul",
        "Resíduos Eletrônicos e Lâmpadas"
    ]    

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com Sucesso !")
        console.log(this)
        
    }
    db.run(query, values, afterInsertData)*/  
    // o argumento 3 nao é afterInsertData() para nao rodar de uma vez, só depois de tudo  


    ///3) Consultar dados da tabela
    /*db.all(`SELECT name FROM places`, function (err, rows) {
        if(err){
            return console.log(err)
        }
        console.log("Aqui estão seus registros")
        console.log(rows)
    })
    /*


    //4) Deletar um dado da tabela, por motivos de aprendizado

    /*db.run(`DELETE FROM places WHERE id = ? `, [1], function(err){
        if(err){
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")

    })// id = 1, só temos um item na tabela

    
})*/


