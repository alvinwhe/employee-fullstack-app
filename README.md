# Employee List Full Stack Project#

### Setting up frontend ###
* to run the front end, go into the frontend folder  
`cd employee_frontend`
* install the dependencies  
`npm install`
* start the server  
`npm start &`

### Creating database ###
* go back to the root folder  
`cd ..`
* install postgresql from here: https://www.postgresql.org/download/
* start the postgresql server  
`sudo service postgresql start`
* use the postgres user to run the postgres cli  
`sudo -u postgres psql`
* run the `initiate_database.sql` script found in this root folder  
`\i initiate_database.sql`
* if you have trouble with permissions you can move it to the /tmp/ folder and run from there  
`\i /tmp/initiate_database.sql`
* quit out of psql  
`\q`

### Setting up backend ###
* go to the backend folder  
`cd employee_backend`
* install the pip dependencies  
`pip install -r requirements.txt`
* use django to create database tables  
`python3 manage.py migrate`
* run the backend server  
`python manage.py runserver`

### Insert data into database ###
* go back to the root folder  
`cd ../`
* run the postgres cli  
`sudo -u postgres psql`
* connect to the employee database  
`\c employee`
* run the `insert_database.sql` script found in this root folder  
`\i insert_database.sql`
* quit out of psql  
`\q`

### Finish ###
* the front and backend should both be set up now with the data in the tables
