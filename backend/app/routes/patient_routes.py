from fastapi import APIRouter, Depends
from app.services.patient_service import register_patient,show_patients
from app.schemas.patient_schema import PatientSchema
from app.database.connection import get_db

patient_router = APIRouter(prefix="/patients")


@patient_router.post("/register")
def register_patient_endpoint(patient_data:PatientSchema, db=Depends(get_db)):
    
    return register_patient(patient_data, db)
    
@patient_router.get("/all")
def show_patients_endpoint(db=Depends(get_db)):
    return show_patients(db)

