import { enviarEmailAluno, exibirAlunoPorEmail} from "./code/aluno/ConecctionAluno.js";
import { enviarEmailAdm, exibirAdmPorEmail } from "./code/adm/ConecctionAdm.js";
import { enviarEmailProfessor, exibirProfessorPorEmail } from "./code/professor/ConecctionProfessor.js";

async function verificarEmail(email){
    const emailAluno = await exibirAlunoPorEmail(email);
    const emailProfessor = await exibirProfessorPorEmail(email);
    const emailAdm = await exibirAdmPorEmail(email);
    
    if (emailAluno !== null) {
        return "aluno";
    }
    else if (emailProfessor !== null) {
        return "professor";
    }
    else if (emailAdm !== null) {
        return "adm";
    }
    else {
        return "null";
    }
}

async function enviarEmailBack(email){
    const tipoUsuario = await verificarEmail(email);
    
    sessionStorage.setItem('tipoUsuario', tipoUsuario);
    console.log("tipo salvo no sessionStorage:", sessionStorage.getItem('tipoUsuario'));
    
    if(tipoUsuario === "aluno"){
        await enviarEmailAluno(email);
    }
    else if(tipoUsuario === "professor"){
        await enviarEmailProfessor(email);
    }
    else if(tipoUsuario === "adm"){
        await enviarEmailAdm(email);
    }
    else{
        console.log("Email não encontrado");
    }
}

window.enviarEmail = async function(event){
    if(event) event.preventDefault();
    
    const email = document.getElementById('iEmail').value;
    
    sessionStorage.setItem('emailRecuperacao', email);
    console.log("email salvo no sessionStorage:", sessionStorage.getItem('emailRecuperacao'));
    
    await enviarEmailBack(email);
    
    console.log("Verificando sessionStorage antes do redirecionamento:");
    console.log("Email:", sessionStorage.getItem('emailRecuperacao'));
    console.log("Tipo:", sessionStorage.getItem('tipoUsuario'));
    
    window.location.href = './codigo.html';
}