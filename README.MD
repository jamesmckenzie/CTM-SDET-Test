# CTM SDET test

### Details
- Tests written using protractor.
- 3 User journeys mapped to cover the most important functional paths and a pairwise reduction of possible test cases.
- Happy paths only.
- Atomic validation of forms, fields and page level elements have not been considered as a first priority for the basis of these tests.

### Installation
Protractor is depenedent on Node and Webdriver to run:

- Download and install NodeJs from: https://nodejs.org/en/ (or use your platform's flavour of package management)
- From the command line or terminal, run:
```npm install webdriver-manager -g```
```webdriver-manager update```
```webdriver-manager start```

### Running

- Clone this repository and from inside it, run:
```npm install```
to install the project dependencies
- then run:
```npm run test```

the tests should run!!