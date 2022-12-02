# LairBnB

## Live site
 https://lairbnb-2maf.onrender.com/

## Getting started
1. Clone this repository (only this branch)
git clone https://github.com/cpannella/LairBnB
## Available Scripts

Before starting with the next steps, ensure you cd in to the app (backend) directory to make sure you have base dependencies for running this app.

=================================================

2. Install dependencies (Backend / Flask)

```bash
  pipenv install -r requirements.txt
  ```

To generate a new requirements.txt run this command

```bash
 pipenv requirements > requirements.txt
 ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app
   
```bash
 pipenv shell 
 ```
   
```bash
 flask db upgrade
 ```
   
```bash
 flask seed all 
 ```
   
```bash
 flask run 
 ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

Before starting with the next steps, ensure you cd in to the react-app directory to make sure you have base dependencies for running this app.

=================================================

In the project directory, you can run:

```bash
 npm install
 ```

To start the application, run the following command:

```bash
 npm start
 ```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn Flask check out the [Flask documentation](https://flask.palletsprojects.com/en/2.2.x/).

To learn SQLAlchemy check out the [SQLAlchemy documentation](https://www.sqlalchemy.org/).

To learn WTForms check out the [WTForms documentation](https://wtforms.readthedocs.io/en/2.3.x/).


<!-- ROADMAP -->
## Roadmap

- [x] Feature 1 - Spots - Users can upload, edit, delete spots.
    - [x] Feature 2 - Reviews - Users can post and delete reviews on spots.
  - [ ] Feature 3 - Search - Users will be able to search spots by keyword parameters
    - [ ] Feature 4 - Bookings - Users will be able to create bookings to plan spots.





## Built With
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  

![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)


# Contact The Project Developer

## Christopher Pannella
Email: cpannella3@gmail.com

Github: https://github.com/cpannella

LinkedIn: https://www.linkedin.com/in/chrisotpher-pannella-ab0852242/
