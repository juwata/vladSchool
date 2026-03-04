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
    if (!professor){
        const professorAcessado = await exibirProfessorPorId(acessoProfessor)
        if (professorAcessado[0].idProfessor === observacao.idProfessor){
            section.onclick = function (){
                whatToDo.showModal()
                const obsSalvar = {
                    idProfessor: observacao.idProfessor,
                    data: observacao.data,
                    observacao: observacao.observacao
                };
                localStorage.setItem("obsModificar",JSON.stringify(obsSalvar))
            };
            section.style = 'cursor:pointer'
        } else {
            section.setAttribute('onclick', 'alert("Essa observação não é sua!")');

        }
    } else if (!adm) {
        section.onclick = function (){
                const obsSalvar = {
                    idProfessor: observacao.idProfessor,
                    data: observacao.data,
                    observacao: observacao.observacao
                };
                whatToDo.showModal()
                localStorage.setItem("obsModificar",JSON.stringify(obsSalvar))
            };
    }

    // criando a div que fica o nome do professor
    const div = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.textContent = 'PROFESSOR'

    const pNome = document.createElement('p')

    // pegando os dados do professor para colocar no p dentro da div
    const dadosProfessor = await exibirProfessorPorId(observacao.idProfessor)
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

    // adicioanando a tal observação
    main[0].appendChild(section)
}

const popUps = [document.getElementById('addObs'),document.getElementById('whatToDo'),document.getElementById('editObs'),document.getElementById('excludeObs')]

for (const popUp of popUps){
    popUp.addEventListener('click', (e) => {
        if (e.target === popUp) {
            popUp.close();
        }
    });
}
