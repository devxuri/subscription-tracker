# Subscription Tracker

A Django backend for tracking user subscriptions and categories, with Firebase authentication.

---

## Project Structure

```
backend/
│
├── api/
│   ├── admin.py
│   ├── apps.py
│   ├── firebase.py
│   ├── urls.py
│   ├── migrations/
│   ├── models/
│   │   ├── __init__.py
│   │   ├── category.py
│   │   ├── subscription.py
│   │   └── user.py
│   ├── serializers/
│   │   └── serializers.py
│   ├── services/
│   ├── tests/
│   │   └── tests.py
│   └── views/
│       └── views.py
│
├── backend/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
├── db.sqlite3
├── manage.py
├── requirements.txt
├── .env
├── dockerfile
└── .dockerignore
```

---

## Setup

1. **Clone the repo and create a virtual environment:**
    ```sh
    python3 -m venv bndenv
    source bndenv/bin/activate
    ```

2. **Install dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

3. **Configure environment variables:**
    - Copy `.env.example` to `.env` and fill in your settings (if applicable).

4. **Apply migrations:**
    ```sh
    python manage.py makemigrations
    python manage.py migrate
    ```

5. **Create a superuser (for Django admin):**
    ```sh
    python manage.py createsuperuser
    ```

6. **Run the development server:**
    ```sh
    python manage.py runserver
    ```

---

## Usage

- **Django Admin:**  
  Visit [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) to manage users, subscriptions, and categories.

- **API Endpoints:**  
  Define and access your API endpoints in `api/views/views.py` and `api/urls.py`.

---

## Notes

- **Models** are organized in `api/models/` for scalability.
- **Serializers, views, and services** are modularized in their respective folders.
- **Firebase authentication** logic is in `api/firebase.py`.
- **Switching databases:**  
  You can use SQLite for development and switch to PostgreSQL for production by updating `backend/settings.py`.

---

## Testing

- Run tests with:
    ```sh
    python manage.py test
    ```

---

## Docker

- Build and run with Docker (if configured):
    ```sh
    docker build -t subscription-tracker .
    docker run -p 8000:8000 subscription-tracker
    ```

---

## License

MIT License