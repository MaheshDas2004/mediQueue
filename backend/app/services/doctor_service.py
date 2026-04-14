from app.models.patient import PatientModel
from app.schemas.patient_schema import PatientSchema
from sqlalchemy.orm import Session

from app.models.user import UserModel, UserRole
from app.utils.patient_utils import queue_priority_boost

def get_doctor_queue(db:Session, doctor_id: int):
    patients = db.query(PatientModel).filter(
        PatientModel.assigned_doctor_id == doctor_id,
        PatientModel.status.in_(["WAITING", "IN_TREATMENT"]),
    ).all()

    patients.sort(
        key=lambda p: (p.priority_score or 0) + queue_priority_boost(p.created_at),
        reverse=True
    )
    return patients

def start_treatment(patient_id: int, db: Session):
    patient = db.query(PatientModel).filter(PatientModel.patient_id == patient_id).first()
    if not patient:
        return None
    patient.status = "IN_TREATMENT"
    db.commit()
    db.refresh(patient)
    return patient

def complete_treatment(patient_id: int, db: Session):
    patient = db.query(PatientModel).filter(PatientModel.patient_id == patient_id).first()
    if not patient:
        return None
    patient.status = "COMPLETED"
    db.commit()
    db.refresh(patient)
    return patient