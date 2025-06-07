import LoginPage from '../support/pages/loginPage'

describe('Saucedemo login users', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should login with standard user', () => {
    LoginPage.enterLoginCredentials(
      Cypress.env('standardUser'),
      Cypress.env('loginPassword')
    )
    LoginPage.clickLogin()
    cy.url().should('contain', '/inventory.html')
    cy.get('#inventory_container').should('be.visible')
  })

  it.only('Should login with standard user and add item to cart successfully', () => {
    LoginPage.enterLoginCredentials(
      Cypress.env('standardUser'),
      Cypress.env('loginPassword')
    )
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
    LoginPage.enterLoginCredentials(
      Cypress.env('problemUser'),
      Cypress.env('loginPassword')
    )
    LoginPage.clickLogin()
    cy.get('#inventory_container').should('be.visible')
    cy.get('[data-test = "inventory-item-sauce-labs-onesie-img"]')
      .should('have.attr', 'src')
      .and('equal', '/static/media/red-onesie-1200x1500.2ec615b2.jpg')
  })

  it('Login with locked error should fail and display error message', () => {
    LoginPage.enterLoginCredentials(
      Cypress.env('lockedUser'),
      Cypress.env('loginPassword')
    )
    LoginPage.clickLogin()
    cy.get('[data-test = "error"]')
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.')
  })

  it('Should login with error user and add product to cart', () => {
    LoginPage.enterLoginCredentials(
      Cypress.env('errorUser'),
      Cypress.env('loginPassword')
    )
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
