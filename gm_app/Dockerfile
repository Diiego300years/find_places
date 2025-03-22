FROM python:3.10.15-slim
LABEL authors="Marcin Buczak"
RUN apt-get update && apt-get install -y gcc python3-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 5000
ENV PYTHONUNBUFFERED=1
#CMD ["ls", "app"]
CMD ["python", "wsgi.py"]
