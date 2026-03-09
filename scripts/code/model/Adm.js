class Adm {
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

    paraJson() {
        try {
            const admJson = {
                id: this.getId(),
                nome: this.getNome(),
                nome_usuario: this.getNomeUsuario(),
                senha: this.getSenha(),
                email: this.getEmail(),
                tipo: "adm"
            };
            return admJson;
        } catch(e) {
            console.error("Erro ao converter para JSON:", e);
            return null;
        }
    }

    static deJson(jsonDoc = JSON) {
        try {
            const id = jsonDoc._id ? (jsonDoc._id.$oid || jsonDoc._id) : null;
            const nome = jsonDoc.nome;
            const nomeUsuario = jsonDoc.nome_usuario;
            const senha = jsonDoc.senha;
            const email = jsonDoc.email;
            const tipo = jsonDoc.tipo || "adm";

            const adm = new Adm(
                nome, 
                nomeUsuario, 
                senha, 
                tipo, 
                email, 
                id
            );
            
            return adm;
        } catch(e) {
            console.error("Erro ao converter de JSON:", e);
            return null;
        }
    }

    toString() {
        return JSON.stringify({
            id: this.getId(),
            nome: this.getNome(),
            nomeUsuario: this.getNomeUsuario(),
            email: this.getEmail(),
            tipo: this.getTipo()
        }, null, 2);
    }
}

export default Adm;