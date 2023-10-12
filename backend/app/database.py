from typing import Optional

import aiopg
import psycopg2

_pool: Optional[aiopg.Pool] = None


async def get_db() -> aiopg.Pool:
    global _pool

    if _pool is None:
        _pool = await aiopg.create_pool()

    return _pool


async def maybe_get_db() -> Optional[aiopg.Pool]:
    try:
        return await get_db()
    except psycopg2.OperationalError:
        return None


def clear_db():
    global _pool
    _pool = None