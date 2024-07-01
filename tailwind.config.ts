export default {
      content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
    ],
    theme: {
      extend: {
        colors: {
          customPrimary: {
            DEFAULT: '#9C47D1',
            50: '#EBDAF6',
            100: '#E2CAF2',
            200: '#D1A9E9',
            300: '#BF88E1',
            400: '#AE68D9',
            500: '#9C47D1',
            600: '#802DB3',
            700: '#602286',
            800: '#401659',
            900: '#200B2C',
            950: '#100616'
          },
          secondary: '#C682ED',
          lightersecond: '#E0B3F9',
          softbackground: '#F3F6F9',
          textblack: '#18061E',
          accent: '#B951F6',
          softshade: '#D9D9D9',
          tagTosca: '#60BAAE'
        },
        fontFamily: {
          //'Source Serif Pro', serif;
          "poppins": ['"Poppins"'],
          "righteous": ['"Righteous"']
        },
      }
  }
}