# ToDo App

This project is a simple task management application built using Laravel for the backend and React for the frontend.

## Requirements

- PHP 8.x
- Composer
- Node.js
- npm or Yarn
- SQLite (or another supported database)

## Installation

### Clone the Repository

git clone https://github.com/StepanT1005/todo-app-laravel-test-work.git
cd todo-app


### Backend Setup

1. Install PHP dependencies:

composer install

2. Create a `.env` file based on `.env.example`

cp .env.example .env

3. Generate the application key:

php artisan key:generate

4. Configure the database in the .env file. For SQLite, ensure the database path is correctly set

DB_CONNECTION=sqlite

5. Create the SQLite database file:

touch database/database.sqlite

6. Run the database migrations:

php artisan migrate

### Frontend Setup

1. Navigate to the frontend directory:

cd todo-app-frontend

2. Install JavaScript dependencies:

npm install

or

yarn install

3. Start the development server:

npm start

або

yarn start

### Running the Laravel Server

In the root directory of the project, start the Laravel server:

php artisan serve

The project will be available at http://localhost:8000

## Usage

Navigate to http://localhost:3000 to work with the React frontend.
Use the interface to add, view, and delete tasks.
