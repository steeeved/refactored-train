import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { LazyLog } from '@melloware/react-logviewer'
import toast, { Toaster } from 'react-hot-toast'

const LogViewer = ({ filename }) => {
  const [logs, setLogs] = useState('')

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(
          `http://52.9.221.20:4000/api/logs/${filename}`
        )

        const data = await response.json()
        setLogs(data.content)
      } catch (error) {
        console.error('Error fetching logs:', error)
      }
    }

    const interval = setInterval(fetchLogs, 2000)

    toast.promise(fetchLogs(), {
      loading: 'Fetching logs...',
      success: 'Logs fetched successfully',
      error: 'Error fetching logs'
    })

    return () => clearInterval(interval)
  }, [filename])

  return (
    <div className='lazylog-container'>
      <Toaster />
      <LazyLog
        caseInsensitive
        enableHotKeys
        enableSearch
        extraLines={1}
        height='800'
        width='900'
        onLineContentClick={function noRefCheck() {}}
        selectableLines
        text={logs}
      />
    </div>
  )
}

LogViewer.propTypes = {
  filename: PropTypes.string.isRequired 
}

export default LogViewer
