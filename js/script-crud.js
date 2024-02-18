const btnAdicionarTarefa  = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const botaoCancelar = document.querySelector('.app__form-footer__button--cancel')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] //array vazio 
let tarefaSelecionada = null
let liTarefaSelecioanada = null
   
const limparFormulario = () => {
   textarea.value = '';
   formAdicionarTarefa.classList.add('hidden');
}

botaoCancelar.addEventListener('click' , limparFormulario);

function atualizarTarefa(){
   localStorage.setItem('tarefas', JSON.stringify(tarefas)) // Converte o array tarefas para uma string JSON e a armazena no localStorage com a chave 'tarefas'. Isso permite que as tarefas sejam persistidas localmente no navegador.
}

function criarElementoTarefa(tarefa) {
   const li = document.createElement('li')
   li.classList.add('app__section-task-list-item')

   const svg = document.createElement('svg')
   svg.innerHTML = `
      <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
         <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
         fill="#01080E"></path>
      </svg>
   `

   const paragrafo = document.createElement('p')
   paragrafo.classList.add('app__section-task-list-item-description')
   paragrafo.textContent = tarefa.descricao
 
   const botao = document.createElement('button')
   botao.classList.add('app_button-edit')

   botao.onclick = () => {
     // debugger
     const tarefaEditada = prompt("Qual é o novo nome da tarefa?")
     // console.log('Nova descrição da tarefa: ', tarefaEditada)
     if (tarefaEditada) {            
         paragrafo.textContent = tarefaEditada
         tarefa.descricao = tarefaEditada
         atualizarTarefa()
     }
   }
  
   const imagemBotao = document.createElement('img')
   imagemBotao.setAttribute('src', '/imagens/edit.png')
   botao.append(imagemBotao)

   li.append(svg)
   li.append(paragrafo)
   li.append(botao)

   if (tarefa.completa) {
      li.classList.add('app__section-task-list-item-complete')
      botao.setAttribute('disabled', 'disabled')
      
   } else {
      li.onclick = () =>{

         document.querySelectorAll('.app__section-task-list-item-active')
         .forEach(elemento => {  
            elemento.classList.remove('app__section-task-list-item-active')
         })
   
         if (tarefaSelecionada == tarefa ) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null
            liTarefaSelecioanada = null
            return
         }
   
         tarefaSelecionada = tarefa
         liTarefaSelecioanada = li 
         paragrafoDescricaoTarefa.textContent = tarefa.descricao
   
         li.classList.add('app__section-task-list-item-active')
      }
   }
   
   return li
}

btnAdicionarTarefa.addEventListener('click', () => {
   formAdicionarTarefa.classList.toggle('hidden');
})

formAdicionarTarefa.addEventListener('submit', (event) =>{  
    event.preventDefault();  //impede que a página seja recarregada quando o formulário é enviado.

    const tarefaCadastrada = {descricao: textarea.value};

    tarefas.push(tarefaCadastrada); //Adiciona o objeto tarefaCadastrada ao array tarefas. O array tarefas está sendo usado para manter o histórico de todas as tarefas cadastradas.

    const elementoTarefa = criarElementoTarefa(tarefaCadastrada)
    ulTarefas.append(elementoTarefa)

    atualizaTarefa()

   // queremos limpar a textarea e esconder o formulário
   textarea.value = ''
   formAdicionarTarefa.classList.add('hidden')

})

tarefas.forEach(tarefa => {
   const elementoTarefa = criarElementoTarefa(tarefa)
   ulTarefas.append(elementoTarefa)
});

document.addEventListener('FocoFinalizado', () => {
   if (tarefaSelecionada && liTarefaSelecionada) {
       liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
       liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
       liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
       tarefaSelecionada.completa = true
       atualizarTarefas()
   }
})


const removerTarefas  = (somenteCompletas) => {
   // const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
   let seletor =  ".app__section-task-list-item"
   if (somenteCompletas) {
       seletor = ".app__section-task-list-item-complete"
   }
   document.querySelectorAll(seletor).forEach(elemento => {
       elemento.remove()
   })
   tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
   atualizarTarefas()
}

btnRemoverConcluidas.onclick = () => removerTarefas(true)
btnRemoverTodas.onclick = () => removerTarefas(false)
