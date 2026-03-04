import { atualizarNota, atualizarObs } from "../code/aluno/ConecctionAluno.js"
import Notas from "../code/model/Notas.js"
import Observacoes from "../code/model/Observacoes.js"

const acessoProfessor =  Number(localStorage.getItem('professorId'))
let salvarNota1 = null;
let salvarNota2 = null;

export function carregarNotasEdit(){
    let notasModificar = localStorage.getItem('notasModificar')
    notasModificar = JSON.parse(notasModificar)
    
    
    const nota1Input = document.getElementById("iN1")
    const nota2Input = document.getElementById("iN2")

    for (const nota of notasModificar){
        if (/\.1$/.test(nota.periodo)) { 
            nota1Input.value = nota.nota;
            salvarNota1 = nota.nota
        } else if (/\.2$/.test(nota.periodo)) {
            nota2Input.value = nota.nota;
            salvarNota2 = nota.nota
        }
    }

}

async function editarObs(evento){

    evento.preventDefault();

    const idDisciplina = localStorage.getItem('idDisciplina')
    
    let notasModificar = localStorage.getItem('notasModificar')
    notasModificar = JSON.parse(notasModificar)

    const alunoSelecinado = localStorage.getItem('alunoSelecionado')
    console.log(alunoSelecinado)
    
    const dadosForm = new FormData(evento.target);

    const nota1 = dadosForm.get("iN1")
    const nota2 = dadosForm.get("iN2")

    if (nota1 === null && nota2 === null){
        alert("Digite alguma nota!")
        
    }

    let sucesso1 = true;
    let sucesso2 = true;

    // Lógica para Nota 1 (2026.1)
    if (nota1 !== "" && Number(nota1) !== salvarNota1) {
        const novaNota1 = new Notas(acessoProfessor, Number(idDisciplina),Number(nota1),"2026.1")
        const r1 = await atualizarNota(novaNota1,alunoSelecinado);
        sucesso1 = r1.success;
    }

    // Lógica para Nota 2 (2026.2)
    if (nota2 !== "" && Number(nota2) !== salvarNota2) {
        const novaNota2 = new Notas(acessoProfessor, Number(idDisciplina), Number(nota2), "2026.2");
        const r2 = await atualizarNota(novaNota2,alunoSelecinado);
        sucesso2 = r2.success;
    }

    if (sucesso1 && sucesso2) {
        alert("Nota atualizada com sucesso!");
        window.location.href = 'grade.html'; 
    } else {
        alert("Erro ao atualizar uma ou mais notas!");
    }

    // let respostaFinal

    // if (salvarNota1 === null && nota1 !== null && salvarNota2 === null && nota2 !== null){
    //     const novaNota1 = new Notas(acessoProfessor,idDisciplina,nota1)
    //     const novaNota2 = new Notas(acessoProfessor,idDisciplina,nota2)

    //     const reposta1 = await atualizarNota(novaNota1,alunoSelecinado)
    //     const reposta2 = await atualizarNota(novaNota2,alunoSelecinado)

    //     respostaFinal = reposta1.success && reposta2.success

    // }
    // else if (salvarNota1 === null && nota1 !== null){
    //     const novaNota1 = new Notas(acessoProfessor,idDisciplina,)
    // } 

    

    // if (respostaFinal.success){
    //     alert("Nota altualizada com sucesso!")
    //     window.location.href = 'grade.html'; 

    // }else {
    //     alert("Erro ao atualiza a nota!")
    // }
}

const formAdcionar = document.querySelectorAll("#editGrade form")

formAdcionar[0].addEventListener('submit',(e) => {
    editarObs(e)
})


window.carregarNotasEdit = carregarNotasEdit