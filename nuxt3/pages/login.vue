<template>
  <div class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="name">Nome</label>
          <input v-model="name" type="text" id="name" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Digite seu nome" required>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="password">Senha</label>
          <input v-model="password" type="password" id="password" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Digite sua senha" required>
        </div>
        <div class="m-4 text-green-500 text-center">
          <span v-if="responseOK">{{ responseOK }}</span>
        </div>
        <div class="m-4 text-red-500 text-center">
          <span v-if="responseERROR">{{ responseERROR }}</span>
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from '#app';

const router = useRouter();

const name = ref('');
const password = ref('');
const responseOK = ref('');
const responseERROR = ref('');

async function submitForm() {
  if (!name.value || !password.value) {
    responseERROR.value = 'Por favor, preencha todos os campos.';
    return;
  }

  try {
    const response = await $fetch('/api/loginUser', {
      method: 'POST',
      body: {
        name: name.value,
        password: password.value
      }
    });

    if (response) {
      if (response.success) {
        // console.log(response);
        responseERROR.value = '';

        sessionStorage.setItem('userToken', JSON.stringify({ tokenInfo: response.tokenInfo, tokenHash: response.tokenHash }));

        router.push('/protected');
      }

      if (response.error) {
        // console.log(response);
        responseERROR.value = response.error;
      }
    }
  } catch (error) {
    // console.log(error);
    responseERROR.value = 'Erro ao enviar o formulário';
  }
}
</script>
