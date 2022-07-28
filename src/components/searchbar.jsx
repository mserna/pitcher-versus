import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { PlayerServices } from '../services/playerServices';
import { Link } from 'react-router-dom';


const SearchBar = () => {
  const [playerList, setPlayerList] = useState(null);
  const [player, setPlayer] = useState(null);
  let players_data = localStorage.getItem("json_data");

  useEffect(() => {
    let playerServices = new PlayerServices();
    let _list = playerServices.getPlayerList(players_data);
    setPlayerList(_list);
  }, [players_data]);

  return (
    <>
      <div style={{ width: 300 }}>
        <Autocomplete
          id="search-bar"
          disableClearable
          options={playerList}
          getOptionLabel={(player) => player.player_name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
          onChange={(event, value) => {
            setPlayer(value);
          }} 
        />
      </div>
      <Link to={player ? `profile/${player.player_id}` : "/"}  from="/">SUBMIT</Link>
    </>
  );
}

export default SearchBar;