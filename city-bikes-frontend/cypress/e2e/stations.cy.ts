describe('The Stations Page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('#stations-link').click().wait(1000)
    })
    it('succesfully loads', () => {
        cy.wait(1000)
        cy.get('#stations-table').find('tr').should('have.length', 7) // default view with 7 rows
    })
    it('succesfully searches station with station name', () => {
        cy.get('#outlined-search').type('Kasarmitori')
        cy.get('#search-btn').click().wait(1000)
        cy.contains('Fabianinkatu 13')
    })
    it('succesfully searches staions with station address', () => {
        cy.get('#outlined-search').type('Fabianinkatu 13')
        cy.get('#search-btn').click().wait(1000)
        cy.contains('Kasarmitori')
    })
    it('Gives correct message when no journeys match with search', () => {
        cy.get('#outlined-search').type('invalid-search')
        cy.get('#search-btn').click().wait(3500)
        cy.get('#error-message', { timeout: 10000 }).should('be.visible')
    })
})

export {}