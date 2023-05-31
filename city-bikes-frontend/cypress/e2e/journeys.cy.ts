describe('The Journey Page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('#journeys-link').click().wait(1000)
    })
    it('succesfully loads', () => {
        cy.visit('/')
        cy.get('#journeys-link').click().wait(1000)
        cy.get('#journeys-table').find('tr').should('have.length', 7) // default view with 7 rows
    })
    it('Ordering journeys per column', () => {
        // ordering returning time
        cy.get('#return-btn').click().wait(1000)
        cy.contains('2021-05-01 - 00:04:34')

        // ordering again gives the latest return
        cy.get('#return-btn').click().wait(1000)
        cy.contains('2021-08-18 - 05:18:33')
    })
    it('succesfully searches journeys with station name', () => {
        cy.get('#outlined-search').type('Marjaniementie')
        cy.get('#search-btn').click().wait(1000)
        cy.contains('Marjaniementie')
    })
    it('Gives correct message when no journeys match with search', () => {
        cy.get('#outlined-search').type('invalid-search')
        cy.get('#search-btn').click().wait(3500)
        cy.get('#error-message', { timeout: 10000 }).should('be.visible')
    })
})

export {}