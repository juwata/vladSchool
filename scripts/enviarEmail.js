import { enviarEmailAluno, exibirAlunoPorEmail} from "../scripts/code/aluno/ConecctionAluno.js";
import { enviarEmailAdm, exibirAdmPorEmail } from "../scripts/code/adm/ConecctionAdm.js";
import { enviarEmailProfessor, exibirProfessorPorEmail } from "../scripts/code/professor/ConecctionProfessor.js";

async function verificarEmail(email){
    try {
        const resultado = await Promise.any([
            exibirAlunoPorEmail(email).then(r => {
                if (r && r.length > 0) {
                    return "aluno";
                }
                return Promise.reject();
            }),
            exibirProfessorPorEmail(email).then(r => {
                if (r && r.length > 0) {
                    return "professor";
                }
                return Promise.reject();
            }),
            exibirAdmPorEmail(email).then(r => {
                if (r && r.length > 0) {
                    return "adm";
                }
                return Promise.reject();
            })
        ]);
        return resultado;
    } catch {
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
        throw new Error("Email não encontrado");
    }
}

window.enviarEmail = async function(event){
    if(event) event.preventDefault();
    
    const email = document.getElementById('iEmail').value;
    const btnSubmit = document.getElementById('btnSubmit');
    const loadingContainer = document.getElementById('loadingContainer');
    
    btnSubmit.style.display = 'none';
    loadingContainer.style.display = 'block';
    
    sessionStorage.setItem('emailRecuperacao', email);
    
    try {
        await enviarEmailBack(email);
        window.location.href = './codigo.html';
    } catch (error) {
        btnSubmit.style.display = 'block';
        loadingContainer.style.display = 'none';
        
        // Popup de erro
        const popup = document.createElement('div');
        popup.className = 'popup-erro';
        popup.textContent = 'Email não encontrado no sistema';
        document.body.appendChild(popup);
        
        setTimeout(() => popup.remove(), 3000);
    }
}