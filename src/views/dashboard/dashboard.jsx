import {React, useState} from 'react';
import { Box } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';

// Internal imports
import TopBar from '../../components/topnavbar';
import StickyHeadTable from '../../components/table';
import SearchBar from '../../components/searchbar';
import tables from '../../tables.json';
import { TableTitle } from '../title';
import { modelColumns } from '../../models/columns';
import { PitchingServices } from '../../services/pitchingServices';

const Dashboard = (props) => {

    const pitchingServices = new PitchingServices();
    const [pitch, setPitch] = useState('four_seam');

    const handleChange = (event) => {
        setPitch(event.target.value);
    };

    const tableContent = tables.map((table) =>
        table.table
    );

    const headerContent = tables.map((table) =>
        table.headers
    );

    // Table - Hardest Pitches thrown
    let table1headers = headerContent[0].map((header) =>
        header
    );
    let col1 = modelColumns(table1headers);
    let rows1 = pitchingServices.fastest4SeamPitchers(props.valueFromParent);

    // Table - Avg 4-seam fastball for both teams
    let table2headers = headerContent[1].map((header) =>
        header
    );
    let col2 = modelColumns(table2headers);
    let rows2 = pitchingServices.highestSpinRate(props.valueFromParent, pitch);

    // Table - Highest number of pitches
    let table3headers = headerContent[2].map((header) =>
        header
    );
    let col3 = modelColumns(table3headers);
    let rows3 = pitchingServices.mostPitchesThrown(props.valueFromParent);

    return(
        <div>
        <TopBar />
        <br/>
        <br/>
        <br/>
        <h4>Search</h4>
        <SearchBar></SearchBar>
        <br/>
        {/* Fastest pitchers */}
        <div>
            <TableTitle title={tableContent[0]}></TableTitle>
            <StickyHeadTable 
            rows={rows1}
            columns={col1}
            />
            <br/>
        </div>

        {/* Highest spin rates */}
        <div>
            <br/>
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pitch Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pitch}
                label="Pitch Type"
                onChange={handleChange}
                >
                <MenuItem value={"four_seam"}>4-seam</MenuItem>
                <MenuItem value={"change_up"}>Change-up</MenuItem>
                <MenuItem value={"curve"}>Curve</MenuItem>
                <MenuItem value={"cutter"}>Cutter</MenuItem>
                <MenuItem value={"sinker"}>Sinker</MenuItem>
                <MenuItem value={"slider"}>Slider</MenuItem>
                <MenuItem value={"splitter"}>Splitter</MenuItem>
                </Select>
            </FormControl>
            </Box>
            <TableTitle title={tableContent[1]}></TableTitle>
            <StickyHeadTable 
            rows={rows2}
            columns={col2}
            />
            <br/>
        </div>

        {/* Most number of pitches */}
        <div>
            <TableTitle title={tableContent[2]}></TableTitle>
            <StickyHeadTable 
            rows={rows3}
            columns={col3}
            />
            <br/>
        </div>
        
        </div>
    )
}

export { Dashboard };