from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.dao.database import Base


class Sessionlog(Base):
    __tablename__ = "session_log"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    session_id: Mapped[str] = mapped_column(String)
    search_request: Mapped[str] = mapped_column(String)
    
