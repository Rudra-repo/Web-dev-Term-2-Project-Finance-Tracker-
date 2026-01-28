# Web-dev-Term-2-Project-Finance-Tracker-

Finance Tracker project using HTML, CSS and JAVASCRIPT.

# Personal Finance Dashboard

A responsive personal finance dashboard built using HTML, CSS, and Vanilla JavaScript.  
The application helps users track income, expenses, spending limits, and recent transactions with persistent local storage.

---

## Problem Statement
Managing personal finances manually is inefficient and error-prone.  
Many users struggle to keep track of income, expenses, and spending limits in one place.

This project solves that problem by providing:
- A centralized dashboard for financial tracking
- Real-time updates based on user actions
- Persistent data storage in the browser
- Clear visual feedback for spending behavior

---

## Features

- Add income and expense transactions
- Categorized transaction tracking
- Monthly income and expense summary
- Spending limit progress visualization
- Recent transactions table with delete functionality
- Export transactions to CSV
- Persistent data using localStorage
- Responsive design for desktop and mobile
- Keyboard shortcuts for faster input

---

## Tech Stack

- HTML5 – Structure and layout  
- CSS3 – Styling, responsiveness, and animations  
- JavaScript (Vanilla) – Application logic and state management  
- Font Awesome – Icons  

No external frameworks or libraries are used.

---

      ## Project Structure
      ├── index.html
      ├── style.css
      ├── script.js
      └── README.md

---

## How It Works

- All transactions are stored in the browser using localStorage
- Income and expenses update the dashboard in real time
- Each transaction is assigned a unique identifier
- Deleting a transaction recalculates totals automatically
- CSV export generates a downloadable file containing all transactions

---

## Keyboard Shortcuts

- Ctrl + I – Open Add Income modal  
- Ctrl + E – Open Add Expense modal  
- Esc – Close any open modal  

---

## Setup Instructions

1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. Start adding income and expenses

No build tools or server setup is required.

---

## Code Quality Notes

- No duplicate JavaScript functions
- Unused HTML and CSS removed
- Clean separation between structure, style, and logic
- Single source of truth for application state
- Safe localStorage initialization

---

## Possible Enhancements

- Monthly and yearly filters
- Category-wise charts
- Dark mode support
- Backend integration
- Authentication and user profiles
- Progressive Web App (PWA) support

---

## Author

Rudra Pratap Singh
