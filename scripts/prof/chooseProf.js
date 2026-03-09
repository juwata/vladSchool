import { listarProfessores } from '../code/professor/ConecctionProfessor.js';
import { carregarInfos } from './editProf.js';

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

// pegando o id do professor que foi armazenado no local storage no forms.js
const idSalvo = Number(localStorage.getItem('professorId'));
const idAdm = localStorage.getItem('admId')

// verificando se o id realemte esta lá e voltando para a pagina de login se não estiver 
if ((!idSalvo || idSalvo === "undefined") && (!idAdm || idAdm === "undefined")) {
    console.error("ID não encontrado! Voltando para o login...");
    window.location.href = "../login.html";
} 

const nomePagina = document.querySelector('.asideHeader div p')
nomePagina.innerText = localStorage.getItem('nome') 

async function retornarLista(){
    return await listarProfessores()
}

function filtrar(listaProfessores){    
    const inputNome = document.getElementById('profName');


    inputNome.addEventListener('input', (e) => {
        renderizarProfessores(listaProfessores, inputNome.value);
    });

}
    

function renderizarProfessores(listaProfessores, nomePesquisado = "") {

    const table = document.getElementsByClassName('table');

    const listaFiltrada = listaProfessores.filter(professor => {
        const matchNome = professor.nome.toLowerCase().includes(nomePesquisado.toLowerCase().trim());
        return matchNome;
    });

    const sectionsAntigas = table[0].querySelectorAll('article');
    if (sectionsAntigas != null ){
        sectionsAntigas.forEach(s => s.remove());

    }
    
        for (const professor of listaFiltrada) {
            const section = document.createElement('article')
            section.onclick = function () {
                localStorage.setItem("professorAlterar", professor.idProfessor);
                editProf.showModal()
                carregarInfos()
            };

            const div = document.createElement('div')
            
            const h2Nome = document.createElement('h2')
            const pDisciplinhas = document.createElement('p')

            h2Nome.textContent = professor.nome

            let disciplinaJuntas=""
            for(const disciplina of professor.disciplinasLecionadas){
                disciplinaJuntas+=`${discionarioDiscplina[disciplina]}<br>`
            }
            pDisciplinhas.innerHTML = disciplinaJuntas

            div.appendChild(h2Nome)
            div.appendChild(pDisciplinhas)

            const img = document.createElement('img')
            img.src = '../../assets/icons/arrow.svg'
            img.alt = 'redirecionar'

            section.appendChild(div)
            section.appendChild(img)
            
            table[0].appendChild(section)
        }
}



async function iniciar() {
    
    const listaProfessores = await retornarLista();
    renderizarProfessores(listaProfessores);
    filtrar(listaProfessores)
    
}

iniciar() 
// const main = document.querySelector('main section');

// main.addEventListener('click', (e) => {
//     // Verifica se o clique foi em uma section ou dentro de uma
//     const section = e.target.closest('div[data-id-aluno]');
    
//     if (section) {
//         // Opcional: Salvar o ID do aluno que definimos no dataset.id
//         const alunoId = section.dataset.idAluno;
//         if (alunoId) {
//             localStorage.setItem('alunoSelecionado', alunoId);
//         }
//         const nomePagina = window.location.pathname.split("/").pop().replace(".html", "");
//         if (nomePagina=="chooseObservations"){
//             window.location.href = 'observations.html'; 

//         } else if(nomePagina=="chooseNotas"){
//             window.location.href = 'grade.html'; 
            
//         }
//     }
// });


const popUps = [document.getElementById('addProf'),document.getElementById('editProf')]


for (const popUp of popUps){
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
    
}
