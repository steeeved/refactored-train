import { useState } from 'react'
import LogViewer from './LogViewer'// Import your CSS file

function App() {
  const logFiles = [
    'Recorder-error.log',
    'Recorder-out.log',
    'index-out.log',
    'index-error.log'
  ]

  const [selectedLogFile, setSelectedLogFile] = useState(logFiles[0])

  const handleLogFileChange = (filename) => {
    setSelectedLogFile(filename)
  }

  return (
    <div className='App'>
      <div className='buttons'>
        {logFiles.map((filename) => (
          <button
            key={filename}
            onClick={() => handleLogFileChange(filename)}
            className={selectedLogFile === filename ? 'selected' : ''}
          >
            {filename}
          </button>
        ))}
      </div>
      <LogViewer filename={selectedLogFile} />
    </div>
  )
}

export default App
