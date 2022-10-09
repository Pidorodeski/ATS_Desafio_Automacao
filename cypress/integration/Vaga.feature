Feature: Vaga
    Eu como usuario
    Quero realizar cadastro, edição ou deleção de um registro de Vaga
    

Scenario: Cadastrar uma Vaga
Given que eu esteja na tela de Vaga
And clico em criar e insiro descrição
Then salvar o cadastro da vaga
When será exibida a mensagem "Salvo com sucesso"
And a Vaga será exibido na listagem


Scenario: Editar uma Vaga
Given que eu tenha uma vaga cadastrada
Then edito a descrição e salvo a alteracao
When será exibida a mensagem "Salvo com sucesso"
And a vaga será exibida na listagem com a alteração realizada


Scenario: Deletar uma Vaga
Given que eu esteja na tela de Vagas com uma vaga cadastrada
When solicitar e confirmar a delecao dessa vaga
Then será apresentada a mensagem "Deletado"
And a vaga não será mais exibida na listagem


Scenario: Cadastrar uma Vaga com descrição Vazia
Given que eu acesse a tela de Vagas
And no cadastra de uma vaga salvo o cadastro com a descrição vazia
When será apresentada a mensagem de erro "Preencha o campo corretamente"