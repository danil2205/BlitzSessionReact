# BlitzSessionReact

This project was done for the second course.<br />
BlitzSession is a website dedicated to the popular game World of Tanks Blitz, designed to provide players with a comprehensive tool to analyze their performance and enhance their gameplay experience. With detailed statistics, customizable filters, and comparative analysis against server averages, BlitzSession empowers players to make informed decisions and improve their skills.<br />
The user can register (or log in if he already has an account). After that, he has access to several tabs — Accounts, Account Stats and Session. If the user does not want to register, he will only have access to the tabs — Hangar Stats.

## Motivation
World of Tanks Blitz boasts a massive fan base, and i want to make website that offers valuable insights and data analysis for players. As avid gamers ourselves, I understand the significance of statistics in shaping gameplay decisions, such as tank selection, performance improvement strategies, and issue identification. My motivation behind BlitzSession is to fill this gap and provide World of Tanks Blitz players with a user-friendly and feature-rich website to analyze their performance comprehensively

[Link on Backend](https://github.com/danil2205/BlitzSession)

[Design Document](https://docs.google.com/document/d/1Blprl62qVn8JEoNXtWzSsBnPYQ7XCCcmvsvOy5Jzq-c/edit)

## Download & Run
**You need to have installed NodeJS on your machine.**

1. Clone the repository
```bash
$ git clone https://github.com/danil2205/blitz-session-react.git
```

2. Install all necessary packages

```bash
$ npm install
```
3. Run

```bash
$ npm start
```

## Available functional

**In Account Tab:**<br /> 
User can add his **Wargaming** account(s) and some data writing to the database (_player name, account id of this player, access token and expiration of token_). Also user can **delete** his account(s), if he does not need it (them).

**In Account Stats Tab**<br />
If user added his **Wargaming** account(s), he will have access to this tab. He can see stats of his accounts: some charts and tables with his general stats, filtered stats (for what time to take statistics, type and level of vehicle) and server stats. All stats will be colorized to understand user play better than average server player or no.

**In Hangar Tab**<br />
User can find any account and get list of tanks and their stats. These stats you can sort by any column and filter by number of battles, type and level of vehicle. Also user can click on any tank name and get detailed stats like in **Account Stats Tab** (charts, tables)

**In Session Tab:**<br />
User can choose his account in dropdown menu and after fetching stats about this account, they send to database, so, if user closed the tab with the website, then its session statistics will not be lost. Stats are fetching every 5 seconds (ideal timing) and update widget with player stats (battles, percent of wins and damage). Player is playing battles and see in real time how good/bad he is playing this wonderful game.

**In Contact Us Tab:**<br />
User can leave a feedback about project, what to add or fix.

## Сode reviews of my project

- [Code review №1](https://github.com/danil2205/blitz-session-react/pull/3) 
- [Code review №2](https://github.com/danil2205/blitz-session-react/pull/4) 
- [Code review №3](https://github.com/danil2205/BlitzSession/pull/1) 
- [Code review №4](https://github.com/danil2205/BlitzSession/pull/2) 

## My code reviews

- [Code review №1](https://github.com/vladimirvikulin/To-Do-List/pull/4) 
- [Code review №2](https://github.com/vladimirvikulin/To-Do-List-Server/pull/2) 
- [Code review №3](https://github.com/vladimirvikulin/To-Do-List-Server/pull/3) 
- [Code review №4](https://github.com/vladimirvikulin/To-Do-List/pull/8) 
