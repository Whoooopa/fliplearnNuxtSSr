// https://nuxt.com/docs/api/configuration/nuxt-config
const ONE_DAY = 60 * 60 * 24 * 1000;
const TWO_WEEK = ONE_DAY * 14; // NUXT_PUBLIC_AUTH_COOKIE_EXPIRES=1209600000 <- nuxt use this instea

export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    // public config
    public: {
      authCookieName: "",
      authCookieExpires: parseInt(TWO_WEEK.toString(), 10),
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NUXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NUXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NUXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_PUBLIC_APP_ID,
      }
    },

    //server side firebase admin
    type: '',
    projectId: '',
    privateKeyId: '', 
    privateKey: '',
    clientEmail: '',
    clientId: '',
    authUri: '',
    tokenUri: '',
    authProviderX509CertUrl: '',
    clientX509CertUrl: '',
    universeDomain: '',
    
    // all of above within object
    serviceAccount: '',
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
  ], "@nuxt/ui", '@pinia/nuxt'],
  css: ["~/assets/css/main.css","~/assets/css/google-fonts.css"],
  tailwindcss: {
    configPath: '@/tailwind.config.ts',
  },
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'}]
    }
  },
  imports: {
    dirs: ['types/*.ts']
  }
})