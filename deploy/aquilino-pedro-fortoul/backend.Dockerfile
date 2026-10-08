FROM english-platform-backend:latest
COPY backend /app
RUN python -c "import gunicorn; import django"
