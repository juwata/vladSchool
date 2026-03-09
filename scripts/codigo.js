import {recuperarAluno} from "../scripts/code/aluno/ConecctionAluno.js";
import {recuperarAdm} from "../scripts/code/adm/ConecctionAdm.js";
import {recuperarProfessor} from "../scripts/code/professor/ConecctionProfessor.js";

const email = sessionStorage.getItem('emailRecuperacao');
const tipo = sessionStorage.getItem('tipoUsuario');

console.log('sessionStorage:', { email, tipo });


async function recuperarSenha() {
    const email = sessionStorage.getItem('emailRecuperacao');
    const tipo = sessionStorage.getItem('tipoUsuario');
    const codigo = sessionStorage.getItem('codigoVerificacao');
    
    let resultado;
    
    if (tipo === "aluno") {
        resultado = await recuperarAluno(email, codigo);
    } else if (tipo === "professor") {
        resultado = await recuperarProfessor(email, codigo);
    } else if (tipo === "adm") {
        resultado = await recuperarAdm(email, codigo);
    }
    
    return resultado.retorno; // retorna o true ou false    
}

window.verificar = async function(event) {
    event.preventDefault();
    
    const codigo = Array.from(document.querySelectorAll('.code-input'))
        .map(input => input.value)
        .join('');
    
    if (codigo.length === 6) {
        sessionStorage.setItem('codigoVerificacao', codigo);
        
        const sucesso = await recuperarSenha();
        
        console.log(sucesso)
        if (sucesso) {
            alert('código correto redirecionando...')
            window.location.href = './novaSenha.html'; // redireciona
        } else {
            alert('Código inválido ou expirado');
        }
    } else {
        alert('Preencha todos os 6 dígitos');
    }
}



// Se quiser limpar os dados após usar
function limparDadosRecuperacao() {
    sessionStorage.removeItem('emailRecuperacao');
    sessionStorage.removeItem('tipoUsuario');
    sessionStorage.removeItem('codigoVerificacao');
}


// isso funciona no input de código
document.querySelectorAll('.code-input').forEach((input, index, inputs) => {
    input.addEventListener('input', (e) => {
        // regex basico para permitir só numero
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        
        // Avança pro proximo quando digitar
        if (e.target.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });
    
    input.addEventListener('keydown', (e) => {
        // Volta pro anterior quando deletado
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});