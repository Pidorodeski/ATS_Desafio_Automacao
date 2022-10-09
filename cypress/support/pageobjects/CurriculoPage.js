/// <reference types="cypress" />
/* global Given, Then, When */

import CurriculoElements from "../elements/CurriculoElements"
const curriculoElements = new CurriculoElements

import GenericElements from "../elements/GenericElements"
const genericElements = new GenericElements

class CurriculoPage{
    acessarTelaCurriculo() {
        cy.visit("/curriculo")
        cy.get(genericElements.TituloTela)
            .should('have.text','Aqui o candidato pode cadastrar seu currículo :)')
    }
    validarTituloTelaCadastro(){
        cy.get(curriculoElements.TituloPopUpCadastro).should('contain', 'Alterar Currículo')
    }
    acessarMenuCandidato(randomNameCad){
        cy.get(genericElements.PopUpSucesso).should("not.be.exist")
        cy.get(genericElements.ListagemNome) 
        .contains('tr', randomNameCad)
        .scrollTo('bottom',{ensureScrollable: false})
        .find(genericElements.menuLisagem)
        .click()
    }

    acessarCadastrarCurriculo() {
        cy.get(curriculoElements.BotaoCadastrarCurriculo).click()
    }
    acessarVisualizarCurriculo(){
        cy.get(curriculoElements.BotaoVisualizarCurriculo).click()
    }
    acessarDeletarCurriculo(){
        cy.get(curriculoElements.BotaoDeletarCurriculo).click()
    }
    validarPopUpConfirmacaoDelete(){
        cy.get(genericElements.Mensagem).should('contain','Gostaria de deletar Curriculo?')
    }
    inserirDadosCurriculo(){
        cy.get(curriculoElements.BotaoGeneroH).click()
        cy.get(curriculoElements.InputDtNascimento).type('10082022')
        cy.get(curriculoElements.InputPretencaoSal).type('2500')
        cy.get(curriculoElements.InputEmail).type('ats_automacao@totvs.com.br')
        cy.get(curriculoElements.InputCelular).type('45911223344')
        cy.get(curriculoElements.InputEndereco).type('Teste')
        cy.get(curriculoElements.InputEndNum).type('123456')
        cy.get(curriculoElements.SelectEstado).select('Rio de Janeiro', {force: true})
        cy.get(curriculoElements.InputDescricao).type('Teste')
        cy.get(curriculoElements.SelectHobbies).select('Bicicleta', {force: true})
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
    validarCurriculoCandidato(randomNameCad, situacao){
        cy.get(genericElements.ListagemNome)
        .contains('tr', randomNameCad)
        .find(curriculoElements.ColunaCurriculo)
        .should('contain', situacao)
    }
    validarMensagemErro(mensagem){
        cy.get(genericElements.MensagemErro)
            .should('contain',mensagem)
    }
    confirmarDeleteCadastro(){
        cy.get(genericElements.BotaoConfirmarDelecao)
        .click()
    }
    validarMensagemDelecao(mensagem){
        cy.get(genericElements.Mensagem)
            .should('contain', mensagem)
    }
    validarMensagemErroDelecao(mensagem){
        cy.get(genericElements.MensagemErro)
            .should('contain', mensagem)
    }
}
export default CurriculoPage;