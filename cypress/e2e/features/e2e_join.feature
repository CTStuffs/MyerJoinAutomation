Feature: Myer Join Page e2e tests
    Background:
        Given user opens myer join form

    Scenario: Success Create Account
        When user verifies they are on "Join" page
        When user inputs details
            | email             | firstname | lastname | password      | mobile     | dob        | address            | addressfinderval                       |
            | test@testmail.com | Fname     | Lname    | Something123! | 0412345667 | 01/01/1995 | 300 Collins Street | 300 Collins Street, MELBOURNE VIC 3000 |
        Then user clicks on create account
        Then user verifies they are on "Account" page
        And user verifies submitted details
        Then user verifies submitted address "300 Collins St,  MELBOURNE VIC 3000"

    Scenario: Duplicate Account
        When user verifies they are on "Join" page
        When user inputs details
            | email             | firstname | lastname | password      | mobile     | dob        | address            | addressfinderval                       |
            | test@testmail.com | Fname     | Lname    | Something123! | 0412345667 | 01/01/1995 | 300 Collins Street | 300 Collins Street, MELBOURNE VIC 3000 |
        When user inputs email address "test@test.com"
        When user clicks on create account
        Then user verifies "same account" error message

    Scenario: Success Create Account with Custom Address
        Then user verifies they are on "Join" page
        When user inputs altered email address "test@test.com"
        And user clicks join button
        When user inputs first name "Fname"
        And user inputs last name "Lname"
        When user inputs mobile "0412345667"
        And user inputs dob "12/04/2000"
        When user inputs password "Something123!"
        And user inputs address "abcdefghjiklmnoqrstuvxyz"
        When user clicks create manual address button
        And user inputs custom address
            | address1           | address2        | suburb | postcode | state |
            | 4 Elizabeth Street | Flinders Street | CBD    | 3000     | VIC   |
        When user clicks on create account
        Then user verifies they are on "Account" page
        Then user verifies submitted details
        Then user verifies submitted custom address

    Scenario: Incorrect Email Validation
        Then user verifies they are on "Join" page
        When user inputs email address "test@"
        And user clicks join button
        Then user verifies "email" error message
        When user inputs email address "test234234asdf!535"
        When user clicks join button
        Then user verifies "email" error message
        When user inputs email address "the quick brown fox jumped"
        When user clicks join button
        Then user verifies "email" error message
        When user inputs email address " "
        When user verifies "email" error message
        Then user verifies they are on "Join" page


    Scenario: Incorrect Password Validation
        Then user verifies they are on "Join" page
        When user inputs email address "test@testmail.com"
        When user clicks join button
        When user inputs password "test"
        Then user verifies "password" error message
        When user inputs password "TestSomething"
        Then user verifies "password" error message
        When user inputs password "124Here"
        Then user verifies "password" error message
        When user inputs password "AvaBaDaRaTa13"
        Then user verifies "password" error message
        When user inputs password " "
        Then user verifies "password" error message
        When user inputs first name "FName"
        And user inputs last name "LName"
        When user inputs password "FNameLName12"
        Then user verifies "password" error message
        Then user verifies they are on "Join" page

    Scenario: Incorrect Mobile Number Validation
        Then user verifies they are on "Join" page
        When user inputs email address "test@testmail.com"
        And user clicks join button
        When user inputs mobile "1131312312"
        Then user verifies "mobile" error message
        When user inputs mobile "189"
        Then user verifies "mobile" error message
        When user inputs mobile "041231233"
        Then user verifies "mobile" error message

        Then user verifies they are on "Join" page

    Scenario: Incorrect Date of Birth Validation
        Then user verifies they are on "Join" page
        When user inputs email address "test@testmail.com"
        And user clicks join button
        When user inputs dob "notanumber"
        Then user verifies "dob" error message
        When user inputs dob "12311997"
        Then user verifies "dob" error message
        When user inputs dob "080765"
        Then user verifies "dob" error message
        When user inputs dob " "
        Then user verifies "dob" error message
        Then user verifies they are on "Join" page

    Scenario: Incorrect Address Validation
        Then user verifies they are on "Join" page
        When user inputs email address "test@testmail.com"
        Then user clicks join button
        When user inputs address "abcdefghjiklmnoqrstuvxyz"
        Then user verifies "address" error message
        When user inputs address " "
        Then user verifies "address" error message
        When user verifies they are on "Join" page

    Scenario: Incorrect Postcode Validation
        Then user verifies they are on "Join" page
        When user inputs email address "test@testmail.com"
        And user clicks join button
        When user inputs address "abcdefghjiklmnoqrstuvxyz"
        And user clicks create manual address button
        When user inputs postcode "123"
        Then user verifies "postcode" error message
        When user inputs postcode " "
        Then user verifies "postcode" error message
        Then user verifies they are on "Join" page
