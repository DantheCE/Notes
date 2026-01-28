# Notes Backend API

A RESTful API service for managing notes, built with Node.js, Express, and MongoDB.

## Overview

This application provides a backend service for creating, retrieving, and managing notes. It uses MongoDB for data persistence and Express.js for handling HTTP requests.

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account or local MongoDB instance
- Git (for version control)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=<your-mongodb-connection-string>
PORT=3001
```

Replace `<your-mongodb-connection-string>` with your actual MongoDB connection string.

## Running the Application Locally

### Development Mode

To run the application in development mode with automatic restart on file changes:

```bash
npm run dev
```

### Production Mode

To run the application in production mode:

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3001).

## Deployment

This application is deployed on [Render](https://render.com/), a cloud platform for hosting web services.

### Deployment Configuration

The application is configured to deploy automatically from the repository. Render uses the following settings:

- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:** Set in the Render dashboard
  - `MONGODB_URI` - MongoDB connection string
  - `PORT` - Automatically provided by Render

### Accessing the Deployed Application

The production API is available at: **https://notes-hdf8.onrender.com**

All API endpoints listed below are available on the production server. For example:

- `https://notes-hdf8.onrender.com/api/notes` - Get all notes
- `https://notes-hdf8.onrender.com/api/notes/:id` - Get a specific note

## Project Structure

```
Backend/
├── models/
│   └── note.js          # Mongoose schema for notes
├── requests/            # API request examples
├── dist/                # Frontend build files (if applicable)
├── index.js             # Main application entry point
├── mongo.js             # MongoDB connection utility
├── package.json         # Project dependencies and scripts
└── .env                 # Environment variables (not tracked in git)
```

## API Endpoints

### Get All Notes

- **Method:** GET
- **Endpoint:** `/api/notes`
- **Description:** Retrieves all notes from the database
- **Response:** JSON array of note objects

### Get Single Note

- **Method:** GET
- **Endpoint:** `/api/notes/:id`
- **Description:** Retrieves a specific note by ID
- **Parameters:** `id` - MongoDB ObjectId of the note
- **Response:** JSON object of the requested note

### Create Note

- **Method:** POST
- **Endpoint:** `/api/notes`
- **Description:** Creates a new note
- **Request Body:**

```json
{
  "content": "Note content",
  "important": false
}
```

- **Response:** JSON object of the created note

### Delete Note

- **Method:** DELETE
- **Endpoint:** `/api/notes/:id`
- **Description:** Deletes a specific note by ID
- **Parameters:** `id` - MongoDB ObjectId of the note
- **Response:** 204 No Content

## Available Scripts

- `npm start` - Run the application in production mode
- `npm run dev` - Run the application in development mode with auto-reload
- `npm run build:ui` - Build and copy frontend files to dist directory
- `npm run deploy:full` - Build UI and deploy to git repository

## Dependencies

- **express** - Web application framework
- **mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **morgan** - HTTP request logger middleware

## Environment Variables

| Variable    | Description               | Required |
| ----------- | ------------------------- | -------- |
| MONGODB_URI | MongoDB connection string | Yes      |
| PORT        | Server port number        | Yes      |

## Error Handling

The application includes error handling for:

- Invalid endpoints (404)
- Missing required fields (400)
- Database connection errors (500)
- Note not found errors (404)

## License

MIT
