/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", ()=>{
    beforeEach(()=>{
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', () =>{
        cy.title().should('eq', "Central de Atendimento ao Cliente TAT")
        cy.get("h1#title").contains("CAC TAT")
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')


    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
        const longText = "TesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTeste"
        cy.get('input[id="firstName"]').type('Gustavo')
        cy.get('input[id="lastName"]').type('Cassimiro')
        cy.get('input[id="email"]').type('gustavocassimirogmail.com')
        cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0})
        cy.contains('button[type="submit"]', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('campo de telefone permanece vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone').type('testando').should('have.text','')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        const longText = "TesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTeste"
        cy.get('#firstName').type('Gustavo')
        cy.get('#lastName').type('Cassimiro')
        cy.get('#email').type('gustavocassimirogmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('#phone-checkbox').check()
        cy.contains('button[type="submit"]', 'Enviar').click()
        cy.get('.error').should('be.visible')   
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
        cy.get('#firstName').type('Gustavo').should('have.value', 'Gustavo').clear().should('have.value', '')
        cy.get('#lastName').type('Cassimiro').should('have.value', 'Cassimiro').clear().should('have.value', '')
        cy.get('#phone').type('8888').should('have.value', '8888').clear().should('have.value', '')
        cy.get('#email').type('gustavocassimiro@gmail.com')
        .should('have.value', 'gustavocassimiro@gmail.com').clear().should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
        cy.contains('button[type="submit"]', 'Enviar').click()
        cy.get('.error').should('be.visible')   
    })
    it('seleciona um produto (YouTube) por seu texto', () =>{
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', ()=>{
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', ()=>{
        cy.get('#product').select(1).should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', ()=>{
        cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', ()=>{
        cy.get('input[type="radio"]').should('have.length', 3).each(($radio)=>{
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', () =>{
        cy.get('div#check input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', () =>{
        cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json')
        .should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload').selectFile('@sampleFile').should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('div[id="privacy"] a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
        cy.get('div[id="privacy"] a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    
    
})