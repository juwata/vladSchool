import { removerObs } from "../code/aluno/ConecctionAluno.js";
import Observacoes from "../code/model/Observacoes.js";

export async function excluirObs(){

    const alunoSelecinado = localStorage.getItem('alunoSelecionado')

    let obsModificar = localStorage.getItem('obsModificar')
    obsModificar = JSON.parse(obsModificar)

    const objObs = new Observacoes(obsModificar.idProfessor,obsModificar.data,obsModificar.observacao)
    const resposta = await removerObs(objObs,alunoSelecinado)

    if (resposta.success){
        alert("Observação excluida com sucesso!")
        window.location.href = 'observations.html'; 

    }else {
        alert("Erro ao excluir observação!")
    }
}

window.excluirObs = excluirObs