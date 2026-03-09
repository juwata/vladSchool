import { exibirAlunoPorSerie } from "../scripts/code/aluno/ConecctionAluno.js";
async function criarObjetoTurmas() {
    try {
        // Array com todas as séries/turmas que existem no banco
        const series = [
            "1A", "1B", "2A", "2B", "3A", "3B"
        ];
        
        // Objeto que vai armazenar todas as turmas
        const turmas = {};
        
        // Para cada série, buscar os alunos e formatar os dados
        for (const serie of series) {
            const alunosDaSerie = await exibirAlunoPorSerie(serie);
            
            if (alunosDaSerie && alunosDaSerie.length > 0) {
                // Mapeia cada aluno para o formato esperado
                turmas[serie] = alunosDaSerie.map(aluno => {
                    const notas = aluno.getNotas();
                    let n1 = null;
                    let n2 = null;
                    
                    // Separa as notas por periodo e pega as duas primeiras notas (ou ajuste conforme sua lógica de períodos)
                    if (notas && notas.length > 0) {
                        // Ordena as notas por período
                        const notasOrdenadas = [...notas].sort((a, b) => 
                            a.getPeriodo().localeCompare(b.getPeriodo())
                        );
                        
                        // Pega as duas primeiras notas (ou ajuste conforme sua lógica de períodos)
                        if (notasOrdenadas[0]) n1 = notasOrdenadas[0].getNota();
                        if (notasOrdenadas[1]) n2 = notasOrdenadas[1].getNota();
                    }
                    
                    return {
                        nome: aluno.getNome(),
                        n1: n1,
                        n2: n2,
                        id: aluno.getId(),
                        matricula: aluno.getMatricula(),
                        status: aluno.getStatus()
                    };
                });
            } else {
                // Se não tiver alunos na série, cria array vazio
                turmas[serie] = [];
            }
        }
        
        return turmas;
        
    } catch (error) {
        console.error("Erro ao criar objeto turmas:", error);
        return {
            "1A": [], "1B": [], "2A": [], "2B": [], "3A": [], "3B": []
        };
    }
}

export { criarObjetoTurmas };