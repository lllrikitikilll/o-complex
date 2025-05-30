from app.dao.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer


class Sessionlog(Base):
    __tablename__ = "session_log"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    search_request: Mapped[str] = mapped_column(String)
    
