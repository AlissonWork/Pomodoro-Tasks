const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const areaDeTexto = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const btnRemoverConcluidos = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

// Estado da aplicação
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // Deve mostrar um objeto se carregado corretamente
let tarefaSelecionada = null;
let liTarefaSelecionada = null;


// Persiste tarefas no localStorage
function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Cria elemento de tarefa (li)
function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    // Ícone de status
    const svg = document.createElement('svg');
    svg.classList.add('app__section-task-icon-status');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    // Texto da tarefa
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao;

    // Botão de edição
    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        novaTarefa = prompt('Qual a nova tarefa?');
        if (novaTarefa) {
            paragrafo.textContent = novaTarefa;
            tarefa.descricao = novaTarefa;
            atualizarTarefas();
            toastr.success('Tarefa atualizada!')
        } else {
            toastr.warning('Tarefa não atualizada!');
            return;
        }
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.src = './imagens/edit.png';

    botao.append(imagemBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    // Estado concluída
    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', true);
    } else {
        li.onclick = () => {
            // Alterna tarefa ativa
            document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active');
            })

            if (tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return
            }

            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            li.classList.add('app__section-task-list-item-active');
        }
    }

    return li;
}

// Toggle form nova tarefa
btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
})

// Cria tarefa nova
formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();

    tarefa = {
        descricao: areaDeTexto.value
    }

    tarefas.push(tarefa);
    toastr.success('Tarefa adicionada!')
    ulTarefas.append(criarElementoTarefa(tarefa));
    atualizarTarefas();
    areaDeTexto.value = '';
    formAdicionarTarefa.classList.add('hidden');
})

btnCancelar.addEventListener('click', () => {
    limparFormulario();
})

// Renderiza tarefas salvas
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

// Limpa formulário
function limparFormulario() {
    areaDeTexto.value = '';
    formAdicionarTarefa.classList.add('hidden');
}

// Marca tarefa como concluída ao fim de um ciclo de foco
document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', true);
        tarefaSelecionada.completa = true;
        atualizarTarefas();
    }
})

// Remove tarefas (todas ou somente concluídas)
const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });

    tarefas = somenteCompletas ? tarefas.filter(tarefas => !tarefas.completa) : [];
    atualizarTarefas();
}

btnRemoverConcluidos.onclick = () => removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);