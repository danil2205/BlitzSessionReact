# BlitzSessionReact

This project was done for the second course in the first semester.<br />
This project is related to the game from the Wargaming company — World Of Tanks Blitz. The user can register (or log in if he already has an account). After that, he has access to several tabs — accounts and session. If the user does not want to register, he will only have access to the tabs — search for players and leave feedback.

Link on backend: https://github.com/danil2205/BlitzSession

## Download & Run

1. Install all necessary packages

```bash
$ npm install
```
2. Run

```bash
$ npm start
```

## Available functional

**In Account Tab:**<br /> 
User can add their **Wargaming** account(s) and some data writing to the database (_player name, account id of this player, access token and expiration of token_). Also user can **delete** his account(s), if he does not need it (them).

**In Session Tab:**<br />
User can choose his account in dropdown menu and after fetching stats about this account, they send to database, so, if user closed the tab with the website, then its session statistics will not be lost. Stats are fetching every 5 seconds (ideal timing) and update widget with player stats (battles, percent of wins and damage). Player is playing battles and see in real time how good/bad he is playing this wonderful game.

**In Search User Tab:**<br /> 
User can find absolutely any player of this game (only on EUROPE server) and get some stats about him. For example: battles, average damage, winrate, medals and so on.

**In Contact Us Tab:**<br />
User can leave a feedback about project, what to add or fix.
