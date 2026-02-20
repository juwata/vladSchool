import Aluno from './Aluno.js';
import Notas from './Notas.js';
import Observacoes from './Observacoes.js';

import { criarAluno, exibirAlunoPorIndex, exibirAlunoPorNome, exibirAlunoPorSerie, exibirAlunoPorStatus, deletarAluno, atualizarAluno, logarAluno, exibirAlunoPorId, adicionarObs, removerObs, atualizarObs, atualizarNota } from './ConecctionAluno.js';
// TESTES


//const alunos = await exibirAlunoPorIndex("0")
//for (let i = 0; i < alunos.length; i++) {
//    console.log(alunos[i].getEmail());
//}

//console.log(await deletarAluno("698bbab2d4cbd13a00431f6c"));


//OS DADOS SÂO GERADOS POR IA E SÃO APENAS PARA TESTE, NÂO SÂO REAIS E NÂO DEVEM SER USADOS NO PROJETO REAL

// Criando algumas notas para o aluno
const nota1 = new Notas(1, 101, 8.5, "2024-1");
const nota2 = new Notas(2, 102, 9.0, "2024-1");

// Criando algumas observações para o aluno
const obs1 = new Observacoes(1, "2024-03-15", "O aluno demonstra excelente facilidade com lógica de programação e colabora ativamente nos projetos em grupo.");
const obs2 = new Observacoes(2, "2024-04-20", "Precisa melhorar na entrega de trabalhos");

// Instanciando o objeto Aluno
const alunoTeste = new Aluno(
    "Lucas Lima",                // nome (1)
    "Lucas.Lima",                // nomeUsuario (2)
    "senha123",                  // senha (3)
    "aluno",                     // tipo (4)
    "Lucas@escola.com",           // email (5)
    null,                        // id (6) - null para novo aluno
    "20240001",                  // matricula (7)
    "9º ano",                    // serie (8)
    "ativo",                     // status (9)
    [nota1, nota2],              // notas (10)
    [obs1, obs2]                 // observacoes (11)
);


//console.log(await atualizarAluno("698bbb7fd4cbd13a00431f6e", alunoTeste));


//console.log(await logarAluno("lucas.cay@institutojef.org.br", "123456"));


//console.log(await exibirAlunoPorId("698b4b29e6fef51313788875"));


//const obsNova = new Observacoes(1, "2024-03-25", "Muito bom o cara");

//console.log(await adicionarObs(obs1, "698b4b29e6fef51313788875"));
//console.log(await atualizarObs(obs1, "698b4b29e6fef51313788875", obsNova));


console.log(await exibirAlunoPorNome("lucas"));
