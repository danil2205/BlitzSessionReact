import React, { useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import { listOfPlayersURL } from '../../shared/wargaming';
import * as IoIcons from 'react-icons/io';
import { useNavigate } from 'react-router-dom';


const DisplayPlayers = ({ players, dropdown, handleDropdown }) => {
  const navigate = useNavigate();
  if (!players) return;
  if (!players.data?.length) {
    return (
      <div className='no-players'>
        {'No matching results found'}
      </div>
    );
  }
  if (dropdown) {
    return (
      <div className='dropdown-content' style={{display: dropdown ? 'block' : 'none'}}>
        {players.data.slice(0, 10).map((account, index) => {
          return (
            <Button key={index} variant="link" onClick={() => {
              handleDropdown();
              navigate(`/hangar/${account.account_id}`)
            }}>
              {account.nickname}
            </Button>
          )
        })}
      </div>
    );
  }
};

const SearchPlayer = () => {
  const [playerNick, setPlayerNick] = useState('');
  const [players, setPlayers] = useState([]);
  const [dropdown, setDropdown] = useState(true);
  const handleDropdown = () => setDropdown(!dropdown);

  useEffect(() => {
    (async () => {
      const playersAccountID = await fetch(listOfPlayersURL(playerNick)).then((res) => res.json());
      setPlayers(playersAccountID);
    })();
  }, [playerNick])

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='search-container'>
          {dropdown ? (
            <div className='user-search'>
              <Input type='text' name='search-player' id='input-search-player' placeholder='Search Player' style={{
                border: 0, borderRadius: '12px 0 0 12px', boxShadow: 'none', padding: 15}}
                     value={playerNick} onChange={(event) => setPlayerNick(event.target.value)} />
              <div className='icon-search-user'>
                <IoIcons.IoIosSearch />
              </div>
            </div>
          ) : <div></div>}
        </div>
      </div>
      {playerNick === '' ? <div></div> : <DisplayPlayers players={players} dropdown={dropdown} handleDropdown={handleDropdown}
      /> }
    </div>

  );
};

export default SearchPlayer;
