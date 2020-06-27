const qrcode = require('qrcode-terminal');

const database =  require('./src/controllers/UserController');

const { Client } = require('whatsapp-web.js');
const client = new Client();

function conversationPath (message, msg, user) {
	switch (user.step) {
		case "Início":
			regex = /macarr.o|Macarr.o | 1/g
			mensagem = msg.search(regex)

			if (mensagem != -1) {
				message.reply("Ok, anotei aqui que você pediu macarrão a bolonhesa! Uma excelente escolha. \n Você pode me passar seu endereço?")
				user.step = "Endereço"
				database.updateUser(user)
				break;
			}

			regex = /Frango|frango | 2/g
			mensagem = msg.search(regex)

			if (mensagem != -1) {
				message.reply("Ok, anotei aqui que você pediu frango frito! Uma excelente escolha. \n Você pode me passar seu endereço?")
				user.step = "Endereço"
				database.updateUser(user)
				break;
			}

			regex = /omelete|Omelete | 3/g
			mensagem = msg.search(regex)

			if (mensagem != -1) {
				message.reply("Ok, anotei aqui que você pediu Omelete! Uma excelente escolha. \n Você pode me passar seu endereço?")
				user.step = "Endereço"
				database.updateUser(user)
				break;
			}

			message.reply("OH caralho, é um dos 3 itens da lista")
			break;

		case "Endereço":
			message.reply("Desculpa, acabei esquecendo. Qual seu nome?")
			user.step = "Nome"
			user.address = msg
			database.updateUser(user)
			break;

		case "Nome":
			message.reply("O total é 15 reais, qual será a forma de pagamento? Já estamos preparando o seu pedido, só aguardar.")
			user.step = "Pagamento"
			user.name = msg
			database.updateUser(user)
			break;

		case "Pagamento":
			message.reply("Certo. Tudo certinho, obrigado pela preferência.")
			user.step = "Final"
			database.updateUser(user)
			break;
		
		case "Final":
			client.sendMessage(user.chat_id, 'Caso o bot estivesse realmente funcionando, você teria encaminhado uma mensagem com as seguintes informações: \n \n' + '*[ALERTA]* \n' + '*' + user.address + "* \n" + '*' + user.name + '* \n \n O projeto ainda está sendo planejado, mas obrigada por ter feito até aqui.')
			break;	

		default:
			break;
	}
} 


async function allTheActions(message) {
	const messageZap = message.body.toLowerCase();
	
	if(messageZap === 'oi bot' || messageZap === 'ola bot' || messageZap === 'olá, bot' || messageZap === 'oi, bot' || messageZap === 'ola, bot') {
		message.reply('Oi! Eu sou o bot que a Nivea construiu. Por agora eu sou só um teste, mas deixa eu te explicar rapidinho esse rolê ok? Basicamente eu serei um restaurante falso e, sempre que alguma mulher estiver em situação de risco, poderá me mandar mensagem pedindo um macarrão e responder algumas perguntas para que os dados serão direcionados para um app ou para o WhatsApp da Delegacia da Mulher como um alerta. \n Para você entender melhor o meu fluxo, me manda ai "!pedido Gostaria de fazer um pedido", além disso, como o bot está em fase de teste, para menores complicações, só serão lidas mensagem com !pedido no início. \n *Ao final do processo, mande um "!pedido ok" ou algo do tipo para que você consiga ver a mensagem que seria enviada.*')
	 
	} else if (messageZap === '!pedido gostaria de fazer um pedido' || messageZap === '!pedido gostaria de realizar um pedido'){
		user = {
			'chat_id': message.from, 
            'name': 'vazio',
            'address': 'vazio',
            'step': 'Início'
		}
		// checar dps se já existe

		database.createUser(user)

		message.reply('Oi! Nosso cardápio de hoje é: \n (1) Macarrão a bolonhesa \n (2) Frango Frito \n (3) Omelete de Queijo e Presunto \n ~(Realmente não sei mais pratos k)~  \n Por favor, consegue me mandar o número do prato desejado?')

	} else if (message.body.startsWith('!pedido')) {

		const user = await database.searchByChatId(lkjljklkljkljklkjljkljkljkmessage.from);

		msg = message.body
		msg = msg.split('!pedido ')
		msg = msg[1]

		conversationPath(message, msg, user)

	 }
}

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', message => {
  	allTheActions(message)
});


client.initialize();