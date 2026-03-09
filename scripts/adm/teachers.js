import { listarProfessores } from "../code/professor/ConecctionProfessor.js";


// instanciando um dicionario com o idDisciplina e a sua respectiva disciplina
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

// pegando o id do adm
const idSalvo = localStorage.getItem('admId');

// verificando se o id realemte esta lá e voltando para a pagina de login se não estiver 
if (!idSalvo || idSalvo === "undefined") {
    console.error("ID não encontrado! Voltando para o login...");
    window.location.href = "../login.html";
} 

// colocando o nome da pessoa no na página
const nomePagina = document.querySelector('.asideHeader div p')
nomePagina.innerText = localStorage.getItem('nome') 

// pegando a lista de todos os professores
const listaProfessores = await listarProfessores()

// pegando a tabela que fica os professores
const tabelaProfessor = document.getElementsByClassName('prof')

// pegando o input de busca
const inputProfessor = document.getElementById('inputProfessor');

function renderizarTabela(listaProfessores){

    tabelaProfessor[0].innerHTML='<tr class="thead"><th>nome</th><th>disciplina</th><th>email</th></tr>'

    for (const professor of listaProfessores){

        // criando a linha que sera adicionada
        const linha = document.createElement('tr')
    
        // adicionando cada elemento daquela linha
        const tdNome = document.createElement('td');
        const tdDisciplina = document.createElement('td');
        const tdEmail = document.createElement('td');
    
        // colocando o nome, o email e a senha do professor
        tdNome.textContent = professor.nome
        tdEmail.textContent = professor.email
    
        // pegando quais as disciplinas lecionadas pelo professor
        let disciplinas = ""
    
        for (const id of professor.disciplinasLecionadas){
    
            // pegando o nome da disciplina de acordo com aquele dicionario
            const nomeDisciplina = discionarioDiscplina[id]
    
            // adiconando na disciplina
            disciplinas += nomeDisciplina + "<br>"
    
        }
    
        // colocando o nome da disciplina no td
        tdDisciplina.innerHTML = disciplinas;
    
        // adicionando todos os tds nas linhas
        linha.appendChild(tdNome)
        linha.appendChild(tdDisciplina)
        linha.appendChild(tdEmail)
    
        // adicionando a linha na tabela
        tabelaProfessor[0].appendChild(linha)
    }

}
renderizarTabela(listaProfessores)


inputProfessor.addEventListener('input', () => {
    const termoBusca = inputProfessor.value.toLowerCase(); 

    const professoresFiltrados = listaProfessores.filter(professor => 
        professor.nome.toLowerCase().includes(termoBusca)
    );

    renderizarTabela(professoresFiltrados);
});


