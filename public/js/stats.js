function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}

function populateChart(data) {
  let durations = data.map(({ totalDuration }) => totalDuration);
  let dates = data.map(({ day }) => moment(day).format("DD-MM-YY HH:mm"));
  let pounds = calculateTotalWeight(data);
  const colors = generatePalette();

  let line = document.querySelector('#canvas').getContext('2d');
  let pie = document.querySelector('#canvas2').getContext('2d');
  let bar = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Duración del entrenamiento en minutos', // traducido
          backgroundColor: 'rgb(184, 209, 115)',
          borderColor: 'rgb(184, 209, 115)',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'GRÁFICO DE LÍNEA', // traducido
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Kilogramos', // traducido
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'GRÁFICO DE BARRAS', // traducido
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Duración del entrenamiento en minutos', // traducido
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'GRÁFICO DE TARTA', // traducido
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Kilogramos levantados', // traducido
          backgroundColor: colors,
          data: pounds,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'GRÁFICO DE DONUT', // traducido
      },
    },
  });
}

function calculateTotalWeight(data) {
  let totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      } else {
        return total;
      }
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}

API.getWorkoutsInRange().then(populateChart);
