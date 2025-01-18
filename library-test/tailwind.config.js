/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 내 모든 파일에 tailwind 적용
  ],
  darkMode: 'class',  // 다크모드 활성화 방식
  theme: {
    extend: { // tailwind 기본에 확장시키기
      colors: {
        'custom-light': '#FFD700',  // 라이트모드용 색상
        'custom-dark': '#4B5563',   // 다크모드용 색상
        'custom-system': '#60A5FA'  // 시스템용 색상
      }
    },
  },
  plugins: [],
}