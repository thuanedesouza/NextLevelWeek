//arquivo a ser executado pelo node, criação do servidor

    const express = require ("express")
    const server = express() /* Objeto de servidor usado para ligar o servidor */

    //ligar servidor
    server.listen(3000)