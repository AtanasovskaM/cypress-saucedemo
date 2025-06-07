class LoginPage {
  elements = {
    usernameInput: () => cy.get('[data-test = "username"]'),
    passwordInput: () => cy.get('[data-test = "password"]'),
    loginButton: () => cy.get('[data-test = "login-button"]')
  }

  enterLoginCredentials(username, password) {
    this.elements.usernameInput().type(username)
    this.elements.passwordInput().type(password)
  }

  clickLogin() {
    this.elements.loginButton().click()
  }
}

module.exports = new LoginPage()
