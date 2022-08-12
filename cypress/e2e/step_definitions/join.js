import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
const joinPage = require("../../pages/JoinPage");
const accountPage = require("../../pages/AccountPage")
import { faker } from '@faker-js/faker';

const user = {};


Given("user opens myer join form", () => {
  cy.visit("/");
});


When("user clicks join button", () => {
  joinPage.clickJoinBtn();
})

When("user clicks create manual address button", () => {
  joinPage.clickCreateManualAddress();
})

Then("user clicks on create account", () => {
  joinPage.clickCreateAccount();
});

When("user inputs first name {string}", (firstname) => {
  joinPage.inputFirstName(firstname);
  user.firstname = firstname;
})

When("user inputs last name {string}", (lastname) => {
  joinPage.inputLastName(lastname);
  user.lastname = lastname;
})

When("user inputs email address {string}", (email) => {
  joinPage.inputEmail(email);
  user.email = email;

});

When("user inputs altered email address {string}", (email) => {
  email = faker.datatype.number({ min: 1000000 }) + email;
  joinPage.inputEmail(email);
  user.email = email;

});

When("user inputs password {string}", (password) => {
  joinPage.inputPassword(password);
  user.password = password;
});

When("user inputs mobile {string}", (mobile) => {
  joinPage.inputMobile(mobile);
  user.mobile = mobile;
});

When("user inputs dob {string}", (dob) => {
  joinPage.inputDob(dob);
  user.dob = dob;
});

When("user inputs address {string}", (address) => {
  joinPage.inputAddress(address);
  user.address = address;
});

When("user inputs postcode {string}", (postcode) => {
  joinPage.inputPostcode(postcode)
  user.postcode = postcode;
});


When("user inputs details", (table) => {
  table.hashes().forEach((row) => {
    row.email = faker.datatype.number({ min: 1000000 }) + row.email;
    joinPage.inputEmail(row.email);
    joinPage.clickJoinBtn();
    joinPage.inputFirstName(row.firstname);
    joinPage.inputLastName(row.lastname);
    joinPage.inputPassword(row.password);

    joinPage.inputDob(row.dob);
    joinPage.inputMobile(row.mobile)
    joinPage.inputAddress(row.address)
    joinPage.selectAddressFinderVal(row.addressfinderval)

    user.email = row.email;
    user.firstname = row.firstname;
    user.lastname = row.lastname;
    user.password = row.password;
    user.dob = row.dob;
    user.mobile = row.mobile;
    // address is verified seperately for now and thus is not set here
  });
  joinPage.clickHeader();
});

When("user inputs custom address", (table) => {
  table.hashes().forEach((row) => {
    joinPage.inputManualAddress(row.address1, row.address2, row.suburb, row.postcode, row.state)
    user.customAddress = {};
    user.customAddress.address1 = row.address1;
    user.customAddress.address2 = row.address2;
    user.customAddress.suburb = row.suburb;
    user.customAddress.postcode = row.postcode;
    user.customAddress.state = row.state;

  });
});




Then("user verifies {string} error message", (type) => {
  joinPage.clickHeader();
  switch (type) {
    case "email":
      joinPage.verifyEmailErrorMsg("Please enter a valid email address")
      break;
    case "password":
      joinPage.verifyPasswordErrorMsg("Please enter a valid password")
      break;
    case "mobile":
      joinPage.verifyMobileErrorMsg("Please enter a valid Australian mobile phone number")
      break;
    case "dob":
      joinPage.verifyDobErrorMsg("Please enter a valid birthday")
      break;
    case "address":
      joinPage.verifyAddressErrorMsg("Please select a matching address or enter manually")
      break;
    case "postcode":
      joinPage.verifyPostcodeErrorMsg("Please enter a valid postcode")
      break;
    case "same account":
      joinPage.verifyNotifStrip("You already have an account.")
      break;
    default:
      console.error("INCORRECT ERROR TYPE SPECIFIED");
      expect(true).to.be.false
      break;
  }
});

Then("user verifies they are on {string} page", (sitename) => {
  switch (sitename) {
    case "Join":
      cy.url().should('contain', 'www.myer.com.au/join');
      break;
    case "Account":
      cy.url().should('contain', 'www.myer.com.au/account');
      break;
    default:
      console.error("INCORRECT SITE SPECIFIED IN URL VERIFY STEP");
      expect(true).to.be.false
      break;
  }

});

Then("user verifies submitted details", () => {
  accountPage.accessAccountDetails();
  accountPage.verifyDetails(user);
});

Then("user verifies submitted address {string}", (address) => {
  accountPage.verifyAddressField(address)
})

Then("user verifies submitted custom address", () => {
  accountPage.verifyCustomAddressFields(user)
});

