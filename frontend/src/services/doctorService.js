import api from './api'

export const getDoctorQueue = async (doctorId) => {
  const { data } = await api.get(`/doctors/${doctorId}/queue`)
  return data
}

export const callNextPatient = async (patientId) => {
  const { data } = await api.patch(`/doctors/treatment/start/${patientId}`)
  return data
}

export const markPatientDone = async (patientId) => {
  const { data } = await api.patch(`/doctors/treatment/complete/${patientId}`)
  return data
}
