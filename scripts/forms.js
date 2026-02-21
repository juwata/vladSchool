import {  logarAluno, exibirAlunoPorEmail } from './code/aluno/ConecctionAluno.js';
import {  logarProfessor, exibirProfessorPorEmail } from './code/professor/ConecctionProfessor.js';
import {  logarAdm, exibirAdmPorEmail } from './code/adm/ConecctionAdm.js';

// limpampando o localStorage caso volte para a página de login
localStorage.clear();

// seleciona o forms em que é necessario para o login 
const form = document.querySelector('form');

// chama a função caso clique no botão de avançar
form.addEventListener('submit', async (event) => {

    // não deixa a pagina recarregar
    event.preventDefault();

    // objeto para pegar os dados do input
    const dados = new FormData(form);

    // pegando atraves do atributo name a senha e o email dos inputs
    const email = dados.get('iEmail'); 
    const senha = dados.get('iPasswd');

    // chamando as duas funções de login para qual vai ser o tipo
    const loginAluno = await logarAluno(email,senha)
    const loginProfessor = await logarProfessor(email,senha)
    const loginAdm = await logarAdm(email,senha)
    console.log(loginAdm)
    
    // verifica se o login como o aluno da certo
    if (loginAluno) { 

        // se der certo pega os dados dele através do email
        const dadosAluno = await exibirAlunoPorEmail(email)

        // seta no localStorage algumas variaveis que serão útil para chamar funções e na pagina de welcome
        localStorage.setItem('alunoId', dadosAluno[0].id);
        localStorage.setItem('nome', dadosAluno[0].nome);
        localStorage.setItem('tipo', 'aluno');

        // redireciona para a página de welcome
        window.location.href = 'welcome.html'; 

    } else if (loginProfessor) {

        // se der certo pega os dados dele através do email
        const professor = await exibirProfessorPorEmail(email)

        // seta no localStorage algumas variaveis que serão útil para chamar funções e na pagina de welcome
        localStorage.setItem('professorId',professor[0].idProfessor)
        localStorage.setItem('nome', professor[0].nome);
        localStorage.setItem('tipo', 'professor');

        // redireciona para a página de welcome
        window.location.href = 'welcome.html';
    } else if(loginAdm) {

        // se der certo pega os dados dele através do email
        const adm = await exibirAdmPorEmail(email)

        console.log(adm)
        // seta no localStorage algumas variaveis que serão útil para chamar funções e na pagina de welcome
        localStorage.setItem('admId',adm[0].id)
        localStorage.setItem('nome', adm[0].nome);
        localStorage.setItem('tipo', 'adm');

        // redireciona para a página de welcome
        // window.location.href = 'welcome.html';

    } else {
        // se nenhum login deu certo retorna um allert 
        alert("Usuário ou senha inválidos!");
    }

});