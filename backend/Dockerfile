FROM python:3.11

COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /app

# コンテナ起動時に実行するコマンドを設定する
CMD ["python", "app.py"]
