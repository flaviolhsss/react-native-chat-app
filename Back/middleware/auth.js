const jwt = require('jsonwebtoken');
const JWT_PASSPHRASE = process.env.JWT_PASSPHRASE
const User = require('../models/user')
 
module.exports = async (req, res, next) => {
   try {
       //console.log({headers: req.headers})
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, JWT_PASSPHRASE);
       const userId = decodedToken.userId;
       const sessionId = decodedToken.sessionId;
       req.auth = {
           userId: userId,
           sessionId: sessionId
       };
       if(!sessionId) {
            return res.status(500).json({ error: "Session invalide!" });
        }
        const user = await User.findById(userId);
        if(user.currentSession !== sessionId) {
            return res.status(500).json({ error: "Session expiré!" });
        }
	    next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
