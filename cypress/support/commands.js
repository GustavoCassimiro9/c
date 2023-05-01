
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ()=>{
    cy.get('input[id="firstName"]').type('Gustavo')
    cy.get('input[id="lastName"]').type('Cassimiro')
    cy.get('input[id="email"]').type('gustavocassimiro@gmail.com')
    cy.get('textarea[id="open-text-area"]').type("Testando")
    cy.contains('button[type="submit"]','Enviar').click()
  
})