# SauceDemo Cypress Automation

This project contains end-to-end (E2E) tests written in **Cypress (JavaScript)** for automating test scenarios on Saucedemo (https://www.saucedemo.com).

---

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/saucedemo-cypress.git
   cd saucedemo-cypress
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment variable file**

   Create a `.env` file in the root of the project, use `.env.example` as reference

## 🚀 Run Tests

You can run tests in different browsers and modes using the following scripts:

### ▶️ Headed Mode (Opens the Cypress Test Runner UI)

- **Chrome**

  ```bash
  npm run cy:chrome:open
  ```

- **Electron**

  ```bash
  npm run cy:electron:open
  ```

- **Edge**
  ```bash
  npm run cy:edge:open
  ```

---

### 🖥 Headless Mode (Runs tests in the terminal)

- **Chrome**

  ```bash
  npm run cy:chrome:run
  ```

- **Electron**

  ```bash
  npm run cy:electron:run
  ```

- **Edge**
  ```bash
  npm run cy:edge:run
  ```

---
