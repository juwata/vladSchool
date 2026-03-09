
import Professor from "../code/model/Professor.js";
import { criarProfessor, listarProfessores } from "../code/professor/ConecctionProfessor.js";

const discionarioDiscplina = {
    "Teoria da Conspiração":1,
    "Programação Orientada a Apostas":2,
    "Lavagem de Dinheiro":3,
    "Matemática":4,
    "Português":5,
    "História":6,
    "Ciêcias":7,
    "Informática":8
}

async function addObs(evento){

    evento.preventDefault();

    const dadosForm = new FormData(evento.target);
        
    const nomeProfessor = dadosForm.get('iName')
    const email = dadosForm.get('iEmail')
    const senha = dadosForm.get('iPasswd')
    const materias = dadosForm.getAll('iMaterias')

    let disciplinasLecionadas = []
    for (const materia of materias){
        disciplinasLecionadas.push(discionarioDiscplina[materia])
    }

    const listaProfessores = await listarProfessores()
    const novoId = listaProfessores.length + 1;

    const nomeUsuario = nomeProfessor.toLowerCase().split(" ").join(".");
    const novoProfessor = new Professor(nomeProfessor,nomeUsuario,senha,'professor',email,null,novoId,disciplinasLecionadas)

    const resposta = await criarProfessor(novoProfessor)

    if (resposta.success){
        alert("Professor criado com sucesso!")
        window.location.href = `prof.html`; 

    }else {
        alert("Erro ao criar professor!")
    }
}

const formAdcionar = document.querySelectorAll("#addProf form")

formAdcionar[0].addEventListener('submit',(e) => {
    addObs(e)
})
