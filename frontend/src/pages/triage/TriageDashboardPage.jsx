import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardPlus, RefreshCw } from 'lucide-react'
import { getQueue } from '../../services/triageService'
import { useToast } from '../../context/ToastContext'
import { getErrorMessage, isHighPriority } from '../../utils/helpers'
import { StatCard } from '../../components/StatCard'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import Table from '../../components/Table'
import Button from '../../components/Button'

function TriageDashboardPage() {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [queue, setQueue] = useState([])

  const fetchQueue = async () => {
    setIsLoading(true)
    try {
      const data = await getQueue()
      setQueue(data)
    } catch (error) {
      addToast({ title: 'Queue load failed', description: getErrorMessage(error), variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQueue()
  }, [])

  const highPriority = queue.filter((item) => Number(item.priority) >= 8).length
  const mediumPriority = queue.filter((item) => Number(item.priority) >= 5 && Number(item.priority) < 8).length

  const columns = [
    { key: 'token', title: 'Token' },
    { key: 'name', title: 'Patient' },
    {
      key: 'priority',
      title: 'Priority',
      render: (row) => <Badge variant={isHighPriority(row.priority) ? 'danger' : 'warning'}>{row.priority}</Badge>,
    },
    {
      key: 'estimated_wait_time',
      title: 'Wait',
      render: (row) => `${row.estimated_wait_time} min`,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Waiting" value={queue.length} tone="cyan" />
        <StatCard label="High Priority" value={highPriority} tone="indigo" />
        <StatCard label="Avg Wait (min)" value={queue[0]?.estimated_wait_time ?? 0} tone="emerald" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="Triage Actions" description="Fast access to key tasks">
          <div className="space-y-3">
            <Link
              to="/triage/register-patient"
              className="flex items-center justify-between rounded-xl border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-200"
            >
              <span className="inline-flex items-center gap-2 font-medium">
                <ClipboardPlus className="size-4 text-zinc-700" />
                Register a new patient
              </span>
              <ArrowRight className="size-4 text-slate-400" />
            </Link>
            <Button variant="secondary" onClick={fetchQueue} isLoading={isLoading}>
              <RefreshCw className="size-4" />
              Refresh queue snapshot
            </Button>
          </div>
        </Card>

        <Card title="Priority Distribution" description="Current queue severity">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl bg-zinc-100 px-3 py-2">
              <span className="font-medium text-zinc-700">High</span>
              <span className="font-semibold text-zinc-900">{highPriority}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-zinc-100 px-3 py-2">
              <span className="font-medium text-zinc-700">Medium</span>
              <span className="font-semibold text-zinc-900">{mediumPriority}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-zinc-100 px-3 py-2">
              <span className="font-medium text-zinc-700">Low</span>
              <span className="font-semibold text-zinc-900">{Math.max(queue.length - highPriority - mediumPriority, 0)}</span>
            </div>
          </div>
        </Card>

        <Card title="Queue Health" description="Operational status">
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Patients waiting</span>
              <span className="font-semibold text-slate-800">{queue.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Critical load</span>
              <Badge variant={highPriority > 3 ? 'danger' : 'success'}>{highPriority > 3 ? 'High' : 'Stable'}</Badge>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Queue Preview" description="Top patients waiting for consultation">
        <Table columns={columns} data={queue.slice(0, 6)} emptyText="No waiting patients." />
      </Card>
    </div>
  )
}

export default TriageDashboardPage
