# 💰 Financial Planning & What-If Analysis

> A modern React-based personal finance application that helps users understand their financial position, create financial scenarios, visualize outcomes, analyze past decisions, and make smarter savings and expense decisions.

![Project Banner](https://via.placeholder.com/1200x400?text=Financial+Planning+Dashboard)

## 🚀 Live Demo

🔗 **Live Application:** Add your deployed URL here

> Replace the URL above with your Vercel/Netlify deployment link.

---

## 📌 About the Project

This project was developed as part of a **Masai School Unit 4 Hackathon**.

The application is designed to help users make better financial decisions by providing an interactive environment for:

* Managing income
* Recording expenses
* Adjusting savings
* Creating financial scenarios
* Comparing financial outcomes
* Visualizing financial data
* Reviewing previous analyses

Instead of simply displaying financial numbers, the application focuses on **interactive financial planning and what-if analysis**, allowing users to explore how different financial decisions can affect their future position.

The application is built as a single-page React application with client-side routing and shared financial state managed through React Context.

---

## 🎯 Problem Statement

Personal financial planning can become difficult when users have multiple income sources, recurring expenses, savings goals, and changing financial circumstances.

Users often need answers to questions such as:

* What happens if my income changes?
* How much can I save after my expenses?
* What if I increase or decrease my savings?
* How does a different financial scenario affect my future?
* How did my previous financial decisions perform?

This project addresses these questions through an interactive financial-planning interface.

---

## 💡 Solution

The application provides a centralized financial workspace where users can:

1. Enter their financial information.
2. Record income and expenses.
3. Adjust savings targets.
4. Create different financial scenarios.
5. Analyze the resulting data.
6. Visualize financial outcomes.
7. Review previous analyses.

This creates a simple **plan → simulate → visualize → analyze** workflow.

---

## ✨ Key Features

### 📊 Financial Dashboard

A centralized dashboard provides an overview of the user's financial information and acts as the primary entry point into the application.

### 🧮 Scenario Planning

Users can create financial scenarios and explore different financial possibilities.

**Route:**

```text
/scenario
```

### 📈 Data Visualization

Financial information can be presented visually to make trends and outcomes easier to understand.

**Route:**

```text
/visualization
```

The project uses **D3.js** for data visualization.

### 🕒 Past Analysis

Users can review previous financial analyses and compare earlier decisions.

**Route:**

```text
/past-analysis
```

### 💵 Add Income

Users can add income information to their financial planning workflow.

**Route:**

```text
/add-income
```

### 💳 Expense Tracking

Users can record expenses and incorporate them into their financial calculations.

**Route:**

```text
/log-expense
```

### 🏦 Savings Adjustment

Users can modify their savings strategy and evaluate the effect of changing their savings amount.

**Route:**

```text
/adjust-savings
```

### 🧠 Centralized Financial State

Financial information is managed through a dedicated `FinanceContext`, allowing different pages to access and update shared application state.

### 🧭 Client-Side Navigation

React Router is used to provide navigation between the major application features without traditional page reloads.

---

## 🖼️ Application Preview

### Dashboard

![Dashboard](https://via.placeholder.com/1000x600?text=Dashboard+Screenshot)

### Scenario Planning

![Scenario Planning](https://via.placeholder.com/1000x600?text=Scenario+Planning)

### Financial Visualization

![Visualization](https://via.placeholder.com/1000x600?text=Financial+Visualization)

### Past Analysis

![Past Analysis](https://via.placeholder.com/1000x600?text=Past+Analysis)

> **Recommended:** Upload actual screenshots to the repository and replace these placeholder images.

---

## 🔄 Application Workflow

```text
                    ┌─────────────────────┐
                    │      Dashboard      │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
   │ Add Income  │      │Log Expense  │      │Adjust Saving│
   └──────┬──────┘      └──────┬──────┘      └──────┬──────┘
          │                    │                    │
          └────────────────────┼────────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Scenario Planning │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │    Visualization    │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │    Past Analysis    │
                    └─────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* **React 19** — Component-based UI development
* **JavaScript** — Application logic
* **React Router DOM 7** — Client-side routing
* **CSS** — Styling and responsive interface

### Data & Visualization

* **D3.js** — Financial data visualization
* **React Context API** — Shared financial application state

### Build & Development

* **Vite** — Development server and production build
* **ESLint** — Code quality and linting
* **Git & GitHub** — Version control

The project's package configuration confirms React 19, React Router DOM 7.5, D3 7.9, and Vite 6.2.6.

---

## 🏗️ Project Structure

```text
masai_hackathon/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   │
│   ├── context/
│   │   └── FinanceContext.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── ScenarioForm.jsx
│   │   ├── ScenarioForm.css
│   │   ├── Visualization.jsx
│   │   ├── Visualization.css
│   │   ├── PastAnalysis.jsx
│   │   ├── PastAnalysis.css
│   │   ├── AddIncome.jsx
│   │   ├── AddIncome.css
│   │   ├── LogExpense.jsx
│   │   ├── LogExpense.css
│   │   ├── AdjustSavings.jsx
│   │   └── AdjustSavings.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── public/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

The current repository separates reusable components, context/state management, and feature-specific pages in this structure.

---

## 📋 Application Routes

| Route             | Feature        | Purpose                         |
| ----------------- | -------------- | ------------------------------- |
| `/`               | Dashboard      | Main financial overview         |
| `/scenario`       | Scenario Form  | Create financial scenarios      |
| `/visualization`  | Visualization  | Explore financial data visually |
| `/past-analysis`  | Past Analysis  | Review previous analysis        |
| `/add-income`     | Add Income     | Add income information          |
| `/log-expense`    | Log Expense    | Record expenses                 |
| `/adjust-savings` | Adjust Savings | Modify savings strategy         |

These routes are defined in the application's main router configuration.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Shivam8175/Masai_Unit4Hack.git
```

### 2. Navigate to the project

```bash
cd Masai_Unit4Hack/masai_hackathon
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The Vite development server will provide a local URL in your terminal.

---

## 📦 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Preview

```bash
npm run preview
```

Previews the production build locally.

### Lint

```bash
npm run lint
```

Runs ESLint against the project.

These scripts are defined in the project's `package.json`.

---

## 🧠 Design Decisions

### 1. React Component Architecture

The application is divided into reusable components and feature-specific pages, making the codebase easier to maintain and extend.

### 2. Context-Based State Management

Financial data is shared through `FinanceContext`, avoiding unnecessary prop drilling between different parts of the application.

### 3. Route-Based Feature Separation

Each major financial workflow has its own route and page component.

This makes the application structure easy to understand and allows individual features to evolve independently.

### 4. Visual Data Representation

D3.js is used to transform financial information into visual representations, making numerical data easier to interpret.

---

## 🎥 Project Walkthrough

### Product Demo

🎥 **1–3 minute application walkthrough**

> Add your YouTube/Loom/video link here.

```text
https://your-video-link-here
```

### Codebase Walkthrough

🎥 **1–5 minute codebase walkthrough**

> Add your codebase walkthrough link here.

```text
https://your-video-link-here
```

---

## 📸 Recommended Screenshots

For a stronger GitHub portfolio presentation, add:

```text
screenshots/
├── dashboard.png
├── scenario.png
├── visualization.png
├── past-analysis.png
├── add-income.png
├── log-expense.png
└── adjust-savings.png
```

Then display them in the README:

```markdown
![Dashboard](./screenshots/dashboard.png)

![Financial Visualization](./screenshots/visualization.png)
```

A real **hero image/banner** at the top of the README is strongly recommended for a pinned GitHub project.

---

## 🚀 Future Improvements

Potential improvements include:

* User authentication
* Persistent database storage
* Cloud synchronization
* Monthly and yearly financial reports
* Budget alerts
* Savings goal tracking
* Expense categorization
* More advanced financial forecasting
* Export financial reports as PDF
* CSV import/export
* AI-powered financial recommendations
* Mobile-first improvements

---

## 🧪 Testing

Before deployment, verify:

* Dashboard loads correctly
* Income can be added
* Expenses can be recorded
* Savings can be adjusted
* Scenarios can be created
* Visualization updates correctly
* Past analysis displays correctly
* All routes work correctly
* Production build completes successfully

Run:

```bash
npm run lint
npm run build
```

---

## 📚 What I Learned

Through this project, I gained practical experience with:

* Building a multi-page React application
* React Router
* React Context API
* State management
* Financial data modeling
* D3.js visualization
* Component-based architecture
* Vite development workflow
* Responsive UI development
* Git and GitHub collaboration

---

## 🏆 Hackathon Project

**Event:** Masai School Unit 4 Hackathon

**Project:** Financial Planning & What-If Analysis

The project demonstrates the ability to take a real-world financial planning problem and turn it into an interactive web application using modern frontend technologies.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add: your feature"
```

5. Push your branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

## 📄 License

This project was created for educational and portfolio purposes as part of a Masai School hackathon.

---

## 👨‍💻 Author

### Shivam Thakre

**GitHub:** [@Shivam8175](https://github.com/Shivam8175)

---

## ⭐ Show Your Support

If you found this project interesting, consider giving the repository a ⭐ on GitHub.

**Built with ❤️ using React, Vite & D3.js**
