# Setting up the backend
- Ensure you have python3 installed on your machine
    - Run pip3 install -r requirements.txt
    - Run python3 manage.py makemigrations mentorq_backend
    - Run python3 manage.py migrate mentorq_backend
    - Run python3 manage.py makemigrations mentorq_users
    - Run python3 manage.py migrate mentorq_users
    - Run python3 manage.py migrate

## Running the backend
- Run python3 manage.py runserver
