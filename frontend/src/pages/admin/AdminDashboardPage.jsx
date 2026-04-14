import { useEffect, useState } from 'react'
import { ArrowRight, RefreshCw, ShieldCheck, UserPlus, Users2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import Button from '../../components/Button'
import { StatCard } from '../../components/StatCard'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import { getAdminStats, listUsers } from '../../services/adminService'
import { getErrorMessage } from '../../utils/helpers'
import { useToast } from '../../context/ToastContext'

function AdminDashboardPage() {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({ totalUsers: 0, totalPatients: 0, activeQueue: 0 })
  const [users, setUsers] = useState([])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [statsResponse, usersResponse] = await Promise.all([getAdminStats(), listUsers()])
      setStats(statsResponse)
      setUsers(usersResponse)
    } catch (error) {
      addToast({ title: 'Failed to load dashboard', description: getErrorMessage(error), variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const roleCount = users.reduce(
    (acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1
      return acc
    },
    { ADMIN: 0, TRIAGE: 0, DOCTOR: 0 },
  )

  const maxRole = Math.max(roleCount.ADMIN, roleCount.TRIAGE, roleCount.DOCTOR, 1)

  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    {
      key: 'role',
      title: 'Role',
      render: (user) => (
        <Badge variant={user.role === 'ADMIN' ? 'info' : user.role === 'DOCTOR' ? 'success' : 'warning'}>{user.role}</Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Users" value={stats.totalUsers} tone="indigo" />
        <StatCard label="Total Patients" value={stats.totalPatients} tone="emerald" />
        <StatCard label="Active Queue" value={stats.activeQueue} tone="cyan" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="Operations Overview" description="Manage staff and monitor queue">
          <div className="space-y-3">
            <Link
              to="/admin/create-user"
              className="flex items-center justify-between rounded-xl border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-200"
            >
              <span className="inline-flex items-center gap-2 font-medium">
                <UserPlus className="size-4 text-zinc-700" />
                Create new staff user
              </span>
              <ArrowRight className="size-4 text-slate-400" />
            </Link>
            <Link
              to="/admin/manage-users"
              className="flex items-center justify-between rounded-xl border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-200"
            >
              <span className="inline-flex items-center gap-2 font-medium">
                <Users2 className="size-4 text-zinc-700" />
                Review users and roles
              </span>
              <ArrowRight className="size-4 text-slate-400" />
            </Link>
            <div className="rounded-xl border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-700">
              <p className="inline-flex items-center gap-2 font-semibold">
                <ShieldCheck className="size-4" />
                Auth & access active
              </p>
              <p className="mt-1 text-xs text-zinc-600">Cookie-based secure access is enabled.</p>
            </div>
          </div>
        </Card>

        <Card title="Team Distribution" description="Role-wise account breakdown">
          <div className="space-y-4">
            {['ADMIN', 'TRIAGE', 'DOCTOR'].map((role) => (
              <div key={role} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{role}</span>
                  <span className="text-slate-500">{roleCount[role]}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-zinc-800"
                    style={{ width: `${(roleCount[role] / maxRole) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Quick Snapshot" description="High-level system status">
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Staff Accounts</span>
              <span className="font-semibold text-slate-800">{stats.totalUsers}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Patients in Queue</span>
              <span className="font-semibold text-slate-800">{stats.activeQueue}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>System Health</span>
              <Badge variant="success">Operational</Badge>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Recent Users" description="Latest user overview">
        <div className="mb-4 flex justify-end">
          <Button variant="secondary" onClick={fetchData} isLoading={isLoading}>
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        </div>
        <Table columns={columns} data={users.slice(0, 6)} emptyText="No users available. Create users from Create User page." />
      </Card>
    </div>
  )
}

export default AdminDashboardPage
