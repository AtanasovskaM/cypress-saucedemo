import LoginPage from '../support/pages/loginPage'

describe('Login and logout functionality', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.login_logo').should('have.text', 'Swag Labs')
    LoginPage.verifyTheLoginForm()
    LoginPage.enterUsername(Cypress.env('standardUser'))
    LoginPage.enterPassword(Cypress.env('loginPassword'))
    LoginPage.clickLogin()
    cy.url().should('contain', '/inventory.html')
    cy.get('#inventory_container').should('be.visible')
  })

  it('Should navigate to cart page when clicking the cart icon and verify it is empty', () => {
    cy.get('[data-test = "shopping-cart-link"]').should('be.visible').click()
    cy.url().should('contain', '/cart.html')
    cy.get('[data-test = "title"]')
      .should('be.visible')
      .and('have.text', 'Your Cart')
    cy.get('[data-test = "cart-quantity-label"]')
      .should('be.visible')
      .and('have.text', 'QTY')
    cy.get('[data-test = "cart-desc-label"]')
      .should('be.visible')
      .and('have.text', 'Description')
    cy.get('[data-test = "continue-shopping"]')
      .should('be.visible')
      .and('have.text', 'Continue Shopping')
    cy.get('[data-test = "checkout"]')
      .should('be.visible')
      .and('have.text', 'Checkout')
    cy.get('[data-test = "cart-item"]').should('not.exist')
  })

  it('Should add and remove product successfully from cart', () => {
    cy.get('[data-test = "add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    cy.get('#shopping_cart_container').click()
    cy.url().should('contain', '/cart.html')
    cy.get('[data-test="inventory-item-name"]').should(
      'have.text',
      'Sauce Labs Bolt T-Shirt'
    )
    cy.get('[data-test = "remove-sauce-labs-bolt-t-shirt"]')
      .should('be.visible')
      .click()
    cy.get('[data-test = "cart-item"]').should('not.exist')
  })

  it('Should add product to cart, checkout successfully and verify confirm page', () => {
    cy.get('[data-test = "add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    cy.get('#shopping_cart_container').click()
    cy.url().should('contain', '/cart.html')
    cy.get('[data-test="inventory-item-name"]').should(
      'have.text',
      'Sauce Labs Bolt T-Shirt'
    )
    cy.get('[data-test = "checkout"]').should('be.visible').click()
    cy.url().should('contain', '/checkout-step-one.html')
    cy.get('[data-test = "firstName"]').should('be.visible').type('Magdalena')
    cy.get('[data-test = "lastName"]').should('be.visible').type('Tomoska')
    cy.get('[data-test = "postalCode"]').should('be.visible').type('1000')
    cy.get('[data-test = "continue"]').should('be.visible').click()
    cy.url().should('contain', '/checkout-step-two.html')
    cy.get('[data-test="inventory-item-name"]').should(
      'have.text',
      'Sauce Labs Bolt T-Shirt'
    )
    cy.get('[data-test="payment-info-label"]').should(
      'contain.text',
      'Payment Information'
    )
    cy.get('[data-test="shipping-info-label"]').should(
      'contain.text',
      'Shipping Information:'
    )
    cy.get('[data-test="total-info-label"]').should(
      'contain.text',
      'Price Total'
    )
    cy.get('[data-test="finish"]').should('be.visible').and('have.text', 'Finish').click()
    cy.url().should('contain', '/checkout-complete.html')
    cy.get('[data-test="complete-header"]').should(
      'contain.text',
      'Thank you for your order'
    )
    cy.get('[data-test="back-to-products"]')
      .should('be.visible')
      .and('contain.text', 'Back Home')
      .click()
    cy.url().should('contain', '/inventory.html')
  })

  it('Should add product to cart, and on "Cancel" on checkout page to return to cart', () => {})

  it('Should add multiple products to cart and verify that badge number updates correctly', () => {})

  it('Should click and open products details page', () => {})

  it('Should navigate back to products page on "Back to products" from product details page', () => {})

  it('Should navigate back to products page on "Continue Shopping"', () => {})
})
