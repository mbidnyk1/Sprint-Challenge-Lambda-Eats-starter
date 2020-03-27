describe('Testing our pizza form', function() {
    beforeEach( () => {
        cy.visit('http://localhost:3001/pizza');
    });
    it('Add test to inputs and submit form', () => {
        cy.get('[data-cy=name]')
            .type('Bruce Wayne')
            .should('have.value', 'Bruce Wayne');
        cy.get('[data-cy=instructions]')
            .type('Put the pepperoni under the cheese')
            .should('have.value', 'Put the pepperoni under the cheese');
        cy.get('[data-cy=pepperoni]').check()
            .should('be.checked');
        cy.get('[data-cy=green_pepper').check()
            .should('be.checked');
        cy.get('[data-cy=button]').click()
    })
})