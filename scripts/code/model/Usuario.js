class Usuario {
    constructor(nome, nomeUsuario, senha, tipo, email, id) {
        this.nome = nome;
        this.nomeUsuario = nomeUsuario;
        this.senha = senha;
        this.tipo = tipo;
        this.email = email;
        this.id = id;
    }

    getNome() { return this.nome; }
    getNomeUsuario() { return this.nomeUsuario; }
    getSenha() { return this.senha; }
    getTipo() { return this.tipo; }
    getEmail() { return this.email; }
    getId() { return this.id; }
}

export default Usuario;