from app.models.patient import PatientModel
from app.schemas.patient_schema import PatientSchema
from sqlalchemy.orm import Session

from app.models.user import UserModel, UserRole
from app.utils.patient_utils import calculate_priority, queue_priority_boost


def assign_doctors(department_id: int, db: Session):
    doctors = db.query(UserModel).filter(
        UserModel.department_id == department_id,
        UserModel.role == UserRole.DOCTOR,
    ).all()

    if not doctors:
        return None
    
    doctor_load = []

    for doctor in doctors:
        count = db.query(PatientModel).filter(
            PatientModel.assigned_doctor_id == doctor.user_id,
            PatientModel.status == "WAITING",
        ).count()
        doctor_load.append((doctor, count))

    doctor_load.sort(key=lambda item: item[1])
    return doctor_load[0][0].user_id


def generate_token_number(db: Session):
    last_patient=db.query(PatientModel).order_by(PatientModel.token_number.desc()).first()
    return (last_patient.token_number + 1) if last_patient and last_patient.token_number else 1


def register_patient(patient_data: PatientSchema, db: Session):
    new_patient = PatientModel(
        name=patient_data.name,
        age=patient_data.age,
        gender=patient_data.gender.lower(),
        contact_number=patient_data.contact_number,
        address=patient_data.address,
        physical_disability=patient_data.physical_disability,
        department_id=patient_data.department_id,
        symptoms=patient_data.symptoms,
        body_temperature=patient_data.body_temperature,
        blood_pressure=patient_data.blood_pressure,
        heart_rate=patient_data.heart_rate,
        oxygen_lvl=patient_data.oxygen_lvl,
    )
    new_patient.priority_score = calculate_priority(
        age=new_patient.age,
        physical_disability=new_patient.physical_disability,
        body_temperature=new_patient.body_temperature,
        oxygen_lvl=new_patient.oxygen_lvl,
        heart_rate=new_patient.heart_rate,
        blood_pressure=new_patient.blood_pressure,
    )
    new_patient.assigned_doctor_id = assign_doctors(new_patient.department_id, db)
    new_patient.token_number = generate_token_number(db)

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient

def get_queue(db:Session):
    patient=db.query(PatientModel).filter(
        PatientModel.status=="WAITING"
    ).all()

    patient.sort(
        key=lambda p: (p.priority_score or 0) + queue_priority_boost(p.created_at),
        reverse=True
    )
    return patient

def get_queue_with_wait_time(db:Session):
    queue = get_queue(db)

    AVG_TIME = 10  # minutes per patient

    result = []

    for index, patient in enumerate(queue):
        estimated_wait = index * AVG_TIME

        result.append({
            "patient_id": patient.patient_id,
            "name": patient.name,
            "token": patient.token_number,
            "priority": patient.priority_score,
            "estimated_wait_time": estimated_wait
        })

    return result