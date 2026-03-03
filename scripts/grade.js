
import NotasMostrar from './code/model/NotasMostrar.js';
import {  exibirAlunoPorId } from './code/aluno/ConecctionAluno.js';

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

// instanciando o dicionario que vai ficar as notas de cada materia
let dicionarioNotas = {
    "Teoria da Conspiração":null,
    "Programação Orientada a Apostas":null,
    "Lavagem de Dinheiro":null,
    "Matemática":null,
    "Português":null,
    "História":null,
    "Ciêcias":null,
    "Informática":null
}

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
        console.log(alunoSelecinado)
        aluno = await exibirAlunoPorId(alunoSelecinado);
    } else if (!(!acessoAluno || acessoAluno === "undefined")){
        aluno = await exibirAlunoPorId(acessoAluno);
    }
} else {
    console.error("ID não encontrado! Voltando para o login...");
    window.location.href = "../login.html";
}

    




// colocando o nome do aluno na pagina
const nomePagina = document.querySelector('.asideHeader div p')
nomePagina.innerText = localStorage.getItem('nome')

// dando for em cada uma das nota daquele aluno
for (const nota of aluno[0].notas){

    // pegando o nome da disciplina de acordo com aquele dicionario
    const nomeDisciplina = discionarioDiscplina[nota.idDisciplina]

    // verificação de qual periodo é aquela nota
    if (nota.periodo === "2026.1"){

        // verificação se alguma nota ja foi salva naquela matéria
        if (dicionarioNotas[nomeDisciplina] != null){

            // se sim, vai entrar como set
            dicionarioNotas[nomeDisciplina].setNota1(nota.nota)
        } else {

            // se não vai chamar o construtor
            dicionarioNotas[nomeDisciplina] = new NotasMostrar(nota.nota,null)
        }

    // mesma lógica de cima, porém com a nota do segundo periodo    
    } else if (nota.periodo === "2026.2"){

        if (dicionarioNotas[nomeDisciplina] != null){
            dicionarioNotas[nomeDisciplina].setNota2(nota.nota)
        } else {
            dicionarioNotas[nomeDisciplina] = new NotasMostrar(null,nota.nota)
        }
    }
}

// puxando a tabela em que as notas serão colocadas
const tabela = document.getElementsByTagName('table');

// rodando cada objeto do dicionario
for (const [materia,nota] of Object.entries(dicionarioNotas)){

    // criando a linha que sera adicionada
    const linha = document.createElement('tr')

    // adicionando cada elemento daquela linha
    const tdMateria = document.createElement('td');
    const tdNota1 = document.createElement('td');
    const tdNota2 = document.createElement('td');
    const tdMedia = document.createElement('td');
    const tdSituacao = document.createElement('td');

    // colocando a materia que se trata na primeira coluna
    tdMateria.textContent = materia;

    if (nota == null){

        // se aquela nota da matéria não existe, colocar tudo como '--' e a situação em andamento
        tdNota1.textContent = '--';
        tdNota2.textContent = '--';
        tdMedia.textContent = '--';
        tdSituacao.textContent = 'Em andamento';
        
    } else {

        // colocando os dados caso a segundo nota seja nula        
        if (nota.getNota2() == null) {

            tdNota1.textContent = nota.getNota1().toFixed(1);

            tdNota2.textContent = '--'; 

            tdMedia.textContent = nota.getNota1().toFixed(1)

            tdSituacao.textContent = 'Em andamento'

        // colocando os dados caso a primeira nota seja nula        
        } else if (nota.getNota1() == null) {

            tdNota2.textContent = nota.getNota2().toFixed(1)

            tdNota1.textContent = '--'; 

            tdMedia.textContent = nota.getNota2().toFixed(1)

            tdSituacao.textContent = 'Em andamento';

        // colocando todos os dados quando a estiver tudo completo        
        } else {

            tdNota1.textContent = nota.getNota1().toFixed(1);

            tdNota2.textContent = nota.getNota2().toFixed(1); 

            tdMedia.textContent = ((nota.getNota1() + nota.getNota2())/2).toFixed(1); 

            if (tdMedia.textContent >= 7) {
                tdSituacao.textContent = 'Aprovado'
            } else {
                tdSituacao.textContent = 'Reprovado';
            }
        }

    }

    // adicionando todas as colunas na linha da tabela
    linha.appendChild(tdMateria);
    linha.appendChild(tdNota1);
    linha.appendChild(tdNota2);
    linha.appendChild(tdMedia);
    linha.appendChild(tdSituacao);

    // adicionand aquela linha na tabela
    tabela[0].appendChild(linha);
}

