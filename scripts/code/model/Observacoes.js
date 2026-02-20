class Observacoes{
    constructor(idProfessor, data,  observacao){
        this.idProfessor=idProfessor;
        this.data=data;
        this.observacao=observacao;
    }

    getIdProfessor() { return this.idProfessor; }
    getData() { return this.data; }
    getObservacao() { return this.observacao; }
}

export default Observacoes;