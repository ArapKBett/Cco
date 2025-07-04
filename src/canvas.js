function updateChart(items) {
  const ctx = document.getElementById('probabilityChart').getContext('2d');
  if (window.myChart) window.myChart.destroy();

  const labels = items.map(item => item.item_name);
  const data = items.map(item => item.probability);

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Drop Probability (%)',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}
