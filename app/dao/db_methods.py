from app.dao.database import connection
from app.dao.models import Sessionlog
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func


@connection
async def get_history(session: AsyncSession) -> None:
    records = session.query((
            Sessionlog.search_request,
            func.count(Sessionlog.id).label('count')
        )
        .group_by(Sessionlog.search_request)
        .order_by(Sessionlog.search_request)
        .all()
    )
    return records


@connection
async def add_search_log(session: AsyncSession, session_id: str, search_request: str) -> None:
    search_request_on_db = Sessionlog(search_request=search_request, session_id=session_id) 
    session.add(search_request_on_db)
    await session.commit()
