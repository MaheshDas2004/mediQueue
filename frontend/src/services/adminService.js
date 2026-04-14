import api from './api'

export const createUser = async (payload) => {
  const { data } = await api.post('/user/create', payload)
  return data
}

export const listUsers = async () => {
  try {
    const { data } = await api.get('/user/all')
    return data
  } catch (error) {
    if (error?.response?.status === 404) return []
    throw error
  }
}

export const getDepartments = async () => {
  const { data } = await api.get('/department/all')
  return data
}

export const getAdminStats = async () => {
  const [users, queue] = await Promise.all([
    listUsers(),
    api
      .get('/patients/queue')
      .then((response) => response.data)
      .catch((error) => {
        if ([403, 404].includes(error?.response?.status)) return []
        throw error
      }),
  ])

  return {
    totalUsers: users?.length || 0,
    totalPatients: queue?.length || 0,
    activeQueue: queue?.length || 0,
  }
}
