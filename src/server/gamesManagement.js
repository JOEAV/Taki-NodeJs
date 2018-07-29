const express = require('express');
const router = express.Router();
const auth = require('./auth');
const chatManagement = require('./chat');
const _ = require('lodash');
const gameList = {};


function addGame(req, res, next) {
    req.body = JSON.parse(req.body);
    const userName = auth.getUserInfo(req.session.id).name;
    if (gameList[req.body.name] !== undefined) {
        res.status(403).send('game already exist');
    } else {
        let game ={
            name:req.body.name,
            numOfPlayers:parseInt(req.body.numOfPlayers),
            loggedInPlayers:0,
            creator: userName,
            status:"pending"
            
            
        }
        gameList[req.body.name] = game;
        next();
    }
}

function removeGame(req, res, next) {
    if (gameList[req.params.name] === undefined) {
        res.status(403).send('game does not exist');
    } else {
        delete gameList[req.params.name];
        next();
    }
}

function getGameInfo(name) {
    return gameList[name];
}



const gamesManagement = express.Router();

gamesManagement.get('/games/:name',(req, res) => {
    const game = getGameInfo(req.params.name);
    res.json({game});
});

gamesManagement.get('/allGames',(req, res) => {
    const gamesArray = [];
    _.forIn(gameList,(value,key)=>{
        gamesArray.push(value);
    })

    res.json(gamesArray);

});

gamesManagement.post('/addGame', addGame, (req, res) => {
    res.sendStatus(200);
});

gamesManagement.get('/removeGame/:name', [
        removeGame,
        (req, res)=>
        {
            res.sendStatus(200);
        }]
);


module.exports = gamesManagement;
