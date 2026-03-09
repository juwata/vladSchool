import { atualizarAluno, exibirAlunoPorMatricula } from "./code/aluno/ConecctionAluno.js";
import Aluno from "./code/model/Aluno.js";

// limpampando o localStorage caso volte para a página de login
localStorage.clear();

// seleciona o forms em que é necessario para o cadastro 
const form = document.querySelector('form');


form.addEventListener('submit', async (event) => {

    // não deixa a pagina recarregar
    event.preventDefault();

    // objeto para pegar os dados do input
    const dados = new FormData(form);

    // pegando atraves do atributo name a senha e o email dos inputs
    const matricula = dados.get('iReg');
    const email = dados.get('iEmail'); 
    const senha = dados.get('iPasswd');

    // pegando aluno através da matricula digitada
    const aluno = await exibirAlunoPorMatricula(matricula)
    console.log(aluno[0].matricula)

    // verificando se esse aluno ja tem email e senha
    if ((aluno[0].email == "undefined" || aluno[0].email == null) && (aluno[0].senha == "undefined" || aluno[0].senha == null)){

        aluno[0].setEmail(email)
        aluno[0].setSenha(senha)

        atualizarAluno(aluno[0].id,aluno[0])

        window.location.href = 'login.html';
    } else {
        alert("Matricula já cadastrada no sistema!");
        
    }


})