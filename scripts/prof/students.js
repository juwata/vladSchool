import { exibirAlunoPorIndex } from '../code/aluno/ConecctionAluno.js'

// pegando o id do professor que foi armazenado no local storage no forms.js
const idSalvo = Number(localStorage.getItem('professorId'));
const idAdm = localStorage.getItem('admId')

// verificando se o id realemte esta lá e voltando para a pagina de login se não estiver 
if ((!idSalvo || idSalvo === "undefined") && (!idAdm || idAdm === "undefined")) {
    console.error("ID não encontrado! Voltando para o login...");
    window.location.href = "../login.html";
} 

const nomePagina = document.querySelector('.asideHeader div p')
nomePagina.innerText = localStorage.getItem('nome') 

const form = document.createElement('form')
form.innerHTML= '<label for="iToggle" class="labelToggle"> <img src="../../assets/icons/menu.svg"></label><input type="text" id="nome do aluno" placeholder="nome do aluno"><select id="sTurmas"></select>'

async function retornarLista(){
    let indice =0
    let listaAlunosTemp= []
    let listaAlunos = []

    do {
        listaAlunosTemp = await exibirAlunoPorIndex(indice)

        for (const aluno of listaAlunosTemp) {
            listaAlunos.push(aluno)
        }
        indice++

    } while (listaAlunosTemp.length==10)
    return listaAlunos
}
function adicionarForms(listaAlunos){
    const main = document.getElementsByTagName('main');
    let listaTurmas = []

    for (const aluno of listaAlunos){
        if (!listaTurmas.includes(aluno.serie)){
            listaTurmas.push(aluno.serie)
        }
    }

    const opcoesTurmas = form.querySelector('#sTurmas')

    opcoesTurmas.innerHTML = '<option selected hidden>Turmas</option><option value="todos">Todas as Turmas</option>'

    listaTurmas.sort((a, b) => {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

    for (const turma of listaTurmas){
    
        const opcao = document.createElement('option')
    
        opcao.value = turma
    
        opcao.textContent = turma
    
        opcoesTurmas.appendChild(opcao)
    }
    main[0].appendChild(form)
}

function filtrar(listaAlunos){
    const form = document.getElementsByTagName('form')
    const inputNome = document.getElementById('nome do aluno');
    const opcoesTurmas = document.getElementById('sTurmas')


    inputNome.addEventListener('input', (e) => {
        renderizarAlunos(listaAlunos, opcoesTurmas.value, inputNome.value);
    });
    form[0].addEventListener('submit', (e) => {
        
            e.preventDefault(); 
    });
    // Evento de trocar a turma
    opcoesTurmas.addEventListener('change', (e) => {

        renderizarAlunos(listaAlunos, opcoesTurmas.value, inputNome.value);
    });
}
    

function renderizarAlunos(listaAlunos,turmaSelecionada = "todos", nomePesquisado = "") {

    const main = document.getElementsByTagName('main');

    const listaFiltrada = listaAlunos.filter(aluno => {
        const serieAluno = aluno.dados_aluno?.serie || aluno.serie || "";
        
        const matchTurma = turmaSelecionada === "todos" || 
                           turmaSelecionada === "Turmas" || 
                           serieAluno === turmaSelecionada;

        const matchNome = aluno.nome.toLowerCase().includes(nomePesquisado.toLowerCase().trim());

        return matchTurma && matchNome;
    });

    const sectionsAntigas = main[0].querySelectorAll('section');
    if (sectionsAntigas != null ){
        sectionsAntigas.forEach(s => s.remove());

    }
    
        for (const aluno of listaFiltrada) {
            const section = document.createElement('section')
            section.dataset.idAluno = aluno.id

            const div = document.createElement('div')

            const pNome = document.createElement('p')
            const pTurma = document.createElement('p')
            pTurma.classList = 'turmaAluno'

            pNome.textContent = aluno.nome
            pTurma.textContent = aluno.serie

            div.appendChild(pNome)
            div.appendChild(pTurma)

            const img = document.createElement('img')
            img.src = '../../assets/images/setaRedirecionar.png'
            img.alt = 'redirecionar'

            section.appendChild(div)
            section.appendChild(img)
            
            main[0].appendChild(section)
        }
}



async function iniciar() {
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML = ''; 
    
    const listaAlunos = await retornarLista();
    adicionarForms(listaAlunos);
    renderizarAlunos(listaAlunos);
    filtrar(listaAlunos)
    
}

iniciar() 
const nomeLimpo = window.location.pathname.split("/").pop().replace(".html", "");
const main = document.querySelector('main');

main.addEventListener('click', (e) => {
    // Verifica se o clique foi em uma section ou dentro de uma
    const section = e.target.closest('section');
    
    if (section) {
        // Opcional: Salvar o ID do aluno que definimos no dataset.id
        const alunoId = section.dataset.idAluno;
        if (alunoId) {
            localStorage.setItem('alunoSelecionado', alunoId);
        }
        const nomePagina = window.location.pathname.split("/").pop().replace(".html", "");
        if (nomePagina=="studentsObservations"){
            window.location.href = 'observations.html'; 

        } else if(nomePagina=="studentsNotas"){
            window.location.href = 'grade.html'; 
            
        }
    }
});