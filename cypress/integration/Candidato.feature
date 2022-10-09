Feature: Candidato
    Eu como usuario
    Quero realizar cadastro, edição ou deleção de um registro de Candidato

Scenario: Cadastrar um Candidato
Given que eu esteja na tela de Candidato
And clico em criar e insiro o nome do Candidato
Then salvar o cadastro
When será exibido a mensagem "Salvo com sucesso"
And o Candidato será exibido na listagem


Scenario: Editar um Candidato
Given que eu tenha um candidato cadastrado
And seleciono a opção de editar esse candidato
Then eu alterar o nome e salvar a alteração
When será exibido a mensagem "Salvo com sucesso"
And o candidato será exibido na listagem com a alteração realizada


Scenario: Deletar um Candidato
Given que eu esteja na tela de Candidato com um candidato cadastrado
And seleciono a opção de deletar esse cadastro
When confirmar a exclusão
Then será apresentado a mensagem "Deletado"
And o Candidao não será mais exibido na listagem


Scenario: Cadastrar um Candidato com nome Vazio
Given que eu esteja na tela de Candidato
And clico em criar e mantenho o campo nome vazio
Then salvar o cadastro
When será exibido a mensagem de erro "Preencha o campo corretamente"