class NotasMostrar {
    constructor(nota1, nota2) {
        this.nota2 = nota2;
        this.nota1 = nota1;
    }
    

    getNota1() { return this.nota1; }
    getNota2() { return this.nota2; }
    
    setNota2(nota2) {this.nota2 = nota2}
    setNota1(nota1) {this.nota1 = nota1}
}

export default NotasMostrar;