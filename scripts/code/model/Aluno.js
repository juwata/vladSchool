
import Usuario from "./Usuario.js";
import Notas from "./Notas.js";        
import Observacoes from "./Observacoes.js"; 
class Aluno extends Usuario {
    constructor(nome, nomeUsuario, senha, tipo, email, id, matricula, serie, status, notas = null, observacoes = null) {
        super(nome, nomeUsuario, senha, tipo, email, id);
        this.matricula = matricula;
        this.serie = serie;
        this.status = status;
        this.notas = notas || [];
        this.observacoes = observacoes || [];
    }




    getMatricula() {return this.matricula;}

    getSerie() {return this.serie;}

    getStatus() {return this.status;}

    getNotas() {return this.notas;} 

    getObservacoes() {return this.observacoes;}

    getId() {return this.id;}

    setObservacoes(observacoes) {this.observacoes = observacoes;}


    paraJson(){
        try{
        const alunoJson = {
                id: super.getId(),
                nome: super.getNome(),
                nome_usuario: super.getNomeUsuario(),
                senha: super.getSenha(),
                email: super.getEmail(),
                tipo: "aluno"
            };
            const dadosAluno = {
                matricula: this.matricula,
                serie: this.serie,
                status: this.status
            };
            const notasArray = [];
            if (this.notas && Array.isArray(this.notas)){
                for (const nota of this.notas) {
                    const notaJson = {
                        periodo: nota.getPeriodo(),
                        id_professor: nota.getIdProfessor(),
                        id_disciplina: nota.getIdDisciplina(),
                        nota: nota.getNota()
                    };
                    notasArray.push(notaJson);
                }
            }

            const observacoesArray = [];
            if (this.observacoes && Array.isArray(this.observacoes)) {
                for (const obs of this.observacoes) {
                    const obsJson = {
                        id_professor: obs.getIdProfessor(),
                        data: obs.getData(),
                        observacao: obs.getObservacao()
                    };
                    observacoesArray.push(obsJson);
                }
            }

             dadosAluno.notas = notasArray;
            dadosAluno.observacoes = observacoesArray;
            alunoJson.dados_aluno = dadosAluno;
            return alunoJson;
        }catch(e){
            console.error("Erro ao converter para JSON:", e);
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


            const dadosAluno = jsonDoc.dados_aluno;

            const matricula = dadosAluno.matricula;
            const serie = dadosAluno.serie;
            const status = dadosAluno.status;

              const notasList = [];
            const notasDocs = dadosAluno.notas;
            if (notasDocs && Array.isArray(notasDocs)) {
                for (const notaDoc of notasDocs) {
                    const nota = new Notas(
                        notaDoc.id_professor,
                        notaDoc.id_disciplina,
                        notaDoc.nota,
                        notaDoc.periodo
                    );
                    notasList.push(nota);}
                }

                const obsList = [];
            const obsDocs = dadosAluno.observacoes;
            if (obsDocs && Array.isArray(obsDocs)) {
                for (const obsDoc of obsDocs) {
                    const obs = new Observacoes(
                        obsDoc.id_professor,
                        obsDoc.data,
                        obsDoc.observacao
                    );
                    obsList.push(obs);
                }
            }


            const aluno = new Aluno(
                nome, nomeUsuario, senha, tipo, email, id ,
                matricula, serie, status, notasList, obsList
            );
            return aluno;



        }catch(e){
            console.error("Erro ao converter de JSON:", e);
            return null;
        }
    }


    toString() {
        return JSON.stringify({
            id: super.getId(),
            nome: super.getNome(),
            nomeUsuario: super.getNomeUsuario(),
            email: super.getEmail(),
            tipo: super.getTipo(),
            matricula: this.matricula,
            serie: this.serie,
            status: this.status,
            notas: this.notas || [],
            observacoes: this.observacoes || []
        }, null, 2);
    }


}

export default Aluno;