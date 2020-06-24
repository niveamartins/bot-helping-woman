const qrcode = require('qrcode-terminal');

const database =  require('./src/controllers/UserController');

const { Client } = require('whatsapp-web.js');
const client = new Client();

async function getUser(chat_id) {
	const user = await database.searchByChatId(chat_id);

	return user;
}

function conversationPath (message, user) {
	console.log('entrei aqui 1')
	switch (user.step) {
		case "Início":
			if (message === "1" || message === 1) {
				console.log('entrei aqui 2')
				message.reply("Ok, anotei aqui que você pediu macarrão! Uma excelente escolha. \n Você pode me passar seu endereço?")
				user.step = "Endereço"
				updateUser(user)
			}
			break;

		case "Endereço":
			console.log('entrei aqui 3')
			message.reply("Desculpa, acabei esquecendo. Qual seu nome?")
			infos.push(message)
			user.step = "Nome"
			user.address = message
			updateUser(user)
			break;

		case "Nome":
			console.log('entrei aqui 4')
			message.reply("O total é 15 reais, qual será a forma de pagamento? Já estamos preparando o seu pedido, só aguardar.")
			user.step = "Pagamento"
			user.name = message
			updateUser(user)
			break;

		case "Pagamento":
			console.log('entrei aqui 5')
			message.reply("Certo. Tudo certinho, obrigado pela preferência.")
			user.step = "Final"
			updateUser(user)
			break;
		
		case "Final":
			console.log('entrei aqui 6')
			client.sendMessage(user.chat_id, 'Caso o bot estivesse realmente funcionando, você teria encaminhado uma mensagem com as seguintes informações: \n \n' + '*[ALERTA] \n' + user.address + "\n" + user.name + '* \n \n O projeto ainda está sendo planejado, mas obrigada por ter feito até aqui.')
			break;	

		default:
			console.log('entrei aqui 7')
			break;
	}


}

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', message => {
  const messageZap = message.body.toLowerCase();
	
	if(messageZap === 'oi bot' || messageZap === 'ola bot' || messageZap === 'olá, bot' || messageZap === 'oi, bot' || messageZap === 'ola, bot') {
		message.reply('Oi! Eu sou o bot que a Nivea construiu. Por agora eu sou só um teste, mas deixa eu te explicar rapidinho esse rolê ok? Basicamente eu serei um restaurante falso e, sempre que alguma mulher estiver em situação de risco, poderá me mandar mensagem pedindo um macarrão que os dados serão direcionados para um app ou para o WhatsApp da Delegacia da Mulher como um alerta. Para você entender melhor o meu fluxo, me manda ai "Gostaria de fazer um pedido". Ao final do processo, mande um ok ou algo do tipo para que  você consiga ver a mensagem que seria enviada.')
	 
	} else if (messageZap === 'gostaria de fazer um pedido' || messageZap === 'gostaria de realizar um pedido'){
		user = {
			'chat_id': message.from, 
            'name': 'vazio',
            'address': 'vazio',
            'step': 'Início'
		}
		// checar dps se já existe

		message.reply('Oi! Nosso cardápio de hoje é: \n (1) Macarrão a bolonhesa \n (2) Frango Frito \n (3) Omelete de Queijo e Presunto \n ~(Realmente não sei mais pratos k)~  \n Por favor, consegue me mandar o número do prato desejado?')

	} else if (message.body.startsWith('!pedido')) {
		let user

		getUser(message.from).then(function(result){
			user = result
		})

		msg = message.body
		msg = msg.split('!pedido ')
		msg = msg[1].toString()

		console.log(msg)
		console.log(typeof msg)
		console.log(user)

		conversationPath(msg, user)

	 } else {
		client.sendMessage(message.from, 'cara, eu to caindo aqui')
	 }
});

client.initialize();