export const useTheme = () => {
  const theme = useState('theme', () => 'light')
  
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    // Apply theme to document using Tailwind's dark mode class
    if (process.client) {
      if (theme.value === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
  
  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    if (process.client) {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
  
  // Initialize theme on client side
  if (process.client) {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
    
    // Watch for theme changes and save to localStorage
    watch(theme, (newTheme) => {
      localStorage.setItem('theme', newTheme)
    })
  }
  
  return {
    theme: readonly(theme),
    toggleTheme,
    setTheme
  }
} 