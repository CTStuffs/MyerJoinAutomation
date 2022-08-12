class AccountPage {
    elements = {
        accountDetailsLink: () => cy.get("[data-automation='account-settings-link']"),
        fNameField: () => cy.get("#first-name"),
        lNameField: () => cy.get("#last-name"),
        emailField: () => cy.get("#email"),
        mobileField: () => cy.get("#mobile-phone"),
        dobField: () => cy.get("#date-of-birth"),
        addressField: () => cy.get("#address"),

        address1Field: () => cy.get('#addressLine1'),
        address2Field: () => cy.get('#addressLine2'),
        suburbField: () => cy.get("#city"),
        postcodeField: () => cy.get("#postcode"),
        stateDropdown: () => cy.get('#stateCode'),
    }

    accessAccountDetails() {
        this.elements.accountDetailsLink().click();
    }

    verifyDetails(user) {

        this.elements.fNameField().should('have.value', user.firstname);
        this.elements.lNameField().should('have.value', user.lastname);
        this.elements.emailField().should('have.value', user.email);
        this.elements.mobileField().should('have.value', user.mobile);
        this.elements.dobField().should('have.value', user.dob);

        //this.elements.addressField().should('have.value', user.address);
    }
    // address field in account settings is differently formatted from inputted form 
    // hence, it needs to be verified separately
    verifyAddressField(address) {
        this.elements.addressField().should('have.value', address);
    }

    verifyCustomAddressFields(user) {
        console.log(user)
        this.elements.address1Field().should('have.value', user.customAddress.address1);
        this.elements.address2Field().should('have.value', user.customAddress.address2);
        this.elements.suburbField().should('have.value', user.customAddress.suburb);
        this.elements.postcodeField().should('have.value', user.customAddress.postcode);
        this.elements.stateDropdown().contains(user.customAddress.state);
    }

}

module.exports = new AccountPage();
