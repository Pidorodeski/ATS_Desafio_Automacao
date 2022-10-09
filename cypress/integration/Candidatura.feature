Feature: Candidatura
    Eu como usuario
    Quero verificar as candidaturas realizadas

Scenario: Validar a candidatura exibida na listagem
Given que eu possua uma candidatura ja realizada
Then acessar a tela de Candidaturas
When a candidatura será apresentada na listagem