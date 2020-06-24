const connection = require('../database/connection');

module.exports = {
    async searchByChatId(chat_id) {
        const user = await connection('user')
        .where('chat_id', chat_id)
        .select('*')
        .first();


        return user;
    },

    async createUser(user) {
        const {  
            chat_id, 
            name,
            address,
            step } = user;
        
        const id = await connection('user').insert({
            chat_id, 
            name,
            address,
            step

        });

        return id;
    },

    async updateUser(user) {
        const { 
                id, 
                chat_id, 
                name,
                address,
                step } = user;
        
        if (name !== null) {
            await connection('user')
            .where("chat_id", chat_id)
            .update("name", name);
        }

        if (address !== null) {
            await connection('user')
            .where("chat_id", chat_id)
            .update("address", address);

        }

        if (step !== null) {
            await connection('user')
            .where("chat_id", chat_id)
            .update("step", step);
        }
    }
}