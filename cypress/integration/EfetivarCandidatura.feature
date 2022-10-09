Feature: Efetivar Candidatura
    Eu como usuario
    Quero vincular o Candidato para a Vaga

Scenario: Cadastrar uma Candidatura
Given que eu possua um candidato e uma vaga cadastrada
And realize o acesso a tela de Candidatura
Then selecionar esse candidato e vaga e efetuar a candidatura
When será efetivada a candidatura sendo possivel visualizar a mesma na listagem


Scenario: Deletar uma candidatura
Given que eu ja possua um candidato com uma candidatura realizada
And na tela de Candidatura selecionar a opção de Deletar a Candidatura
Then selecionar a opção de confirmar a deleção
When será exibida a mensagem de confirmação
And a candidatura não será mais exibida na listagem


Scenario: Solicitar Candidatura sem inserir Candidato e Vaga
Given que eu acesse a tela de cadastro de Candidaturas
Then não insformar a vaga e o candidato e solicicitar o cadastro da candidatura
When a mensagem  "Selecione o candidato" deverá ser apresentada


Scenario: Solicitar Candidatura sem inserir Candidato
Given que eu possua uma vaga cadastrada
And realize o acesso a tela de Candidaturas
Then informar somente a Vaga e solicitar o cadastrao da candidatura
When a mensagem  "Selecione o candidato" deverá ser apresentada


Scenario: Solicitar Candidatura sem inserir Vaga
Given que eu possua um Candidato cadastrado
And realize o acesso a tela de Candidaturas
Then informar somente o Candidato e solicitar o cadastrao da candidatura
When a mensagem  "Selecione a vaga" deverá ser apresentada


Scenario: Solicitar uma candidatura para o candidato a uma vaque que ele ja esteja vinculado
Given que eu possua uma vaga e um candidato cadastrado
And esse usuario ja esteja cadastrado para essa vaga
Then Na tela de Candidaturas eu solicitar a candidatura do usuario para a mesma vaga
When a mensagem de alerta "Usuário já se cadastrou para essa vaga" será informada
