/// <reference types="cypress" />

import GenericElements from "../elements/GenericElements"
const genericElements = new GenericElements

import EfetivarCandidaturaElements from '../elements/EfetivarCandidaturaElements'
const efetivarCandidaturaElements = new EfetivarCandidaturaElements

class EfetivarCandidaturaPage{
    acessarTelaCandidattura() {
        cy.visit("/candidatura")
        cy.get(genericElements.TituloTela)
            .should('have.text','Aqui o candidatado pode se candidatar a uma vaga')
    }
    acessarListagemSelecaoCandidatos(){
        cy.get(efetivarCandidaturaElements.BotaoListagemCandidatos).click()
    }
    acessarListagemSelecaoVagas(){
        cy.get(efetivarCandidaturaElements.BotaoListagemVagas).click()
    }
    selecionarCandidato(nome){
        cy.get(efetivarCandidaturaElements.Listagem).find('li').contains(nome).click()

    }
    selecionarVaga(vaga){
        cy.get(efetivarCandidaturaElements.Listagem).find('li').contains(vaga).click()

    }
    salvarCadastro(){
        cy.get(genericElements.Botao)
        .contains('Candidatar')
        .click()
    }
    validarMensagem(mensagem){
        cy.get(genericElements.Mensagem)
            .should('contain',mensagem)
    }
    solicitarDelecaoCandidatura(nome, vaga){
        cy.xpath(`//body//div[@class='po-lg-12']//p[contains(.,"${nome}")]//..//p[contains(.,"${vaga}")]//../../../../../div[@class='po-widget-footer']`).click()
    }
    confirmarDeleteCadastro(){
        cy.get(genericElements.BotaoConfirmarDelecao)
        .click()
    }
    validarTelaAposDeletar(nome, vaga){
        cy.xpath(`//body//div[@class='po-lg-12']//p[contains(.,"${nome}")]//..//p[contains(.,"${vaga}")]//../../../../../div[@class='po-widget-footer']`).should('not.exist')
    }
    validarMensagemErro(mensagem){
        cy.get(genericElements.MensagemErro).should('contain',mensagem)
    }
}
export default EfetivarCandidaturaPage;

