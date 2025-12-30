# Notes SPA

This project is a Single Page Application (SPA) built with React and Vite. It allows users to manage notes with the ability to mark them as important. The application interacts with a JSON server to persist data.

## Features

- **View Notes**: Display a list of notes.
- **Add Notes**: Create new notes with a random importance flag.
- **Toggle Importance**: Mark notes as important or not.
- **Error Notifications**: Display error messages when operations fail.

## Project Structure

The project is organized as follows:

```
public/          # Static assets
src/             # Source code
  components/    # React components
  services/      # API service for notes
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd part1
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the JSON server:
   ```bash
   npm run server
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To create a production build:
```bash
npm run build
```

### Previewing the Production Build

To preview the production build locally:
```bash
npm run preview
```

## Dependencies

- React
- React DOM
- Axios

## Development Dependencies

- Vite
- ESLint
- JSON Server

## Configuration

The application uses Vite for development and build processes. The configuration file is `vite.config.js`.

## License

This project is licensed under the MIT License.