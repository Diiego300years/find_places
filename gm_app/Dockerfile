FROM python:3.10.15-slim
LABEL authors="Marcin Buczak"
RUN apt-get update && apt-get install -y gcc python3-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
#COPY config.py .
#COPY wsgi.py .
#COPY entrypoint.sh /entrypoint.sh

RUN #chmod +x /entrypoint.sh
EXPOSE 5000
ENV PYTHONUNBUFFERED=1
#ENTRYPOINT ["/entrypoint.sh"]

CMD ["python", "gm_app/wsgi.py"]
