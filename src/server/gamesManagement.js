const express = require('express');
const router = express.Router();
const auth = require('./auth');
const chatManagement = require('./chat');
const _ = require('lodash');
const gameList = {};


function addGame(req, res, next) {
    if (gameList[req.body.game.name] !== undefined) {
        res.status(403).send('game already exist');
    } else {
        gameList[req.body.game.name] = req.body.game;
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

gamesManagement.get('/:name',(req, res) => {
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
