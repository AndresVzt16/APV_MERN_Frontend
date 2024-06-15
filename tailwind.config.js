/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.before-content': {
          content: 'attr(data-content)',  // Utilizamos un atributo personalizado para el contenido
        },
      };

      addUtilities(newUtilities, ['before']);
    },
  ],
}

