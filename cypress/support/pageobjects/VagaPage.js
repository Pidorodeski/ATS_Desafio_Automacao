/// <reference types="cypress" />

import GenericElements from "../elements/GenericElements"
const genericElements = new GenericElements

import VagaElements from "../elements/VagaElements"
const vagaElements = new VagaElements

class VagaPage{
    acessarTelaVagas (){
        cy.visit('/vagas')
        cy.get(genericElements.TituloTela)
        .should('have.text','CRUD de vagas')
    }
    inserirVaga(nome){
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
            .should('contain', mensagem)
    }

    validarLisagem(randomJobCad){
        cy.get(genericElements.ListagemNome)
            .find('span')
            .should('contain', randomJobCad)
    }
    acessarEdicaoVaga(randomJobAlt){
        cy.get(genericElements.Mensagem)
        .should('not.be.exist',{setTimeout:3000})
        cy.get(genericElements.ListagemNome)
        .contains('tr', randomJobAlt)
        .scrollTo('bottom',{ensureScrollable: false})
        .find(genericElements.menuLisagem)
        .click()
    cy.get(genericElements.BotaoEditar)
        .click()
    }

    acessarDelecaoVaga(randomJobDel){
        cy.get(genericElements.Mensagem)
            .should('not.be.exist',{setTimeout:3000})
        cy.get(genericElements.ListagemNome)
            .contains('tr', randomJobDel)
            .scrollTo('bottom',{ensureScrollable: false})
            .find(genericElements.menuLisagem)
            .click()
        cy.get(genericElements.BotaoDeletar)
            .click()
        cy.get(genericElements.Mensagem)
            .should('contain', 'Gostaria de deletar Vaga?')
    }

    alterarDescricaoVaga(RandomJob){
        cy.get(genericElements.InputNome)
            .clear()
            .type(RandomJob)
    }

    confirmarDelecao(){
        cy.get(genericElements.BotaoConfirmarDelecao)
            .click()
    }

    validarMensagemDelecao(mensagem){
        cy.get(genericElements.Mensagem)
            .should('contain', mensagem)
    }
    validarDelecao(randomJobDel){
        cy.get(genericElements.ListagemNome)
            .contains('tr', randomJobDel)
            .should('not.exist')
    }
    validarMensagemErro(mensagem){
        cy.get(genericElements.MensagemErro)
            .should('contain',mensagem)
    }
}

export default VagaPage;