import React, { useState } from "react";
import { Breadcrumb, BreadcrumbItem, Input } from "reactstrap";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import { listOfPlayers } from "../shared/wargaming";

const SearchPlayer = (props) => {
  const [playerNick, setPlayerNick] = useState('')
  const handleChangeNick = async (event) => {
    setPlayerNick(event.target.value);

    const res = await fetch(listOfPlayers(event.target.value))
      .then((res) => res.json())
    console.log(event.target.value)
    console.log(res);
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

      </div>
    </div>
  );
};

export default SearchPlayer;
