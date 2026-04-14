import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import { getQueue } from '../../services/triageService'
import { getErrorMessage, isHighPriority } from '../../utils/helpers'
import { useToast } from '../../context/ToastContext'

function QueueViewPage() {
  const { addToast } = useToast()
  const [queue, setQueue] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchQueue = async () => {
    setIsLoading(true)
    try {
      const data = await getQueue()
      setQueue(data)
    } catch (error) {
      addToast({ title: 'Queue fetch failed', description: getErrorMessage(error), variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQueue()
  }, [])

  const columns = [
    { key: 'token', title: 'Token #' },
    { key: 'name', title: 'Patient Name' },
    {
      key: 'priority',
      title: 'Priority',
      render: (row) => <Badge variant={isHighPriority(row.priority) ? 'danger' : 'warning'}>{row.priority}</Badge>,
    },
    {
      key: 'status',
      title: 'Status',
      render: (row) => <Badge variant={isHighPriority(row.priority) ? 'danger' : 'info'}>{isHighPriority(row.priority) ? 'HIGH PRIORITY' : 'WAITING'}</Badge>,
    },
    {
      key: 'estimated_wait_time',
      title: 'Est. Wait',
      render: (row) => `${row.estimated_wait_time} min`,
    },
  ]

  return (
    <Card title="Queue View" description="Live waiting queue with priority highlights">
      <div className="mb-4 flex justify-end">
        <Button variant="secondary" onClick={fetchQueue} isLoading={isLoading}>
          <RefreshCw className="size-4" />
          Refresh Queue
        </Button>
      </div>
      <Table columns={columns} data={queue} emptyText="Queue is empty. New patients will appear here." />
    </Card>
  )
}

export default QueueViewPage
