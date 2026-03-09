"use strict";
import { criarObjetoTurmas } from "./renderAluno.js";

/* ===== DADOS ===== */
let turmas = {}; // Inicializa como objeto vazio
let charts = {};
let filtro = "ALL";
let notaChart = null; // Declara a variável do gráfico globalmente

const media = a => a.n1 != null && a.n2 != null ? (a.n1 + a.n2) / 2 : null;

function alunos() {
    // Verifica se turmas existe e tem dados
    if (!turmas || Object.keys(turmas).length === 0) {
        return [];
    }
    
    if (filtro === "ALL") {
        return Object.entries(turmas)
            .flatMap(([t, arr]) => {
                // Verifica se arr é um array
                if (Array.isArray(arr)) {
                    return arr.map(a => ({ ...a, turma: t }));
                }
                return [];
            });
    }
    
    // Verifica se a turma específica existe e é um array
    if (turmas[filtro] && Array.isArray(turmas[filtro])) {
        return turmas[filtro].map(a => ({ ...a, turma: filtro }));
    }
    
    return [];
}

function status(a) {
    if (!a) return "Sem notas";
    const m = media(a);
    if (m === null) return "Sem notas";
    if (m >= 7) return "Aprovado";
    if (m >= 5) return "Recuperação";
    return "Reprovado";
}

function criar(id, config) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    
    if (charts[id]) {
        charts[id].destroy();
        delete charts[id];
    }
    charts[id] = new Chart(canvas, config);
}

/* ===== RENDER ===== */
function render() {
    const dados = alunos();
    
    // Se não há dados, exibe mensagem ou retorna
    if (dados.length === 0) {
        console.log("Nenhum dado disponível");
        return;
    }
    
    const total = dados.length;

    const pendentes = dados.filter(a => a.n1 == null || a.n2 == null);
    const criticos = dados.filter(a => a.n1 == null || a.n2 == null || (media(a) != null && media(a) < 4));

    const comMedia = dados.filter(a => media(a) != null);
    const mediaGeral = comMedia.length > 0 ? 
        comMedia.reduce((s, a) => s + media(a), 0) / comMedia.length : 0;

    // Verifica se os elementos existem antes de acessar
    const kpiTotal = document.getElementById('kpiTotal');
    const kpiMedia = document.getElementById('kpiMedia');
    const kpiCriticos = document.getElementById('kpiCriticos');
    const kpiCompletude = document.getElementById('kpiCompletude');
    
    if (kpiTotal) kpiTotal.textContent = total;
    if (kpiMedia) kpiMedia.textContent = mediaGeral.toFixed(2);
    if (kpiCriticos) kpiCriticos.textContent = ((criticos.length / total) * 100).toFixed(1) + "%";
    if (kpiCompletude) kpiCompletude.textContent = ((1 - pendentes.length / total) * 100).toFixed(1) + "%";

    /* SITUAÇÃO */
    const counts = { Aprovado: 0, Recuperação: 0, Reprovado: 0, "Sem notas": 0 };
    dados.forEach(a => {
        if (a) counts[status(a)]++;
    });

    criar("chartSituacao", {
        type: "doughnut",
        data: {
            labels: Object.keys(counts),
            datasets: [{ 
                data: Object.values(counts),
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#9E9E9E']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    /* COMPLETUDE */
    criar("chartCompletude", {
        type: "doughnut",
        data: {
            labels: ["Completo", "Pendente"],
            datasets: [{ 
                data: [total - pendentes.length, pendentes.length],
                backgroundColor: ['#4CAF50', '#FFC107']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    /* TOP 5 */
    const top = dados.filter(a => media(a) != null)
        .sort((a, b) => media(b) - media(a)).slice(0, 5);

    if (top.length > 0) {
        criar("chartTop", {
            type: "bar",
            data: {
                labels: top.map(a => a.nome),
                datasets: [{ 
                    data: top.map(a => media(a)),
                    backgroundColor: '#2196F3'
                }]
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                scales: { x: { max: 10 } }
            }
        });
    }

    /* NOTAS */
    const selectAluno = document.getElementById('selectAluno');
    const chartNotasCanvas = document.getElementById('chartNotas');
    
    if (selectAluno && chartNotasCanvas) {
        selectAluno.innerHTML = dados.map(a => `<option value="${a.nome}">${a.nome}</option>`).join("");
        
        // Destroi o gráfico anterior se existir
        if (notaChart) {
            notaChart.destroy();
        }
        
        // Cria novo gráfico
        notaChart = new Chart(chartNotasCanvas, {
            type: "bar",
            data: { 
                labels: ["N1", "N2"], 
                datasets: [{ 
                    data: [0, 0],
                    backgroundColor: ['#2196F3', '#4CAF50']
                }] 
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 10 } }
            }
        });

        selectAluno.onchange = () => {
            const a = dados.find(x => x.nome === selectAluno.value);
            if (a && notaChart) {
                notaChart.data.datasets[0].data = [a.n1 ?? 0, a.n2 ?? 0];
                notaChart.update();
            }
        };
    }

    /* CRÍTICOS */
    const tabelaCriticos = document.getElementById('tabelaCriticos');
    if (tabelaCriticos) {
        tabelaCriticos.innerHTML = criticos.map(a => `
        <tr>
            <td>${a.nome || '-'}</td>
            <td>${a.turma || '-'}</td>
            <td>${a.n1 != null ? a.n1.toFixed(1) : '-'}</td>
            <td>${a.n2 != null ? a.n2.toFixed(1) : '-'}</td>
            <td>${media(a) != null ? media(a).toFixed(1) : '-'}</td>
        </tr>`).join("");
    }
}

/* ===== INICIALIZAÇÃO ===== */
async function inicializar() {
    try {
        console.log("Inicializando...");
        
        // Aguarda os dados do banco
        turmas = await criarObjetoTurmas();
        console.log("Turmas carregadas:", turmas);
        
        // Verifica se os elementos existem antes de atribuir eventos
        const filtroTurma = document.getElementById('filtroTurma');
        const btnProfessor = document.getElementById('btnProfessor');
        const btnAdmin = document.getElementById('btnAdmin');
        
        if (filtroTurma) {
            filtroTurma.onchange = (e) => {
                filtro = e.target.value;
                render();
            };
        } else {
            console.warn("Elemento filtroTurma não encontrado");
        }

        if (btnProfessor) {
            btnProfessor.onclick = () => document.body.className = "theme-professor";
        }

        if (btnAdmin) {
            btnAdmin.onclick = () => document.body.className = "theme-admin";
        }

        // Renderiza os dados
        render();
        
    } catch (error) {
        console.error("Erro ao inicializar:", error);
    }
}

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', inicializar);