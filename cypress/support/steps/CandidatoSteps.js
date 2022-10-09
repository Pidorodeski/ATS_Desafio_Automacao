/// <reference types="cypress" />
/* global Given, Then, When */

import faker from 'faker'

import CandidatoPage from '../pageobjects/CandidatoPage'
const candidatoPage = new CandidatoPage

let nomeCandidato
let nomeCandidatoAlterado

beforeEach(() => {
	nomeCandidato = faker.name.findName()
	nomeCandidatoAlterado = faker.name.findName()
});


// Cenário de cadastro de Candidato
Given(/^que eu esteja na tela de Candidato$/, () => {
	candidatoPage.acessarTelaCandidatos();
});
And(/^clico em criar e insiro o nome do Candidato$/, () => {
	candidatoPage.inserirNome(nomeCandidato)
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_candcad')
});
Then(/^salvar o cadastro$/, () => {
	candidatoPage.salvarCadastro() 
});
When(/^será exibido a mensagem "([^"]*)"$/, (mensagemSucesso) => {
	candidatoPage.validarMensagem(mensagemSucesso)
});
And(/^o Candidato será exibido na listagem$/, () => {
	cy.wait('@post_candcad').its('response.statusCode').should('eq', 201)
	candidatoPage.validarLisagem(nomeCandidato)
});


// Cenário de edição de um Candidato
Given(/^que eu tenha um candidato cadastrado$/, () => {
	candidatoPage.acessarTelaCandidatos();
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_candupdt')
	candidatoPage.inserirNome(nomeCandidato)
	candidatoPage.salvarCadastro()
	cy.wait('@post_candupdt').its('response.statusCode').should('eq', 201)
});
And(/^seleciono a opção de editar esse candidato$/, () => {
	cy.intercept({ method: 'PUT', url: '**/candidatos/**'}).as('put_candupdt')
	candidatoPage.acessarEdicaoCandidato(nomeCandidato)
});
Then(/^eu alterar o nome e salvar a alteração$/, () => {
	candidatoPage.alterarNomeCandidato(nomeCandidatoAlterado)
	candidatoPage.salvarCadastro()
	cy.wait('@put_candupdt').its('response.statusCode').should('eq', 200)
});
And(/^o candidato será exibido na listagem com a alteração realizada$/, () => {
	candidatoPage.validarLisagem(nomeCandidatoAlterado)
});


// Cenário de Deleção de um Candidato
Given(/^que eu esteja na tela de Candidato com um candidato cadastrado$/, () => {
	candidatoPage.acessarTelaCandidatos();
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_canddel')
	candidatoPage.inserirNome(nomeCandidato)
	candidatoPage.salvarCadastro()
	cy.wait('@post_canddel').its('response.statusCode').should('eq', 201)
});
And(/^seleciono a opção de deletar esse cadastro$/, () => {
	cy.intercept({ method: 'DELETE', url: '**/candidatos/***'}).as('delete_candidato')
	candidatoPage.acessarDelecaoCandidato(nomeCandidato)
});
When(/^confirmar a exclusão$/, () => {
	candidatoPage.confirmarDelecao()
	cy.wait('@delete_candidato').then(rota => {
		expect(rota.response.statusCode).to.be.eq(200)
		expect(rota.response.body).to.include("Deletado com sucesso")
	  })
});
Then(/^será apresentado a mensagem "([^"]*)"$/, (mensagem) => {
	candidatoPage.validarMensagemDelecao(mensagem)
});
And(/^o Candidao não será mais exibido na listagem$/, () => {
	candidatoPage.validarDelecao(nomeCandidato)
});


// Cenário não preencher Nome do Candidato
Given(/^que eu esteja na tela de Candidato$/, () => {
	candidatoPage.acessarTelaCandidatos();
});
And(/^clico em criar e mantenho o campo nome vazio$/, () => {
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_candcadvazio')
	candidatoPage.inserirNome(" ")
});

When(/^será exibido a mensagem de erro "([^"]*)"$/, (mensagem) => {
	candidatoPage.validarMensagemErro(mensagem)
	cy.wait('@post_candcadvazio').then(rota => {
		expect(rota.response.statusCode).to.be.eq(401)
		expect(rota.response.body).to.include("Erro no corpo da requisição")
	  })
});