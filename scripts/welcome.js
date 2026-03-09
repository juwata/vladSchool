// pegando o id do aluno que foi armazenado no local storage no forms.js
const idSalvoAluno = localStorage.getItem('alunoId');
const idSalvoProfessor = localStorage.getItem('professorId');
const idSalvoAdm = localStorage.getItem('admId');

// verificando se o id realemte esta lá e voltando para a pagina de login se não estiver 
if (!(!idSalvoAluno || idSalvoAluno === "undefined") && !(!idSalvoProfessor || idSalvoProfessor === "undefined") && !(!idSalvoAdm || idSalvoAdm === "undefined")) {
    console.error("ID não encontrado! Voltando para o login...");
    window.location.href = "login.html";
} 

// pega o tipo e o nome que foi declerado no form.js
const career = localStorage.getItem('tipo');
const nome = localStorage.getItem('nome')

let color

// vendo qual cor a página vai ter
if (career === 'professor') {
    color = "#00C0E8"

} else if (career === 'aluno') {
    color = "#7B3FF2"

} else {
    color = "#FF383C"
}

// setando a cor, nome e o tipo que vai aparecer na tela
document.documentElement.style.setProperty('--mainColor', color)
document.getElementById('roleplay').textContent = career
document.getElementById('nome').textContent = nome

// puxando o a que redireciona para a pagina esperada
const redirecionar = document.getElementById('redirecionar')

// caso clique chama a função
redirecionar.addEventListener('click', event => {

    // tira a função do a para não restar a página e não funcionar a função
    event.preventDefault()

    // redirecionando de acordo com o tipo do login 
    if (career==='aluno'){
        window.location.href = 'stud/grade.html'; 
    } else if (career==='professor'){
        window.location.href = 'prof/chooseNotas.html'; 
    } else if (career==='adm'){
        window.location.href = 'adm/chooseNotas.html'; 
    }

})