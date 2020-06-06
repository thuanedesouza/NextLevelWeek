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

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
        //quando é escolhida o estado e encontrada as cidades habilitamos as opções de cidade
        citySelect.disabled = false
    })

}


document
    .querySelector("select[name = uf]")
    .addEventListener("change", getCities) 