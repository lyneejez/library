# library



this is an example expressjs application

the aplication has 2 sides a) Frontend (website) and backend (API)

to run the application git clone this repo;

1. git clone the repo
2. enter into backend/db and install the msqql database library.
3. update the db config backend/db/db.js connection
4. enter into frontend and run npm frontend
5. enter into backend and run npm backend
6. on the frontend npm run frontend the application will resolve on http://localhost:5000
7. on the backend npm run backend the application will resolve on http://localhost:3000


you can use the respective  routes


GET :3000/animals

GET :3000/animals/[id]

POST :3000/animals

PATCH :3000/animals/[id]/edit

DELETE :3000/animals/[id]

GET :3000/classifications

GET :3000/classifications/[id]

POST :3000/classifications

PATCH :3000/classifications/[id]/edit

DELETE :3000/classifications/[id]


GET :3000/categories

GET :3000/categories/[id]

POST :3000/categories

PATCH :3000/categories/[id]/edit

DELETE :3000/categories/[id]
