# Paytm-Transaction Simulator

A full-stack application that simulates financial transactions between users. Built with Express and MongoDB for the backend, and React for the frontend. Features user authentication (login and signup) and money transfer functionalities. Includes Docker support for easy setup.

## Features

- User login and signup
- Send money to other users
- Simulated financial transactions
- Docker support for containerization

## Project Structure

- `backend/`: Contains the Express server and API logic.
- `frontend/`: Contains the React frontend application.
- `docker-compose.yml`: Docker Compose file to set up the environment.

## Setup Instructions

### With Docker

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/aman-4321/paytm-transaction-simulator.git
   cd paytm-transaction-simulator
   ```

2. **Build and Start Containers:**

   ```bash
   docker-compose up
   ```

3. **Stop Containers:**

   ```bash
   docker-compose down
   ```

### Without Docker

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/paytm-transaction-simulator.git
   cd paytm-transaction-simulator
   ```

2. **Setup Backend:**

   - Navigate to the backend directory:

     ```bash
     cd backend
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Obtain your MongoDB connection string from MongoDB Atlas:

     - Go to [MongoDB Atlas](https://cloud.mongodb.com/).
     - Log in or sign up for an account.
     - Create a new cluster if you don't have one.
     - Copy the connection string provided, which should look like: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase`.

     - Create a `.env` file in the `backend/` directory and add the following environment variables:

     ```makefile
     MONGO_URL=<Your MongoDB Atlas Connection String>
     ```

   - Start the server:

     ```bash
     npm start
     ```

3. **Setup Frontend:**

   - Navigate to the frontend directory:

     ```bash
     cd ../frontend
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the development server:

     ```bash
     npm start
     ```

4. **Access the Application:**

   - Frontend: [http://localhost:3001](http://localhost:3001)
