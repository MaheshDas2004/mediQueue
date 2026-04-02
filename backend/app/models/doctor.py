from sqlalchemy import Column, Integer,BOOLEAN,String,ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base

class DoctorModel(Base):
    __tablename__ = "doctors"
    
    doctor_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)

    department_id=Column(Integer,ForeignKey("departments.department_id"), nullable=False)
    is_available=Column(BOOLEAN, default=True)

    department =relationship("DepartmentModel", back_populates="doctors")
    queues = relationship("QueueModel", back_populates="doctor")