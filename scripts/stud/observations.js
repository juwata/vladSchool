import {  exibirAlunoPorId } from '../code/aluno/ConecctionAluno.js';
import { exibirProfessorPorId } from '../code/professor/ConecctionProfessor.js'

// pegando o id do aluno que foi armazenado no local storage no forms.js
const idSalvo = localStorage.getItem('alunoId');

// verificando se o id realemte esta lá e voltando para a pagina de login se não estiver 
if (!idSalvo || idSalvo === "undefined") {
    console.error("ID não encontrado! Voltando para o login...");
    window.location.href = "../login.html";
} 

// puxando os dados do aluno
const aluno = await exibirAlunoPorId("69977d14fb66d10cde847db4");

// colocando o nome do aluno na página
const nomePagina = document.querySelector('.asideHeader div p')
nomePagina.innerText = localStorage.getItem('nome')

// pegando o local onde será colocado as observações
const main= document.getElementsByTagName('main');

// rodando cada das observações do aluno
for (const observacao of aluno[0].observacoes){

    // criando a section que representa a obsevação
    const section = document.createElement('section')

    // criando a div que fica o nome do professor
    const div = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.textContent = 'PROFESSOR'

    const pNome = document.createElement('p')

    // pegando os dados do professor para colocar no p dentro da div
    const dadosProfessor = await exibirProfessorPorId(observacao.idProfessor)
    pNome.textContent = dadosProfessor[0].nome

    // adicionando o h2 e p com o nome na div
    div.appendChild(h2)
    div.appendChild(pNome)

    // criando o elemento que fica a obsevação e colocando a obsejação
    const pObservacao = document.createElement('p')
    pObservacao.textContent = observacao.observacao

    // adicionando a observação e o nome do professor na section
    section.appendChild(div)
    section.appendChild(pObservacao)

    // adicioanando a tal observação
    main[0].appendChild(section)
}