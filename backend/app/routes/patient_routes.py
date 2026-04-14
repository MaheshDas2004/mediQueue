from fastapi import APIRouter, Depends,status
from app.services.patient_service import register_patient, get_queue_with_wait_time
from app.schemas.patient_schema import PatientSchema
from app.database.connection import get_db
from app.dependencies.auth import require_doctor_or_triage, require_triage

patient_router = APIRouter(prefix="/patients")


@patient_router.post("/register",status_code=status.HTTP_201_CREATED)
def register_patient_endpoint(patient_data:PatientSchema,triage_user=Depends(require_triage), db=Depends(get_db)):
    
    patient= register_patient(patient_data, db)

    return {
        "message": "Patient registered successfully",
        "token_number": patient.token_number,
    }
    
@patient_router.get("/queue")
def get_queue_endpoint(user=Depends(require_doctor_or_triage), db=Depends(get_db)):
    
    return get_queue_with_wait_time(db)

