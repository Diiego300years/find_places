from celery import Celery
import asyncio
import aiohttp
import logging
logging.basicConfig(level=logging.INFO)

celery_app = Celery('tasks',
                    broker='redis://redis-server:6379/0',
                    backend='redis://redis-server:6379/0')

celery_app.conf.update(
    result_expires=3600,  # Results die after 1 hour
    result_extended=True,
    redis_db=0,
    task_track_started=True,
    broker_connection_retry_on_startup=True
)

async def fetch(url, session):
    """
    Fetch data from single URL with aiohttp session.

    Args:
        url (str): URL to fetch data.
        session (aiohttp.ClientSession): Active HTTP session.
    Returns:
        str:  HTTP response value in text.
    """
    async with session.get(url) as response:
        return await response.text()


async def fetch_all(urls):
    """
    Fetch data for URL's list in async way.

    Args:
        urls (list): List URLS to fetch.
    Returns:
       list: List of text responses or exception objects (if an error occurred).
   """
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(url, session) for url in urls]
        responses = await asyncio.gather(*tasks, return_exceptions=True)
    return responses


@celery_app.task(bind=True) # better debug. Need add self in make_request
def make_request(self, urls) -> list:
    """
    Celery task to fetch data from URL's list.

    Args:
        self (Task): Task context Celery (allow logging status).
        urls (str or list): URL or urls to fetch.

    Returns:
        list: List of data fetched from urls.
    """
    logging.info(f"Rozpoczynam pobieranie danych z: {urls}")
    print(f"Backend configured as: {celery_app.conf.result_backend}")
    if isinstance(urls, str):
        urls = [urls]

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    results = loop.run_until_complete(fetch_all(urls))

    for i, result in enumerate(results):
        if isinstance(result, Exception):
            logging.error(f"Błąd podczas pobierania danych z: {urls[i]} — {result}")
        else:
            logging.info(f"Pobrano dane z: {urls[i]}")

    logging.info(f"Zakończono pobieranie danych z: {urls}")
    return results
