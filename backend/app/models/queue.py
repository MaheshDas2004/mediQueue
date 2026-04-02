from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.connection import Base

class QueueModel(Base):
    __tablename__ = "queue"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)

    token_number = Column(Integer, nullable=False)
    status = Column(String, default="waiting")

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    patient = relationship("PatientModel", back_populates="queues")
    doctor = relationship("DoctorModel", back_populates="queues")
    department = relationship("DepartmentModel", back_populates="queues")