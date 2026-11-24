import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState<string>('Loading...')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(JSON.stringify(data)))
      .catch((err) => setStatus('Error: ' + err.message))
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>SaaS CRM Pivot</h1>
      <p>Backend: {status}</p>
    </div>
  )
}

export default App