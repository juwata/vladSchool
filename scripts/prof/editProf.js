import { atualizarProfessor, exibirProfessorPorId } from "../code/professor/ConecctionProfessor.js"

const discionarioDiscplinaInverso = {
    "Teoria da Conspiração":1,
    "Programação Orientada a Apostas":2,
    "Lavagem de Dinheiro":3,
    "Matemática":4,
    "Português":5,
    "História":6,
    "Ciêcias":7,
    "Informática":8
}

const discionarioDiscplina = {
    1:"Teoria da Conspiração",
    2:"Programação Orientada a Apostas",
    3:"Lavagem de Dinheiro",
    4:"Matemática",
    5:"Português",
    6:"História",
    7:"Ciêcias",
    8:"Informática"
}

export async function carregarInfos(){
    let idProfessorMod = Number(localStorage.getItem('professorAlterar'))
    const professorModificar = await exibirProfessorPorId(idProfessorMod)

    const nomeProfessor = document.getElementById('iNameEdit')
    const email = document.getElementById('iEmailEdit')
    const senha = document.getElementById('iPasswdEdit')
    const materias = document.getElementById('iSubjEdit')
    
    let discLeciNum = []
    for (const materia of professorModificar[0].disciplinasLecionadas){
        discLeciNum.push(discionarioDiscplina[materia])
    }

    nomeProfessor.value = professorModificar[0].nome 
    email.value = professorModificar[0].email 
    senha.value = professorModificar[0].senha
    materias.value = discLeciNum
}


async function editarProfessor(evento){

    evento.preventDefault();

    let idProfessorMod = Number(localStorage.getItem('professorAlterar'))
    const professorModificar = await exibirProfessorPorId(idProfessorMod)
    const id = professorModificar[0].id

    const dadosForm = new FormData(evento.target);
        
    const nomeProfessor = dadosForm.get('iName')
    const email = dadosForm.get('iEmail')
    const senha = dadosForm.get('iPasswd')
    const materias = dadosForm.getAll('iMaterias')

    let disciplinasLecionadas = []
    for (const materia of materias){
        disciplinasLecionadas.push(discionarioDiscplinaInverso[materia])
    }

    let professorAlterar = professorModificar[0]

    let condicao = true

    if (professorModificar[0].nome !== nomeProfessor){
        professorAlterar.nome = nomeProfessor
        condicao = false
    }
    if (professorModificar[0].email !== email){
        professorAlterar.email = email
        condicao = false
    }
    if (professorModificar[0].senha !== senha){
        professorAlterar.senha = senha
        condicao = false
    }
    if (professorModificar[0].disciplinasLecionadas !== disciplinasLecionadas){
        professorAlterar.disciplinasLecionadas = disciplinasLecionadas 
        condicao = false
    }

    if (condicao){
        alert("Altere algum campo")

        window.location.href = 'prof.html'; 
    }
    

    const resposta = await atualizarProfessor(id,professorAlterar)

    if (resposta.success){
        alert("Professor alterada com sucesso!")
        window.location.href = 'prof.html'; 

    }else {
        alert("Erro ao alterar a professor!")
    }
}

const formAdcionar = document.querySelectorAll("#editProf form")

formAdcionar[0].addEventListener('submit',(e) => {
    editarProfessor(e)
})

