import React, { useState } from 'react'
import Home from './components/Home'
import Landing from './components/Landing'

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing') // 'landing' or 'app'

  const handleNavigateToApp = () => {
    setCurrentPage('app')
  }

  const handleNavigateToLanding = () => {
    setCurrentPage('landing')
  }

  return (
    <div>
      {currentPage === 'landing' ? (
        <Landing onNavigateToApp={handleNavigateToApp} />
      ) : (
        <Home onNavigateToLanding={handleNavigateToLanding} />
      )}
    </div>
  )
}

export default App