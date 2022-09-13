# About the Project
Bake & Take is an e-commerce website for the cake shop that enables users to design their own cake and order it online. the website has an admin control panel for management activities. the Users, products, orders, and reviews management. The website is built using React for single-page frontend dynamic and fast applications. the backend is built using Django python following an object-oriented programming approach. Data fetching and state management on the frontend side are done using the react-redux toolkit. Database API requests are managed using the Django REST framework (DRF) and secured by simple JSON web tokens (JWT). Customer Side user interface design is responsive and implements using Syntactically Awesome Style Sheets SASS. Admin Panel user interfaces are not responsive and implemented simple CSS external stylesheets.

# Output ScreenShots
Project screenshots Images added in the ProjectOutput Folder
![AdminPanel_Dashboard_1](https://user-images.githubusercontent.com/83922375/189864191-a2d9c12e-043e-4dbc-ba8c-7771a8a6ecbb.png)

![LandingPage](https://user-images.githubusercontent.com/83922375/189864239-28bbefd3-6fb1-4ff2-a199-b21c75143e9e.png)

# How to run
After cloning the repo, do the following to setup the app:
1. from the backend folder, execute those lines:

```
env\scripts\activate
pip install -r requirements.txt
cd backend
python manage.py runserver
```

2. the django server should now be up and running.
3. from the Customer_frontend folder, execute those lines:

```
npm install
npm run dev
```
4. from the admin_frontend folder, execute those lines:
```
npm install
npm start
```
