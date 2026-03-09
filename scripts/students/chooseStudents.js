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
function adicionarFiltrosTurma(listaAlunos){
    let listaTurmas = []

    for (const aluno of listaAlunos){
        if (!listaTurmas.includes(aluno.serie)){
            listaTurmas.push(aluno.serie)
        }
    }

    const opcoesTurmas = document.getElementById('sTurmas')
    const opcoesTurmasPopUp = document.getElementById('turmas')

    opcoesTurmas.innerHTML = '<option selected hidden>Turmas</option><option value="todos">Todas as Turmas</option>'
    if (!(!idAdm || idAdm === "undefined")){
        opcoesTurmasPopUp.innerHTML = ''
    }
    

    listaTurmas.sort((a, b) => {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

    for (const turma of listaTurmas){
    
        if (!(!idAdm || idAdm === "undefined")){
            const opcaoAdd = document.createElement('option')
            opcaoAdd.value = turma
            opcaoAdd.textContent = turma
            opcoesTurmasPopUp.appendChild(opcaoAdd)
        }
        const opcaoFiltro = document.createElement('option')
        
    
        opcaoFiltro.value = turma
        

        opcaoFiltro.textContent = turma
        
    
        opcoesTurmas.appendChild(opcaoFiltro)
        
    }
}

function filtrar(listaAlunos){
    const form = document.getElementsByTagName('header')
    
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

    const table = document.getElementsByClassName('table');

    const listaFiltrada = listaAlunos.filter(aluno => {
        const serieAluno = aluno.dados_aluno?.serie || aluno.serie || "";
        
        const matchTurma = turmaSelecionada === "todos" || 
                           turmaSelecionada === "Turmas" || 
                           serieAluno === turmaSelecionada;

        const matchNome = aluno.nome.toLowerCase().includes(nomePesquisado.toLowerCase().trim());

        return matchTurma && matchNome;
    });

    const sectionsAntigas = table[0].querySelectorAll('div');
    if (sectionsAntigas != null ){
        sectionsAntigas.forEach(s => s.remove());

    }
    
        for (const aluno of listaFiltrada) {
            const section = document.createElement('div')
            section.dataset.idAluno = aluno.id

            const div = document.createElement('div')

            const h2Nome = document.createElement('h2')
            const pTurma = document.createElement('p')

            h2Nome.textContent = aluno.nome
            pTurma.textContent = aluno.serie

            div.appendChild(h2Nome)
            div.appendChild(pTurma)

            const img = document.createElement('img')
            img.src = '../../assets/icons/arrow.svg'
            img.alt = 'redirecionar'

            section.appendChild(div)
            section.appendChild(img)
            
            table[0].appendChild(section)
        }
}



async function iniciar() {
    
    const listaAlunos = await retornarLista();
    adicionarFiltrosTurma(listaAlunos);
    renderizarAlunos(listaAlunos);
    filtrar(listaAlunos)
    
}

iniciar() 
const main = document.querySelector('main section');

main.addEventListener('click', (e) => {
    // Verifica se o clique foi em uma section ou dentro de uma
    const section = e.target.closest('div[data-id-aluno]');
    
    if (section) {
        // Opcional: Salvar o ID do aluno que definimos no dataset.id
        const alunoId = section.dataset.idAluno;
        if (alunoId) {
            localStorage.setItem('alunoSelecionado', alunoId);
        }
        const nomePagina = window.location.pathname.split("/").pop().replace(".html", "");
        if (nomePagina=="chooseObservations"){
            window.location.href = 'observations.html'; 

        } else if(nomePagina=="chooseNotas"){
            window.location.href = 'grade.html'; 
            
        }
    }
});

console.log(idAdm )
if (!(!idAdm || idAdm === "undefined")){
    const popUp = document.getElementById('addStud')


    popUp.addEventListener('click', (e) => {
        const rect = popUp.getBoundingClientRect();
                
            const clicouFora = (
                    e.clientX < rect.left ||
                    e.clientX > rect.right ||
                    e.clientY < rect.top ||
                    e.clientY > rect.bottom
            );
    
            if (clicouFora) {
                    popUp.close();
            }
    })
    
}
