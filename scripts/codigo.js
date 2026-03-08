import {recuperarAluno} from "./code/aluno/ConecctionAluno.js";
import {recuperarAdm} from "./code/adm/ConecctionAdm.js";
import {recuperarProfessor} from "./code/professor/ConecctionProfessor.js";

const email = sessionStorage.getItem('emailRecuperacao');
const tipo = sessionStorage.getItem('tipoUsuario');

console.log('sessionStorage:', { email, tipo });


async function recuperarSenha() {
    const email = sessionStorage.getItem('emailRecuperacao');
    const tipo = sessionStorage.getItem('tipoUsuario');
    const codigo = sessionStorage.getItem('codigoVerificacao');
    
    if (tipo === "aluno") {
        await recuperarAluno(email, codigo);
    } else if (tipo === "professor") {
        await recuperarProfessor(email, codigo);
    } else if (tipo === "adm") {
        await recuperarAdm(email, codigo);
    }
}

window.verificar = async function(event) {
    event.preventDefault();
    
    const codigo = Array.from(document.querySelectorAll('.code-input'))
        .map(input => input.value)
        .join('');
    
    console.log('codigo:', codigo);
    
    if (codigo.length === 6) {
        const emailAtual = sessionStorage.getItem('emailRecuperacao');
        const tipoAtual = sessionStorage.getItem('tipoUsuario');
        
        console.log('código inserido:', codigo);
        console.log('email:', emailAtual);
        console.log('tipo:', tipoAtual);
        
        sessionStorage.setItem('codigoVerificacao', codigo);
        

        console.log('deu certo?', await recuperarSenha());
        
        return codigo;
    } else {
        console.log('erro: codigo incompleto');
        alert('Preencha todos os 6 dígitos');
        return null;
    }
}



// Se quiser limpar os dados após usar
function limparDadosRecuperacao() {
    sessionStorage.removeItem('emailRecuperacao');
    sessionStorage.removeItem('tipoUsuario');
    sessionStorage.removeItem('codigoVerificacao');
}