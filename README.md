# About the project
Bake and Take Ecommerce cake shop built using Django as a backend, and fully seperate React app as a front end. It uses jwt-token in user authorization.for admin and customer log in

# Output ScreenShots
Project screenshots Images added in the ProjectOutput Folder

# How to run
After cloning the repo, do the following to setup the app:
1- from the backend folder, execute those lines:

...bash
env\scripts\activate
pip install -r requirements.txt
cd backend
python manage.py runserver
...

2- the django server should now be up and running.
3- from the Customer_frontend folder, execute those lines:

npm install
npm run dev

4- the django server should now be up and running.
5- from the admin_frontend folder, execute those lines:

npm install
npm start
