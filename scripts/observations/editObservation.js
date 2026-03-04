import { atualizarObs } from "../code/aluno/ConecctionAluno.js"
import Observacoes from "../code/model/Observacoes.js"

export function carregarObs(){
    let obsModificar = localStorage.getItem('obsModificar')
    obsModificar = JSON.parse(obsModificar)
    
    const inputObs = document.querySelectorAll("#editObs form textarea")
    inputObs[0].value = obsModificar.observacao
}


async function editarObs(evento){

    evento.preventDefault();

    const alunoSelecinado = localStorage.getItem('alunoSelecionado')
    let obsModificar = localStorage.getItem('obsModificar')
    obsModificar = JSON.parse(obsModificar)

    const obsAntiga = new Observacoes(obsModificar.idProfessor,obsModificar.data,obsModificar.observacao)
    
    
    const dadosForm = new FormData(evento.target);

    const textoObservacao = dadosForm.get('editObs');
    if (textoObservacao === null){
        alert("Digite algo no campo de observação!")
        
    }

    const obsNova = new Observacoes(obsAntiga.getIdProfessor(),obsAntiga.getData(),textoObservacao)

    const resposta = await atualizarObs(obsAntiga,alunoSelecinado,obsNova)

    if (resposta.success){
        alert("Observação alterada com sucesso!")
        window.location.href = 'observations.html'; 

    }else {
        alert("Erro ao alterar a observação!")
    }
}

const formAdcionar = document.querySelectorAll("#editObs form")

formAdcionar[0].addEventListener('submit',(e) => {
    editarObs(e)
})


window.carregarObs = carregarObs