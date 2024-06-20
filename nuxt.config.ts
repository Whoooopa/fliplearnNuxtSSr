// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    firebaseApiKey : '',
    authDomain : '',
    projectId : '',
    storageBucket : '',
    messagingSenderId : '',
    appId : '',
    measurementId : ''
  },

  modules: [[
    '@nuxtjs/google-fonts',
    {
        families: {
            Poppins: true,
            Righteous: true

        },
        subsets: ['latin'],
        display: 'swap',
        prefetch: false,
        preconnect: false,
        preload: false,
        download: true,
        base64: false,
        outputDir: 'assets',
        stylePath: 'css/google-fonts.css',

    },
  ], "@nuxt/ui"],
  css: ["~/assets/css/main.css","~/assets/css/google-fonts.css"],
  tailwindcss: {
    configPath: '@/tailwind.config.ts',
  },
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'}]
    }
  }
})