import Disciplinas from "./Disciplina.js"

const url = 'http://localhost:8080/TrabalhoDSV2/';



 // para criar uma disciplina o id e _id n importam pq o banco vai criar e substituir eles automaticamente, ent ao o valor do id e _id n importa, mas tem que ser passado um valor, por isso coloquei 0 e "esse valor n importa"
async function criarDisciplina(disciplina=Disciplinas) {
    try {
        disciplina = disciplina.paraJson();

        //metodo que que envia e conecta no backend para criar uma disciplina'
        const resposta = await fetch(`${url}app/disciplina/criar`, {
            method: 'POST',
            headers: {
                //seta o tipo de conteudo para json, para o backend entender que é um json
                'Content-Type': 'application/json',
            },
            //transforma para string o json disciplina
            body: JSON.stringify(disciplina)
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


async function exibirDisciplinaPorNome(nome=String) {
    try {
        //constante do tipo de busca
        const tipo = "nome";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/disciplina/exibir?tipo=${tipo}&nome=${(nome)}`, {
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
        //separa da resposta de sucesso para resposta de disciplina
        const disciplinasArray = dadosResposta.disciplinas;


        if (Array.isArray(disciplinasArray)) {
            // lista para armazenar objetos disciplina
            const listaDisciplinas = [];
            //pega o lenght da respsota
            const length = disciplinasArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto disciplinas usando o metodo deJson da classe disciplinas, e adiciona na lista de disciplinas
                const disciplinasJson = disciplinasArray[i];
                //converte para objeto
                const disciplinasObj = Disciplinas.deJson(disciplinasJson);
                //coloca na lista
                listaDisciplinas.push(disciplinasObj);

            }
            //retorna lista de retorna
            return listaDisciplinas;

        }
    } catch (e) {
        console.error('Erro ao buscar disciplina:', e);
    }
    
}



async function exibirDisciplinaPorTodas() {
    try {
        //constante do tipo de busca
        const tipo = "todas";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/disciplina/exibir?tipo=${tipo}`, {
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
        //separa da resposta de sucesso para resposta de disciplina
        const disciplinasArray = dadosResposta.disciplinas;


        if (Array.isArray(disciplinasArray)) {
            // lista para armazenar objetos disciplina
            const listaDisciplinas = [];
            //pega o lenght da respsota
            const length = disciplinasArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto disciplinas usando o metodo deJson da classe disciplinas, e adiciona na lista de disciplinas
                const disciplinasJson = disciplinasArray[i];
                //converte para objeto
                const disciplinasObj = Disciplinas.deJson(disciplinasJson);
                //coloca na lista
                listaDisciplinas.push(disciplinasObj);

            }
            //retorna lista de retorna
            return listaDisciplinas;

        }
    } catch (e) {
        console.error('Erro ao buscar disciplina', e);
    }
    
}



async function exibirDisciplinaPorId(id) {
    if (!Number.isInteger(id)) {
        console.log("O id deve ser um numero");
        return;
    }
    try {
        //constante do tipo de busca
        const tipo = "id";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/disciplina/exibir?tipo=${tipo}&id=${(id)}`, {
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
        //separa da resposta de sucesso para resposta de disciplina
        const disciplinasArray = dadosResposta.disciplinas;


        if (Array.isArray(disciplinasArray)) {
            // lista para armazenar objetos disciplina
            const listaDisciplinas = [];
            //pega o lenght da respsota
            const length = disciplinasArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto disciplinas usando o metodo deJson da classe disciplinas, e adiciona na lista de disciplinas
                const disciplinasJson = disciplinasArray[i];
                //converte para objeto
                const disciplinasObj = Disciplinas.deJson(disciplinasJson);
                //coloca na lista
                listaDisciplinas.push(disciplinasObj);

            }
            //retorna lista de retorna
            return listaDisciplinas;

        }
    } catch (e) {
        console.error('Erro ao buscar disciplina por nome:', e);
    }
    
}



async function exibirDisciplinaPorObId(_id=String) {
    try {
        //constante do tipo de busca
        const tipo = "_id";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/disciplina/exibir?tipo=${tipo}&_id=${(_id)}`, {
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
        //separa da resposta de sucesso para resposta de disciplina
        const disciplinasArray = dadosResposta.disciplinas;


        if (Array.isArray(disciplinasArray)) {
            // lista para armazenar objetos disciplina
            const listaDisciplinas = [];
            //pega o lenght da respsota
            const length = disciplinasArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto disciplinas usando o metodo deJson da classe disciplinas, e adiciona na lista de disciplinas
                const disciplinasJson = disciplinasArray[i];
                //converte para objeto
                const disciplinasObj = Disciplinas.deJson(disciplinasJson);
                //coloca na lista
                listaDisciplinas.push(disciplinasObj);

            }
            //retorna lista de retorna
            return listaDisciplinas;

        }
    } catch (e) {
        console.error('Erro ao buscar disciplina por nome:', e);
    }
    
}


async function deletarDisciplina(id=String) {
    try {
        //constante do tipo de busca

        //cria a url com os parametros, e usa fetch para fazer a requisição post
        const resposta = await fetch(`${url}app/disciplina/deletar?id=${id}`, {
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
        //separa da resposta de sucesso para resposta de Disciplina

        return dadosResposta;
    } catch (e) {
        console.error('Erro ao deletar Disciplina:', e);
    }
    
}


//no JS n tem tipagem, portanto usamos o = para dizer que os atributos da função só aceitam string e disciplina
async function atualizarDisciplina(id=String, disciplina=Disciplinas) {
    try {
        disciplina = disciplina.paraJson();

        //metodo que que envia e conecta no backend para atualizar uma disciplina
        const resposta = await fetch(`${url}app/disciplina/atualizar?id=${id}`, {
            method: 'POST',
            headers: {
                //seta o tipo de conteudo para json, para o backend entender que é um json
                'Content-Type': 'application/json',
            },
            //transforma para string o json disciplina
            body: JSON.stringify(disciplina)
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




export {exibirDisciplinaPorNome, exibirDisciplinaPorId, exibirDisciplinaPorObId, exibirDisciplinaPorTodas, criarDisciplina, deletarDisciplina, atualizarDisciplina};