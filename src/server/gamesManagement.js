
const express = require('express');
const router = express.Router();
const auth = require('./auth');
const chatManagement = require('./chat');
const _ = require('lodash');
const CardFactory = require('./js/Logic/Card');
const Timer = require('./js/Logic/Timer')
const gameList = {};


function addGame(req, res, next) {
    req.body = JSON.parse(req.body);
    const userName = auth.getUserInfo(req.session.id).name;
    if (gameList[req.body.name] !== undefined) {
        res.status(403).send('game already exist');
    } else {
        let game = {
            name:req.body.name,
            numOfPlayers:parseInt(req.body.numOfPlayers),
            loggedInPlayers:0,
            playersNames:[],
            creator: userName,
            status:"pending",
            gameDeck:null
        }
        gameList[req.body.name] = game;
        next();
    }
}


function updateGame(req, res, next) {
    let game = JSON.parse(req.body);
    const gameName = auth.getUserInfo(req.session.id).gameName;
    if (gameList[gameName] === undefined) {
        res.status(403).send('cant update non exist game');
    } else {
        gameList[gameName].players = game.players;
        gameList[gameName].activePlayer = game.activePlayer;
        gameList[gameName].gameDeck = game.gameDeck;
        gameList[gameName].pot = game.pot;
        gameList[gameName].howMany2Plus = game.howMany2Plus;
        gameList[gameName]._isTakiMode = game._isTakiMode;
        gameList[gameName]._winner = game._winner;
        gameList[gameName]._totalMoves = game._totalMoves;
        next();
    }
}

function joinGame(req, res, next) {
    const gameName = auth.getUserInfo(req.session.id).gameName;
    const userName = auth.getUserInfo(req.session.id).name;
    const index =gameList[req.body].loggedInPlayers;
    if (gameList[req.body] === undefined) {
        res.status(403).send('game does not exist');
    }
    else if (gameList[req.body].status==='started'){
        res.status(403).send('game already started');
    }
    else if (gameName !==''){
        res.status(403).send('player already plays');
    }
    else {
        gameList[req.body].playersNames.push(userName);
        if (++gameList[req.body].loggedInPlayers===gameList[req.body].numOfPlayers) {
            gameList[req.body].status = 'started'
            let cardDeck= new CardFactory.CardDeck(true);
            cardDeck = cardDeck._cardArray;
            gameList[req.body].originalGameDeck = cardDeck;
            gameList[req.body].gameDeck = cardDeck;

        }
        auth.updateGame(req.session.id,req.body);
        auth.updateIndex(req.session.id,index);
        if ( gameList[req.body].status === 'started') {
           gameList[req.body].timer = new Timer();
           gameList[req.body].timer.start();
        }
        next();
    }
}


function removeGame(req, res, next) {
    if (gameList[req.body] === undefined) {
        res.status(403).send('game does not exist');
    } else {
        delete gameList[req.body];
        next();
    }
}


function getGameInfo(name) {
    return gameList[name].game
}


const gamesManagement = express.Router();

gamesManagement.get('/games/:name',(req, res) => {
    const game = getGameInfo(req.params.name);
    res.json(game);
});

gamesManagement.get('/gameStatus',(req, res) => {
    const user = auth.getUserInfo(req.session.id);
    const gameName = user.gameName;
    let result ={
        myIndex:user.index,
        numOfMissing:gameList[gameName].numOfPlayers - gameList[gameName].loggedInPlayers,
        ...gameList[gameName]
    }

    result.timer=null;
    res.json(result);
});

gamesManagement.get('/timeElapsed',(req, res) => {
    const user = auth.getUserInfo(req.session.id);
    const gameName = user.gameName;
    let result ={
        timeElapsed:gameList[gameName].timer.timeElapsed,
        min:gameList[gameName].timer.min,
        hour:gameList[gameName].timer.hour,
        ms:gameList[gameName].timer.ms,
        sec:gameList[gameName].timer.sec,
    }
    res.json(result);
});

gamesManagement.get('/allGames',(req, res) => {
    const gamesArray = [];
    _.forIn(gameList,(value,key)=>{
        gamesArray.push(value);
    })

    res.json(gamesArray);

});


gamesManagement.post('/updateGame', updateGame, (req, res) => {
    res.sendStatus(200);
});

gamesManagement.post('/addGame', addGame, (req, res) => {
    res.sendStatus(200);
});

gamesManagement.post('/removeGame', removeGame, (req, res)=> {
    res.sendStatus(200);
});
gamesManagement.post('/joinGame', joinGame, (req, res)=> {
    res.sendStatus(200);
});



module.exports = gamesManagement;
