class Disciplinas {
    constructor(idDisciplina, nome=String, _id=String) {
        this.idDisciplina = idDisciplina;
        this.nome = nome;
        this._id = _id;
    }


    getIdDisciplina() {return this.idDisciplina;}

    getNome() {return this.nome;}

    getId() {return this._id}


    static deJson(jsonDoc) {
        try {
            const id = jsonDoc.id_disciplina;
            const nome = jsonDoc.nome;
            let _id = jsonDoc._id;
            _id = _id.$oid; // Extrair o valor do $oid
            
            return new Disciplinas(id, nome, _id);
        } catch (e) {
            console.error("Erro ao converter de JSON:", e);
            return null;
        }
    }

    paraJson() {
        try {
            const disciplinaJson = {
                id_disciplina: this.idDisciplina,
                nome: this.nome
            };

            if (this._id) {
                disciplinaJson._id = this._id;
            }

            return disciplinaJson;
        } catch (e) {
            console.error("Erro ao converter para JSON:", e);
            return null;
        }
    }

    toString() {
        return `Disciplinas{idDisciplina=${this.idDisciplina}, nome='${this.nome}', _id='${this._id}'}`;
    }
}

export default Disciplinas;
