import Disciplinas from "./Disciplina.js";
import { exibirDisciplinaPorId, exibirDisciplinaPorNome, exibirDisciplinaPorObId, exibirDisciplinaPorTodas, criarDisciplina, deletarDisciplina, atualizarDisciplina} from "./ConnectionDisciplina.js";


//console.log(await exibirDisciplinaPorObId("6982688e84e6bb2a7643c82d"))

const disciplina = new Disciplinas(0, "", "esse valor n importa"); 
await atualizarDisciplina("699498f727976213ae0c7863", disciplina);  
//console.log(await deletarDisciplina(4));
//await criarDisciplina(disciplina)