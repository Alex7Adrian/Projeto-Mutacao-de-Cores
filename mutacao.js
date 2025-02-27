document.getElementById("aplicarMutacao").addEventListener("click", function () {
    let tipo = document.getElementById("tipoMutacao").value;
    let coresOriginais = [];
    let coresMutadas = [];

    for (let i = 1; i <= 6; i++) {
        const div = document.getElementById(`escolhida-${i}`);
        if (div) {
            let cor = window.getComputedStyle(div).backgroundColor;
            coresOriginais.push(cor);

            if (tipo === "aleatoria") {
                coresMutadas.push(mutacaoAleatoria(cor));
            } else if (tipo === "pequena") {
                coresMutadas.push(mutacaoPequena(cor));
            } else if (tipo === "dirigida") {
                coresMutadas.push(mutacaoDirigida(cor));
            }
        }
    }

    coresMutadas.forEach((cor, i) => {
        document.getElementById(`escolhida-${i + 1}`).style.backgroundColor = cor;
    });

    exibirResultadosMutacao(coresOriginais, coresMutadas, tipo);
});

function exibirResultadosMutacao(originais, mutadas, tipo) {
    document.getElementById("resultadoMutacao").innerHTML = `
        <h2>Mutação Aplicada (${tipo})</h2>
        ${originais.map((cor, i) => `
            <div class="resultado-mutacao">
                <div class="cor" style="background-color:${cor};">${cor}</div>
                <span class="mutacao-tipo"> → ${tipo} → </span>
                <div class="cor" style="background-color:${mutadas[i]};">${mutadas[i]}</div>
            </div>
        `).join("")}
    `;
}

function mutacaoAleatoria(cor) {
    let [r, g, b] = extrairRGB(cor);
    let componente = randInt(3); // Escolhe aleatoriamente entre 0 (R), 1 (G) ou 2 (B)
    
    if (componente === 0) r = randInt(256);
    else if (componente === 1) g = randInt(256);
    else b = randInt(256);

    return `rgb(${r}, ${g}, ${b})`;
}

function mutacaoPequena(cor) {
    let [r, g, b] = extrairRGB(cor);
    let componente = randInt(3); 
    let ajuste = randRange(-10, 10); 

    if (componente === 0) r = limitarRGB(r + ajuste);
    else if (componente === 1) g = limitarRGB(g + ajuste);
    else b = limitarRGB(b + ajuste);

    return `rgb(${r}, ${g}, ${b})`;
}

function mutacaoDirigida(cor) {
    let [r, g, b] = extrairRGB(cor);
    let reducao = randRange(5, 20); 
    
    r = limitarRGB(r - reducao);
    g = limitarRGB(g - reducao);
    b = limitarRGB(b - reducao);

    return `rgb(${r}, ${g}, ${b})`;
}

function extrairRGB(cor) {
    let rgb = cor.match(/\d+/g);
    return rgb ? rgb.map(Number) : [255, 255, 255];
}

function randInt(max) {
    return Math.floor(Math.random() * max);
}

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function limitarRGB(valor) {
    return Math.max(0, Math.min(255, valor)); 
}
