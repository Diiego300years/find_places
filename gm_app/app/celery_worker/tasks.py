from celery.exceptions import SoftTimeLimitExceeded
import asyncio
import aiohttp
import logging
from .utils import cleanup_in_a_hurry
from celery import shared_task
import json


logging.basicConfig(level=logging.INFO)


async def fetch(url, session, timeout=3):
    """
    Fetch data from single URL with aiohttp session in max 0.2 seconds.

    Args:
        url (str): URL to fetch data.
        session (aiohttp.ClientSession): Active HTTP session.
    Returns:
        str:  HTTP response value in text.
    """
    try:
        async with session.get(url, timeout=timeout) as response:
            text_data = await response.text()
        try:
            json_data = json.loads(text_data)
            return json_data
        except json.decoder.JSONDecodeError:
            return "Error"

    except asyncio.TimeoutError:
        logging.error(f"Timeout dla URL: {url}")
        return "Timeout"

    except Exception as e:
        logging.error(f"Błąd podczas pobierania z {url}: {e}")
        return "Error"


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
        print("a to?", tasks)
        responses = await asyncio.gather(*tasks, return_exceptions=True)
        print("działa", responses)
    return responses


@shared_task(bind=True) # better debug. Need add self in make_request
def make_request(self, urls) -> list:
    """
    Celery task to fetch data from URL's list.

    Args:
        self (Task): Task context Celery (allow logging status).
        urls (str or list): URL or urls to fetch.

    Returns:
        list: List of data fetched from urls.
    """
    partial_results = []

    try:
        logging.info(f"Rozpoczynam pobieranie danych z: {urls}")
        if isinstance(urls, str):
            urls = [urls]

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        results = loop.run_until_complete(fetch_all(urls))

        for i, result in enumerate(results):
            if result == "Timeout":
                logging.error(f"Timeout podczas pobierania danych z: {urls[i]}")
            elif result == "Error":
                logging.error(f"Błąd podczas pobierania danych z: {urls[i]}")
            else:
                logging.info(f"Pobrano dane z: {urls[i]}")

        logging.info(f"Zakończono pobieranie danych z: {urls}")
        print("TERAZ WYNIKI,", results, "ORAZ TYP", type(results) )
        return results

    except SoftTimeLimitExceeded:
        # Cleanup na wypadek soft limitu
        loop.run_until_complete(cleanup_in_a_hurry(loop))
        logging.error("Zadanie przerwane z powodu soft time limit")
        return partial_results
    # close loop as finally to avoid errors
    finally:
        if not loop.is_closed():
            loop.close()
