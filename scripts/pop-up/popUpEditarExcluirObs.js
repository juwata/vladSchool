import { atualizarObs, exibirAlunoPorId, removerObs } from "../code/aluno/ConecctionAluno.js";
import Observacoes from "../code/model/Observacoes.js";
import { exibirProfessorPorId } from "../code/professor/ConecctionProfessor.js";

const idSalvo = Number(localStorage.getItem('professorId'));
const idAdm= localStorage.getItem('admId');

document.addEventListener("DOMContentLoaded",  () => {
    
    
    
    document.addEventListener("click", async (e) => {
        
        const overlay = document.getElementById("overlayEditarExcluir");
        const overlayEditar = document.getElementById("overlayEditar")

        if (e.target === overlay) {
            overlay.style.display = "none";
            return
        }

        const card = e.target.closest('.openPopupExcEdit');
        
        const pNome = card.querySelector('p')
        const nomeProfessor = pNome.textContent

        const pObservacao = card.querySelectorAll('p')
        const txtObservacao = pObservacao[1].textContent

        const professor = await exibirProfessorPorId(idSalvo)

        if (card && idAdm != null) {
            
            overlay.style.display = "flex";

            const btnExcluir = document.getElementsByClassName('delete');
            const btnEditar = document.getElementsByClassName('edit');

            const idAluno = localStorage.getItem('alunoSelecionado');

            let obsObjeto
            const alunoSelecionado = await exibirAlunoPorId(idAluno);
            for (const observacao of alunoSelecionado[0].observacoes){
                if(observacao.observacao === txtObservacao){
                    obsObjeto=observacao
                }
            }

            
            

            btnExcluir[0].addEventListener("click", async (e) => {
                const respostaDelete = await removerObs(obsObjeto,idAluno)

                if (respostaDelete.success){
                    alert("Observação deletada com sucesso!")
                    overlay.style.display = "none";
                    window.location.href = 'observations.html'; 

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
                        window.location.href = 'observations.html'; 
    
                    } else {
                        alert("Não foi possível editar a observação!")
                    }
                })

            })

        } else if (card && professor[0].nome === nomeProfessor) {

            overlay.style.display = "flex";

            const btnExcluir = document.getElementsByClassName('delete');
            const btnEditar = document.getElementsByClassName('edit');

            const idAluno = localStorage.getItem('alunoSelecionado');

            let obsObjeto
            const alunoSelecionado = await exibirAlunoPorId(idAluno);
            for (const observacao of alunoSelecionado[0].observacoes){
                if(observacao.observacao === txtObservacao){
                    obsObjeto=observacao
                }
            }

            
            

            btnExcluir[0].addEventListener("click", async (e) => {
                const respostaDelete = await removerObs(obsObjeto,idAluno)

                if (respostaDelete.success){
                    alert("Observação deletada com sucesso!")
                    overlay.style.display = "none";
                    window.location.href = 'observations.html'; 

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
                        window.location.href = 'observations.html'; 
    
                    } else {
                        alert("Não foi possível editar a observação!")
                    }
                })

            })
            
        } else {
            alert('Essa observação não foi feita por você!')
        }
        
    });

});