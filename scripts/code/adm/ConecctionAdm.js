import Adm from '../model/Adm.js';

const url = 'http://localhost:8080/TrabalhoDSV2/';

async function logarAdm(email=String, senha=String) {
    try {

        const login = {
            email: email,
            senha: senha
        }

        const resposta = await fetch(`${url}app/adm/logar`, {
            method: 'POST',
            headers: {
                //seta o tipo de conteudo para json, para o backend entender que é um json
                'Content-Type': 'application/json',
            },
            //transforma para string o json adm
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

        console.log(`${url}app/adm/exibir?tipo=${tipo}&email=${(email)}`)
        //converte a resposta para json
        const dadosResposta = await resposta.json();
        //separa da resposta de sucesso para resposta de adm
        const admsArray = dadosResposta.adms;
        
        if(admsArray !== undefined && admsArray.length > 0){


            // lista para armazenar objetos adm
            const listaAdms = [];
            //pega o lenght da respsota
            const length = admsArray.length;
            //for de respostas
            for (let i = 0; i < length; i++) {

                //converte cada json da resposta para um objeto adm usando o metodo deJson da classe adm, e adiciona na lista de adms
                const admJson = admsArray[i];
                //converte para objeto
                const admObj = Adm.deJson(admJson);
                //coloca na lista
                listaAdms.push(admObj);

            }
            //retorna lista de retorna
            return listaAdms;

        }
        else{
            console.log('ola')
            return null;
        }
    } catch (e) {
        console.error('Erro ao buscar adm por nome:', e);
    }

}


async function enviarEmailAdm(email=String) {
    try {

        const login = {
            email: email
        }

        const resposta = await fetch(`${url}app/adm/email`, {
            method: 'POST',
            headers: {
                //seta o tipo de conteudo para json, para o backend entender que é um json
                'Content-Type': 'application/json',
            },
            //transforma para string o json adm
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


async function recuperarAdm(email=String, cod=String) {
    try {

        const dados = {
            email: email,
            codigo: cod
        }

        const resposta = await fetch(`${url}app/adm/recuperar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dadosResposta = await resposta.json();
        return dadosResposta;
        
    } catch (e) {
        console.error('erro ao enviar:', e);
    }
}


export { logarAdm, exibirAdmPorEmail, enviarEmailAdm, recuperarAdm };