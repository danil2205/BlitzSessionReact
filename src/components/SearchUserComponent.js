import React, { useState } from "react";
import { Breadcrumb, BreadcrumbItem, Input } from "reactstrap";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import { listOfPlayers } from "../shared/wargaming";

const DisplayPlayers = ({ players, setPlayerNick, fetchListOfPlayers }) => {
  if (!players) return;
  if (!players.length) {
    return (
      <div className="no-players">
          {'No matching results found'}
      </div>
    );
  } else {
    return (
      <div className="dropdown-content">
        {players.slice(0, 10).map((account, index) => {
          return (
            <a onClick={() => {
              setPlayerNick(account.nickname);
              fetchListOfPlayers(account.nickname);
            }}>
              {account.nickname}
            </a>
          )
        })}
      </div>
    );
  }
};

const SearchPlayer = (props) => {
  const [playerNick, setPlayerNick] = useState('');
  const [players, setPlayers] = useState([]);

  const handleChangeNick = (event) => {
    setPlayerNick(event.target.value);
    fetchListOfPlayers(event.target.value);
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
        <DisplayPlayers players={players} setPlayerNick={setPlayerNick} fetchListOfPlayers={fetchListOfPlayers} />
      </div>
    </div>
  );
};

export default SearchPlayer;
