 
function gerarCorRGB() {
    const r = Math.floor(Math.random() * 256);   
    const g = Math.floor(Math.random() * 256);  
    const b = Math.floor(Math.random() * 256);  
    return `rgb(${r}, ${g}, ${b})`;  
}


function gerarCoresDiferentes() {
    let cores = [];
    while (cores.length < 6) {
        const novaCor = gerarCorRGB();
        if (!cores.includes(novaCor)) {
            cores.push(novaCor);
        }
    }
    return cores;
}


const container = document.getElementById("container");
const formigas = document.querySelectorAll(".formiga img");


let cores = gerarCoresDiferentes();


formigas.forEach((formiga, index) => {
    formiga.style.backgroundColor = cores[index];
});


document.getElementById("gerar").addEventListener("click", () => {
   
    cores = gerarCoresDiferentes();

    
    formigas.forEach((formiga, index) => {
        formiga.style.backgroundColor = cores[index];
    });

    
    gerarGraficoRoleta(cores); 
});
