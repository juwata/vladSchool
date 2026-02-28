import { exibirAlunoPorIndex } from '../code/aluno/ConecctionAluno.js'

// pegando o id do professor que foi armazenado no local storage no forms.js
const idSalvo = Number(localStorage.getItem('professorId'));

// verificando se o id realemte esta lá e voltando para a pagina de login se não estiver 
if (!idSalvo || idSalvo === "undefined") {
    console.error("ID não encontrado! Voltando para o login...");
    window.location.href = "../login.html";
} 

const nomePagina = document.querySelector('.asideHeader div p')
nomePagina.innerText = localStorage.getItem('nome') 

const guardarObservacoes = new Map();

export async function renderizarObsevacoes() {
    let indice = 0
    let listaAlunos = []

    const main = document.getElementsByTagName('main');
    main[0].innerHTML = ''; 
    guardarObservacoes.clear();

    do {
        const listaObservacao = []
        listaAlunos = await exibirAlunoPorIndex(indice)

        for (const aluno of listaAlunos) {
            
            for (const observacao of aluno.observacoes){
                if (observacao.idProfessor == idSalvo){
                    observacao.nomeAluno = aluno.nome
                    observacao.idAluno = aluno.id
                    listaObservacao.push(observacao)
                    
                }
            }
            
        
        }
        
        // rodando cada das observações do aluno
        for (const observacao of listaObservacao){
            
            // criando a section que representa a obsevação
            const section = document.createElement('section')
            section.classList.add('openPopupExcEdit');

            guardarObservacoes.set(String(observacao.idAluno), observacao)

            section.dataset.idAluno =observacao.idAluno;
            
            // criando a div que fica o nome do aluno
            const div = document.createElement('div')
        
            const h2 = document.createElement('h2')
            h2.textContent = 'ALUNO'
        
            const pNome = document.createElement('p')
        
            // pegando o nome do aluno
            pNome.textContent = observacao.nomeAluno
        
            // adicionando o h2 e p com o nome na div
            div.appendChild(h2)
            div.appendChild(pNome)
        
            // criando o elemento que fica a obsevação e colocando a obsejação
            const pObservacao = document.createElement('p')
            pObservacao.textContent = observacao.observacao
        
            // adicionando a observação e o nome do aluno na section
            section.appendChild(div)
            section.appendChild(pObservacao)
        
            // adicioanando a tal observação
            main[0].appendChild(section)
        }

        indice++

    } while (listaAlunos.length==10)
}

renderizarObsevacoes()  

export { guardarObservacoes};
