# Harvee Technologies – QA Automation Assessment (Section A2)

## 1. Project Overview

This project automates selected manual test cases from Section A1 for the Sauce Demo web application using **Playwright Test with JavaScript**.

The objective is to validate important application workflows, including login, product sorting, cart management, checkout, and access control.

The automation framework follows the Page Object Model (POM) design pattern to improve code reusability, maintainability, and test readability.

**Application Under Test:** https://www.saucedemo.com/

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| JavaScript | Automation programming language |
| Node.js | JavaScript runtime |
| Playwright Test | Browser automation and test runner |
| Page Object Model | Separates page locators and actions from test logic |
| dotenv | Manages environment variables |
| HTML Reporter | Generates readable test execution reports |
| JUnit Reporter | Generates XML reports for CI integration |
| VS Code | Development environment |

## 3. Project Structure

```text
Section A2/
│
├── pages/
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── tests/
│   ├── login.spec.js
│   ├── product.spec.js
│   ├── checkout.spec.js
│   └── security.spec.js
│
├── test_data/
│   └── users.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

**Folder descriptions:**

- `pages/`: Contains page classes, locators, and reusable actions.
- `tests/`: Contains automated test scenarios.
- `test_data/`: Contains test user credentials and data.
- `playwright.config.js`: Contains Playwright configuration and reporting settings.
- `.env`: Stores environment-specific configuration.

## 4. Prerequisites

Before executing the automation suite, ensure the following are installed:

- Node.js (LTS version recommended).
- npm (included with Node.js).
- Visual Studio Code.
- Internet connection to access Sauce Demo.

Verify the installations:

```bash
node -v
npm -v
```

## 5. Installation and Setup

### Step 1: Install dependencies

Open the terminal in the project root directory and execute:

```bash
npm install
```

If the dependencies are not already configured, install them using:

```bash
npm install -D @playwright/test
npm install dotenv
```

### Step 2: Install browser

Install Chromium:

```bash
npx playwright install chromium
```

### Step 3: Configure environment variables

Create a `.env` file in the project root.

Example configuration:

```env
BASE_URL=https://www.saucedemo.com
STANDARD_USERNAME=standard_user
LOCKED_USERNAME=locked_out_user
INVALID_USERNAME=invalid_user
PASSWORD=secret_sauce
```

The application URL and test credentials are loaded through environment variables instead of being hardcoded in the test cases.

The sample credentials are for the public Sauce Demo practice application. The `.env` file should not be committed to version control.

## 6. Execution Commands

### Run the complete automation suite

```bash
npx playwright test
```

### Run tests with a visible browser

```bash
npx playwright test --headed
```

### Run with one worker

```bash
npx playwright test --headed --workers=1
```

### Run with two workers

```bash
npx playwright test --headed --workers=2
```

### Execute individual test files

**Login tests:**

```bash
npx playwright test tests/login.spec.js --headed
```

**Product and cart tests:**

```bash
npx playwright test tests/product.spec.js --headed
```

**Checkout tests:**

```bash
npx playwright test tests/checkout.spec.js --headed
```

**Security tests:**

```bash
npx playwright test tests/security.spec.js --headed
```

### Run tests using a manual case ID

Example:

```bash
npx playwright test -g "TC22"
```

## 7. Manual-to-Automation Traceability Matrix

The following table maps the A1 manual test cases to their corresponding automated tests.

| Manual ID | Test Scenario | Automation Status | Test File |
|---|---|---|---|
| TC01 | Standard user login | Automated | login.spec.js |
| TC02 | Locked-out user login | Automated | login.spec.js |
| TC03 | Invalid username | Automated | login.spec.js |
| TC04 | Invalid password | Automated | login.spec.js |
| TC05 | Empty login fields | Manual only | — |
| TC06 | Password masking | Manual only | — |
| TC07 | Product display verification | Manual only | — |
| TC08 | Product sorting by name A–Z | Manual only | — |
| TC09 | Product sorting by name Z–A | Manual only | — |
| TC10 | Product sorting by price low to high | Automated | product.spec.js |
| TC11 | Product sorting by price high to low | Manual only | — |
| TC12 | Product details navigation | Manual only | — |
| TC13 | Add one product to cart | Manual only | — |
| TC14 | Add two products and remove one | Automated | product.spec.js |
| TC15 | Remove product from cart page | Manual only | — |
| TC16 | Empty cart verification | Manual only | — |
| TC17 | Complete checkout and verify total | Automated | checkout.spec.js |
| TC18 | Missing checkout information validation | Automated | checkout.spec.js |
| TC19 | Checkout price calculation | Covered by TC17 | checkout.spec.js |
| TC20 | Cancel checkout | Manual only | — |
| TC21 | Minimum non-empty customer information | Manual only | — |
| TC22 | Direct Products URL access after logout | Automated | security.spec.js |
| TC23 | Cross-browser and responsive testing | Manual only | — |
| TC24 | Keyboard and screen-reader accessibility | Manual only | — |
| TC25 | Login error usability | Manual only | — |

**Note:** TC18 uses a data-driven approach to validate three scenarios: missing first name, missing last name, and missing postal code. Playwright registers these as three independent tests.

TC19's calculation assertion is included within the full checkout journey in TC17. It is not a separate automated test.

## 8. Page Object Model Implementation

The framework uses the Page Object Model to keep test logic separate from application page interactions.

### LoginPage.js

Responsible for:

- Username and password input fields.
- Login button.
- Login action.
- Login error messages.

### ProductsPage.js

Responsible for:

- Product sorting.
- Adding and removing products.
- Cart badge verification.
- Opening the cart.
- Logging out.

### CartPage.js

Responsible for:

- Cart item verification.
- Removing products from the cart.
- Navigating to checkout.

### CheckoutPage.js

Responsible for:

- Entering customer information.
- Checkout validation messages.
- Reading subtotal, tax, and total.
- Completing the order.

## 9. Test Independence and Reliability

Each test runs independently using Playwright's isolated browser context.

Tests requiring authentication perform their own login and create their own required cart data. They do not depend on the execution order of other tests.

The suite uses:

- Playwright's automatic waiting mechanism.
- Web-first assertions.
- Independent test execution.
- Environment-based configuration.
- Reusable page objects.

No fixed sleeps or hardcoded waiting times are used.

## 10. Screenshots and Reporting

The Playwright configuration supports automatic screenshots when tests fail.

The suite also retains traces for failed tests to help investigate failures.

### Generate HTML report

```bash
npx playwright show-report
```

### Report locations

| Artifact | Location |
|---|---|
| HTML report | `playwright-report/` |
| Failure screenshots | `test-results/` |
| Execution traces | `test-results/` |
| JUnit XML report | `results/junit.xml` (if configured) |

The HTML report provides a readable summary of passed and failed tests. JUnit XML can be integrated with CI/CD tools such as Jenkins.

## 11. Scaling the Automation Suite to 200 Tests

To expand this automation framework to 200 test cases, I would organise test coverage by application modules such as authentication, product catalogue, sorting, cart management, checkout, and security. I would introduce reusable Playwright fixtures for common setup and teardown operations, data-driven testing for multiple input combinations, and API-based test data setup wherever supported. Tests would be categorised using tags such as smoke, regression, and critical-path to support selective execution. Parallel execution and CI/CD integration would reduce regression execution time. I would also implement consistent locator strategies, code reviews, failure analysis, flaky-test monitoring, cross-browser coverage, and accessibility testing to maintain reliability as the suite grows.

## 12. Execution Summary

| Parameter | Details |
|---|---|
| Application | Sauce Demo |
| Framework | Playwright Test |
| Programming Language | JavaScript |
| Design Pattern | Page Object Model |
| Browser | Chromium |
| Automated Manual Case IDs | TC01, TC02, TC03, TC04, TC10, TC14, TC17, TC18, TC22 |
| Parallel Workers | 1 or 2 |
| Failure Evidence | Screenshots and traces |
| Reports | HTML and JUnit XML |

**Conclusion:** The automation suite covers critical end-to-end application workflows and provides reusable, maintainable test components with traceability to the A1 manual test cases.
