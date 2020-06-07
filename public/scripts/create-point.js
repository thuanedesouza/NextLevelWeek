//Vamos popular as opções de Cidade e Estado do form usando uma API do IBGE

/*
Teste para verificar se antes de puxar as opções 
ele vai acompanhar realmente o evento que é a escolha 
do estado
document
    .querySelector("select[name = uf]")
    .addEventListener("change", () => {
        console.log("mudei")
    } ) 
*/

function populateUFs (){
    const ufSelect = document.querySelector("select[name = uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //vamos supor que é uma situação ideal e funcione sempre
    //caso contrário fariamos .catch
    .then( res => res.json() )
    .then( states => {
        for( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
//Sempre execute a função criada
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    //toda vez que for chamado esse state input tera o valor atualizado
    const stateinput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateinput.value = event.target.options[indexOfSelectedState].text 

    //Para que ele pegue a cidade dinâmicamente ${ufValue} onde ficava o valor da uf
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //iniciar com o conteúdo "Selecione a Cidade" sempre para que ele nao concatene com o resultado de uma busca anterior
    citySelect.innerHTML = "<option value> Selecione a Cidade </option>"
    citySelect.disabled = true //assim ele bloqueia e volta

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
       
        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        //quando é escolhida o estado e encontrada as cidades habilitamos as opções de cidade
        citySelect.disabled = false
    })

}


document
    .querySelector("select[name = uf]")
    .addEventListener("change", getCities) 

//Itens de Coleta

// pegar todos os li's

const itemsToColect = document.querySelectorAll(".items-grid li")
//".items-grid li" acaba pegando tudo dentro do li, podemos evitar isso com o css
    for (const item of itemsToColect){
    
    item.addEventListener("click", handleSelectedItem)
}
//variavel para tratar seleções
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []


function handleSelectedItem(event){

    const itemLi = event.target
    // adicionar e remover uma classe com js
    // toggle adiciona ou remove, em classList tem adicionar e remover tbm
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id
    
    //tratando seleção
    //verificar se tem itens selecionados e pegá-los

    const alreadySelected = selectedItems.findIndex( (item)=>{
        //mesmo sendo arrow function e podendo ser menor assim fica mais descritivo
        const itemFound = item == itemId
        return itemFound
    } ) 

    //se já tiver selecionado, tirar seleção
    if ( alreadySelected >= 0 ){/* está no array de selecionados? */
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //sendo diferente pode add, senao pode retirar
            return itemIsDifferent;// 
        })

        selectedItems = filteredItems

        selectedItems = filteredItems
    } 
    //se não estiver selecionado adicionar à seleção
    selectedItems.push(itemId)

    //atualizar o campo escondido com os itens selecionados
    
    /* passamos pra cima pq toda vez vai ser buscado isso aqui quando
     chamar a funçãodocument.querySelector("input[name=items]")*/

     collectedItems.value = selectedItems
}

