# Notes Backend API

RESTful API service for managing notes, built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account or local MongoDB instance

## Installation

1. Clone the repository and navigate to the Backend directory:

```bash
git clone <repository-url>
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables by creating a `.env` file:

```
MONGODB_URI=<your-mongodb-connection-string>
PORT=3001
```

## Running Locally

**Development mode** (with auto-reload):

```bash
npm run dev
```

**Production mode**:

```bash
npm start
```

The server will start on port 3001 (or the port specified in `.env`).

## Project Structure

```
Backend/
├── models/          # Mongoose schemas
├── requests/        # API request examples
├── dist/            # Frontend build files
├── index.js         # Application entry point
├── mongo.js         # MongoDB connection utility
└── package.json     # Dependencies and scripts
```

## API Endpoints

### GET /api/notes

Retrieves all notes from the database.

**Response**: JSON array of note objects

### GET /api/notes/:id

Retrieves a specific note by ID.

**Parameters**: `id` - MongoDB ObjectId

**Response**: JSON object of the requested note

### POST /api/notes

Creates a new note.

**Request Body**:

```json
{
  "content": "Note content",
  "important": false
}
```

**Response**: JSON object of the created note

### DELETE /api/notes/:id

Deletes a specific note by ID.

**Parameters**: `id` - MongoDB ObjectId

**Response**: 204 No Content

## Environment Variables

| Variable    | Description               | Required |
| ----------- | ------------------------- | -------- |
| MONGODB_URI | MongoDB connection string | Yes      |
| PORT        | Server port number        | Yes      |

## Dependencies

- express - Web application framework
- mongoose - MongoDB object modeling
- dotenv - Environment variable management
- morgan - HTTP request logger middleware

## License

MIT
