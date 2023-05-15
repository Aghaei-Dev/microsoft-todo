import React from 'react'
import { Tasks, Login, PrivateRoute, AuthWrapper, Error } from './pages'
import { Routes, Route } from 'react-router-dom'
import { useGlobalContext } from './context/context'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function App() {
  const { isDarkMode } = useGlobalContext()

  const theme = createTheme({
    palette: {
      mode: `${isDarkMode ? 'dark' : 'light'}`,
      primary: {
        light: '#757ce8',
        main: '#2564cf',
        dark: '#215aba',
        contrastText: '#fff',
      },
      secondary: {
        main: '#292827',
      },
      danger: {
        main: '#a80000',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <AuthWrapper>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Error />} />
        </Routes>
      </AuthWrapper>
    </ThemeProvider>
  )
}

export default App
