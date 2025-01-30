const { Client, LocalAuth } = require('whatsapp-web.js');

// Crée le client avec authentification persistante
const client = new Client({
    authStrategy: new LocalAuth()
});

// Quand le client est prêt
client.on('ready', () => {
    console.log('Client is ready!');
});

// Mentionner tous les membres d’un groupe
client.on('message', async msg => {
    if (msg.body === '!tag') {
        const chat = await msg.getChat();
        if (chat.isGroup) {
            const participants = chat.participants;
            const mentionArray = participants.map(participant => ({
                id: participant.id,
                label: participant.id.user
            }));

            const mentionString = `Salut @${mentionArray.map(p => p.label).join(', @')}, vous êtes tous tagués ! 💖`;
            await chat.sendMessage(mentionString, { mentions: mentionArray });
        }
    }
});

// Démarre le client
client.initialize();
