import { exibirAlunoPorIndex } from "../code/aluno/ConecctionAluno.js";
import AlunoAdm from "../code/model/AlunoAdm.js";

// pegando o id do adm
const idSalvo = localStorage.getItem('admId');
const idDisciplina = localStorage.getItem('idDisciplina');

// verificando se o id realemte esta lá e voltando para a pagina de login se não estiver e se a disciplina foi selecionada
if (!idSalvo || idSalvo === "undefined") {
    console.error("ID não encontrado! Voltando para o login...");
    window.location.href = "../login.html";
} else if (!idDisciplina || idDisciplina === "undefined"){
    window.location.href = "discipline.html";
}

// colocando o nome do aluno na pagina
const nomePagina = document.querySelector('.asideHeader div p')
nomePagina.innerText = localStorage.getItem('nome')

let indice = 0

let dicionarioAlunos = {}
let listaAlunos = []
let listaTurmas = []

async function carregarDados() {
    do {
        // pegando 10 alunos
        listaAlunos = await exibirAlunoPorIndex(indice)
    
        // rodando cada aluno no for
        for (const aluno of listaAlunos) {
    
            if (!listaTurmas.includes(aluno.serie)){
                listaTurmas.push(aluno.serie)
            }
    
            // criando um ama chave como o nome do aluno e o objeto dele
            dicionarioAlunos[aluno.nome] = new AlunoAdm(aluno.serie)
            
            // rodando cada nota para pegar apenas da matéria certa
            for (const nota of aluno.notas){
    
                // verificando se a tal nota é da disciplina certa
                if (nota.idDisciplina == idDisciplina){
    
                    // pegando a primeira nota
                    if (nota.periodo === "2026.1"){
    
                        dicionarioAlunos[aluno.nome].setNota1(nota.nota)
        
                    // pegando a segunda nota
                    } else if (nota.periodo === "2026.2"){
        
                        dicionarioAlunos[aluno.nome].setNota2(nota.nota)
                    }
                }
            }  
            
        }
        indice++
    
    } while (listaAlunos.length==10)

    preencherFiltroTurmas();
    renderizarTabela("todos");    
}

function renderizarTabela(turmaFiltrada, nomeFiltrado = ""){
    // puxando a tabela em que as notas serão colocadas
    const tabela = document.getElementsByTagName('table');

    while (tabela[0].rows.length > 1) {
        tabela[0].deleteRow(1);
    }

    // rodando cada objeto do dicionario
    for (const [nome,infos] of Object.entries(dicionarioAlunos)){
        const turmaDoAluno = infos.getTurma();

        const passouTurma = (turmaFiltrada === "todos" || turmaFiltrada === "Turmas" || turmaDoAluno === turmaFiltrada);
        const passouNome = nome.toLowerCase().includes(nomeFiltrado.toLowerCase());

        if (!passouTurma || !passouNome) {
            continue;
        }

        // criando a linha que sera adicionada
        const linha = document.createElement('tr')

        // adicionando cada elemento daquela linha
        const tdNome = document.createElement('td');
        const tdTurma = document.createElement('td');
        const tdNota1 = document.createElement('td');
        const tdNota2 = document.createElement('td');
        const tdMedia = document.createElement('td');
        const tdSituacao = document.createElement('td');

        tdNome.textContent = nome
        tdTurma.textContent = infos.getTurma()

        if (infos.getNota1() == undefined && infos.getNota2() == undefined){

            // se as notas forem nulas retorna dessa forma
            tdNota1.textContent = '--';
            tdNota2.textContent = '--';
            tdMedia.textContent = '--';
            tdSituacao.textContent = 'Em andamento';
            
        } else {

            console.log(infos.getNota1(), infos.getNota2())
            // colocando os dados caso a segundo nota seja nula        
            if (infos.getNota2() == null) {

                tdNota1.textContent = infos.getNota1().toFixed(1);

                tdNota2.textContent = '--'; 

                tdMedia.textContent = infos.getNota1().toFixed(1)

                tdSituacao.textContent = 'Em andamento'

            // colocando os dados caso a primeira nota seja nula        
            } else if (infos.getNota1() == null) {

                tdNota2.textContent = infos.getNota2().toFixed(1)

                tdNota1.textContent = '--'; 

                tdMedia.textContent = infos.getNota2().toFixed(1)

                tdSituacao.textContent = 'Em andamento';

            // colocando todos os dados quando a estiver tudo completo        
            } else {

                tdNota1.textContent = infos.getNota1().toFixed(1);

                tdNota2.textContent = infos.getNota2().toFixed(1); 

                tdMedia.textContent = ((infos.getNota1() + infos.getNota2())/2).toFixed(1); 

                if (tdMedia.textContent >= 7) {
                    tdSituacao.textContent = 'Aprovado'
                } else {
                    tdSituacao.textContent = 'Reprovado';
                }
            }

        }

        // adicionando todas as colunas na linha da tabela
        linha.appendChild(tdNome);
        linha.appendChild(tdTurma);
        linha.appendChild(tdNota1);
        linha.appendChild(tdNota2);
        linha.appendChild(tdMedia);
        linha.appendChild(tdSituacao);

        // adicionand aquela linha na tabela
        tabela[0].appendChild(linha);
    }
}

function preencherFiltroTurmas(){

    const inputNome = document.getElementById('nome do aluno');
    const opcoesTurmas = document.getElementById('sTurmas')

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

    inputNome.addEventListener('input', () => {
        renderizarTabela(opcoesTurmas.value, inputNome.value);
    });

    opcoesTurmas.addEventListener('change', (event) => {
        const turmaSelecionada = event.target.value;
        renderizarTabela(turmaSelecionada, inputNome.value);
    });
}

carregarDados()


