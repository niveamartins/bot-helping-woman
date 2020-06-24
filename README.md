# bot-helping-woman
Projeto criado com o intuito de ajudar mulheres que sejam vítimas de violência doméstica. 

## Descrição
O projeto é um bot no WhatsApp que, ao receber um pedido de um prato específico, ele pergunta algumas informações como endereço e nome e encaminha como um alerta para a delegacia da Mulher.

## Utilização do Usuário
Para utilizar o bot, temos o seguinte fluxo na fase de teste:

* "Oi, bot": mensagem introdutória para apresentar o projeto.
* "!pedido gostaria de fazer um pedido": nessa mensagem, o bot cadastra o chat_id do usuário e começa o processo de aquisição dos dados necessários.
* "!pedido 1": número do pedido "gatilho"
* "!pedido [endereco]": nessa mensagem, mandamos ao bot o endereço da ocorrência.
* "!pedido [nome]": aqui, devemos colocar o nome da vítima.
* "!pedido [forma_de_pagamento]": essa mensagem é apenas para deixar o bot orgânico.
* "!pedido ok": apenas para visualizar como seria o alerta.

## Instalação
* npm install
* node index.js
* leia o qr code com o leitor do whatsapp web no aparelho

## Melhorias
* Melhorar dinâmica e deixar o bot mais orgânico
* Trocar o BD
* Melhorar a lógica
* Retirar a necessidade de "!pedido"


