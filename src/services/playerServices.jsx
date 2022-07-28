import React, { Component } from 'react';

class PlayerServices extends Component {

    getPlayerById = (data, id) => {
        
        if (!data) {
            return;
        }

        let _data = JSON.parse(data);
        let player = _data.find((item) => {
            let player_id = item.player_id.replace(/\r\n|\n|\r/gm, "");
            if (player_id === id) {
                return item;
            }
        });

        return player;
    }

    getPlayerList = (data) => {
        if (!data) {
            return;
        }

        let _data = JSON.parse(data);
        let player_list = [];
        for (const entry of _data.entries()) {
            let item = entry[1];
            let result = {};

            if (item && item.player_name_last_first) {
                let player_name = item.player_name_last_first.replace(/['"]+/g, '', '');
                result["player_name"] = player_name;
                let player_id = item.player_id.replace(/\r\n|\n|\r/gm, "");
                result["player_id"] = player_id;
                player_list.push(result);
            }
        }

        return player_list;
    }
}

export { PlayerServices };