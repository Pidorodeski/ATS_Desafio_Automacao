/// <reference types="cypress" />

import faker from 'faker'

import VagaPage from '../pageobjects/VagaPage'
const vagaPage = new VagaPage

let nomeVaga 
let nomeAlterado

  beforeEach(() => {
		nomeVaga = faker.company.companyName()
		nomeAlterado = faker.company.companyName()
  })


// Cenário de cadastro de Vaga
Given(/^que eu esteja na tela de Vaga$/, () => {
	vagaPage.acessarTelaVagas()
});
And(/^clico em criar e insiro descrição$/, () => {
	cy.intercept({ method: 'POST', url: '**/vagas'}).as('post_vagacad')
	vagaPage.inserirVaga(nomeVaga)
});
Then(/^salvar o cadastro da vaga$/, () => {
	vagaPage.salvarCadastro()
});
When(/^será exibida a mensagem "([^"]*)"$/, (mensagem) => {
	vagaPage.validarMensagem(mensagem)
});
When(/^a Vaga será exibido na listagem$/, () => {
	vagaPage.validarLisagem(nomeVaga)
	cy.wait('@post_vagacad').its('response.statusCode').should('eq', 201)
});


// Cenário de Atualização de uma Vaga
Given(/^que eu tenha uma vaga cadastrada$/, () => {
	vagaPage.acessarTelaVagas()
	cy.intercept({ method: 'POST', url: '**/vagas'}).as('post_vagaupdt')
	vagaPage.inserirVaga(nomeVaga)
	vagaPage.salvarCadastro()
	cy.wait('@post_vagaupdt').its('response.statusCode').should('eq', 201)
});
Then(/^edito a descrição e salvo a alteracao$/, () => {
	cy.intercept({ method: 'PUT', url: '**/vagas/**'}).as('put_vagaupdt')
	vagaPage.acessarEdicaoVaga(nomeVaga)
	vagaPage.alterarDescricaoVaga(nomeAlterado)
	vagaPage.salvarCadastro()
	cy.wait('@put_vagaupdt').its('response.statusCode').should('eq', 200)
});
When(/^a vaga será exibida na listagem com a alteração realizada$/, () => {
	vagaPage.validarLisagem(nomeAlterado)
});


// Cenário de Deleção de uma Vaga
Given(/^que eu esteja na tela de Vagas com uma vaga cadastrada$/, () => {
	vagaPage.acessarTelaVagas()
	cy.intercept({ method: 'POST', url: '**/vagas'}).as('post_vagaudel')
	vagaPage.inserirVaga(nomeVaga)
	vagaPage.salvarCadastro()
	cy.wait('@post_vagaudel').its('response.statusCode').should('eq', 201)
});
When(/^solicitar e confirmar a delecao dessa vaga$/, () => {
	cy.intercept({ method: 'DELETE', url: '**/vagas/**'}).as('delete_vaga')
	vagaPage.acessarDelecaoVaga(nomeVaga)
	vagaPage.confirmarDelecao()
	cy.wait('@delete_vaga').then(rota => {
		expect(rota.response.statusCode).to.be.eq(200)
		expect(rota.response.body).to.include("Deletado com sucesso")
	  })
});
Then(/^será apresentada a mensagem "([^"]*)"$/, (mensagem) => {
	vagaPage.validarMensagemDelecao(mensagem)
});
Then(/^a vaga não será mais exibida na listagem$/, () => {
	vagaPage.validarDelecao(nomeVaga)
});


// Cenário inserir vaga com descrição vazia
Given(/^que eu acesse a tela de Vagas$/, () => {
	vagaPage.acessarTelaVagas()
});
Then(/^no cadastra de uma vaga salvo o cadastro com a descrição vazia$/, () => {
	cy.intercept({ method: 'POST', url: '**/vagas'}).as('post_vagacadvazio')
	vagaPage.inserirVaga(" ")
	vagaPage.salvarCadastro()
});
When(/^será apresentada a mensagem de erro "([^"]*)"$/, (mensagem) => {
	vagaPage.validarMensagemErro(mensagem)
	cy.wait('@post_vagacadvazio').then(rota => {
		expect(rota.response.statusCode).to.be.eq(401)
		expect(rota.response.body).to.include("Erro no corpo da requisição")
	  })
});