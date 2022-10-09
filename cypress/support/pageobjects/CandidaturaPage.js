/// <reference types="cypress" />
/* global Given, Then, When */

import GenericElements from "../elements/GenericElements"
const genericElements = new GenericElements

class CandidaturaPage {
    acessarTelaCandidatura() {
        cy.get(genericElements.Mensagem)
        .should('not.be.exist',{setTimeout:3000})
        cy.visit("/candidaturas")
        cy.get(genericElements.TituloTela)
            .should('have.text','Listagem de candidatos candidatados a uma vaga')
    }
    validarListagem(nomeCandidato, nomeVaga){
        cy.xpath(`//body//div[@class='po-widget-body']/div[@class='po-row']//strong[contains(.,'${nomeCandidato}')]//../../../..//div[@class='po-lg-12']/span/h3[contains(.,'${nomeVaga}')]`).should('exist')
    }
} 
export default CandidaturaPage;