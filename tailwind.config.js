/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "CorPrincipal" : "#364B44",
        "CorSecundaria" : "#3D5F5F",
        "CorIntermediaria" : "#48737E",
        "CorNeutra" : "#5E869F",
        "CorTexto" : "#00130a"
      },
      fontFamily :{
        Roboto: "Roboto",
        Oswald : "Oswald"
      }
    },
  },
  plugins: [],
}

