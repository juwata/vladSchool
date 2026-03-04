import Aluno from '../model/Aluno.js';
import Notas from '../model/Notas.js';
import Observacoes from '../model/Observacoes.js';

const url = 'http://localhost:8080/TrabalhoDSV2/';

async function criarAluno(aluno=Aluno) {
    try {
        aluno = aluno.paraJson();

        //metodo que que envia e conecta no backend para criar um aluno'
        const resposta = await fetch(`${url}app/aluno/criar`, {
            method: 'POST',
            headers: {
                //seta o tipo de conteudo para json, para o backend entender que é um json
                'Content-Type': 'application/json',
            },
            //transforma para string o json aluno
            body: JSON.stringify(aluno)
        });

        // Verificar se a resposta foi ok
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        // Converter resposta para json
        const dadosResposta = await resposta.json();
        console.log('sucesso:', dadosResposta);


        //retorna os dados da resposta para o frontend
        return dadosResposta;

        //try e catch, igual o java
    } catch (e) {
        //mensagem de erro, como no front é menos comum n tem um tratamento completo
        console.error('erro ao enviar:', e);
    }

}


async function exibirAlunoPorNome(nome=String) {
    try {
        //constante do tipo de busca
        const tipo = "nome";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/aluno/exibir?tipo=${tipo}&nome=${(nome)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //verifica se a resposta foi ok
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        //converte a resposta para json
        const dadosResposta = await resposta.json();
        //separa da resposta de sucesso para resposta de aluno
        const alunosArray = dadosResposta.alunos;


        if (Array.isArray(alunosArray)) {
            // lista para armazenar objetos aluno
            const listaAlunos = [];
            //pega o lenght da respsota
            const length = alunosArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto aluno usando o metodo deJson da classe Aluno, e adiciona na lista de alunos
                const alunoJson = alunosArray[i];
                //converte para objeto
                const alunoObj = Aluno.deJson(alunoJson);
                //coloca na lista
                listaAlunos.push(alunoObj);

            }
            //retorna lista de retorna
            return listaAlunos;

        }
    } catch (e) {
        console.error('Erro ao buscar aluno por nome:', e);
    }

}


async function exibirAlunoPorSerie(serie=String) {
    try {
        //constante do tipo de busca
        const tipo = "serie";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/aluno/exibir?tipo=${tipo}&serie=${(serie)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //verifica se a resposta foi ok
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        //converte a resposta para json
        const dadosResposta = await resposta.json();
        //separa da resposta de sucesso para resposta de aluno
        const alunosArray = dadosResposta.alunos;


        if (Array.isArray(alunosArray)) {
            // lista para armazenar objetos aluno
            const listaAlunos = [];
            //pega o lenght da respsota
            const length = alunosArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto aluno usando o metodo deJson da classe Aluno, e adiciona na lista de alunos
                const alunoJson = alunosArray[i];
                //converte para objeto
                const alunoObj = Aluno.deJson(alunoJson);
                //coloca na lista
                listaAlunos.push(alunoObj);

            }
            //retorna lista de retorna
            return listaAlunos;

        }
    } catch (e) {
        console.error('Erro ao buscar aluno por nome:', e);
    }

}


async function exibirAlunoPorStatus(status=String) {
    try {
        //constante do tipo de busca
        const tipo = "status";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/aluno/exibir?tipo=${tipo}&status=${(status)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //verifica se a resposta foi ok
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        //converte a resposta para json
        const dadosResposta = await resposta.json();
        //separa da resposta de sucesso para resposta de aluno
        const alunosArray = dadosResposta.alunos;


        if (Array.isArray(alunosArray)) {
            // lista para armazenar objetos aluno
            const listaAlunos = [];
            //pega o lenght da respsota
            const length = alunosArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto aluno usando o metodo deJson da classe Aluno, e adiciona na lista de alunos
                const alunoJson = alunosArray[i];
                //converte para objeto
                const alunoObj = Aluno.deJson(alunoJson);
                //coloca na lista
                listaAlunos.push(alunoObj);

            }
            //retorna lista de retorna
            return listaAlunos;

        }
    } catch (e) {
        console.error('Erro ao buscar aluno por nome:', e);
    }

}






async function exibirAlunoPorIndex(index=String) {
    try {
        //constante do tipo de busca
        const tipo = "index";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/aluno/exibir?tipo=${tipo}&indice=${(index)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //verifica se a resposta foi ok
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        //converte a resposta para json
        const dadosResposta = await resposta.json();
        //separa da resposta de sucesso para resposta de aluno
        const alunosArray = dadosResposta.alunos;


        if (Array.isArray(alunosArray)) {
            // lista para armazenar objetos aluno
            const listaAlunos = [];
            //pega o lenght da respsota
            const length = alunosArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto aluno usando o metodo deJson da classe Aluno, e adiciona na lista de alunos
                const alunoJson = alunosArray[i];
                //converte para objeto
                const alunoObj = Aluno.deJson(alunoJson);
                //coloca na lista
                listaAlunos.push(alunoObj);

            }
            //retorna lista de retorna
            return listaAlunos;

        }
    } catch (e) {
        console.error('Erro ao buscar aluno por nome:', e);
    }

}



async function deletarAluno(id=String) {
    try {
        //constante do tipo de busca

        //cria a url com os parametros, e usa fetch para fazer a requisição post
        const resposta = await fetch(`${url}app/aluno/deletar?_id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //verifica se a resposta foi ok
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        //converte a resposta para json
        const dadosResposta = await resposta.json();
        //separa da resposta de sucesso para resposta de aluno

        return dadosResposta;
    } catch (e) {
        console.error('Erro ao buscar aluno por nome:', e);
    }

}



//no JS n tem tipagem, portanto usamos o = para dizer que os atributos da função só aceitam string e Aluno
async function atualizarAluno(id=String, aluno=Aluno) {
    try {
        aluno = aluno.paraJson();
        //metodo que que envia e conecta no backend para atualizar um aluno
        const resposta = await fetch(`${url}app/aluno/atualizar?_id=${id}`, {
            method: 'POST',
            headers: {
                //seta o tipo de conteudo para json, para o backend entender que é um json
                'Content-Type': 'application/json',
            },
            //transforma para string o json aluno
            body: JSON.stringify(aluno)
        });

        // Verificar se a resposta foi ok
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        // Converter resposta para json
        const dadosResposta = await resposta.json();
        console.log('sucesso:', dadosResposta);


        //retorna os dados da resposta para o frontend
        return dadosResposta;

        //try e catch, igual o java
    } catch (e) {
        //mensagem de erro, como no front é menos comum n tem um tratamento completo
        console.error('erro ao enviar:', e);
    }

}




async function logarAluno(email=String, senha=String) {
    try {

        const login = {
            email: email,
            senha: senha
        }

        //metodo que que envia e conecta no backend para criar um aluno
        const resposta = await fetch(`${url}app/aluno/logar`, {
            method: 'POST',
            headers: {
                //seta o tipo de conteudo para json, para o backend entender que é um json
                'Content-Type': 'application/json',
            },
            //transforma para string o json aluno
            body: JSON.stringify(login)
        });

        // Verificar se a resposta foi ok
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        // Converter resposta para json
        const dadosResposta = await resposta.json();
        

        //retorna os dados da resposta para o frontend
        const retorno = dadosResposta.retorno;
        return retorno;
        
        //try e catch, igual o java
    } catch (e) {
        //mensagem de erro, como no front é menos comum n tem um tratamento completo
        console.error('erro ao enviar:', e);
    }
    
}


async function exibirAlunoPorId(id=String) {
    try {
        //constante do tipo de busca
        const tipo = "id";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/aluno/exibir?tipo=${tipo}&id=${(id)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //verifica se a resposta foi ok
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        //converte a resposta para json
        const dadosResposta = await resposta.json();
        //separa da resposta de sucesso para resposta de aluno
        const alunosArray = dadosResposta.alunos;


        if (Array.isArray(alunosArray)) {
            // lista para armazenar objetos aluno
            const listaAlunos = [];
            //pega o lenght da respsota
            const length = alunosArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto aluno usando o metodo deJson da classe Aluno, e adiciona na lista de alunos
                const alunoJson = alunosArray[i];
                //converte para objeto
                const alunoObj = Aluno.deJson(alunoJson);
                //coloca na lista
                listaAlunos.push(alunoObj);

            }
            //retorna lista de retorna
            return listaAlunos;

        }
    } catch (e) {
        console.error('Erro ao buscar aluno por nome:', e);
    }
    
}

async function adicionarObs(obs=Observacoes, id=String) {
    const alunos = await exibirAlunoPorId(id);
    const aluno = alunos[0];    
    aluno.getObservacoes().push(obs);
    return await atualizarAluno(id, aluno);
}


// essa funcao só recria o aluno, maldito seja o mongo, de qualquer forma só seguir os paramentros colocando a objeto OBS que quer remover e o id aluno
async function removerObs(obs, id=String) {
    //busca o aluno
    const alunos = await exibirAlunoPorId(id);
        
        if (!alunos || alunos.length === 0) {
            throw new Error('Aluno não encontrado');
        }
        
        //cria um novo objeto
        const aluno = alunos[0];
        const observacoes = aluno.getObservacoes();
        
        // Comparacao profunda das propriedades
        const novasObservacoes = observacoes.filter(o => 
            o.observacao !== obs.observacao
        );

        if (novasObservacoes.length === observacoes.length) {
            console.log('Nenhuma observação correspondente encontrada');
            return;
        }

        aluno.setObservacoes(novasObservacoes);

        const resultado = await atualizarAluno(id, aluno);
        return resultado;

}

async function atualizarObs(obsAntiga, id=String, novaObs) {
    //busca o aluno
    const alunos = await exibirAlunoPorId(id);
        
        if (!alunos || alunos.length === 0) {
            throw new Error('Aluno não encontrado');
        }
        
        //cria um novo objeto
        const aluno = alunos[0];
        const observacoes = aluno.getObservacoes();
        
        const index = observacoes.findIndex(o => 
            o.observacao === obsAntiga.observacao
        );

        if (index === -1) {
            throw new Error('Observação não encontrada');
        }

        observacoes[index] = novaObs;
        const resultado = await atualizarAluno(id, aluno);
        return resultado;
}

async function atualizarNota(nota = Notas, id = String) {
    const alunos = await exibirAlunoPorId(id);
    if (!alunos || alunos.length === 0) return { success: false, message: "Aluno não encontrado" };

    const aluno = alunos[0];

    const listaNotas = aluno.notas; 

    const index = listaNotas.findIndex(n => 
        Number(n.id_disciplina) === Number(nota.id_disciplina) && 
        n.periodo === nota.periodo
    );

    if (index !== -1) {
        listaNotas[index] = nota;
    } else {
        listaNotas.push(nota);
    }

    return await atualizarAluno(id, aluno);
}

//atualiza o aluno mas adicionando uma nota no fim do array
async function criarNota(nota=Notas, id=String) {
    const alunos = await exibirAlunoPorId(id);
    const aluno = alunos[0];    

    const listaNotas = aluno.notas;

    const index = listaNotas.findIndex(n => 
        n.id_disciplina === notaObjeto.id_disciplina && 
        n.periodo === notaObjeto.periodo
    );

    if (index !== -1) {
        listaNotas[index] = nota;
    } else {
        listaNotas.push(nota);
    }

    return await atualizarAluno(id, aluno);
}

async function exibirAlunoPorEmail(email=String) {
    try {
        //constante do tipo de busca
        const tipo = "email";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/aluno/exibir?tipo=${tipo}&email=${(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //verifica se a resposta foi ok
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        //converte a resposta para json
        const dadosResposta = await resposta.json();
        //separa da resposta de sucesso para resposta de aluno
        const alunosArray = dadosResposta.alunos;


        if (Array.isArray(alunosArray)) {
            // lista para armazenar objetos aluno
            const listaAlunos = [];
            //pega o lenght da respsota
            const length = alunosArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto aluno usando o metodo deJson da classe Aluno, e adiciona na lista de alunos
                const alunoJson = alunosArray[i];
                //converte para objeto
                const alunoObj = Aluno.deJson(alunoJson);
                //coloca na lista
                listaAlunos.push(alunoObj);

            }
            //retorna lista de retorna
            return listaAlunos;

        }
    } catch (e) {
        console.error('Erro ao buscar aluno por nome:', e);
    }

}
async function exibirAlunoPorMatricula(matricula=String) {
    try {
        //constante do tipo de busca
        const tipo = "matricula";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/aluno/exibir?tipo=${tipo}&matricula=${(matricula)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //verifica se a resposta foi ok
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        //converte a resposta para json
        const dadosResposta = await resposta.json();
        //separa da resposta de sucesso para resposta de aluno
        const alunosArray = dadosResposta.alunos;


        if (Array.isArray(alunosArray)) {
            // lista para armazenar objetos aluno
            const listaAlunos = [];
            //pega o lenght da respsota
            const length = alunosArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto aluno usando o metodo deJson da classe Aluno, e adiciona na lista de alunos
                const alunoJson = alunosArray[i];
                //converte para objeto
                const alunoObj = Aluno.deJson(alunoJson);
                //coloca na lista
                listaAlunos.push(alunoObj);

            }
            //retorna lista de retorna
            return listaAlunos;

        }
    } catch (e) {
        console.error('Erro ao buscar aluno por nome:', e);
    }

}

export { criarAluno, exibirAlunoPorIndex, exibirAlunoPorNome, exibirAlunoPorSerie, exibirAlunoPorStatus, deletarAluno, atualizarAluno, logarAluno, exibirAlunoPorId, adicionarObs, removerObs, atualizarObs, atualizarNota, criarNota , exibirAlunoPorEmail, exibirAlunoPorMatricula};