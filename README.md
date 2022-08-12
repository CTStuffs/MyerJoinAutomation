## Description
e2e automation tests for Myer's [join form](https://www.myer.com.au/join) written with the Cypress 10.4.0 framework.

## Credits
Boilerplate code derived from [here](https://github.com/JoanEsquivel/cypress-cucumber-boilerplate)

## Pre-requisites

Have [Node.js](https://nodejs.org/es/download/) installed on your computer.

## Installation

Install project dependencies with: 
```bash
npm i
```
## Usage

To run the tests, open the terminal and run: 
```bash
npm run cypress:execution
```

Alternatively, to open Cypress, run:
```bash
npm run cypress:runner
```

## Notes
Default Cypress timeout has been extended to 20000 to allow for overhead on Myer's website (mainly the form submission).