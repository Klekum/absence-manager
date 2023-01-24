# Absence Manager

Little frontend app to display and filter a list of absences.

## Product Features

- [x] A list of absences including the names of the employees.
- [x] Total number of absences and pagination.
- [x] Filters
- [x] Views for different states
- [x] Member detail page
- [ ] (Bonus) I can generate an iCal file and import it into outlook.

## Project setup

You need npm installed on your machine. Clone the project and install dependencies like so:

```bash
git clone https://github.com/phogel/absence-manager.git
cd absence-manager
npm install
```

## Development

To see the project in action in the browser, run this command:

```
npm start
```

This command starts a simple express API server in the background for the files. To start the development environment without the API server (perhaps
to test error responses) run:

```bash
npm start:noapi
```

### Tests

Run the tests with

```bash
npm test
```

## Tech Stack

Built with

- React
- react-testing-library
- RTK Query (Redux)
- MaterialUI
- Typescript
