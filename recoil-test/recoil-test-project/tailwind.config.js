/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", //src 모든파일에 tailwind 적용해줌줌
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}