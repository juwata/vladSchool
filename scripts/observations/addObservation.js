import { adicionarObs } from "../code/aluno/ConecctionAluno.js"
import Observacoes from "../code/model/Observacoes.js"

async function addObs(evento){

    evento.preventDefault();

    const alunoSelecinado = localStorage.getItem('alunoSelecionado')
    const acessoProfessor =  Number(localStorage.getItem('professorId'))
    
    const hoje = new Date();
    const dataISO = hoje.toISOString().split('T')[0]
    
    const dadosForm = new FormData(evento.target);
    
    const textoObservacao = dadosForm.get('newObs');
    if (textoObservacao === null){
        alert("Digite algo no campo de observação!")
        
    }
    console.log(textoObservacao)

    const observacaoAdicionada = new Observacoes(acessoProfessor,dataISO,textoObservacao)

    const resposta = await adicionarObs(observacaoAdicionada,alunoSelecinado)

    if (resposta.success){
        alert("Observação adicionada com sucesso!")
        window.location.href = 'observations.html'; 

    }else {
        alert("Erro ao criar observação!")
    }
}

const formAdcionar = document.querySelectorAll("#addObs form")

formAdcionar[0].addEventListener('submit',(e) => {
    addObs(e)
})
