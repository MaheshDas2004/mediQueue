import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import { listUsers } from '../../services/adminService'
import { getErrorMessage } from '../../utils/helpers'
import { useToast } from '../../context/ToastContext'

function ManageUsersPage() {
  const { addToast } = useToast()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const data = await listUsers()
      setUsers(data)
    } catch (error) {
      addToast({ title: 'Failed to fetch users', description: getErrorMessage(error), variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const columns = [
    { key: 'user_id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    {
      key: 'role',
      title: 'Role',
      render: (row) => {
        const variant = row.role === 'ADMIN' ? 'info' : row.role === 'DOCTOR' ? 'success' : 'warning'
        return <Badge variant={variant}>{row.role}</Badge>
      },
    },
  ]

  return (
    <Card title="Manage Users" description="View created users and their roles">
      <div className="mb-4 flex justify-end">
        <Button variant="secondary" onClick={fetchUsers} isLoading={isLoading}>
          <RefreshCw className="size-4" />
          Refresh
        </Button>
      </div>
      <Table columns={columns} data={users} emptyText="No users found. Your backend currently has no public list endpoint or no users yet." />
    </Card>
  )
}

export default ManageUsersPage
