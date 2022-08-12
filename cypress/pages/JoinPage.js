
class JoinPageField {

    inputMain = "";
    errorMsg = "";
    constructor(_inputMain, _errorMsg) {
        this.inputMain = _inputMain;
        this.errorMsg = _errorMsg;
    }


    elements = {
        inputField: () => cy.get(this.inputMain),
        errorText: () => cy.get(this.errorMsg)
    }

    fillText(inputText) {
        this.elements.inputField().clear();
        this.elements.inputField().type(inputText)
    }

    checkFieldText(expectedText) {
        this.elements.inputField().should((elem) => {
            expect(elem.text()).to.equal(expectedText);
        });
    }

    checkError(expectedText) {
        this.elements.errorText().should((elem) => {
            expect(elem.text()).to.equal(expectedText);
        });
    }
}



class JoinPage {

    elements = {
        fNameInput: new JoinPageField("#first-name", "#first-name-error-text"),
        lNameInput: new JoinPageField("#last-name", "last-name-error-text"),
        emailInput: new JoinPageField("#email", "#email-error-text"),
        passwordInput: new JoinPageField("#password", "#password-error-text"),
        mobileInput: new JoinPageField("#mobile-phone", "#mobile-phone-error-text"),
        dobInput: new JoinPageField("#date-of-birth", "#date-of-birth-error-text"),
        addressFinderInput: new JoinPageField("#address", "#address-error-text"),

        addressLine1Input: new JoinPageField('#addressLine1', ""),
        addressLine2Input: new JoinPageField('#addressLine2', ""),
        suburbInput: new JoinPageField("#city", "#city-error-text"),
        postcodeInput: new JoinPageField("#postcode", "#postcode-error-text"),
        stateDropdown: () => cy.get('#stateCode'),

        formHeader: () => cy.get('h1').contains('Create Account'),
        joinBtn: () => cy.get('button').contains('JOIN'),
        createAccountBtn: () => cy.get("#create-account"),
        addressManualBtn: () => cy.get('button').contains("Enter Address Manually"),

        notifStrip: () => cy.get("[data-automation='notification-strip']")

    }

    inputEmail(email) {
        this.elements.emailInput.fillText(email);
    }

    inputFirstName(fname) {
        this.elements.fNameInput.fillText(fname);
    }

    inputLastName(lname) {
        this.elements.lNameInput.fillText(lname);
    }

    inputPassword(password) {
        this.elements.passwordInput.fillText(password);

    }

    inputMobile(mobile) {
        this.elements.mobileInput.fillText(mobile);
    }

    inputDob(dob) {
        this.elements.dobInput.fillText(dob);
    }

    inputAddress(address) {
        this.elements.addressFinderInput.fillText(address);
    }

    selectAddressFinderVal(addressfinderval) {
        cy.get('div').contains(addressfinderval).click();

    }

    inputPostcode(postcode) {
        this.elements.postcodeInput.fillText(postcode);
    }

    inputManualAddress(address1, address2, suburb, postcode, state) {
        this.elements.addressLine1Input.fillText(address1);
        this.elements.addressLine2Input.fillText(address2);
        this.elements.suburbInput.fillText(suburb);
        this.elements.postcodeInput.fillText(postcode);
        this.elements.stateDropdown().click();
        cy.get("li[data-value='" + state + "']").click();
    }



    verifyEmailErrorMsg(errorMsg) {
        this.elements.emailInput.checkError(errorMsg)
    }

    verifyPasswordErrorMsg(errorMsg) {
        this.elements.passwordInput.checkError(errorMsg)
    }

    verifyMobileErrorMsg(errorMsg) {
        this.elements.passwordInput.checkError(errorMsg)
    }

    verifyDobErrorMsg(errorMsg) {
        this.elements.dobInput.checkError(errorMsg)
    }

    verifyAddressErrorMsg(errorMsg) {
        this.elements.addressFinderInput.checkError(errorMsg)
    }

    verifyPostcodeErrorMsg(errorMsg) {
        this.elements.postcodeInput.checkError(errorMsg)
    }

    verifyNotifStrip(errorMsg) {
        this.elements.notifStrip().contains(errorMsg)
    }

    clickHeader() {
        this.elements.formHeader().click();
    }

    clickJoinBtn() {
        this.elements.joinBtn().click({ force: true });
    }

    clickCreateAccount() {
        // for some reason cypress doesn't consider this button clickable by default
        this.elements.createAccountBtn().click({ force: true });
    }

    clickCreateManualAddress() {
        this.elements.addressManualBtn().click({ force: true });
    }


}

module.exports = new JoinPage();
