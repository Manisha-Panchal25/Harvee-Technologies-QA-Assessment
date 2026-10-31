## B1. Problems identified in the AI-generated code
The AI-generated test has several issues. Although it navigates through the checkout flow, it does not actually verify whether the cart total is correct.
No.	Problem	Explanation	Recommended improvement
1	Incorrect URL format	The URL contains Markdown link formatting instead of a clean URL.	Use https://www.saucedemo.com/.
2	Hardcoded credentials	Username and password are directly written inside the test.	Store credentials in environment variables or configuration.
3	Hardcoded base URL	The application URL is inside the test.	Configure baseURL in Playwright configuration.
4	No login verification	The test does not check whether login was successful.	Assert that the Products page is visible.
5	Ambiguous locator	text=Add to cart may match multiple product buttons.	Use a unique product locator.
6	Fixed wait	waitForTimeout(3000) introduces unnecessary waiting and can make tests unstable.	Use Playwright's automatic waiting and assertions.
7	No cart verification	The test does not verify whether the product was successfully added.	Check the cart badge and cart contents.
8	No checkout verification	The test proceeds without confirming that checkout opened successfully.	Assert that the checkout information and overview pages are visible.
9	Hardcoded customer data	Customer details are directly written in the test.	Store test data separately.
10	No validation of item subtotal	The test never checks the actual product subtotal.	Read and validate the displayed subtotal.
11	No validation of tax	The test does not retrieve or verify the tax amount.	Read the displayed tax amount.
12	Incorrect total assertion	expect(total).toBeTruthy() only checks that some text exists. It does not verify mathematical correctness.	Assert that total equals subtotal plus tax.
13	No currency parsing	The test does not convert displayed currency strings into numeric values.	Remove the currency symbol and parse the amount.
14	No assertion on checkout completion	The test never finishes the order.	Complete checkout and verify the confirmation page.
15	No cart-empty verification	It does not verify that the cart is empty after successful checkout.	Verify that no cart items remain.
16	Poor test independence	The test does not explicitly manage its test state or explain how it avoids dependencies on previous tests.	Use a fresh browser context and create its own cart data.

2. Corrected Playwright test
I would rewrite the test using JavaScript + Playwright Test + Page Object Model.
The corrected version will:
1.	Log in with the standard user.
2.	Add a specific product to the cart.
3.	Verify the cart badge and product.
4.	Complete checkout.
5.	Read the subtotal, tax and total.
6.	Calculate the expected total.
7.	Verify the order confirmation.
8.	Verify that the cart is empty.

NOTE: Correct code is covered in the Section A2 Automation test cases


## Section B2 – Test an AI Feature
Selected scenario: 3 – Test Case Generator
Why I selected this scenario: As a QA Automation Engineer, I work with test case design, test scenarios, expected results and AI-powered testing. Therefore, evaluating an AI Test Case Generator is closely related to my practical QA experience.
Objective
The AI tool converts a user story into test cases in a fixed JSON format, which is imported directly into a test management tool.
I would build an evaluation dataset containing different types of user stories, including simple, complex, incomplete and ambiguous requirements.
Four evaluation checks
No.	Evaluation check	What I would test	Expected result	Scoring method
1	Test coverage	Provide a user story containing positive, negative and boundary scenarios. Check whether the AI generates test cases covering all important requirements.	All major functional, negative and boundary scenarios should be covered without missing critical cases.	By rubric: Score coverage from 0–5 based on requirements covered.
2	Hallucination / invented requirements	Provide a user story with clearly defined requirements and check whether AI introduces features, validations or business rules that are not mentioned.	AI should generate test cases based only on the given requirements. Unspecified behavior should be identified as an assumption or open question.	By human review: Compare generated test cases against the original user story.
3	Duplicate test cases	Provide a user story with multiple acceptance criteria and check whether AI generates repetitive test cases with slightly different wording but identical validation.	Test cases should be unique and cover different scenarios without unnecessary duplication.	Automatically: Compare normalized test case descriptions and steps to identify duplicates, followed by review of potential matches.
4	JSON format validation	Generate test cases and validate the output against the required JSON schema. Check missing fields, incorrect data types and invalid JSON syntax.	Output must be valid JSON with all mandatory fields and correct data types so it can be imported successfully.	Automatically: Use a JSON parser and JSON Schema validator.

Evaluation scoring approach
I would use a score out of 100 to measure the overall quality of the AI-generated test cases.
Evaluation area	Weight
Test coverage	35%
No invented requirements	25%
No duplicate test cases	15%
Valid JSON structure	25%
Total	100%

Pass criteria: I would target an overall score of at least 90%, with 100% valid JSON structure because invalid output can break the test management tool import process.
Additional considerations
•	Run the same user story multiple times to check consistency in generated test cases.
•	Test with incomplete or ambiguous requirements to verify whether the AI raises open questions instead of making assumptions.
•	Include complex user stories to evaluate how well the tool handles multiple acceptance criteria.
•	Ensure sensitive information in user stories is not exposed in generated output or logs.
Conclusion
I would not rely only on the number of test cases generated by AI. I would focus on their accuracy, completeness, uniqueness and usability. AI-generated test cases should always be validated before importing them into the test management tool. This ensures that AI improves testing efficiency without compromising test quality.


## B3. Defect report

Bug Report: Incorrect product ordering when sorting by Price (Low to High)
Issue Type: Bug
Module: Products – Sorting
Release Version: 4.2.0
Environment: Chrome Browser, Windows 10/11
Test Application: Sauce Demo
Severity: Major (High)
Priority: P1 – High
Reproducibility: 100% (Occurs on every execution)
Description
When a user selects the "Price (low to high)" sorting option on the Products page, the product list is not displayed in ascending price order. A product priced at $29.99 appears before a product priced at $15.99.
The issue has been consistently reproduced on every test run since release 4.2.0.
Preconditions
•	Application is running on release 4.2.0.
•	User is successfully logged in with valid credentials.
•	Products page is displayed.
Steps to Reproduce
1.	Open Sauce Demo in Google Chrome.
2.	Log in using valid standard user credentials.
3.	Navigate to the Products page.
4.	Open the product sorting dropdown.
5.	Select Price (low to high).
6.	Observe the order of products and compare their displayed prices.
Expected Result
All products should be sorted in ascending numerical order based on their prices.
For example:
•	$15.99 should appear before $29.99.
•	Every subsequent product should have a price greater than or equal to the previous product's price.
Actual Result
The sorting order is incorrect. A product priced at $29.99 appears before a product priced at $15.99, violating the expected ascending price order.

Severity and Priority Justification
Severity: Major (High)
This defect affects a core shopping functionality. Customers looking for lower-priced products may see expensive products before cheaper alternatives, resulting in an incorrect shopping experience and potentially affecting purchasing decisions.
Priority: P1 – High
The defect occurs consistently in release 4.2.0 and affects the product discovery experience. It should be fixed and regression-tested before release.
Reproducibility
100% – Reproduced on every execution since release 4.2.0.
Evidence to Attach
1.	Screenshot of the Products page after selecting Price (low to high), showing the $29.99 product before the $15.99 product.
2.	Screen recording demonstrating the steps to reproduce.
3.	Screenshot of the selected sorting dropdown option.
4.	Test execution results showing repeated failure.
5.	Browser console logs, if relevant.
Suggested Investigation
Check the sorting implementation to ensure product prices are compared numerically rather than as strings. Also verify that the complete product list is sorted correctly.
Status
Open – Pending developer investigation and fix.

## B4. Message to the client

Hi,
During our testing of release 4.2.0, we identified two issues that need attention before Friday's planned release.
1.	Product sorting issue: When customers select "Price (low to high)", some products appear in the wrong order. This issue occurs consistently and affects the shopping experience.
2.	Checkout issue: One checkout test fails approximately 1 out of 10 runs, although it passes when repeated. This suggests an intermittent issue that needs further investigation.
My recommendation: I would suggest holding the full release until the sorting issue is fixed and the checkout failure is investigated.
Alternative: If Friday's release is business-critical, we could release only the unaffected functionality, provided the checkout flow is verified and the known issues are clearly assessed and accepted by the product team.
I'll prioritize retesting the fixes and share updated results as soon as possible.
Thanks!

