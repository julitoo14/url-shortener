<template>
    <canvas ref="chartCanvas"></canvas>
  </template>
  
  <script>
  import { ref, onMounted, watch, onBeforeUnmount } from "vue";
  import { Chart, LineController, BarController, PieController, LineElement, BarElement, PointElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
  
  // Registrar los componentes necesarios
  Chart.register(
    LineController,
    BarController,
    PieController,
    LineElement,
    BarElement,
    PointElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );
  
  export default {
    props: {
      type: { type: String, required: true },
      data: { type: Object, required: true },
      options: { type: Object, default: () => ({}) },
    },
    setup(props) {
      const chartCanvas = ref(null);
      let chartInstance = null;
  
      const initializeChart = () => {
        if (chartInstance) chartInstance.destroy();
        chartInstance = new Chart(chartCanvas.value, {
          type: props.type,
          data: props.data,
          options: props.options,
        });
      };
  
      watch(() => props.data, initializeChart, { deep: true });
  
      onMounted(() => {
        initializeChart();
      });
  
      onBeforeUnmount(() => {
        if (chartInstance) chartInstance.destroy();
      });
  
      return {
        chartCanvas,
      };
    },
  };
  </script>
  