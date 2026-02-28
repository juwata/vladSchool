import { atualizarObs, removerObs } from "../code/aluno/ConecctionAluno.js";
import Observacoes from "../code/model/Observacoes.js";
import { guardarObservacoes, renderizarObsevacoes } from "../prof/observations.js";


document.addEventListener("DOMContentLoaded", () => {
    
    const overlay = document.getElementById("overlayEditarExcluir");
    const overlayEditar = document.getElementById("overlayEditar")
    
    document.addEventListener("click", (e) => {
        
        const card = e.target.closest('.openPopupExcEdit');
        

        if (card) {

            overlay.style.display = "flex";

            const btnExcluir = document.getElementsByClassName('delete');
            const btnEditar = document.getElementsByClassName('edit');

            const idAluno = card.dataset.idAluno;
            
            const obsObjeto = guardarObservacoes.get(idAluno);
            delete obsObjeto.idAluno;
            delete obsObjeto.nomeAluno;
            

            btnExcluir[0].addEventListener("click", async (e) => {
                const respostaDelete = await removerObs(obsObjeto,idAluno)

                if (respostaDelete.success){
                    alert("Observação deletada com sucesso!")
                    overlay.style.display = "none";
                    renderizarObsevacoes()

                } else {
                    alert("Não foi possível deletar a observação!")
                }
            })

            btnEditar[0].addEventListener("click", async (e) => {
                overlay.style.display = "none";
                overlayEditar.style.display = "flex";

                overlayEditar.addEventListener("click", (e) => {
                    if (e.target === overlayEditar) {
                        overlayEditar.style.display = "none";
                    }
                });

                const form = document.querySelector('.popupEditar form');

                form.addEventListener("submit", async (e) => {

                    e.preventDefault();

                    // objeto para pegar os dados do input
                    const dados = new FormData(form);

                    // pegando a nova observação enviada
                    const observacao = dados.get('obsevacao');
                    console.log(observacao)

                    let dataFormatada
                    
                    if (obsObjeto.data && obsObjeto.data.$date) {
                        dataFormatada = obsObjeto.data.$date.split('T')[0];
                    } else {
                        dataFormatada = obsObjeto.data;
                    }

                    const novaObservacao = new Observacoes(obsObjeto.idProfessor,dataFormatada,observacao)

                    const respostaEditar = await atualizarObs(obsObjeto,idAluno,novaObservacao)


                    if (respostaEditar.success){
                        alert("Observação alterada com suceso!")
                        overlayEditar.style.display = "none";
                        renderizarObsevacoes()
    
                    } else {
                        alert("Não foi possível editar a observação!")
                    }
                })

            })
            
        }


        // Fecha o pop-up se o usuário clicar no fundo escuro (overlay)
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });

});