# Subscription Tracker Backend

This is the backend for the Subscription Tracker project, built with Django and Django REST Framework.

## Features

- User authentication and management
- Subscription tracking API
- SQLite database (default)
- Ready for Docker deployment

## Prerequisites

- Python 3.10+
- [pip](https://pip.pypa.io/en/stable/)
- [virtualenv](https://virtualenv.pypa.io/en/latest/) (recommended)
- Docker (optional, for containerized deployment)

## Setup Instructions

### 1. Clone the repository

```sh
git clone https://github.com/devxuri/subscription-tracker.git
cd subscription-tracker/backend
```

### 2. Create and activate a virtual environment

```sh
python -m venv bndenv
source bndenv/bin/activate
```

### 3. Install dependencies

```sh
pip install -r requirements.txt
```

### 4. Configure environment variables

Copy `.env.example` to `.env` and update values as needed (or create `.env`):

```
SECRET_KEY=your_secret_key
DEBUG=1
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost
```

### 5. Apply database migrations

```sh
python manage.py migrate
```

### 6. Create a superuser (optional, for admin access)

```sh
python manage.py createsuperuser
```

### 7. Run the development server

```sh
python manage.py runserver
```

The API will be available at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

## Running with Docker

1. Build the Docker image:

    ```sh
    docker build -t subscription-backend .
    ```

2. Run the container:

    ```sh
    docker run -p 8000:8000 --env-file .env subscription-backend
    ```

## Project Structure

- `backend/` - Django project settings and configuration
- `api/` - Django app with models, views, serializers, and API routes

## Useful Commands

- Run tests:  
  ```sh
  python manage.py test
  ```
- Access Django admin:  
  Visit `/admin` in your browser

## License

See [LICENSE.txt](../LICENSE.txt) for details.