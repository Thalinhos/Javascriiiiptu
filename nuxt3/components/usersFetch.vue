<template>
  <div>
    <p v-if="userName" class="m-4">Hellou, {{ userName.split('-')[0] }}</p>

    <div v-if="users && users.length" class="m-2">
      <p class="mb-2">Users To display:</p>
      <ul v-for="user in users" :key="user.id" class="m-2">
        <li>
          {{ user.name }} {{ user.role }}
        </li>
      </ul>
    </div>

    <p v-if="displayError">{{ displayError }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const displayError = ref();
const token = ref();
const userId = ref();
const userName = ref();
const users = ref();

try {
  token.value = sessionStorage.getItem('userToken');
} catch (error) {
  displayError.value = "Erro ao acessar o token";
}

const getDataWithToken = async () => {
  try {
    if (!token.value) {
      displayError.value = "Token não encontrado!";
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token.value
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao receber dados');
    }

    const data = await response.json();
    users.value = data.users

    const values = data.token.split('.')
    userId.value = values[0];
    userName.value = values[1]


    console.log(data, userId.value, userName.value, users.value);
    
  } catch (error) {
    displayError.value = 'Erro ao receber dados: ' + error;
  }
};

getDataWithToken();
</script>
