<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gráfico de Entradas Financeiras - Chart.js</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div style="width: 85%; margin: auto;">
        <canvas id="meuGrafico"></canvas>
    </div>

    <!-- 🔹 Div para mostrar info ao passar o mouse -->
    <div id="info" style="text-align:center; margin-top:20px; font-size:1.1em; font-weight:bold;"></div>

    <script>
        const dados = {
            "cnpj": "82901000000127",
            "versao": "1.21b",
            "entradas": [
                {"data": "2023-11-07", "valor": 1060.68},
                {"data": "2023-11-09", "valor": 12175.18},
                {"data": "2023-11-10", "valor": 11553.06},
                {"data": "2023-11-13", "valor": 19907.99},
                {"data": "2023-11-14", "valor": 34798.08},
                {"data": "2023-11-16", "valor": 80849.93},
                {"data": "2023-11-17", "valor": 16327.35},
                {"data": "2023-11-20", "valor": 170401.92},
                {"data": "2023-11-21", "valor": 118882.29},
                {"data": "2023-11-22", "valor": 64233.94},
                {"data": "2023-11-23", "valor": 520551.62},
                {"data": "2023-11-24", "valor": 724384.25},
                {"data": "2023-11-27", "valor": 830802.4},
                {"data": "2023-11-28", "valor": 4454963.5},
                {"data": "2023-11-29", "valor": 259272.95},
                {"data": "2023-11-30", "valor": 925714.7},
                {"data": "2023-12-01", "valor": 2105034.2}
            ]
        };

        // === PROCESSAMENTO DOS DADOS ===
        const labels = dados.entradas.map(e => e.data);
        const valores = dados.entradas.map(e => e.valor);

        // Média móvel simples
        const mediaMovel = valores.map((v, i, arr) => {
            const slice = arr.slice(Math.max(0, i - 2), i + 1);
            return slice.reduce((a, b) => a + b, 0) / slice.length;
        });

        // === CONFIGURAÇÃO DO GRÁFICO ===
        const ctx = document.getElementById('meuGrafico').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        type: 'bar',
                        label: 'Entradas (R$)',
                        data: valores,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        type: 'line',
                        label: 'Média móvel (R$)',
                        data: mediaMovel,
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.3,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                // === 🔹 EVENTOS DO MOUSE ===
                onHover: (event, activeElements) => {
                    const info = document.getElementById('info');
                    if (activeElements.length > 0) {
                        const chart = activeElements[0].element.$context.chart;
                        const datasetIndex = activeElements[0].datasetIndex;
                        const dataIndex = activeElements[0].index;
                        const label = chart.data.labels[dataIndex];
                        const valor = chart.data.datasets[datasetIndex].data[dataIndex];
                        const nomeDataset = chart.data.datasets[datasetIndex].label;

                        info.textContent = `🟢 ${nomeDataset} em ${label}: R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
                    } else {
                        info.textContent = '';
                    }
                },
                onClick: (event, activeElements) => {
                    if (activeElements.length > 0) {
                        const chart = activeElements[0].element.$context.chart;
                        const datasetIndex = activeElements[0].datasetIndex;
                        const dataIndex = activeElements[0].index;
                        const label = chart.data.labels[dataIndex];
                        const valor = chart.data.datasets[datasetIndex].data[dataIndex];
                        const nomeDataset = chart.data.datasets[datasetIndex].label;

                        alert(`🖱️ Você clicou em:\n${nomeDataset}\nData: ${label}\nValor: R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
                    }
                },

                // === 🔹 OUTRAS CONFIGURAÇÕES ===
                scales: {
                    x: {
                        ticks: { maxRotation: 45, minRotation: 45 }
                    },
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Entradas (R$)' }
                    },
                    y1: {
                        beginAtZero: false,
                        position: 'right',
                        title: { display: true, text: 'Média Móvel (R$)' },
                        grid: { drawOnChartArea: false }
                    }
                },
                plugins: {
                    legend: { display: true, position: 'top' },
                    title: { display: true, text: `Gráfico de Entradas Financeiras - CNPJ ${dados.cnpj}` },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: (ctx) => `${ctx.dataset.label}: R$ ${ctx.parsed.y.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`
                        }
                    }
                },
                interaction: { mode: 'index', intersect: false }
            }
        });
    </script>
</body>
</html>
