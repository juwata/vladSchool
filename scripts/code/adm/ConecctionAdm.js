import Usuario from '../model/Usuario.js';

const url = 'http://localhost:8080/TrabalhoDSV2/';

async function logarAdm(email=String, senha=String) {
    try {

        const login = {
            email: email,
            senha: senha
        }

        //metodo que que envia e conecta no backend para criar um aluno
        const resposta = await fetch(`${url}app/adm/logar`, {
            method: 'POST',
            headers: {
                //seta o tipo de conteudo para json, para o backend entender que é um json
                'Content-Type': 'application/json',
            },
            //transforma para string o json login
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

async function exibirAdmPorEmail(email=String) {
    try {
        //constante do tipo de busca
        const tipo = "email";
        //cria a url com os parametros, e usa fetch para fazer a requisição get
        const resposta = await fetch(`${url}app/adm/exibir?tipo=${tipo}&email=${(email)}`, {
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
        //separa da resposta de sucesso para resposta de adm
        const admArray = dadosResposta.adms;


        if (Array.isArray(admArray)) {
            // lista para armazenar objetos adm
            const admAlunos = [];
            //pega o lenght da respsota
            const length = admArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto adm usando o metodo deJson da classe Usuario, e adiciona na lista de adms
                const admJson = admArray[i];
                //converte para objeto
                const admObj = Usuario.deJson(admJson);
                //coloca na lista
                admAlunos.push(admObj);

            }
            //retorna lista de retorna
            return admAlunos;

        }
    } catch (e) {
        console.error('Erro ao buscar aluno por nome:', e);
    }

}

export { logarAdm, exibirAdmPorEmail }