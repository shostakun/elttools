<script setup lang="ts">
import { useAuth } from "@/utils/user";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { ref } from "vue";

const { loggedIn, logIn, logOut } = useAuth();

const password = ref("");
const showPassword = ref(false);
const username = ref("");
const valid = ref(true);
const rules = ref([
  (value: string) => {
    if (value) return true;
    return "Required";
  },
]);

const handleSubmit = async () => {
  await logIn(username.value, password.value);
  password.value = "";
  username.value = "";
};
</script>

<template>
  <div v-if="loggedIn" class="login-message">
    <div>🧙 Logged in!</div>
    <v-btn @click.prevent="logOut">Log out</v-btn>
  </div>
  <v-form v-else v-model="valid" class="login-form" @submit.prevent="handleSubmit">
    <v-text-field v-model="username" label="Username" required :rules="rules" />
    <v-text-field
      v-model="password"
      label="Password"
      required
      :rules="rules"
      :type="showPassword ? 'text' : 'password'"
    >
      <template #append-inner>
        <v-btn
          :icon="showPassword ? mdiEye : mdiEyeOff"
          variant="plain"
          @click.prevent="showPassword = !showPassword"
        />
      </template>
    </v-text-field>
    <v-btn :disabled="!valid" type="submit">Log in</v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
.login-form {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}

.login-message {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
