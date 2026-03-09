class Notas {
    constructor(idProfessor, idDisciplina, nota, periodo) {
        this.idProfessor = idProfessor;
        this.idDisciplina = idDisciplina;
        this.nota = nota;
        this.periodo = periodo;
    }

    getIdProfessor() { return this.idProfessor; }
    getIdDisciplina() { return this.idDisciplina; }
    getNota() { return this.nota; }
    getPeriodo() { return this.periodo; }
}

export default Notas; 