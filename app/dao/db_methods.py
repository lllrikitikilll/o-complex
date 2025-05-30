from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.dao.database import connection
from app.dao.models import Sessionlog


@connection
async def get_history(session: AsyncSession) -> None:
    query = (
        select(
            Sessionlog.search_request,
            func.count(Sessionlog.id).label("count")
        )
        .group_by(Sessionlog.search_request)
        .order_by(Sessionlog.search_request)
    )

    records = await session.execute(query)
    result_dict = {search_request: count for search_request, count in records.all()}
    return result_dict


@connection
async def add_search_log(
    session: AsyncSession, session_id: str, search_request: str
) -> None:
    search_request_on_db = Sessionlog(
        search_request=search_request, session_id=session_id
    )
    session.add(search_request_on_db)
    await session.commit()
