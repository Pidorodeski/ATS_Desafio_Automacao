/// <reference types="cypress" />
/* global Given, Then, When */

import faker from 'faker'

import CandidatoPage from '../pageobjects/CandidatoPage'
const candidatoPage = new CandidatoPage

import VagaPage from '../pageobjects/VagaPage'
const vagaPage = new VagaPage

import EfetivarCandidaturaPage from '../pageobjects/EfetivarCandidaturaPage'
const efetivarCandidaturaPage = new EfetivarCandidaturaPage

let nomeCandidato
let nomeVaga
let temp = 0
let idCand = 0

beforeEach(() => {
	nomeCandidato = faker.name.findName()
	nomeVaga = faker.company.companyName()
});


//Cadastrar uma Candidatura
Given(/^que eu possua um candidato e uma vaga cadastrada$/, () => {
	candidatoPage.acessarTelaCandidatos();
    candidatoPage.inserirNome(nomeCandidato)
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_candcad')
    candidatoPage.salvarCadastro() 
    cy.wait('@post_candcad').its('response.statusCode').should('eq', 201)
	candidatoPage.validarLisagem(nomeCandidato)

	vagaPage.acessarTelaVagas()
    cy.intercept({ method: 'POST', url: '**/vagas'}).as('post_vagacad')
	vagaPage.inserirVaga(nomeVaga)
    vagaPage.salvarCadastro()
    vagaPage.validarLisagem(nomeVaga)
	cy.wait('@post_vagacad').its('response.statusCode').should('eq', 201)
});
And(/^realize o acesso a tela de Candidatura$/, () => {
	efetivarCandidaturaPage.acessarTelaCandidattura()
});
Then(/^selecionar esse candidato e vaga e efetuar a candidatura$/, () => {
	cy.intercept({ method: 'POST', url: '**/lista_candidatados'}).as('post_efetcand')
	efetivarCandidaturaPage.acessarListagemSelecaoCandidatos()
	efetivarCandidaturaPage.selecionarCandidato(nomeCandidato)

	efetivarCandidaturaPage.acessarListagemSelecaoVagas()
	efetivarCandidaturaPage.selecionarVaga(nomeVaga)
	cy.intercept({ method: 'GET', url: '**/lista_candidatados'}).as('get_cad')
	efetivarCandidaturaPage.salvarCadastro()
	cy.wait('@post_efetcand').then(rota => {
		console.log(rota.response.body[0]);
		console.log(rota);
		idCand = rota.response.body;
	})
});
When(/^será efetivada a candidatura sendo possivel visualizar a mesma na listagem$/, () => {
	efetivarCandidaturaPage.validarMensagem("Salvo com sucesso")
	cy.wait('@get_cad').then(list => {
			temp = list.response.body.length - 1;
			console.log("Length "+temp);
   			console.log(list.response.body);
   			console.log(list.response.body[temp]);
			expect(list.response.body[temp].candidate).to.be.equals(nomeCandidato)
			expect(list.response.body[temp].vacancy).to.be.equals(nomeVaga)
	})
});


//Deletar uma candidatura
Given(/^que eu ja possua um candidato com uma candidatura realizada$/, () => {
	candidatoPage.acessarTelaCandidatos();
    candidatoPage.inserirNome(nomeCandidato)
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_candcad')
    candidatoPage.salvarCadastro() 
    cy.wait('@post_candcad').its('response.statusCode').should('eq', 201)
	candidatoPage.validarLisagem(nomeCandidato)

	vagaPage.acessarTelaVagas()
    cy.intercept({ method: 'POST', url: '**/vagas'}).as('post_vagacad')
	vagaPage.inserirVaga(nomeVaga)
    vagaPage.salvarCadastro()
    vagaPage.validarLisagem(nomeVaga)

	cy.wait('@post_vagacad').its('response.statusCode').should('eq', 201)

	efetivarCandidaturaPage.acessarTelaCandidattura()

	cy.intercept({ method: 'POST', url: '**/lista_candidatados'}).as('post_efetcand')
	efetivarCandidaturaPage.acessarListagemSelecaoCandidatos()
	efetivarCandidaturaPage.selecionarCandidato(nomeCandidato)

	efetivarCandidaturaPage.acessarListagemSelecaoVagas()
	efetivarCandidaturaPage.selecionarVaga(nomeVaga)
	cy.intercept({ method: 'GET', url: '**/lista_candidatados'}).as('get_cad')
	efetivarCandidaturaPage.salvarCadastro()
	cy.wait('@post_efetcand').then(rota => {
		console.log(rota.response.body[0]);
		console.log(rota);
		idCand = rota.response.body;
	})
	efetivarCandidaturaPage.validarMensagem("Salvo com sucesso")
	cy.wait('@get_cad').then(list => {
			temp = list.response.body.length - 1;
			console.log("Length "+temp);
   			console.log(list.response.body);
   			console.log(list.response.body[temp]);
			expect(list.response.body[temp].candidate).to.be.equals(nomeCandidato)
			expect(list.response.body[temp].vacancy).to.be.equals(nomeVaga)
	})
});
And(/^na tela de Candidatura selecionar a opção de Deletar a Candidatura$/, () => {
	efetivarCandidaturaPage.solicitarDelecaoCandidatura(nomeCandidato, nomeVaga)
	efetivarCandidaturaPage.validarMensagem("Gostaria de deletar candidatura?")
});
Then(/^selecionar a opção de confirmar a deleção$/, () => {
	cy.intercept({ method: 'DELETE', url: '**/lista_candidatados/**'}).as('delete_candidatura')
	efetivarCandidaturaPage.confirmarDeleteCadastro()
});
When(/^será exibida a mensagem de confirmação$/, () => {
	efetivarCandidaturaPage.validarMensagem("Deletado")
	cy.wait('@delete_candidatura').then(rota => {
		expect(rota.response.statusCode).to.be.eq(200)
		expect(rota.response.body).to.include("Deletado com sucesso")
	  })
});
And(/^a candidatura não será mais exibida na listagem$/, () => {
	efetivarCandidaturaPage.validarTelaAposDeletar(nomeCandidato, nomeVaga)
});


//Solicitar Candidatarura sem inserir Candidato e Vaga
Given(/^que eu acesse a tela de cadastro de Candidaturas$/, () => {
	efetivarCandidaturaPage.acessarTelaCandidattura()
});
Then(/^não insformar a vaga e o candidato e solicicitar o cadastro da candidatura$/, () => {
	efetivarCandidaturaPage.salvarCadastro()
});
When(/^a mensagem  "([^"]*)" deverá ser apresentada$/, (mensagem) => {
	efetivarCandidaturaPage.validarMensagemErro(mensagem)
});


//Solicitar Candidatura sem inserir Candidato
Given(/^que eu possua uma vaga cadastrada$/, () => {
	vagaPage.acessarTelaVagas()
    cy.intercept({ method: 'POST', url: '**/vagas'}).as('post_vagacad')
	vagaPage.inserirVaga(nomeVaga)
    vagaPage.salvarCadastro()
    vagaPage.validarLisagem(nomeVaga)
	cy.wait('@post_vagacad').its('response.statusCode').should('eq', 201)
});
When(/^realize o acesso a tela de Candidaturas$/, () => {
	efetivarCandidaturaPage.acessarTelaCandidattura()
});
Then(/^informar somente a Vaga e solicitar o cadastrao da candidatura$/, () => {
	efetivarCandidaturaPage.acessarListagemSelecaoVagas()
	efetivarCandidaturaPage.selecionarVaga(nomeVaga)
	efetivarCandidaturaPage.salvarCadastro()
});


//Solicitar Candidatura sem inserir Vaga
Given(/^que eu possua um Candidato cadastrado$/, () => {
	candidatoPage.acessarTelaCandidatos();
    candidatoPage.inserirNome(nomeCandidato)
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_candcad')
    candidatoPage.salvarCadastro() 
    cy.wait('@post_candcad').its('response.statusCode').should('eq', 201)
	candidatoPage.validarLisagem(nomeCandidato)
});
Then(/^informar somente o Candidato e solicitar o cadastrao da candidatura$/, () => {
	efetivarCandidaturaPage.acessarListagemSelecaoCandidatos()
	efetivarCandidaturaPage.selecionarCandidato(nomeCandidato)
	efetivarCandidaturaPage.salvarCadastro()
});


//Solicitar uma candidatura para o candidato a uma vaque que ele ja esteja vinculado
Given(/^que eu possua uma vaga e um candidato cadastrado$/, () => {
	candidatoPage.acessarTelaCandidatos();
    candidatoPage.inserirNome(nomeCandidato)
	cy.intercept({ method: 'POST', url: '**/candidatos'}).as('post_candcad')
    candidatoPage.salvarCadastro() 
    cy.wait('@post_candcad').its('response.statusCode').should('eq', 201)
	candidatoPage.validarLisagem(nomeCandidato)

	vagaPage.acessarTelaVagas()
    cy.intercept({ method: 'POST', url: '**/vagas'}).as('post_vagacad')
	vagaPage.inserirVaga(nomeVaga)
    vagaPage.salvarCadastro()
    vagaPage.validarLisagem(nomeVaga)
	cy.wait('@post_vagacad').its('response.statusCode').should('eq', 201)
});
And(/^esse usuario ja esteja cadastrado para essa vaga$/, () => {
	efetivarCandidaturaPage.acessarTelaCandidattura()

	cy.intercept({ method: 'POST', url: '**/lista_candidatados'}).as('post_efetcand')
	efetivarCandidaturaPage.acessarListagemSelecaoCandidatos()
	efetivarCandidaturaPage.selecionarCandidato(nomeCandidato)

	efetivarCandidaturaPage.acessarListagemSelecaoVagas()
	efetivarCandidaturaPage.selecionarVaga(nomeVaga)
	cy.intercept({ method: 'GET', url: '**/lista_candidatados'}).as('get_cad')
	efetivarCandidaturaPage.salvarCadastro()
	cy.wait('@post_efetcand').then(rota => {
		console.log(rota.response.body[0]);
		console.log(rota);
		idCand = rota.response.body;
	})
	efetivarCandidaturaPage.validarMensagem("Salvo com sucesso")
	cy.wait('@get_cad').then(list => {
			temp = list.response.body.length - 1;
			console.log("Length "+temp);
   			console.log(list.response.body);
   			console.log(list.response.body[temp]);
			expect(list.response.body[temp].candidate).to.be.equals(nomeCandidato)
			expect(list.response.body[temp].vacancy).to.be.equals(nomeVaga)
	})
});
Then(/^Na tela de Candidaturas eu solicitar a candidatura do usuario para a mesma vaga$/, () => {
	efetivarCandidaturaPage.acessarListagemSelecaoCandidatos()
	efetivarCandidaturaPage.selecionarCandidato(nomeCandidato)

	efetivarCandidaturaPage.acessarListagemSelecaoVagas()
	efetivarCandidaturaPage.selecionarVaga(nomeVaga)
	efetivarCandidaturaPage.salvarCadastro()
});
When(/^a mensagem de alerta "([^"]*)" será informada$/, (mensagem) => {
	efetivarCandidaturaPage.validarMensagemErro(mensagem)
});
