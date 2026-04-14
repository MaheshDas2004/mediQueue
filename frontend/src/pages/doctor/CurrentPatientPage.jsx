import { useEffect, useMemo, useState } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import Modal from '../../components/Modal'
import { useAuth } from '../../context/AuthContext'
import { callNextPatient, getDoctorQueue, markPatientDone } from '../../services/doctorService'
import { getErrorMessage, isHighPriority } from '../../utils/helpers'
import { useToast } from '../../context/ToastContext'

function CurrentPatientPage() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [queue, setQueue] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCalling, setIsCalling] = useState(false)
  const [isMarking, setIsMarking] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)

  const fetchQueue = async () => {
    setIsLoading(true)
    try {
      const data = await getDoctorQueue(user.user_id)
      setQueue(data)
    } catch (error) {
      addToast({ title: 'Queue load failed', description: getErrorMessage(error), variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQueue()
  }, [user.user_id])

  const currentPatient = useMemo(() => {
    const active = queue.find((item) => item.status === 'IN_TREATMENT')
    if (active) return active
    return queue.find((item) => item.status === 'WAITING') || null
  }, [queue])

  const hasActiveTreatment = currentPatient?.status === 'IN_TREATMENT'

  const handleCallNext = async () => {
    if (!currentPatient || hasActiveTreatment) return
    setIsCalling(true)
    try {
      await callNextPatient(currentPatient.patient_id)
      addToast({ title: 'Patient called', description: `${currentPatient.name} moved to treatment.` })
      await fetchQueue()
    } catch (error) {
      addToast({ title: 'Call failed', description: getErrorMessage(error), variant: 'error' })
    } finally {
      setIsCalling(false)
    }
  }

  const handleMarkDone = async () => {
    if (!currentPatient || !hasActiveTreatment) return
    setIsMarking(true)
    try {
      await markPatientDone(currentPatient.patient_id)
      addToast({ title: 'Treatment completed', description: `${currentPatient.name} marked as done.` })
      setOpenConfirm(false)
      await fetchQueue()
    } catch (error) {
      addToast({ title: 'Unable to complete', description: getErrorMessage(error), variant: 'error' })
    } finally {
      setIsMarking(false)
    }
  }

  return (
    <>
      <Card title="Current Patient" description="Manage treatment workflow in real time">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading current patient...</p>
        ) : !currentPatient ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            No patient in queue right now.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold text-slate-800">{currentPatient.name}</h3>
                <Badge variant={hasActiveTreatment ? 'info' : 'warning'}>{currentPatient.status}</Badge>
                <Badge variant={isHighPriority(currentPatient.priority_score) ? 'danger' : 'neutral'}>
                  Priority {currentPatient.priority_score}
                </Badge>
              </div>
              <p className="text-sm text-slate-600">Token #{currentPatient.token_number}</p>
              <p className="mt-1 text-sm text-slate-600">Symptoms: {currentPatient.symptoms || 'N/A'}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={handleCallNext} isLoading={isCalling} disabled={!currentPatient || hasActiveTreatment}>
                Call Next Patient
              </Button>
              <Button
                variant="danger"
                onClick={() => setOpenConfirm(true)}
                disabled={!currentPatient || !hasActiveTreatment}
              >
                Mark as Done
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Modal
        open={openConfirm}
        title="Complete treatment?"
        description="This will mark the patient treatment as completed."
        confirmText="Yes, Mark Done"
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleMarkDone}
        isLoading={isMarking}
      />
    </>
  )
}

export default CurrentPatientPage
