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

    static deJson(jsonDoc=JSON){
        try{
            const id = jsonDoc._id ? (jsonDoc._id.$oid || jsonDoc._id) : null;
            const nome = jsonDoc.nome;
            const nomeUsuario = jsonDoc.nome_usuario;
            const senha = jsonDoc.senha;
            const email = jsonDoc.email;
            const tipo = jsonDoc.tipo;
    
    
            
    
    
            const usuario = new Usuario(
                nome, nomeUsuario, senha, tipo, email, id ,
            );
            return usuario;
    
        }catch(e){
            console.error("Erro ao converter de JSON:", e);
            return null;
        }
    }
}

export default Usuario;