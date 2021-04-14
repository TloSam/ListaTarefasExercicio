//referenciar o input
let input = document.querySelector('input[name=tarefa]');
let botao = document.querySelector('#botao');
let lista = document.querySelector('#lista');
let tarefas = JSON.parse(localStorage.getItem('tare')) || [];
let card = document.querySelector('.card');

botao.onclick = function () {
    if (input.value !== "") {
        salvarDados();
        let a = input.value;
        tarefas.push(a);
        lista.innerHTML = "";
        rende();
        input.value = "";
        removerSpans();
        salvarDados();
    }
    else {
        removerSpans();

        let span = document.createElement('span');

        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Insira uma tarefa!');

        span.appendChild(msg);
        card.appendChild(span);

    }

}

function deletarTarefa(tar) {

    tarefas.splice(tarefas.indexOf(tar.textContent), 1);
    rende();
    salvarDados();


}
function rende() {
    lista.innerHTML = '';

    for (tarefa of tarefas) {
        //criar item da lista

        let itemlist = document.createElement('li');

        //adicionar classes no item da lista
        itemlist.setAttribute('class', 'list-group-item list-group-item-action');
        itemlist.onclick = function () {
            deletarTarefa(this);
        }
        //criar um texto
        let itemtexto = document.createTextNode(tarefa);

        //adicionar o texto noitem da lista
        itemlist.appendChild(itemtexto);

        //adicionar o item da lista na lista
        lista.appendChild(itemlist);
        removerSpans();
        salvarDados();
    }
}


function removerSpans() {
    let spans = document.querySelectorAll('span');
    for (let i = 0; i < spans.length; i++) {
        card.removeChild(spans[i]);
    }
}



rende();

function salvarDados() {
    localStorage.setItem('tare', JSON.stringify(tarefas));
}


//
document.addEventListener('keydown', function(e) {
    if(e.key == "Enter"){
      document.getElementById("botao").click();
    }
});

