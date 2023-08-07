FROM python:3.9

# Set up the working directory
WORKDIR /app

COPY requirements.txt /app
RUN pip install -r requirements.txt

# Install Firefox and the geckodriver for Selenium
RUN apt-get update && apt-get install -y firefox-esr && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y wget
RUN wget -O geckodriver.tar.gz https://github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz
RUN tar -xvzf geckodriver.tar.gz
RUN chmod +x geckodriver
RUN mv geckodriver /usr/local/bin/

# Copy the frontend testing code
COPY . /app/
ENTRYPOINT ["tail", "-f", "/dev/null"]
# Run the frontend tests
#CMD ["pytest", "-s", "test_all.py"]
