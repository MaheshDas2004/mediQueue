from fastapi import FastAPI

from app.database.connection import Base, engine

Base.metadata.create_all(engine)

app=FastAPI(title="This is my hospital queue management application")

 