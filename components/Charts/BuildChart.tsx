import Chart from 'chart.js';
import { MONACO_FONT } from './chartsTheme';

const buildScales = axes => {
  const scales = {
    xAxes: [
      {
        ticks: {
          fontFamily: MONACO_FONT,
          fontSize: 12,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontFamily: MONACO_FONT,
          fontSize: 12,
        },
      },
    ],
  };

  return axes ? scales : null;
};

const buildLegend = legend => {
  const leg = {
    position: 'top',
    labels: {
      fontFamily: MONACO_FONT,
    },
  };
  return legend ? leg : null;
};

const buildChart = config => {
  const { ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend } = config;

  return new Chart(ctx, {
    type: chartType,
    responsive: true,
    maintainAspectRatio: false,
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: buildScales(axes),
      legend: buildLegend(legend),
      tooltips: {
        titleFontFamily: MONACO_FONT,
        bodyFontFamily: MONACO_FONT,
        cornerRadius: 3,
      },
    },
  });
};

export default buildChart;