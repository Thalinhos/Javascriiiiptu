<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gráfico Misto com Números Negativos - Chart.js</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div style="width: 80%; margin: auto;">
        <canvas id="meuGrafico"></canvas>
    </div>

    <script>
        // Configuração do gráfico
        const ctx = document.getElementById('meuGrafico').getContext('2d');
        const graficoMisto = new Chart(ctx, {
            type: 'bar', // Tipo base do gráfico
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'julho'],
                datasets: [
                    {
                        type: 'bar', // Primeiro conjunto de dados: barras
                        label: 'Vendas (R$)',
                        data: [1200, -500, 3000, -2000, 2300, -1000, 50],
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        type: 'line', // Segundo conjunto de dados: linha
                        label: 'Lucro (R$)',
                        data: [200, -100, 500, -300, 400, -150, 5],
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.4, // Suaviza a linha
                        yAxisID: 'y1' // Associa ao segundo eixo Y
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false, // Permite valores negativos
                        title: {
                            display: true,
                            text: 'Vendas (R$)'
                        },
                        suggestedMin: -2500, // Define um mínimo para o eixo Y
                        suggestedMax: 3500  // Define um máximo para o eixo Y
                    },
                    y1: {
                        beginAtZero: false, // Permite valores negativos
                        position: 'right', // Segundo eixo Y à direita
                        title: {
                            display: true,
                            text: 'Lucro (R$)'
                        },
                        suggestedMin: -400, // Define um mínimo para o segundo eixo Y
                        suggestedMax: 600,  // Define um máximo para o segundo eixo Y
                        grid: {
                            drawOnChartArea: false // Evita sobreposição de grades
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Vendas e Lucro Mensal (com Valores Negativos)'
                    }
                }
            }
        });
    </script>
</body>
</html>
