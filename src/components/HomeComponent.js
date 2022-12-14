import React from "react";

const Home = () => {
  const description = [
    'In Account Tab: user can add their Wargaming account(s) and some data writing to the database (no email or password). \n Also user can delete his account(s), if he does not need it (them).\n',
    'In Session Tab: user can choose his account in dropdown menu and after fetching stats about this account, they send to my database, so, if user accidentally closed the tab with the site, then its session statistics will not be lost. Stats are fetching every 5 seconds (ideal timing) and update widget with player stats (battles, percent of wins and damage).\n Player is playing battles and see in real time how good/bad he is playing this wonderful game.',
    'In Search User Tab: user can find absolutely any player of this game (only on EUROPE server) and get some stats about him. For example: battles, average damage, winrate, medals and so on.'
  ];
  return (

    <div className="container">
      <div className="content">
        <div className="row">
          <div className="col-12">
            <h3>Home</h3>
            <hr />
          </div>
        </div>
        <div>
          <h1 className="text-center">
            Welcome to BlitzSession!
          </h1>
          <h2 className="text-center">
            This project was done for the second course in the first semester.
          </h2>
          <h3 className="text-center" style={{marginTop: "40px"}}>
            This project is related to the game from the Wargaming company — World Of Tanks Blitz. The user can register (or log in if he already has an account). After that, he has access to several tabs — accounts and session. If the user does not want to register, he will only have access to the tabs — search for players and leave feedback.
          </h3>
          <h3 className="text-left" style={{marginTop: "40px"}}>Short description about tabs in navbar:</h3>
          <div>
            <ul>{description.map((item, index) =>
              <li style={{fontSize: "20px", marginBottom: "20px"}} key={index}>
                {item}
              </li>
            )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
