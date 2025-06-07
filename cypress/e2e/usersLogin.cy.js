import LoginPage from "../support/pages/loginPage"

describe('Saucedemo login users', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Should login with standard user successfully', () => {
   
        LoginPage.enterLoginCredentials(Cypress.env('loginStandard'), Cypress.env('loginPassword'))
        LoginPage.clickLogin()
        cy.url().should('contain', '/inventory.html')
        cy.get('#inventory_container').should('be.visible')
    })

      it('Should login with standard user successfully and add item to cart', () => {
   
        LoginPage.enterLoginCredentials(Cypress.env('loginStandard'), Cypress.env('loginPassword'))
        LoginPage.clickLogin()
        cy.get('#inventory_container').should('be.visible')
        cy.get('[data-test = "add-to-cart-sauce-labs-fleece-jacket"]').click()
        cy.get('[data-test = "shopping-cart-badge"]').should('have.text', '1')
        cy.get('#shopping_cart_container').click()
        cy.url().should('contain', '/cart.html')
        cy.get('[data-test = "title"]').should('have.text', 'Your Cart')
        cy.get('[data-test = "item-quantity"]').should('have.text', '1')
        cy.get('[data-test = "remove-sauce-labs-fleece-jacket"]').should('be.visible').and('have.text', 'Remove')
    })
})