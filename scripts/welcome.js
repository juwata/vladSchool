let career = 'aluno'
let nome = "Ana Souza"
let color

if (career === 'professor') {
    color = "#00C0E8"

} else if (career === 'aluno') {
    color = "#7B3FF2"

} else {
    color = "#FF383C"
}

document.documentElement.style.setProperty('--mainColor', color)
document.getElementById('roleplay').textContent = career
document.getElementById('nome').textContent = nome