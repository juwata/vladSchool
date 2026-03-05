import Usuario from "./Usuario.js";

class Professor extends Usuario {
    constructor(nome, nomeUsuario, senha, tipo, email, id,idProfessor,disciplinasLecionadas) {
        super(nome, nomeUsuario, senha, tipo, email, id);
        this.idProfessor=idProfessor
        this.disciplinasLecionadas=disciplinasLecionadas
    }

    getIdProfessor() {return this.idProfessor}
    getDisciplinasLecionadas() {return this.disciplinasLecionadas}

    paraJson() {
        try {
            const professorJson = {
                nome: super.getNome(),
                nome_usuario: super.getNomeUsuario(),
                senha: super.getSenha(),
                email: super.getEmail(),
                tipo: "professor",
                dados_professor: {
                    id_professor: this.idProfessor,
                    disciplinaLecionadas: this.disciplinasLecionadas
                }
            };
            return professorJson;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static deJson(jsonDoc=JSON){
        try{
            const id = jsonDoc._id ? (jsonDoc._id.$oid || jsonDoc._id) : null;
            const nome = jsonDoc.nome;
            const nomeUsuario = jsonDoc.nome_usuario;
            const senha = jsonDoc.senha;
            const email = jsonDoc.email;
            const tipo = jsonDoc.tipo;


            const dadosProfessor = jsonDoc.dados_professor;

            const idProfessor = dadosProfessor.id_professor
            const disciplinasLecionadas = dadosProfessor.disciplinaLecionadas

            
            const professor = new Professor(
                nome, nomeUsuario, senha, tipo, email, id ,
                idProfessor,disciplinasLecionadas
            );
            return professor;



        }catch(e){
            console.error("Erro ao converter de JSON:", e);
            return null;
        }
    }
}

export default Professor;