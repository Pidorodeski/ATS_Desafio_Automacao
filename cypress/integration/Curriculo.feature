Feature: Curriculo
    Eu como usuario
    Quero cadastrar um curriculo para um candidato

Scenario: Cadastrar curriculo para um candidato que nao possua curriculo
Given que eu possua um candidato sem curriculo cadastrado
And na tela de Curriculo acesse a pop up de inclusão do curriculo
Then salvar o cadastro do curriculo
When será exibido a mensagem de confirmacao "Salvo com sucesso"
And o candidato será exibido na listagem com a informação de curriculo cadastrado


Scenario: Cadastrar curriculo para um candidato que possua curriculo
Given que eu possua um candidato com o curriculo já cadastrado
When na tela de Curriculo selecionar a opção de Cadastra o Curriculo 
Then será entao exibido a mensagem "Voçê já possui currículo. Clique em visualizar currículo"


Scenario: Visualizar curriculo para um candidato que possua curriculo
Given que eu possua um candidato com curriculo cadastrado
When na tela de Curriculo selecionar a opção de Visualizar 
Then será exibido a pop up com o curriculo desse candidato


Scenario: Visualizar curriculo para um candidato que não possua curriculo
Given que eu possua um candidato sem o curriculo cadastrado
When na tela de Curriculo seleciono a opção de Visualizar 
Then será entao exibido a mensagem "Voçê não possui currículo. Clique em cadastrar currículo"


Scenario: Deletar curriculo para um candidato que possua curriculo
Given que eu tenha um candidato com o curriculo já cadastrado
When na tela de Curriculo selecionar a opção de Deletar Curriculo
And na pop up de confirmação confirmar a deleção
Then o curriculo do candidato será excluído
And o candidato será exibido sem a informação de curriculo cadastrado


Scenario: Deletar curriculo para um candidato que nao possua curriculo
Given que eu tenha um candidato sem o curriculo já cadastrado
When selecionar a opção de Deletar Curriculo na tela de Curriculo 
Then será entao apresentada a mensagem "Voçê não possui currículo para deletar"
