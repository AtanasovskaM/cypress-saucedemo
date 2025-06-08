import LoginPage from '../support/pages/loginPage'

describe('Sort the products', () => {
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
    const productList = []
    cy.get('[data-test="inventory-item-name"]')
      .each(($product) => {
        productList.push($product.text())
      })
      .then(() => {
        const sortedZA = [...productList].sort().reverse()
        expect(productList).to.deep.equal(sortedZA)
      })
  })

  it('Should sort products by selected filter "Name (A-Z)"', () => {
    const productList = []
    cy.get('[data-test = "product-sort-container"]')
      .should('be.visible')
      .select('az')
    cy.get('[data-test="inventory-item-name"]')
      .each(($product) => {
        productList.push($product.text())
      })
      .then(() => {
        const sortedAZ = [...productList].sort()
        expect(productList).to.deep.equal(sortedAZ)
      })
  })

  it('Should sort products by selected filter "Price (low to high)', () => {
    const productList = []
    cy.get('[data-test = "product-sort-container"]')
      .should('be.visible')
      .select('lohi')
    cy.get('[data-test="inventory-item-name"]')
      .each(($product) => {
        productList.push($product.text())
      })
      .then(() => {
        const sortedLOHI = [...productList].sort(function (a, b) {
          return a - b
        })
        expect(productList).to.deep.equal(sortedLOHI)
      })
  })

  it('Should sort products by selected filter "Price (high to low)', () => {
    const productList = []
    cy.get('[data-test = "product-sort-container"]')
      .should('be.visible')
      .select('hilo')
    cy.get('[data-test="inventory-item-name"]')
      .each(($product) => {
        productList.push($product.text())
      })
      .then(() => {
        const sortedHILO = [...productList].sort(function (a, b) {
          return b - a
        })
        expect(productList).to.deep.equal(sortedHILO)
      })
  })
})
