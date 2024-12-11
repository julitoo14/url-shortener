<template>
  <div class="flex justify-center items-center lg:min-h-[calc(100vh-5rem)]">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md m-auto">
      <h2 class="text-center text-strong text-4xl">Crear una nueva URL</h2>
      <form @submit.prevent="handleSubmit" class="mt-4">
        <!-- URL Original -->
        <div class="mb-3 flex flex-col">
          <label for="originalUrl" class="text-xl">URL original</label>
          <input
            type="url"
            id="originalUrl"
            v-model="originalUrl"
            class="p-3 border rounded"
            placeholder="Ingresar la URL original"
            required
          />
        </div>
  
        <!-- Alias -->
        <div class="mb-3 flex flex-col">
          <label for="alias" class="text-xl">Alias personalizado(Opcional)</label>
          <input
            type="text"
            id="alias"
            v-model="alias"
            class="p-3 border rounded"
            placeholder="Ingresar su alias deseado"
            maxlength="20"
          />
          <small class=" text-gray-700">
            Si se deja en blanco, se genera un alias aleatorio.
          </small>
        </div>
  
        <!-- Submit Button -->
        <button type="submit" class="p-3 bg-strong text-xl text-white font-semibold cursor-pointer" :disabled="!isFormValid">
          Acortar URL
        </button>
      </form>
  
      <!-- Feedback Message -->
      <div v-if="message" class="alert mt-4" :class="message.type">
        {{ message.text }}
        <button v-if="message.type === 'alert-success'" @click="copy()" class="bg-strong p-1 text-white rounded">copy</button>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import axios from "axios";
  import { API_BASE_URL } from "../config";
  
  const originalUrl = ref("");
  const alias = ref("");
  const message = ref(null);
  const link = ref(null);
  
  const isFormValid = computed(() => {
    return originalUrl.value.trim() !== "";
  });
  
  const copy = () => {
    navigator.clipboard.writeText(link.value);
  };
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/shorten`, {
        longUrl: originalUrl.value,
        customAlias: alias.value,
      });


  
      if (response.status === 201) {
        message.value = {
          type: "alert-success",
          text: `URL successfully shortened! Your link: ${response.data.shortUrl}`,
        };

        originalUrl.value = "";
        alias.value = "";
        link.value = response.data.shortUrl;
      } else {
        message.value = { type: "alert-danger", text: "Unexpected server response" };
      }
    } catch (error) {
      console.error(error);
      message.value = { type: "alert-danger", text: error.response?.data?.error || "Failed to shorten URL" };
    }
  };
  </script>
  
  <style>
  .alert-danger {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  .alert-success {
    background-color: #d4edda;
    color: #155724;
  }
  </style>
  