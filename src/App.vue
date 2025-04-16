<template>
  <v-app>
    <v-main>
      <ThemeProvider>
        <router-view />
      </ThemeProvider>
    </v-main>
  </v-app>
</template>

<style lang="scss">
html {
  overflow-y: auto;
}
</style>
