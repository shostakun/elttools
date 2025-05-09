<script setup lang="ts">
import { fileToBase64, getExt } from "@/utils/file";
import { useAuth } from "@/utils/user";
import { mdiLogout } from "@mdi/js";
import { ref, useTemplateRef } from "vue";

const { api, loggedIn, logOut } = useAuth();

const passwordToHash = ref("");
const handleHash = () => {
  if (!passwordToHash.value) return;
  api("admin/hash", { username: "n/a", password: passwordToHash.value });
};

// TODO: handle the upload process more smoothly: https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#example_uploading_a_user-selected_file
const fileInput = useTemplateRef("fileInput");
const fileToUpload = ref<File | null>(null);
const handleUpload = async () => {
  const file = fileToUpload.value;
  console.log("Uploading:", file);
  if (!file) return;
  api("admin/image", { content: await fileToBase64(file), ext: getExt(file.name) });
};
</script>

<template>
  <div class="admin-container">
    <Login />
    <template v-if="loggedIn">
      <v-divider />
      <form class="admin-control-row" @submit.prevent="handleHash">
        <v-text-field v-model="passwordToHash" label="Password to hash" required />
        <v-btn :disabled="!passwordToHash" type="submit">Hash</v-btn>
      </form>
      <v-divider />
      <form class="admin-control-row" @submit.prevent="handleUpload">
        <v-file-input
          ref="fileInput"
          v-model="fileToUpload"
          accept="image/*"
          label="Image to upload"
          show-size
          variant="solo"
        />
        <v-btn v-if="fileToUpload" type="submit">Upload</v-btn>
        <v-btn v-else @click.prevent.stop="fileInput?.click()">Browse...</v-btn>
      </form>
    </template>
  </div>

  <SettingsMenu>
    <GlobalSettings />
  </SettingsMenu>

  <ToolToolbar>
    <v-tooltip location="bottom start" text="Log out">
      <template #activator="{ props: activatorProps }">
        <v-btn :icon="mdiLogout" v-bind="activatorProps" @click.prevent="logOut" />
      </template>
    </v-tooltip>
  </ToolToolbar>
</template>

<style lang="scss" scoped>
.admin-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  left: 0;
  padding: 2rem;
  position: absolute;
  top: 0;
  width: 100%;

  & > * {
    position: relative;
    max-width: 400px;
    width: 100%;
  }
}

.admin-control-row {
  align-items: center;
  display: flex;
  gap: 1rem;
}
</style>
