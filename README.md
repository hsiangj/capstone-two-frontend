# ExpenseBud

This repository is completed as part of capstone two of Springboard Software Engineering Career Track. The backend can be found [here](https://github.com/hsiangj/capstone-two-backend "ExpenseBud Backend"). 

### Application Description
"ExpenseBud" is a web app for users to easily track their expenses and budget goals. Aside from manual entries of expenses, users could connect with their financial institutions to import transactions via the [Plaid API](https://plaid.com/docs/). Both the expenses and budgets data are visualized in a simple to understand dashboard for high level overview. 

View the application [here](https://expensebud.onrender.com/ "ExpenseBud") on Render. Best viewed on desktop. 

### Technology Stack & Tools
#### Frontend
* React
* Material UI
* Chart.js
* React Chart.js
#### Backend
* Express
* Node.js
#### Database
* PostgreSQL
#### Others
* Axios
* JWT

### Preview
Home page before signup/login    
<img src="/screenshots/home.png" alt="ExpenseBud homepage" width="auto" height="250px">

User dashboard  
<img src="/screenshots/dashboard.png" alt="ExpenseBud dashboard" width="auto" height="250px">

Accounts page to connect with financial institution   
<img src="/screenshots/accounts.png" alt="ExpenseBud accounts page" width="auto" height="250px">

Plaid interface  
<img src="/screenshots/plaid.png" alt="Plaid link" width="auto" height="250px">

Expenses page  
<img src="/screenshots/expenses.png" alt="ExpenseBud expenses page" width="auto" height="250px">

### Features
* Data visualization: pie chart to visualize expense distribution and column chart to visualize total expenses compared to budget goals.
* Budget management: set up and manage budgets for various categories (eg. transportation, medical, food & beverage, etc.).
* Expense management: import transactions from financial institution or manually enter with details such as date, amount, category, and description. Imported transactions will automatically be categorized. 
* User profile: profile management and user authentication via register or login.

### Standard User Flow
1. New user creates an account / Returning user logs in. On success, user will be directed to Dashboard. 
2. Set budget goals in the Budgets tab.
3. Add expenses via Accounts tab by connecting with a financial institution OR add expenses manually via Expenses tab. 
    * If adding an account in Accounts tab, the 'Connect a Bank Account' button will prompt a series of login steps via Plaid API. The app is currently set in sandbox mode so no real credentials and transactions are involved. 
4. Review aggregated data in Dashboard. 
5. User logs out.

### Tests
Tests are contained in the folder each component belongs to and can be run with `npm test` at the root directory. 



