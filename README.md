# Todo-RESTful-API
This is an exercise to build a Todo RESTful API using Express.js and PostgreSQL. This project involves create a backend server, connect to a database, and implement CRUD operations.

Objective Create a RESTful API for a Todo application that supports Create, Read, Update, and Delete (CRUD) operations, using Express.js and PostgreSQL.
Prerequisites
- Node.js installed (verify with node -v and npm -v).
- PostgreSQL installed and running (test with psql or pgAdmin).
- Basic knowledge of JavaScript, HTTP methods, and SQL.
- A tool like Postman or curl for testing API endpoints. Estimated Duration: 8-12 hours, spread over a few days.

Step-by-Step Tasks
Phase 1: Setup and Environment Preparation
1. Install Node.js and PostgreSQL
  - Verify Node.js installation. If not installed, download from the official website.
  - Install PostgreSQL and ensure it's running. Connect using psql or pgAdmin.
  - Create a PostgreSQL database named todo_db.

2. Set Up a Project Directory
   - Create a directory (e.g., todo-api).
   - Initialize a Node.js project with npm init -y.
   - Install dependencies: express and pg.
  
3. Create a Basic Express Server
  - Create index.js.
  - Set up an Express server on port 3000 that responds with "Server is running" at /.

Phase 2: Database Setup and Connection 
4. Create a Todos Table
  - In todo_db, create a todos table with columns: id (SERIAL, primary key), title (VARCHAR, 255), completed (BOOLEAN, default false).
  - Execute using psql or a similar tool.

5. Connect Express to PostgreSQL
  - In index.js, configure the pg module to connect to todo_db using a connection pool.
  - Use credentials (hardcoded for now) for user, password, host, port, and database.
  - Test the connection with a query like SELECT NOW().

6. Initialize the Database on Startup
  - Create a function to run the table creation query if the table doesn't exist.
  - Call this function when the server starts.

Phase 3: Implement CRUD Endpoints 
7. GET /todos (List All Todos)
  - Create an endpoint to retrieve all todos.
  - Write a SQL query to select all rows from todos.
  - Return JSON with a 200 status. Handle errors with a 500 status.

8. POST /todos (Create a Todo)
  - Create an endpoint to add a todo, accepting JSON (e.g., { "title": "Buy groceries" }).
  - Insert the title with completed=false.
  - Return the new todo (with id) as JSON with a 201 status.
  - Validate title; return 400 if missing.

9. GET /todos/:id (Get a Single Todo)
  - Create an endpoint to retrieve a todo by id.
  - Return the todo as JSON with a 200 status, or 404 if not found.

10. PUT /todos/:id (Update a Todo)
  - Create an endpoint to update title and/or completed (e.g., { "title": "Buy milk", "completed": true }).
  - Return the updated todo with a 200 status, 404 if not found, or 400 if no fields provided.

11. DELETE /todos/:id (Delete a Todo)
  - Create an endpoint to delete a todo by id.
  - Return a 204 status if successful, or 404 if not found.

Phase 4: Testing and Validation
12. Test the API 
  - Use Postman or curl to test all endpoints (create, list, get, update, delete).
  - Test error cases (e.g., invalid id, missing title, invalid JSON).

13. Add Input Validation
  - Validate title (non-empty, max 255 characters) for POST and PUT.
  - Ensure completed is a boolean for PUT.
  - Return appropriate error messages.

Phase 5: Enhancements and Best Practices 
14. Add Environment Variables 
  - Install dotenv and create a .env file for database credentials.
  - Update connection code to use these variables.
  - Add .env to .gitignore.

15. Organize Code
  - Move database queries to db.js and routes to routes.js.
  - Update index.js to use these modules.

16. Add Error Handling Middleware
  - Implement Express middleware
