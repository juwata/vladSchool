
import NotasMostrar from './code/model/NotasMostrar.js';
import {  exibirAlunoPorId } from './code/aluno/ConecctionAluno.js';
import { exibirProfessorPorId } from './code/professor/ConecctionProfessor.js';

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
let dicionarioNotasMostrar = {
    "Teoria da Conspiração":null,
    "Programação Orientada a Apostas":null,
    "Lavagem de Dinheiro":null,
    "Matemática":null,
    "Português":null,
    "História":null,
    "Ciêcias":null,
    "Informática":null
}

let dicionarioNotasAlterar = {
    "Teoria da Conspiração":[],
    "Programação Orientada a Apostas":[],
    "Lavagem de Dinheiro":[],
    "Matemática":[],
    "Português":[],
    "História":[],
    "Ciêcias":[],
    "Informática":[]
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

    dicionarioNotasAlterar[nomeDisciplina].push(nota)

    // verificação de qual periodo é aquela nota
    if (nota.periodo === "2026.1"){

        // verificação se alguma nota ja foi salva naquela matéria
        if (dicionarioNotasMostrar[nomeDisciplina] != null){

            // se sim, vai entrar como set
            dicionarioNotasMostrar[nomeDisciplina].setNota1(nota.nota)
        } else {

            // se não vai chamar o construtor
            dicionarioNotasMostrar[nomeDisciplina] = new NotasMostrar(nota.nota,null,nota.idProfessor)
        }

    // mesma lógica de cima, porém com a nota do segundo periodo    
    } else if (nota.periodo === "2026.2"){

        if (dicionarioNotasMostrar[nomeDisciplina] != null){
            dicionarioNotasMostrar[nomeDisciplina].setNota2(nota.nota)
        } else {
            dicionarioNotasMostrar[nomeDisciplina] = new NotasMostrar(null,nota.nota,nota.idProfessor)
        }
    }
}

// puxando a tabela em que as notas serão colocadas
const tabela = document.getElementsByTagName('table');

// rodando cada objeto do dicionario
for (const [materia, nota] of Object.entries(dicionarioNotasMostrar)) {
    const linha = document.createElement('tr');
    
    // Captura o valor de materia para este escopo específico
    const materiaAtual = materia; 

    if (!professor) {
        const professorAcessado = await exibirProfessorPorId(acessoProfessor);
        const disciplinasDoProf = professorAcessado[0].disciplinasLecionadas;
        
        // Encontra o ID da disciplina atual no seu dicionário
        const idMateriaAtual = Number(Object.keys(discionarioDiscplina).find(key => discionarioDiscplina[key] === materiaAtual));


        if (dicionarioNotasAlterar[materia].length != 0 ){
            console.log(dicionarioNotasAlterar[materia][0].idProfessor,acessoProfessor)
            if (dicionarioNotasAlterar[materia][0].idProfessor == acessoProfessor){
                console.log('ola')
                linha.onclick = function () {
                    // PRIMEIRO: Salva os dados
                    localStorage.setItem("idDisciplina", idMateriaAtual);
                    const dadosParaSalvar = dicionarioNotasAlterar[materiaAtual];
                    localStorage.setItem("notasModificar", JSON.stringify(dadosParaSalvar));
                    
                    // DEPOIS: Abre o modal e carrega
                    editGrade.showModal();
                    if (typeof carregarNotasEdit === "function") {
                        carregarNotasEdit();
                    }
                };
            } else if (disciplinasDoProf.includes(idMateriaAtual) &&  dicionarioNotasAlterar[materia][0].idProfessor == 0) {
                console.log('vix')
                linha.style.cursor = 'pointer';
                linha.onclick = function () {
                    // PRIMEIRO: Salva os dados
                    localStorage.setItem("idDisciplina", idMateriaAtual);
                    const dadosParaSalvar = dicionarioNotasAlterar[materiaAtual];
                    localStorage.setItem("notasModificar", JSON.stringify(dadosParaSalvar));
                    
                    // DEPOIS: Abre o modal e carrega
                    editGrade.showModal();
                    if (typeof carregarNotasEdit === "function") {
                        carregarNotasEdit();
                    }
                };
            } else {
                linha.onclick = () => alert("Essa matéria não é sua!");
            }
        } else if (disciplinasDoProf.includes(idMateriaAtual)) {
            linha.style.cursor = 'pointer';
            linha.onclick = function () {
                // PRIMEIRO: Salva os dados
                localStorage.setItem("idDisciplina", idMateriaAtual);
                const dadosParaSalvar = dicionarioNotasAlterar[materiaAtual];
                localStorage.setItem("notasModificar", JSON.stringify(dadosParaSalvar));
                
                // DEPOIS: Abre o modal e carrega
                editGrade.showModal();
                if (typeof carregarNotasEdit === "function") {
                    carregarNotasEdit();
                }
            };
        } else {
            linha.onclick = () => alert("Essa matéria não é sua!");
        }
    } else if (!adm) {

        const idMateriaAtual = Number(Object.keys(discionarioDiscplina).find(key => discionarioDiscplina[key] === materiaAtual));
        // Lógica para Admin
        linha.onclick = function () {
            localStorage.setItem("idDisciplina", idMateriaAtual);
            localStorage.setItem("notasModificar", JSON.stringify(dicionarioNotasAlterar[materiaAtual]));
            editGrade.showModal();
            carregarNotasEdit();
        };
    }


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

const popUp = document.getElementById('editGrade')


popUp.addEventListener('click', (e) => {
    const rect = popUp.getBoundingClientRect();
            
        const clicouFora = (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
        );

        if (clicouFora) {
                popUp.close();
        }
})

