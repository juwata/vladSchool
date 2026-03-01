import { adicionarObs, exibirAlunoPorId } from "../code/aluno/ConecctionAluno.js";
import Observacoes from "../code/model/Observacoes.js";

const idSalvo = Number(localStorage.getItem('professorId'));
const alunoSelecinado = localStorage.getItem('alunoSelecionado')


document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openPopupAdd");
    const overlay = document.getElementById("overlayAdicionar");
    const form = document.querySelector('.popupAdicionar form');

    openBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });

    form.addEventListener('submit', async (event) => {

        // não deixa a pagina recarregar
        event.preventDefault();

        // objeto para pegar os dados do input
        const dados = new FormData(form);

        // pegando o nome digitado e a obsevacao escrita
        const observacao = dados.get('obsevacao');

        const alunoObsevacao = await exibirAlunoPorId(alunoSelecinado)


        if (alunoObsevacao.length == 0 ){
            alert("Aluno não encontrado")
        } else if (alunoObsevacao.length > 1){
            alert("Seja mais especifico ao digitar o nome!")
        }else {

            const hoje = new Date();
            const dataISO = hoje.toISOString().split('T')[0]
            const observacaoEnviada = new Observacoes(idSalvo,dataISO,observacao)
            console.log(observacaoEnviada,alunoObsevacao[0].id)

            const sucesso = await adicionarObs(observacaoEnviada,alunoObsevacao[0].id)
            
            if (sucesso.success){
                alert("Observação adicionada com sucesso!")
                window.location.href = 'observations.html'; 

            }else {
                alert("Erro ao criar observação!")
            }
        }
    })
});