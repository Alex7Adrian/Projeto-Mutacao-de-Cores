document.getElementById("aplicarCrossover").addEventListener("click", function () {
    const selecionadas = [];

    for (let i = 1; i <= 6; i++) {
        const div = document.getElementById(`escolhida-${i}`);
        if (div) {
            let cor = window.getComputedStyle(div).backgroundColor;
            selecionadas.push(cor);
        }
    }

    if (selecionadas.length === 6) {
        const novasCores = aplicarCrossover(selecionadas);
        exibirResultadosCrossover(selecionadas, novasCores);
    } else {
        alert("Erro ao capturar as cores selecionadas.");
    }
});

function exibirResultadosCrossover(coresOriginais, coresGeradas) {
    function gerarHTML(cor1, cor2, resultado) {
        return `
            <div class="resultado-crossover">
                <div class="cor" style="background-color:${cor1};">${cor1}</div>
                <span>+</span>
                <div class="cor" style="background-color:${cor2};">${cor2}</div>
                <span>=</span>
                <div class="cor" style="background-color:${resultado};">${resultado}</div>
            </div>
        `;
    }

    document.getElementById("onePoint").innerHTML = `
        <p><strong>One-Point Crossover:</strong></p>
        ${gerarHTML(coresOriginais[0], coresOriginais[1], coresGeradas[0])}
    `;

    document.getElementById("uniform").innerHTML = `
        <p><strong>Uniform Crossover:</strong></p>
        ${gerarHTML(coresOriginais[2], coresOriginais[3], coresGeradas[1])}
    `;

    document.getElementById("aritmetico").innerHTML = `
        <p><strong>Aritmético Crossover:</strong></p>
        ${gerarHTML(coresOriginais[4], coresOriginais[5], coresGeradas[2])}
    `;
}


function aplicarCrossover(cores) {
    let novasCores = [];

    // Faz crossover com pares de cores
    for (let i = 0; i < cores.length; i += 2) {
        if (i + 1 < cores.length) {
            let cor1 = cores[i];
            let cor2 = cores[i + 1];

            let novaCor1 = crossoverUnicoPonto(cor1, cor2);
            let novaCor2 = crossoverUniforme(cor1, cor2);
            let novaCor3 = crossoverAritmetico(cor1, cor2);

            novasCores.push(novaCor1, novaCor2, novaCor3);
        }
    }
    return novasCores;
}

function crossoverUnicoPonto(cor1, cor2) {
    let [r1, g1, b1] = extrairRGB(cor1);
    let [r2, g2, b2] = extrairRGB(cor2);
    return `rgb(${r1}, ${g2}, ${b1})`;
}

function crossoverUniforme(cor1, cor2) {
    let [r1, g1, b1] = extrairRGB(cor1);
    let [r2, g2, b2] = extrairRGB(cor2);
    let r = Math.random() > 0.5 ? r1 : r2;
    let g = Math.random() > 0.5 ? g1 : g2;
    let b = Math.random() > 0.5 ? b1 : b2;
    return `rgb(${r}, ${g}, ${b})`;
}

function crossoverAritmetico(cor1, cor2) {
    let [r1, g1, b1] = extrairRGB(cor1);
    let [r2, g2, b2] = extrairRGB(cor2);
    let r = Math.floor((r1 + r2) / 2);
    let g = Math.floor((g1 + g2) / 2);
    let b = Math.floor((b1 + b2) / 2);
    return `rgb(${r}, ${g}, ${b})`;
}

function extrairRGB(cor) {
    let rgb = cor.match(/\d+/g);
    return rgb ? rgb.map(Number) : [255, 255, 255];
}
