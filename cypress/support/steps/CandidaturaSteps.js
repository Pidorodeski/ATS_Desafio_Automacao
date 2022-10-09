/// <reference types="cypress" />
/* global Given, Then, When */

import faker from 'faker'

import CandidatoPage from '../pageobjects/CandidatoPage'
const candidatoPage = new CandidatoPage

import VagaPage from '../pageobjects/VagaPage'
const vagaPage = new VagaPage

import EfetivarCandidaturaPage from '../pageobjects/EfetivarCandidaturaPage'
const efetivarCandidaturaPage = new EfetivarCandidaturaPage

import CandidaturaPage from '../pageobjects/CandidaturaPage'
const candidaturaPage = new CandidaturaPage

let nomeCandidato
let nomeVaga
let temp = 0
let idCand = 0

beforeEach(() => {
	nomeCandidato = faker.name.findName()
	nomeVaga = faker.company.companyName()
});

Given(/^que eu possua uma candidatura ja realizada$/, () => {
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
});

Then(/^acessar a tela de Candidaturas$/, () => {
    cy.intercept({ method: 'GET', url: '**/lista_nomes'}).as('get_lista')
    candidaturaPage.acessarTelaCandidatura()
});

When(/^a candidatura será apresentada na listagem$/, () => {
	cy.wait('@get_lista').then(rota => {
		console.log(rota);
	})
    candidaturaPage.validarListagem(nomeCandidato, nomeVaga)
});
