<template>
  <v-app>
    <v-main>
      <ThemeProvider>
        <CardProvider>
          <AuthProvider>
            <router-view />
          </AuthProvider>
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
