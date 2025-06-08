import LoginPage from '../support/pages/loginPage'

describe('Login and logout functionality', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.login_logo').should('have.text', 'Swag Labs')
    LoginPage.verifyTheLoginForm()
  })

  it('Should display error message when logging in with valid username, invalid password', () => {
    LoginPage.enterUsername(Cypress.env('standardUser'))
    LoginPage.enterPassword(Cypress.env('invalidPassword'))
    LoginPage.clickLogin()
    cy.get('[data-test = "error"]')
      .should('be.visible')
      .and(
        'contain.text',
        'Username and password do not match any user in this service'
      )
  })

  it('Should display error message when logging in with invalid username, valid password', () => {
    LoginPage.enterUsername(Cypress.env('invalidUser'))
    LoginPage.enterPassword(Cypress.env('loginPassword'))
    LoginPage.clickLogin()
    cy.get('[data-test = "error"]')
      .should('be.visible')
      .and(
        'contain.text',
        'Username and password do not match any user in this service'
      )
  })

  it('Should display error message when logging in with invalid username, invalid password', () => {
    LoginPage.enterUsername(Cypress.env('invalidUser'))
    LoginPage.enterPassword(Cypress.env('invalidPassword'))
    LoginPage.clickLogin()
    cy.get('[data-test = "error"]')
      .should('be.visible')
      .and(
        'contain.text',
        'Username and password do not match any user in this service'
      )
  })

  it('Should display error message when logging in with empty username, empty password', () => {
    LoginPage.clickLogin()
    cy.get('[data-test = "error"]')
      .should('be.visible')
      .and('contain.text', 'Username is required')
  })

  it('Should display error message when logging in with empty username, valid password', () => {
    LoginPage.enterPassword(Cypress.env('invalidPassword'))
    LoginPage.clickLogin()
    cy.get('[data-test = "error"]')
      .should('be.visible')
      .and('contain.text', 'Username is required')
  })

  it('Should display error message when logging in with valid username, empty password', () => {
    LoginPage.enterUsername(Cypress.env('standardUser'))
    LoginPage.clickLogin()
    cy.get('[data-test = "error"]')
      .should('be.visible')
      .and('contain.text', 'Password is required')
  })

  it('Should log out successfully and redirect to login page', () => {
    LoginPage.enterUsername(Cypress.env('standardUser'))
    LoginPage.enterPassword(Cypress.env('loginPassword'))
    LoginPage.clickLogin()
    cy.url().should('contain', '/inventory.html')
    cy.get('#inventory_container').should('be.visible')
    cy.get('#react-burger-menu-btn').click()
    cy.get('[data-test = "logout-sidebar-link"]').should('be.visible').click()
    cy.get('.login_logo').should('have.text', 'Swag Labs')
    LoginPage.verifyTheLoginForm()
  })
})
