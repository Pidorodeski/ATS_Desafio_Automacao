/// <reference types="cypress" />

import GenericElements from "../elements/GenericElements"
const genericElements = new GenericElements
import CandidatoElements from "../elements/CandidatoElements"
const candidatoElements = new CandidatoElements

class CandidatoPage {
    acessarTelaCandidatos() {
        cy.visit("/candidato")
        cy.get(genericElements.TituloTela)
            .should('have.text','CRUD de candidatos')
    }
    inserirNome(nome){
        cy.get(genericElements.Botao)
        	.contains('Criar')
		    .click()
        cy.get(genericElements.InputNome)
            .type(nome)
    }
    salvarCadastro(){
        cy.get(genericElements.Botao)
        	.contains('Salvar')
		    .click()
    }
    validarMensagem(mensagem){
        cy.get(genericElements.Mensagem)
            .should('contain',mensagem)
    }
    validarLisagem(randomName){
        cy.get(genericElements.ListagemNome)
            .find('span')
            .should('contain',randomName)
    }
    acessarEdicaoCandidato(randomName){
        cy.get(genericElements.Mensagem)
            .should('not.be.exist',{setTimeout:3000})
        cy.get(genericElements.ListagemNome)
            .contains('tr', randomName)
            .scrollTo('bottom',{ensureScrollable: false})
            .find(candidatoElements.menuCandidatoLisagem) 
            .click()
        cy.get(genericElements.BotaoEditar)
            .click()
    }
    alterarNomeCandidato(updateRandomname){
        cy.get(genericElements.InputNome)
            .clear()
            .type(updateRandomname)
    }
    acessarDelecaoCandidato(randomNameDel){
        cy.get(genericElements.Mensagem)
            .should('not.be.exist',{setTimeout:3000})
        cy.get(genericElements.ListagemNome)
            .contains('tr', randomNameDel)
            .scrollTo('bottom',{ensureScrollable: false})
            .find(candidatoElements.menuCandidatoLisagem)
            .click()
        cy.get(candidatoElements.BotaoDeletar)
            .click()
        cy.get(genericElements.Mensagem)
            .should('contain', 'Gostaria de deletar Candidato?')
    }
    confirmarDelecao(){
        cy.get(candidatoElements.BotaoConfirmarDelecao)
            .click()
    }
    validarMensagemDelecao(mensagem){
        cy.get(genericElements.Mensagem)
            .should('contain', mensagem)
    }
    validarDelecao(randomNameDel){
        cy.get(genericElements.ListagemNome)
            .contains('tr', randomNameDel)
            .should('not.exist')
    }
    validarMensagemErro(mensagem){
        cy.get(genericElements.MensagemErro)
            .should('contain',mensagem)
    }
        
}
export default CandidatoPage;