import { exibirAlunoPorEmail, atualizarAluno } from "../../aluno/ConecctionAluno.js";
import { exibirProfessorPorEmail, atualizarProfessor } from "../../professor/ConecctionProfessor.js";
import { exibirAdmPorEmail } from "../../adm/ConnectionAdm.js";

async function alterarSenhaBack(email, novaSenha) {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    
    if (tipoUsuario === "aluno") {
        // Busca o aluno pelo email
        const alunos = await exibirAlunoPorEmail(email);
        if (alunos && alunos.length > 0) {
            const aluno = alunos[0];
            aluno.setSenha(novaSenha); // Atualiza a senha
            await atualizarAluno(aluno.getId(), aluno);
            return true;
        }
    }
    else if (tipoUsuario === "professor") {
        // Busca o professor pelo email
        const professores = await exibirProfessorPorEmail(email);
        if (professores && professores.length > 0) {
            const professor = professores[0];
            professor.setSenha(novaSenha); // Atualiza a senha
            await atualizarProfessor(professor.getId(), professor);
            return true;
        }
    }
    else if (tipoUsuario === "adm") {
        const adms = await exibirAdmPorEmail(email);
        if (adms && adms.length > 0) {
            const adm = adms[0];
            adm.setSenha(novaSenha);
            await atualizarAdm(adm.getId(), adm); 
            return true;
        }
    }
    
    throw new Error("Usuário não encontrado");
}

window.alterarSenha = async function(event) {
    if(event) event.preventDefault();
    
    const novaSenha = document.getElementById('iNovaSenha').value;
    const confirmarSenha = document.getElementById('iConfirmarSenha').value;
    const btnSubmit = document.getElementById('btnSubmit');
    const loadingContainer = document.getElementById('loadingContainer');
    
    // Valida se as senhas coincidem
    if (novaSenha !== confirmarSenha) {
        const popup = document.createElement('div');
        popup.className = 'popup-erro';
        popup.textContent = 'As senhas não coincidem';
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 3000);
        return;
    }
    
    // Valida tamanho mínimo
    if (novaSenha.length < 6) {
        const popup = document.createElement('div');
        popup.className = 'popup-erro';
        popup.textContent = 'A senha deve ter no mínimo 6 caracteres';
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 3000);
        return;
    }
    
    const email = sessionStorage.getItem('emailRecuperacao');
    
    if (!email) {
        const popup = document.createElement('div');
        popup.className = 'popup-erro';
        popup.textContent = 'Email não encontrado. Faça o processo novamente.';
        document.body.appendChild(popup);
        setTimeout(() => {
            window.location.href = './enviarEmail.html';
        }, 2000);
        return;
    }
    
    btnSubmit.style.display = 'none';
    loadingContainer.style.display = 'block';
    
    try {
        await alterarSenhaBack(email, novaSenha);
        
        // Popup de sucesso
        const popup = document.createElement('div');
        popup.className = 'mensagem sucesso';
        popup.textContent = 'Senha alterada com sucesso!';
        document.body.appendChild(popup);
        
        // Limpa os dados da sessionStorage
        sessionStorage.removeItem('emailRecuperacao');
        sessionStorage.removeItem('tipoUsuario');
        sessionStorage.removeItem('codigoVerificacao');
        
        setTimeout(() => {
            window.location.href = './login.html';
        }, 2000);
        
    } catch (error) {
        console.log(error)
        btnSubmit.style.display = 'block';
        loadingContainer.style.display = 'none';
        
        const popup = document.createElement('div');
        popup.className = 'popup-erro';
        popup.textContent = 'Erro ao alterar senha. Tente novamente.';
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 3000);
    }
}
