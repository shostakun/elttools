<template>
  <v-app>
    <v-main>
      <ThemeProvider>
        <CardProvider>
          <router-view />
        </CardProvider>
      </ThemeProvider>
    </v-main>
  </v-app>
</template>

<style lang="scss">
html {
  overflow-y: auto;
}
</style>
