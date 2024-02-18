// function criarModal() {
//   // Cria os elementos do modal
//   var fade = document.createElement('div');
//   fade.id = 'fade';
//   fade.classList.add('esconder');

//   var modal = document.createElement('div');
//   modal.id = 'modal';
//   modal.classList.add('esconder');

//   var modalHeader = document.createElement('div');
//   modalHeader.classList.add('modal-header');

//   var titulo = document.createElement('h1');
//   titulo.textContent = 'Atualização do Fokus';

//   modalHeader.appendChild(titulo);

//   var modalBody = document.createElement('div');
//   modalBody.classList.add('modal-body');

//   var paragrafo1 = document.createElement('p');
//   paragrafo1.textContent = 'Você está visualizando a versão atualizada do Pomodoro App.';

//   var paragrafo2 = document.createElement('p');
//   paragrafo2.textContent = 'Gostaria de informar que foram feitas algumas melhorias desde a última atualização, incluindo adições de funcionalidades e ajustes na interface do usuário.';

//   var paragrafo3 = document.createElement('p');
//   paragrafo3.textContent = 'Se você acessou este link anteriormente ou viu uma publicação no LinkedIn, saiba que estou sempre trabalhando para melhorar sua experiência com o Pomodoro App.';

//   var titulo2 = document.createElement('h2');
//   titulo2.textContent = 'Aqui estão algumas das atualizações recentes:';

//   var divCards = document.createElement('div');
//   divCards.classList.add('cards');

//   var card1 = document.createElement('p');
//   card1.classList.add('card');
//   card1.textContent = 'Adição da funcionalidade de adicionar e remover tarefas.';

//   var card2 = document.createElement('p');
//   card2.classList.add('card');
//   card2.textContent = 'Melhorias na interface para uma melhor experiência do usuário.';

//   var card3 = document.createElement('p');
//   card3.classList.add('card');
//   card3.textContent = 'Correções de bugs e melhorias de desempenho.';

//   divCards.appendChild(card1);
//   divCards.appendChild(card2);
//   divCards.appendChild(card3);

//   var paragrafo4 = document.createElement('p');
//   paragrafo4.textContent = 'Espero que aproveite essas novidades! Se tiver alguma dúvida ou feedback, por favor, não hesite em me contatar.';

//   var paragrafo5 = document.createElement('p');
//   paragrafo5.textContent = 'Obrigado por usar o Pomodoro App!';

//   var fecharModal = document.createElement('button');
//   fecharModal.id = 'close-modal';
//   fecharModal.textContent = 'Fechar';

//   modalBody.appendChild(paragrafo1);
//   modalBody.appendChild(paragrafo2);
//   modalBody.appendChild(paragrafo3);
//   modalBody.appendChild(titulo2);
//   modalBody.appendChild(divCards);
//   modalBody.appendChild(paragrafo4);
//   modalBody.appendChild(paragrafo5);

//   modal.appendChild(modalHeader);
//   modal.appendChild(modalBody);
//   modal.appendChild(fecharModal);

//   // Adiciona os elementos ao documento
//   document.body.appendChild(fade);
//   document.body.appendChild(modal);
// }

// Para chamar a função e exibir o modal
// criarModal();

// Verifica se o modal já foi aberto anteriormente

function criarModal() {
  var modalHTML = `
  <div id="fade" class="esconder"></div>
  <div id="modal" class="esconder">
      <div class="modal-header">
          <h1 id="modal-title">
              Atualização do Fokus
          </h1>
      </div>
      <div class="modal-body">
          <p id="modal-paragraph-1">Você está visualizando a versão atualizada do Fokus app.</p>
          <p id="modal-paragraph-2">Gostaria de informar que foram feitas algumas melhorias desde a última publicação, incluindo adições de funcionalidades e ajustes na interface do usuário.</p>
          <p id="modal-paragraph-3">Se você acessou este link anteriormente ou viu uma publicação no LinkedIn, saiba que foi atualizado como parte do meu curso na Alura, que incluiu uma segunda etapa para expandir e aprimorar o projeto. Espero que as melhorias sejam úteis para você!</p>
          
  
          <h2 id="modal-subtitle">Aqui estão algumas das atualizações recentes:</h2>
  
          <div class="cards">
              <p class="card">* Adição da funcionalidade de adicionar e remover tarefas.</p>
              <p class="card">* Melhorias na interface para uma melhor experiência do usuário.</p>
              <p class="card">* Correções de bugs e melhorias de desempenho.</p>
          </div>
  
          <p id="modal-paragraph-4">Espero que aproveite essas novidades! Se tiver alguma dúvida ou feedback, por favor, não hesite em me contatar.</p>
          <p id="modal-paragraph-5">Obrigado por usar o Pomodoro App!</p>
      </div>
      <button id="close-modal">Fechar</button>
  </div>
  
  `;

  document.body.innerHTML += modalHTML;
}
// Para chamar a função e exibir o modal
criarModal();


const modalFoiAberto = localStorage.getItem('modalAberto');

// Se o modal ainda não tiver sido aberto, abre ele
if (!modalFoiAberto) {
  const botaoFecharModal = document.querySelector("#close-modal");
  const fundoEscuro = document.querySelector("#fade");
  const modal = document.querySelector("#modal");

  // Abre ou fecha o modal quando os botões ou o fundo escuro são clicados
  const toggleModal = () => {
    modal.classList.toggle("esconder");
    fundoEscuro.classList.toggle("esconder");
    // Define que o modal foi aberto para não abrir novamente
    localStorage.setItem('modalAberto', true);
  };

  botaoFecharModal.addEventListener("click", toggleModal);
  fundoEscuro.addEventListener("click", toggleModal);

  // Abre o modal
  toggleModal();
}


