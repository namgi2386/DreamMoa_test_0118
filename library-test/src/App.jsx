import { useState, useEffect } from 'react'

function App() {
  const [theme, setTheme] = useState('light') // 초기값

  // 테마 변경 함수
  const handleTheme = (mode) => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    } 
    else if (mode === 'light') {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    }
    else if (mode === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      setTheme('system')
    }
  }

  // 시스템 테마 변경 감지
  useEffect(() => {
    if (theme === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => {
          if (e.matches) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        })
    }
  }, [theme])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* 테마 변경 버튼들 */}
      <div className="space-x-4 mb-8">
        <button 
          onClick={() => handleTheme('light')}
          className={`px-4 py-2 rounded ${theme === 'light' ? 'bg-custom-light' : 'bg-gray-200'}`}
        >
          라이트모드
        </button>
        <button 
          onClick={() => handleTheme('dark')}
          className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-custom-dark text-white' : 'bg-gray-200'}`}
        >
          다크모드
        </button>
        <button 
          onClick={() => handleTheme('system')}
          className={`px-4 py-2 rounded ${theme === 'system' ? 'bg-custom-system text-white' : 'bg-gray-200'}`}
        >
          시스템설정
        </button>
      </div>

      {/* 테마에 따라 변경되는 박스 */}
      <div className="w-64 h-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
        <p className="text-gray-900 dark:text-white">
          현재 테마: {theme}
        </p>
      </div>
    </div>
  )
}

export default App