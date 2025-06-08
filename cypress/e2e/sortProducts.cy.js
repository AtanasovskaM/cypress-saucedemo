import LoginPage from '../support/pages/loginPage'

describe('Login with different users', () => {
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

  it('Should sort products by selected filter "Name (Z-A)"', () => {
    cy.get('[data-test = "product-sort-container"]')
      .should('be.visible')
      .select('za')
    cy.get('[data-test = "inventory-item-name"]')
      .first()
      .should('have.text', 'Test.allTheThings() T-Shirt (Red)')
  })

  it('Should sort products by selected filter "Name (A-Z)"', () => {
    cy.get('[data-test = "product-sort-container"]')
      .should('be.visible')
      .select('az')
    cy.get('[data-test = "inventory-item-name"]')
      .first()
      .should('have.text', 'Sauce Labs Backpack')
  })

  it('Should sort products by selected filter "Price (low to high)', () => {
    cy.get('[data-test = "product-sort-container"]')
      .should('be.visible')
      .select('lohi')
    cy.get('[data-test = "inventory-item-name"]')
      .first()
      .should('have.text', 'Sauce Labs Onesie')
  })

  it('Should sort products by selected filter "Price (high to low)', () => {
    cy.get('[data-test = "product-sort-container"]')
      .should('be.visible')
      .select('hilo')
    cy.get('[data-test = "inventory-item-name"]')
      .first()
      .should('have.text', 'Sauce Labs Fleece Jacket')
  })
})
