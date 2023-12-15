# Full-Stack Note App

A simple full-stack note-taking application with user authentication and authorization which includes tokens and password hashing with bcrypt. The app is built using a MERN stack (MongoDB, Express.js, React, Node.js), with user authentication handled using JWT tokens.

https://github.com/lomsadze123/fullstack-note-app/assets/91826108/d448ccbc-01ac-4d0b-92fe-d4ac0d218080

## API Endpoints

POST /api/users: Create a new user account.
POST /api/login: Authenticate and generate a JWT token.
GET /api/users: Get a list of users (for development purposes).
GET /api/notes: Get a list of notes for the authenticated user.
POST /api/notes: Create a new note for the authenticated user.
GET /api/notes/:id: Get details of a specific note.
DELETE /api/notes/:id: Delete a specific note.

## Setup

1. Clone the Repository: Start by cloning the repository to your local machine using the following command:

```bash
git clone https://github.com/lomsadze123/fullstack-note-app.git
```

2. Install Dependencies: Install the project dependencies using npm:

```bash
npm install
```

3. Start the Application: Run the development server to see the application in action:

```bash
npm run dev
```

## Built With
-  HTML5 (JSX)
- Tailwind CSS
- React
- TypeScript
- useState Hook
- useEffect Hook
- Axios
- React Router
- NodeJs / ExpressJs
- MongoDB
- Mongoose
