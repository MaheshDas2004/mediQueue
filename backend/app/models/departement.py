from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base
class DepartmentModel(Base):
    __tablename__ = "departments"
    
    department_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    doctors = relationship("DoctorModel", back_populates="department")
    name = Column(String, nullable=False)
    code = Column(String, nullable=False, unique=True)