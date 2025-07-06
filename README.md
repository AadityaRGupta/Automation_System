# Claims Automation_System
A backend focused project simulating an automated insurance claims workflow system. Built with Express.js and PostgreSQL, this system handles user-submitted claims, validates inputs, assigns claim status, and simulates approvals.

## Features
- Submit new insurance claims via REST API
- Validate incoming claim data (policy ID, amount, type, etc.)
- Assign default status: pending, approved, or rejected
- Simulate claim approval rules (e.g., auto-approve under $1000)
- Connects to a PostgreSQL database for persistent storage

## Tech Stack
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Tools: Postman, Git, dotenv

## Setup Instructions
```bash
git clone https://github.com/yourusername/claims-automation-system.git
cd claims-automation-system
npm install
```

Create a `.env` file:
```
DB_URL=your_postgres_connection_url
```

Start the server:
```bash
node server.js
```
