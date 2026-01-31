const cron = require('node-cron')
const schedule = require("node-schedule");
const User = require('../models/user')
const Data = require('../models/data')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const path = require('path');

const messages = [
  // 🇬🇧 English
  "💬 Welcome! This chat is a place to connect and exchange ideas.",
  "🚀 What kind of project are you currently working on?",
  "🤔 If you could improve one app you use daily, which one would it be?",
  "📱 Do you prefer building mobile apps or web applications?",
  "🎮 Any developers here who also enjoy gaming?",

  // 🇫🇷 Français
  "👋 Bienvenue ! Ce canal est là pour échanger et discuter librement.",
  "💡 Sur quel type de projet travailles-tu en ce moment ?",
  "🧠 Quelle technologie aimerais-tu mieux maîtriser cette année ?",
  "📚 As-tu une ressource (article, vidéo, doc) que tu recommandes ?",
  "😄 Petite pause fun : café ou thé pour coder ? ☕🍵",
];

dotenv.config({ path: path.resolve(__dirname, '../.env') });

let flavioToken = null;
const JWT_PASSPHRASE = process.env.JWT_PASSPHRASE

const date = new Date(new Date().getTime() + (1 * 1 * 60 * 1000));
schedule.scheduleJob(date, () => {
    createBotAccount();
    console.log('Run Crons Jobs Created for (', process.env.ENV, ') env')
    cron.schedule("*/2 * * * *", flavioMsg)
});

const API_URL = `http://localhost:${process.env.PORT}`
const path2 = '/api/user/'

const sendMessage = async (contenu, token) => {
	const url = API_URL + path2 + 'sendmessage';

	return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            contenu: contenu
        })
    }).then((response) => response.json()).catch((error) => console.error(error));
}

const flavioMsg = async () => {
    const indexMsg = Math.trunc(messages.length * Math.random())
    await sendMessage(messages[indexMsg], flavioToken).then(data => {
        console.log({data})
    })
}

const createBotAccount = async () => {
    const data = await Data.findOne().catch(err => console.log(err));
    const index = data.avatarLength - 1
    const dateInscription = new Date()
    const sessionId = dateInscription.toISOString()
    const user = new User({userName: 'Bot', dateInscription, currentSession: sessionId, avatar: index});
    await user.save();
    const pUser = user.toObject();
    delete pUser.currentSession;
    flavioToken = jwt.sign({ userId: user._id, sessionId }, JWT_PASSPHRASE);
    console.log('User Inscrit')
}
