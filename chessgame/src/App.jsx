import { useState, useEffect } from 'react'
import './App.css'
import { Header } from './component/Header'
import { Content } from './component/Content'

function App() {

  return (
    <div className='wrapper'>
      <Header />
      <Content />
      {/* Control */}
    </div>
  )
}

export default App
