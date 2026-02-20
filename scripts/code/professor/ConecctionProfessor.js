import Professor from '../model/Professor.js';

const url = 'http://localhost:8080/TrabalhoDSV2/';

async function exibirProfessorPorId(id) {
    try {
        //constante do tipo de busca
        const tipo = "idProfessor";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/professor/exibir?tipo=${tipo}&idProfessor=${(id)}`, {
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
        //separa da resposta de sucesso para resposta de professor
        const professoresArray = dadosResposta.professores;


        if (Array.isArray(professoresArray)) {
            // lista para armazenar objetos professores
            const listaProfessores = [];
            //pega o lenght da respsota
            const length = professoresArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto professor usando o metodo deJson da classe Professor, e adiciona na lista de professores
                const professorJson = professoresArray[i];
                //converte para objeto
                const professorObj = Professor.deJson(professorJson);
                //coloca na lista
                listaProfessores.push(professorObj);

            }
            //retorna lista de retorna
            return listaProfessores;

        }
    } catch (e) {
        console.error('Erro ao buscar aluno por nome:', e);
    }
    
}
async function logarProfessor(email=String, senha=String) {
    try {

        const login = {
            email: email,
            senha: senha
        }

        //metodo que que envia e loga um professor
        const resposta = await fetch(`${url}app/professor/logar`, {
            method: 'POST',
            headers: {
                //seta o tipo de conteudo para json, para o backend entender que é um json
                'Content-Type': 'application/json',
            },
            //transforma para string o json professor
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
async function exibirProfessorPorEmail(email=String) {
    try {
        //constante do tipo de busca
        const tipo = "email";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/professor/exibir?tipo=${tipo}&email=${email}`, {
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
        //separa da resposta de sucesso para resposta de professor
        const professoresArray = dadosResposta.professores;


        if (Array.isArray(professoresArray)) {
            // lista para armazenar objetos professores
            const listaProfessores = [];
            //pega o lenght da respsota
            const length = professoresArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto professor usando o metodo deJson da classe Professor, e adiciona na lista de professores
                const professorJson = professoresArray[i];
                //converte para objeto
                const professorObj = Professor.deJson(professorJson);
                //coloca na lista
                listaProfessores.push(professorObj);

            }
            //retorna lista de retorna
            return listaProfessores;

        }
    } catch (e) {
        console.error('Erro ao buscar aluno por nome:', e);
    }
    
}
export { exibirProfessorPorId, logarProfessor, exibirProfessorPorEmail};