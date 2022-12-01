# Flask React Project

This is the starter for the Flask React project.

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




# Contact The Project Developer

## Christopher Pannella
Email: cpannella3@gmail.com

Github: https://github.com/cpannella

LinkedIn: https://www.linkedin.com/in/chrisotpher-pannella-ab0852242/
