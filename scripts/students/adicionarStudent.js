import { criarAluno } from "../code/aluno/ConecctionAluno.js";
import Aluno from "../code/model/Aluno.js";

async function addObs(evento){

    evento.preventDefault();

    const nomePagina = window.location.pathname.split("/").pop().replace(".html", "");
    
    const dadosForm = new FormData(evento.target);
        
    const nomeAluno = dadosForm.get('nome')
    const matricula = dadosForm.get('matricula')
    const turma = dadosForm.get('turma')

    const nomeUsuario = nomeAluno.toLowerCase().split(" ").join(".");


    const alunoAdicionado = new Aluno(nomeAluno,nomeUsuario,null,'aluno',null,null,matricula,turma,'Em Andamento',[],[])


    const resposta = await criarAluno(alunoAdicionado)

    if (resposta.success){
        alert("Aluno criado com sucesso!")
        window.location.href = `${nomePagina}.html`; 

    }else {
        alert("Erro ao criar aluno!")
    }
}

const formAdcionar = document.querySelectorAll("#addStud form")

formAdcionar[0].addEventListener('submit',(e) => {
    addObs(e)
})
