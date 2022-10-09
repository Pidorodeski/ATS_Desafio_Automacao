/// <reference types="cypress" />
/* global Given, Then, When */

import faker from 'faker'

let nomeCandidato

beforeEach(() => {
	nomeCandidato = faker.name.findName()
});

import CurriculoPage from '../pageobjects/CurriculoPage'
const curriculoPage = new CurriculoPage

import CandidatoPage from '../pageobjects/CandidatoPage'
const candidatoPage = new CandidatoPage


// Cadastrar um Curriculo para um Candidato
Given(/^que eu possua um candidato sem curriculo cadastrado$/, () => {
	candidatoPage.acessarTelaCandidatos();
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_cancad')
	candidatoPage.inserirNome(nomeCandidato)
	candidatoPage.salvarCadastro()
	cy.wait('@post_cancad').then(rota => {
		expect(rota.response.statusCode).to.be.eq(201)
	  })
});
And(/^na tela de Curriculo acesse a pop up de inclusão do curriculo$/, () => {
	curriculoPage.acessarTelaCurriculo()
    curriculoPage.acessarMenuCandidato(nomeCandidato)
    curriculoPage.acessarCadastrarCurriculo()
    cy.intercept({ method: 'POST', url: '**/curriculo'}).as('post_cadcurriculo')
    curriculoPage.inserirDadosCurriculo()
});
Then(/^salvar o cadastro do curriculo$/, () => {
	curriculoPage.salvarCadastro()
    cy.wait('@post_cadcurriculo').its('response.statusCode').should('eq', 201)
});
When(/^será exibido a mensagem de confirmacao "([^"]*)"$/, (mensagem) => {
    curriculoPage.validarMensagem(mensagem)
});
And(/^o candidato será exibido na listagem com a informação de curriculo cadastrado$/, () => {
	curriculoPage.validarCurriculoCandidato(nomeCandidato, "Tem Currículo")
});


// Cadastrar um Currículo para um Candidato que já possui um Currículo cadastrado
Given(/^que eu possua um candidato com o curriculo já cadastrado$/, () => {
	candidatoPage.acessarTelaCandidatos();
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_cancad')
	candidatoPage.inserirNome(nomeCandidato)
	candidatoPage.salvarCadastro()
	cy.wait('@post_cancad').then(rota => {
		expect(rota.response.statusCode).to.be.eq(201)
	  })
	curriculoPage.acessarTelaCurriculo()
	curriculoPage.acessarMenuCandidato(nomeCandidato)
	curriculoPage.acessarCadastrarCurriculo()
	cy.intercept({ method: 'POST', url: '**/curriculo'}).as('post_cadcurriculo')
	curriculoPage.inserirDadosCurriculo()
	curriculoPage.salvarCadastro()
    cy.wait('@post_cadcurriculo').its('response.statusCode').should('eq', 201)
	curriculoPage.validarCurriculoCandidato(nomeCandidato, "Tem Currículo")
});
When(/^na tela de Curriculo selecionar a opção de Cadastra o Curriculo$/, () => {
	curriculoPage.acessarMenuCandidato(nomeCandidato)
	curriculoPage.acessarCadastrarCurriculo()
});
Then(/^será entao exibido a mensagem "([^"]*)"$/, (mensagem) => {
	curriculoPage.validarMensagemErro(mensagem)
});


//Visualizar curriculo para um candidato que possua curriculo
Given(/^que eu possua um candidato com curriculo cadastrado$/, () => {
	candidatoPage.acessarTelaCandidatos();
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_cancad')
	candidatoPage.inserirNome(nomeCandidato)
	candidatoPage.salvarCadastro()
	cy.wait('@post_cancad').then(rota => {
		expect(rota.response.statusCode).to.be.eq(201)
	  })
	curriculoPage.acessarTelaCurriculo()
	curriculoPage.acessarMenuCandidato(nomeCandidato)
	curriculoPage.acessarCadastrarCurriculo()
	cy.intercept({ method: 'POST', url: '**/curriculo'}).as('post_cadcurriculo')
	curriculoPage.inserirDadosCurriculo()
	curriculoPage.salvarCadastro()
    cy.wait('@post_cadcurriculo').its('response.statusCode').should('eq', 201)
	curriculoPage.validarCurriculoCandidato(nomeCandidato, "Tem Currículo")
});
When(/^na tela de Curriculo selecionar a opção de Visualizar$/, () => {
	curriculoPage.acessarMenuCandidato(nomeCandidato)
	curriculoPage.acessarVisualizarCurriculo()
});

Then(/^será exibido a pop up com o curriculo desse candidato$/, () => {
	curriculoPage.validarTituloTelaCadastro()
});


//Visualizar curriculo para um candidato que não possua curriculo
Given(/^que eu possua um candidato sem o curriculo cadastrado$/, () => {
	candidatoPage.acessarTelaCandidatos();
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_cancad')
	candidatoPage.inserirNome(nomeCandidato)
	candidatoPage.salvarCadastro()
	cy.wait('@post_cancad').then(rota => {
		expect(rota.response.statusCode).to.be.eq(201)
	  })
	curriculoPage.acessarTelaCurriculo()
});
Then(/^na tela de Curriculo seleciono a opção de Visualizar$/, () => {
	curriculoPage.acessarMenuCandidato(nomeCandidato)
	curriculoPage.acessarVisualizarCurriculo()
	curriculoPage.validarCurriculoCandidato(nomeCandidato, "Não tem Currículo")
});


//Deletar curriculo para um candidato que possua curriculo
Given(/^que eu tenha um candidato com o curriculo já cadastrado$/, () => {
	candidatoPage.acessarTelaCandidatos();
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_cancad')
	candidatoPage.inserirNome(nomeCandidato)
	candidatoPage.salvarCadastro()
	cy.wait('@post_cancad').then(rota => {
		expect(rota.response.statusCode).to.be.eq(201)
	  })
	curriculoPage.acessarTelaCurriculo()
	curriculoPage.acessarMenuCandidato(nomeCandidato)
	curriculoPage.acessarCadastrarCurriculo()
	cy.intercept({ method: 'POST', url: '**/curriculo'}).as('post_cadcurriculo')
	curriculoPage.inserirDadosCurriculo()
	curriculoPage.salvarCadastro()
    cy.wait('@post_cadcurriculo').its('response.statusCode').should('eq', 201)
	curriculoPage.validarCurriculoCandidato(nomeCandidato, "Tem Currículo")
});
When(/^na tela de Curriculo selecionar a opção de Deletar Curriculo$/, () => {
	curriculoPage.acessarMenuCandidato(nomeCandidato)
	curriculoPage.acessarDeletarCurriculo()
	curriculoPage.validarPopUpConfirmacaoDelete()
});
And(/^na pop up de confirmação confirmar a deleção$/, () => {
	cy.intercept({ method: 'DELETE', url: '**/curriculo/**'}).as('delete_cadcurriculo')
	curriculoPage.confirmarDeleteCadastro()
});
Then(/^o curriculo do candidato será excluído$/, () => {
	cy.wait('@delete_cadcurriculo').then(rota => {
		expect(rota.response.statusCode).to.be.eq(200)
		expect(rota.response.body).to.include("Deletado com sucesso")
	  })
	curriculoPage.validarMensagemDelecao("Deletado")
});
And(/^o candidato será exibido sem a informação de curriculo cadastrado$/, () => {
	curriculoPage.validarCurriculoCandidato(nomeCandidato, "Não tem Currículo")
});


//Deletar curriculo para um candidato que nao possua curriculo
Given(/^que eu tenha um candidato sem o curriculo já cadastrado$/, () => {
	candidatoPage.acessarTelaCandidatos();
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_cancad')
	candidatoPage.inserirNome(nomeCandidato)
	candidatoPage.salvarCadastro()
	cy.wait('@post_cancad').then(rota => {
		expect(rota.response.statusCode).to.be.eq(201)
	  })
	curriculoPage.acessarTelaCurriculo()
	curriculoPage.validarCurriculoCandidato(nomeCandidato, "Não tem Currículo")
});
When(/^selecionar a opção de Deletar Curriculo na tela de Curriculo$/, () => {
	curriculoPage.acessarMenuCandidato(nomeCandidato)
	curriculoPage.acessarDeletarCurriculo()
});
Then(/^será entao apresentada a mensagem "([^"]*)"$/, (mensagem) => {
	curriculoPage.validarMensagemErroDelecao(mensagem)
});