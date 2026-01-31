const User = require('../models/user')
const Data = require('../models/data')
const Message = require('../models/message')
const jwt = require('jsonwebtoken');
const ws_actions = require('./ws_actions')

const JWT_PASSPHRASE = process.env.JWT_PASSPHRASE

exports.tokenIsEnable = async (req, res, next) => {
  try {
    const { userId } = req.auth
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }
    const pUser = user.toObject();
    delete pUser.currentSession;
    res.status(200).json({ ...pUser});
    console.log('User Connecté')
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error)
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { userName } = req.body
    const data = await Data.findOne().catch(err => console.log(err));
    if(data.tabIndex.length == data.avatarLength - 1) {
      return res.status(200).json({ error: "Pas de place disponible" });
    }
    let index = 0
    while(true) {
      const pIndex = Math.trunc((data.avatarLength - 1)*Math.random())
      if(!data.tabIndex.includes(pIndex)) {
        index = pIndex
        break
      }
    }
    const dateInscription = new Date()
    const sessionId = dateInscription.toISOString()
    const user = new User({userName, dateInscription, currentSession: sessionId, avatar: index});
    await user.save();
    const pUser = user.toObject();
    delete pUser.currentSession;
    const token = jwt.sign({ userId: user._id, sessionId }, JWT_PASSPHRASE);
    res.status(200).json({...pUser, token});
    console.log('User Inscrit')
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error)
  } 
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json({messages});
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error)
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { userId } = req.auth
    const { contenu } = req.body
    const user = await User.findOne({ _id: userId });
    const msg = {
      userId: user._id,
      userName: user.userName,
      userAvatar: user.avatar,
      contenu: contenu,
      dateSended: new Date(),
    }
    const message = new Message({...msg});
    await message.save();
    res.status(200).json({message: 'message sended'});
    const send_msg  = {}
    const data = {send_msg}
    ws_actions.dataToUser(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Server error" });
  }
};
