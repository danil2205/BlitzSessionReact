import React, { useEffect, useState} from "react";
import { Breadcrumb, BreadcrumbItem, Input } from "reactstrap";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import { listOfPlayers, medalsOfPlayer, playerStatsURL } from "../shared/wargaming";

const imagesMedals = {
  heroesOfRassenay: require("../images/medals/heroesOfRassenay.png"),
  medalKolobanov: require("../images/medals/medalKolobanov.png"),
  medalLafayettePool: require("../images/medals/medalLafayettePool.png"),
  medalRadleyWalters: require("../images/medals/medalRadleyWalters.png"),
  supporter: require("../images/medals/supporter.png"),
  warrior: require("../images/medals/warrior.png"),
  evileye: require("../images/medals/evileye.png"),
  steelwall: require("../images/medals/steelwall.png"),
};

const RenderStats = ({ players }) => {
  const account_id = players[0].account_id;
  const [stats, setStats] = useState(null);
  const [medals, setMedals] = useState(null);
  useEffect(() => {
    const getStats = async () => {
      const stats = await fetch(playerStatsURL(account_id))
        .then((res) => res.json());

      const medals = await fetch(medalsOfPlayer(account_id))
        .then((res) => res.json());

      setStats(stats);
      setMedals(medals)
    };
    getStats();
  }, [])

  if (!stats) return <div></div>
  const playerStats = stats.data[account_id].statistics.all;
  const playerMedals = medals.data[account_id].achievements;

  const statsToDisplay = {
    battles: playerStats.battles,
    victories: ((playerStats.wins / playerStats.battles) * 100).toFixed(2),
    damage: ~~(playerStats.damage_dealt / playerStats.battles),
    avg_xp: ~~(playerStats.xp / playerStats.battles),
  };

  return (
    <div className="col-md-12">
      <h3 className="text-center">Dossier of tanker — {players[0].nickname}</h3>
      <div className="wg-id">{`WG.ID ${account_id}`}</div>
      <div className="text-center">
        <div className="row">
          {Object.keys(statsToDisplay).map((key, index) => {
            return (
              <div className="col-sm-3 col-xs-6" key={index}>
                <div className="well well-sm">
                  <h2 style={{margin: 0, textShadow: "1px 1px 1px rgba(0,0,0,0.3)"}}>
                    {statsToDisplay[key]} </h2>
                    <p>{key}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row text-center">
          {Object.keys(imagesMedals).map((key, index) => {
            return (
              <div className="col-md-2 col-sm-4 col-xs-4" key={index}>
                <img src={imagesMedals[key]} className="img-rounded"/>
                <h5>{playerMedals[key] || 0}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DisplayPlayers = ({ players, setPlayerNick, fetchListOfPlayers, dropdown, handleDropdown }) => {
  if (!players) return;
  if (!players.length) {
    return (
      <div className="no-players">
          {'No matching results found'}
      </div>
    );
  }
  if (dropdown) {
    return (
      <div className="dropdown-content" style={{display: dropdown ? "block" : "none"}}>
        {players.slice(0, 10).map((account, index) => {
          return (
            <a key={index} onClick={() => {
              setPlayerNick(account.nickname);
              fetchListOfPlayers(account.nickname);
              handleDropdown();
            }}>
              {account.nickname}
            </a>
          )
        })}
      </div>
    );
  } else {
    return (
      <RenderStats players={players} />
    );
  }
};

const SearchPlayer = (props) => {
  const [playerNick, setPlayerNick] = useState('');
  const [players, setPlayers] = useState([]);
  const [dropdown, setDropdown] = useState(true);
  const handleDropdown = () => setDropdown(!dropdown);

  const handleChangeNick = (event) => {
    setPlayerNick(event.target.value);
    fetchListOfPlayers(event.target.value);
    if (!dropdown) handleDropdown();
  };

  const fetchListOfPlayers = (nickname) => {
    fetch(listOfPlayers(nickname))
      .then((res) => res.json())
      .then((players) => {
        setPlayers(players.data);
      });
  };

  return (
    <div className="container">
      <div className="content">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Search User</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Search User</h3>
            <hr />
          </div>
        </div>

        <div className="wrapper">
          <div className="search-container">
            <div className="user-search">
              <Input type="text" name="search-player" id="input-search-player" placeholder="Search Player" style={{
                border: 0, borderRadius: '12px 0 0 12px', boxShadow: "none", padding: 15}}
                     value={playerNick} onChange={handleChangeNick} />

              <div className="icon-search-user">
                <IoIcons.IoIosSearch />
              </div>
            </div>
          </div>
        </div>
        <DisplayPlayers players={players} setPlayerNick={setPlayerNick} fetchListOfPlayers={fetchListOfPlayers}
                        dropdown={dropdown} handleDropdown={handleDropdown}/>
      </div>
    </div>
  );
};

export default SearchPlayer;
