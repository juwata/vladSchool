import { exibirDisciplinaPorNome } from "../code/disciplina/ConnectionDisciplina.js";

// pegando o id do adm
const idSalvo = localStorage.getItem('admId');

// verificando se o id realemte esta lá e voltando para a pagina de login se não estiver 
if (!idSalvo || idSalvo === "undefined") {
    console.error("ID não encontrado! Voltando para o login...");
    window.location.href = "../login.html";
} 

// pegando todas as divs que tem a escolhas da máteria
const divsMaterias = document.querySelectorAll('.discipline section div')

// rodando um for esperando o event de cada matéria
for (const div of divsMaterias){

    div.addEventListener('click', async () => {

        // Pega o nome da matéria escrito
        const disciplinaSelecionada = div.innerText;

        const disciplina = await exibirDisciplinaPorNome(disciplinaSelecionada)

        // salvando o id da disciplina no local storage
        localStorage.setItem('idDisciplina',disciplina[0].idDisciplina)

        // redirecionando para a pagina em que vai aparecer os alunos
        window.location.href = "students.html";
    })
}
