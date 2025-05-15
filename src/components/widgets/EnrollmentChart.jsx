// src/components/EnrollmentChart.jsx
// import { Chart } from 'react-chartjs-2';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Using Chart.js v3+

const EnrollmentChart = ({ enrollmentData, ridgewayRemaining, royalWindsorRemaining }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // To store the chart instance

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: enrollmentData.weeks,
          datasets: [
            {
              label: 'Ridgeway Signups',
              data: enrollmentData.ridgewaySignups,
              backgroundColor: 'rgba(56, 189, 248, 0.7)', // sky-500
              borderColor: 'rgba(56, 189, 248, 1)',
              borderWidth: 1,
              stack: 'Ridgeway',
            },
            {
              label: 'Ridgeway Remaining Spots',
              data: ridgewayRemaining,
              backgroundColor: 'rgba(203, 213, 225, 0.5)', // slate-300
              borderColor: 'rgba(203, 213, 225, 1)',
              borderWidth: 1,
              stack: 'Ridgeway',
            },
            {
              label: 'Royal Windsor Signups',
              data: enrollmentData.royalWindsorSignups,
              backgroundColor: 'rgba(34, 197, 94, 0.7)', // green-500
              borderColor: 'rgba(34, 197, 94, 1)',
              borderWidth: 1,
              stack: 'Royal Windsor',
            },
            {
              label: 'Royal Windsor Remaining Spots',
              data: royalWindsorRemaining,
              backgroundColor: 'rgba(203, 213, 225, 0.5)', // slate-300
              borderColor: 'rgba(203, 213, 225, 1)',
              borderWidth: 1,
              stack: 'Royal Windsor',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `Summer Camp Enrollment Status (Capacity: ${enrollmentData.capacityPerLocation} per Location/Week)`,
              font: { size: 16, family: 'Inter' },
              color: '#334155', // slate-700
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
            legend: {
              position: 'top',
              labels: {
                font: { family: 'Inter' },
                color: '#475569', // slate-600
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Camp Week',
                font: { family: 'Inter', weight: '600' },
                color: '#475569', // slate-600
              },
              stacked: true,
              ticks: {
                font: { family: 'Inter' },
                color: '#475569', // slate-600
              },
              grid: {
                display: false,
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Kids',
                font: { family: 'Inter', weight: '600' },
                color: '#475569', // slate-600
              },
              beginAtZero: true,
              stacked: true,
              max: enrollmentData.capacityPerLocation + 20, // Give some headroom
              ticks: {
                font: { family: 'Inter' },
                color: '#475569', // slate-600
              },
            },
          },
        },
      });
    }

    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [enrollmentData, ridgewayRemaining, royalWindsorRemaining]); // Re-run effect if data changes

  return <canvas ref={chartRef} style={{ height: '400px', width: '100%' }}></canvas>;
};

export default EnrollmentChart;
