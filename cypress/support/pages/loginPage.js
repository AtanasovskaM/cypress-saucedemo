class LoginPage {
  elements = {
    usernameInput: () => cy.get('[data-test = "username"]'),
    passwordInput: () => cy.get('[data-test = "password"]'),
    loginButton: () => cy.get('[data-test = "login-button"]')
  }

  verifyTheLoginForm() {
    this.elements.usernameInput().should('be.visible')
    this.elements.passwordInput().should('be.visible')
    this.elements.loginButton().should('be.visible')
  }

  enterUsername(username) {
    this.elements.usernameInput().type(username)
  }

  enterPassword(password) {
    this.elements.passwordInput().type(password)
  }

  clickLogin() {
    this.elements.loginButton().click()
  }
}

module.exports = new LoginPage()
