/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"'],
        'fira-mono': ['"Fira Mono"'],
        'source-sans-pro': ['"Source Sans 3", "Lucida Grande", sans-serif'],
        'arimo': ['"Arimo"'],
        'inconsolata': ['"inconsolata"']
      },
      lineHeight: {
        'custom': '1.15'
      }
    },
  },
  plugins: [],
}