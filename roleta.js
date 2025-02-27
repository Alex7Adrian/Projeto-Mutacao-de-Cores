function calcularIntensidade(cor) {
    const rgb = cor.match(/\d+/g);
    const [r, g, b] = rgb.map(Number);
    return (r + g + b) / 3;
}

function gerarGraficoRoleta(cores) {
    const ctx = document.getElementById("graficoRoleta").getContext("2d");

    const intensidades = cores.map(cor => calcularIntensidade(cor));
    const corMaisEscura = cores[intensidades.indexOf(Math.min(...intensidades))];
    const intensidadeMaisEscura = Math.min(...intensidades);

    // Inverte as intensidades para que a cor mais escura tenha a maior fatia
    const intensidadesInvertidas = intensidades.map(intensidade => 255 - intensidade);

    // Verifica se há um gráfico existente e destrói-o antes de criar um novo
    if (window.chartInstance) {
        window.chartInstance.destroy();
    }

    // Criar o gráfico de pizza
    window.chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
            labels: cores,
            datasets: [{
                data: intensidadesInvertidas,
                backgroundColor: cores,
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
                        }
                    }
                }
            },
            animation: {
                duration: 3000,  // Duração da rotação (3 segundos)
                easing: 'easeOutQuart'
            }
        }
    });

    
    document.getElementById("formigaMaisEscura").innerHTML = 
        `• A formiga mais escura é da cor ${corMaisEscura} com intensidade ${intensidadeMaisEscura.toFixed(2)}`;

  
    function girarRoleta() {
        let selecionadas = [];

        function girarUmaVez(vez) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const rotaçãoAleatoria = Math.floor(Math.random() * 360) + 1800;
                    
                    // Determina a fatia selecionada
                    const indexSelecionado = Math.floor(((rotaçãoAleatoria % 360) / 360) * cores.length);
                    const corSelecionada = cores[indexSelecionado];
                    selecionadas.push(corSelecionada);

                    console.log(`Formiga ${vez + 1} selecionada: ${corSelecionada}`);

                    // Atualiza a cor da div na Nova Geração
                    const divSelecionada = document.getElementById(`escolhida-${vez + 1}`);
                    if (divSelecionada) {
                        divSelecionada.style.backgroundColor = corSelecionada;
                    } else {
                        console.error(`Erro: escolhida-${vez + 1} não encontrada`);
                    }

                    resolve();
                }, 1000); // Tempo entre cada giro
            });
        }

        async function girarSeisVezes() {
            for (let i = 0; i < 6; i++) {
                await girarUmaVez(i);
            }
        }

        girarSeisVezes();
    }

   
    document.getElementById("girar").addEventListener("click", girarRoleta);
}
