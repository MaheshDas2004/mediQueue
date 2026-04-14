import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { createUser, getDepartments } from '../../services/adminService'
import { getErrorMessage } from '../../utils/helpers'
import { useToast } from '../../context/ToastContext'

const defaultValues = {
  name: '',
  email: '',
  password: '',
  role: 'TRIAGE',
  department_id: '',
}

const selectClass =
  'w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-700 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200'

function CreateUserPage() {
  const { addToast } = useToast()
  const [values, setValues] = useState(defaultValues)
  const [errors, setErrors] = useState({})
  const [departments, setDepartments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments()
        setDepartments(data)
      } catch (error) {
        addToast({ title: 'Department fetch failed', description: getErrorMessage(error), variant: 'error' })
      }
    }
    fetchDepartments()
  }, [])

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Name is required'
    if (!values.email.trim()) next.email = 'Email is required'
    if (!values.password.trim()) next.password = 'Password is required'
    if (values.role === 'DOCTOR' && !values.department_id) next.department_id = 'Department is required for doctor'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    try {
      await createUser({
        ...values,
        department_id: values.role === 'DOCTOR' ? Number(values.department_id) : null,
      })
      addToast({ title: 'User created', description: `${values.name} has been added.` })
      setValues(defaultValues)
    } catch (error) {
      addToast({ title: 'Create user failed', description: getErrorMessage(error), variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card title="Create User" description="Create doctor, triage, or admin accounts" className="max-w-4xl">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 md:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Account Details</p>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Full Name" name="name" value={values.name} onChange={handleChange} error={errors.name} placeholder="Dr. Anna Smith" />
            <Input label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} placeholder="anna@mediqueue.com" />
            <Input label="Password" name="password" type="password" value={values.password} onChange={handleChange} error={errors.password} placeholder="Strong password" />
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 md:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Access Setup</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Role</label>
              <select name="role" value={values.role} onChange={handleChange} className={selectClass}>
                <option value="ADMIN">ADMIN</option>
                <option value="TRIAGE">TRIAGE</option>
                <option value="DOCTOR">DOCTOR</option>
              </select>
            </div>

            {values.role === 'DOCTOR' && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Department</label>
                <select name="department_id" value={values.department_id} onChange={handleChange} className={selectClass}>
                  <option value="">Select department</option>
                  {departments.map((department) => (
                    <option key={department.department_id} value={department.department_id}>
                      {department.name}
                    </option>
                  ))}
                </select>
                {errors.department_id ? <p className="text-xs text-zinc-700">{errors.department_id}</p> : null}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading}>
            Create User
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default CreateUserPage
