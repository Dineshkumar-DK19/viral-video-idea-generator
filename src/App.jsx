import React, { useState } from 'react'
import Home from './components/Home'
import Landing from './components/Landing'

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing') // 'landing' or 'app'

  const handleNavigateToApp = () => {
    const root = document.getElementById('root');
    if (root) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCurrentPage('app')
  }

  const handleNavigateToLanding = () => {
    const root = document.getElementById('root');
    if (root) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
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