import {  exibirAlunoPorId } from '../code/aluno/ConecctionAluno.js';
import { exibirProfessorPorId } from '../code/professor/ConecctionProfessor.js'

// pegando o id do aluno que foi armazenado no local storage no forms.js
const acessoAluno = localStorage.getItem('alunoId')
const alunoSelecinado = localStorage.getItem('alunoSelecionado')
const acessoProfessor =  Number(localStorage.getItem('professorId'))
const acessoAdm = localStorage.getItem('admId')

const adm =  !acessoAdm || acessoAdm === "undefined"
const professor = !acessoProfessor || acessoProfessor === "undefined"

let aluno = {}

// verificando se o id realemte esta lá e voltando para a pagina de login se não estiver 
if (!(!acessoAluno || acessoAluno === "undefined") || !adm || !professor) {
    if (!adm || !professor){
        aluno = await exibirAlunoPorId(alunoSelecinado);
    } else if (!(!acessoAluno || acessoAluno === "undefined")){
        aluno = await exibirAlunoPorId(acessoAluno);
    }
} else {
    console.error("ID não encontrado! Voltando para o login...");
    window.location.href = "../login.html";
}

// colocando o nome do aluno na página
const nomePagina = document.querySelector('.asideHeader div p')
nomePagina.innerText = localStorage.getItem('nome')

// pegando o local onde será colocado as observações
const main= document.getElementsByTagName('main');


// rodando cada das observações do aluno
for (const observacao of aluno[0].observacoes){

    // criando a section que representa a obsevação
    const section = document.createElement('section')
    section.classList = 'openPopupExcEdit'

    // criando a div que fica o nome do professor
    const div = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.textContent = 'PROFESSOR'

    const pNome = document.createElement('p')

    // pegando os dados do professor para colocar no p dentro da div
    const dadosProfessor = await exibirProfessorPorId(observacao.idProfessor)
    console.log(dadosProfessor)
    if (dadosProfessor.length === 0) {
        pNome.textContent = 'Nicola Vlad'
    } else {
        pNome.textContent = dadosProfessor[0].nome
    }

    // adicionando o h2 e p com o nome na div
    div.appendChild(h2)
    div.appendChild(pNome)

    // criando o elemento que fica a obsevação e colocando a obsejação
    const pObservacao = document.createElement('p')
    pObservacao.textContent = observacao.observacao

    // adicionando a observação e o nome do professor na section
    section.appendChild(div)
    section.appendChild(pObservacao)

    console.log(section)
    // adicioanando a tal observação
    main[0].appendChild(section)
}