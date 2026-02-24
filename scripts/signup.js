
// limpampando o localStorage caso volte para a página de login
localStorage.clear();

// seleciona o forms em que é necessario para o cadastro 
const form = document.querySelector('form');


form.addEventListener('submit', async (event) => {

    // não deixa a pagina recarregar
    event.preventDefault();

    // objeto para pegar os dados do input
    const dados = new FormData(form);

    // pegando atraves do atributo name a senha e o email dos inputs
    const matricula = dados.get('iReg');
    const email = dados.get('iEmail'); 
    const senha = dados.get('iPasswd');

    
})