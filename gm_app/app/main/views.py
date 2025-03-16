from . import main
from typing import TypedDict


class APIResponse(TypedDict):
    message: str


@main.route("/api", methods=["GET"])
def api() -> APIResponse:
    print("halo")
    return {"message": "Hello, world!"}
