Expense Tracker (MySQL-ready) - Skeleton

Structure:
- backend/       -> Django project + 'expenses' app (API for expenses)
- frontend/      -> React app (Expense form + list)

IMPORTANT: This backend is pre-configured for MySQL. Update credentials in backend/backend_project/settings.py:
  DATABASES = {
    'default': {
      'ENGINE': 'django.db.backends.mysql',
      'NAME': 'expense_db',
      'USER': 'your_mysql_user',
      'PASSWORD': 'your_mysql_password',
      'HOST': 'localhost',
      'PORT': '3306',
    }
  }

Quick start (backend):
1. Install MySQL and create database 'expense_db' and a user with privileges.
2. cd backend
3. python -m venv venv
4. source venv/bin/activate   # (Windows: venv\Scripts\activate)
5. pip install -r requirements.txt
6. python manage.py makemigrations
7. python manage.py migrate
8. python manage.py createsuperuser
9. python manage.py runserver

If you get mysqlclient install errors on Linux, install system libs first (e.g. sudo apt-get install default-libmysqlclient-dev build-essential).

Quick start (frontend):
1. cd frontend
2. npm install
3. npm start

After both are running:
- Open React app (http://localhost:3000) to add/view expenses.
- API endpoints: http://127.0.0.1:8000/api/expenses/
