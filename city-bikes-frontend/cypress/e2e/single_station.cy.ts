describe('The Single Station Page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('#stations-link').click().wait(1000)
        cy.get('#Kaivopuisto').click().wait(1000)
    })
    it('succesfully loads', () => {
        cy.wait(1000)

        // information about station
        cy.get('#address').should('be.visible')
        cy.get('#journeys-starting').should('be.visible').should('not.be.null')
        cy.get('#journeys-ending').should('be.visible').should('not.be.null')

        // map is visible with marker
        cy.get('.leaflet-container').should('be.visible')
        cy.get('.leaflet-marker-icon').should('be.visible')

        // no errors displayed
        cy.get('#error-message').should('not.exist')
    })
})

export {}