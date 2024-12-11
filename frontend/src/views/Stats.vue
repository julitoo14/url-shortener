<template>
  <div class="flex flex-col items-center justify-center lg:min-h-[calc(100vh-5rem)] gap-y-4 p-2">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md m-auto">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">
        Ver estadísticas de URL
      </h1>
      <p class="text-center text-gray-600 mb-6">
        Ingresa el ID o el alias de la URL para ver las estadísticas.
      </p>
      <form @submit.prevent="fetchStats" class="flex flex-col space-y-4">
        <input v-model="idOrAlias" type="text" :placeholder="loading ? 'Buscando...' : 'ID o Alias'"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          required />
        <button type="submit" :disabled="loading"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          {{ loading ? "Cargando..." : "Ver estadísticas" }}
        </button>

      </form>
    </div>
    <div class="w-full max-w-md mt-6">
      <div v-if="loading" class="mt-6 text-center text-gray-500">
        Cargando...
      </div>
      <div v-if="error" class="bg-red-100 border border-red-400 text-danger px-4 py-3 rounded relative mt-4">
        <span>{{ error }}</span>
      </div>
      <div v-if="stats" class="mt-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Estadísticas para "{{ stats.customAlias || stats._id }}"
        </h2>
        <ul class="space-y-2">
          <li><strong>ID:</strong> {{ stats._id }}</li>
          <li><strong>Alias personalizado:</strong> {{ stats.customAlias || "N/A" }}</li>
          <li><strong>URL original:</strong> {{ stats.longUrl }}</li>
          <li><strong>URL acortado:</strong> {{ stats.shortUrl }}</li>
          <li><strong>Clicks:</strong> {{ stats.clicks }}</li>
          <li><strong>Creado el:</strong> {{ formatDate(stats.created_at) }}</li>
        </ul>
      </div>
      <div class="flex flex-col w-full gap-y-6">
        <div v-if="dailyClicksData.labels && dailyClicksData.labels.length">
          <Chart type="line" :data="dailyClicksData" :options="defaultOptions" />
        </div>
        <div v-if="clicksByCityData.labels && clicksByCityData.labels.length">
          <Chart type="bar" :data="clicksByCityData" :options="defaultOptions" />
        </div>
        <div v-if="clicksByCountryData.labels && clicksByCountryData.labels.length">
          <Chart type="pie" :data="clicksByCountryData" :options="defaultOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Chart from "../components/Chart.vue";
import { API_BASE_URL } from "../config";

const idOrAlias = ref("");
const stats = ref(null);
const loading = ref(false);
const error = ref("");
const dailyClicksData = ref({});
const clicksByCountryData = ref({});
const clicksByCityData = ref({});
const defaultOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "" }, // Cambiar dinámicamente según el gráfico
  },
};

const buildChartData = (label, data, color) => ({
  labels: data.map((item) => item._id),
  datasets: [
    {
      label,
      data: data.map((item) => item.totalClicks),
      borderColor: color.border,
      backgroundColor: color.background,
      tension: 0.4,
    },
  ],
});

const fetchStats = async () => {
  loading.value = true;
  error.value = "";
  stats.value = null;

  if (!idOrAlias.value.trim()) {
    error.value = "Por favor, ingresa un ID o alias válido.";
    return;
  }
  try {

    const response = await axios.get(
      `${API_BASE_URL}/metrics/${idOrAlias.value}`
    );
    stats.value = response.data;
    const clicksByCity = stats.value.clicksByCity;
    const clicksByCountry = stats.value.clicksByCountry;
    const clicksPerDay = stats.value.dailyClicks;
    console.log(clicksByCity);

    dailyClicksData.value = buildChartData(
      "Clicks por Día",
      clicksPerDay,
      { border: "rgba(75, 192, 192, 1)", background: "rgba(75, 192, 192, 0.2)" }
    );

    clicksByCityData.value = buildChartData(
      "Clicks por Ciudad",
      clicksByCity,
      { border: "rgba(255, 99, 132, 1)", background: "rgba(255, 99, 132, 0.2)" }
    );

    clicksByCountryData.value = buildChartData(
      "Clicks por País",
      clicksByCountry,
      { border: "rgba(54, 162, 235, 1)", background: "rgba(54, 162, 235, 0.2)" }
    );



  } catch (err) {
    error.value = err.response?.data?.error || "Ocurrió un error inesperado. Intenta de nuevo más tarde.";
  } finally {
    loading.value = false;
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};
</script>

<style>
canvas {
  width: 100% !important;
  height: auto !important;
}
</style>