import LoginPage from '../support/pages/loginPage'

describe('Login with different users', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.login_logo').should('have.text', 'Swag Labs')
    LoginPage.verifyTheLoginForm()
  })

  it('Should login with standard user', () => {
    LoginPage.enterUsername(Cypress.env('standardUser'))
    LoginPage.enterPassword(Cypress.env('loginPassword'))
    LoginPage.clickLogin()
    cy.url().should('contain', '/inventory.html')
    cy.get('#inventory_container').should('be.visible')
  })

  it('Should login with standard user and add item to cart successfully', () => {
    LoginPage.enterUsername(Cypress.env('standardUser'))
    LoginPage.enterPassword(Cypress.env('loginPassword'))
    LoginPage.clickLogin()
    cy.get('#inventory_container').should('be.visible')
    cy.get('[data-test = "add-to-cart-sauce-labs-fleece-jacket"]').click()
    cy.get('[data-test = "shopping-cart-badge"]').should('have.text', '1')
    cy.get('#shopping_cart_container').click()
    cy.url().should('contain', '/cart.html')
    cy.get('[data-test = "title"]').should('have.text', 'Your Cart')
    cy.get('[data-test="inventory-item-name"]').should(
      'have.text',
      'Sauce Labs Fleece Jacket'
    )
    cy.get('[data-test = "item-quantity"]').should('have.text', '1')
    cy.get('[data-test = "remove-sauce-labs-fleece-jacket"]')
      .should('be.visible')
      .and('have.text', 'Remove')
  })

  it('Should login with problem user successfully and check the src onesie image', () => {
    LoginPage.enterUsername(Cypress.env('problemUser'))
    LoginPage.enterPassword(Cypress.env('loginPassword'))
    LoginPage.clickLogin()
    cy.get('#inventory_container').should('be.visible')
    cy.get('[data-test = "inventory-item-sauce-labs-onesie-img"]')
      .should('have.attr', 'src')
      .and('equal', '/static/media/red-onesie-1200x1500.2ec615b2.jpg')
  })

  it('Login with locked error should fail and display error message', () => {
    LoginPage.enterUsername(Cypress.env('lockedUser'))
    LoginPage.enterPassword(Cypress.env('loginPassword'))
    LoginPage.clickLogin()
    cy.get('[data-test = "error"]')
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.')
  })

  it('Should login with error user and add product to cart', () => {
    LoginPage.enterUsername(Cypress.env('errorUser'))
    LoginPage.enterPassword(Cypress.env('loginPassword'))
    LoginPage.clickLogin()
    cy.get('#inventory_container').should('be.visible')
    cy.get('[data-test = "add-to-cart-sauce-labs-fleece-jacket"]').click()
    cy.get('#shopping_cart_container').click()
    cy.url().should('contain', '/cart.html')
    cy.get('[data-test = "title"]').should('have.text', 'Your Cart')
    cy.get('[data-test="inventory-item-name"]').should(
      'have.text',
      'Sauce Labs Fleece Jacket'
    )
  })
})
