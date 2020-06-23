const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

function conversationPath (message) {
	switch (etapa) {
		case "Início":
			if (message.body === "!pedido 1") {
				message.reply("Ok, anotei aqui que você pediu macarrão! Uma excelente escolha. \n Você pode me passar seu endereço?")
				etapa = "Endereço"
			}
			break;
		case "Endereço":
			message.reply("Desculpa, acabei esquecendo. Qual seu nome?")
			infos.push(message.body)
			etapa = "Nome"
			break;

		case "Nome":
			message.reply("O total é 15 reais, qual será a forma de pagamento? Já estamos preparando o seu pedido, só aguardar.")
			etapa = "Pagamento"
			infos.push(message.body)
			break;

		case "Pagamento":
			message.reply("Certo. Tudo certinho, obrigado pela preferência.")
			etapa = "Final"
			break;
		
		case "Final":
			client.sendMessage(message.from, 'Caso o bot estivesse realmente funcionando, você teria encaminhado uma mensagem com as seguintes informações: \n \n' + '[ALERTA] \n' + infos[0] + "\n" + infos[1] + '\n O projeto ainda está sendo planejado, mas obrigada por ter feito até aqui.')
			break;	

		default:
			break;
	}


}

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', message => {
	let infos = []
	let etapa;
  const messageZap = message.body.toLowerCase();
	 /*
	 if(messageZap === 'helen1') {
		message.reply('Então, meu anjo, nada melhor do que um bot para fazer isso, já que eu sou toda gay computeira né kkkkkkkkk eu amo muito você, estou meio afastada pq to meio confusa com isso aqui e não quero que a gente acabe atropelando processo nenhum, mas eu não to desistindo ok? falando em atropelar processo........ namora cmg?');
	} 
	*/ 


	if(messageZap === 'oi bot' || messageZap === 'ola bot' || messageZap === 'olá, bot' || messageZap === 'oi, bot' || messageZap === 'ola, bot') {
		message.reply('Oi! Eu sou o bot que a Nivea construiu. Por agora eu sou só um teste, mas deixa eu te explicar rapidinho esse rolê ok? Basicamente eu serei um restaurante falso e, sempre que alguma mulher estiver em situação de risco, poderá me mandar mensagem pedindo um macarrão que os dados serão direcionados para um app ou para o WhatsApp da Delegacia da Mulher como um alerta. Para você entender melhor o meu fluxo, me manda ai "Gostaria de fazer um pedido". Ao final do processo, mande um ok ou algo do tipo para que  você consiga ver a mensagem que seria enviada.')
		etapa = "Explicando"
		infos = []
	 } else if (messageZap === 'gostaria de fazer um pedido' || messageZap === 'gostaria de realizar um pedido'){
		message.reply('Oi! Nosso cardápio de hoje é: \n (1) Macarrão a bolonhesa \n (2) Frango Frito \n (3) Omelete de Queijo e Presunto \n ~(Realmente não sei mais pratos k)~  \n Por favor, consegue me mandar o número do prato desejado? Por motivos de eu ser burra, por favor, inicie a msg a partir daqui com "!pedido " ')
		etapa = "Início"
	} else if (message.body.startsWith('!pedido')){
		conversationPath(message)
	 }
});

client.initialize();