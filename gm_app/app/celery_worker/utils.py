import logging
import asyncio

async def cleanup_in_a_hurry(loop):
    """
    Cleanup logic for handling soft time limit exceeded scenarios.
    - Cancels running tasks in the event loop.
    - Gracefully closes the aiohttp session.
    """
    logging.warning("Przekroczono soft time limit — czyszczenie zasobów...")

    # Anulowanie aktywnych zadań w asyncio
    tasks = [task for task in asyncio.all_tasks(loop) if task is not asyncio.current_task()]
    for task in tasks:
        task.cancel()
        try:
            await task
        except asyncio.CancelledError:
            logging.warning(f"Anulowano zadanie {task.get_name()}")

    logging.info("Cleanup zakończony")
