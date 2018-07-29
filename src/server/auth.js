const userList = {};

function userAuthentication(req, res, next) {		
	if (userList[req.session.id] === undefined) {				
		res.sendStatus(401);		
	} else {		
		next();
	}
}

function addUserToAuthList(req, res, next) {	
	if (userList[req.session.id] !== undefined) {
		res.status(403).send('user already exist');
	} else {		
		for (sessionid in userList) {
			if (userList[sessionid]!== undefined) {
                const name = userList[sessionid].name;
                if (name === req.body) {
                    res.status(403).send('user name already exist');
                    return;
                }
            }
		}
        userList[req.session.id] ={}
		userList[req.session.id].name = req.body;
        userList[req.session.id].gameName = '';
		next();
	}
}

function removeUserFromAuthList(req, res, next) {	
	if (userList[req.session.id] === undefined) {
		res.status(403).send('user does not exist');
	} else {						
		delete userList[req.session.id];
		next();
	}
}

function getUserInfo(id) {	
    return userList[id];
}

function updateGame(id,gameName) {
    userList[id].gameName=gameName;
}
module.exports = {userAuthentication, addUserToAuthList, removeUserFromAuthList, getUserInfo,updateGame}
