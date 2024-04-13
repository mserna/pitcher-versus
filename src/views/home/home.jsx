import {React, useState, useEffect} from 'react';
import {
  Container
} from '@material-ui/core';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// Internal imports
import TopBar from '../../components/topnavbar';
import { Dashboard } from '../dashboard/dashboard';
import Data2020 from '../../data/data_2020.json';

const Home = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [year, setYear] = useState("2020");
  
  // load data
  useEffect(() => {
    if(Data2020) {
      localStorage.setItem("json_data", JSON.stringify(Data2020));
    }
    else
    {
      console.error("Unable to load JSON");
    }
  }, []);

  // Persist data
  useEffect(() => {
    let data = localStorage.getItem("json_data");
    if(data) {
      setSelectedFile(data);
    }
  }, []);
  
  const handleChange = (event, newYear) => {
    // TODO: reload new data with given year
    if (newYear)
    {
      setYear(newYear);
    }
  };
  
  return(
    <div>
    <TopBar />
    <br/>
    <br/>
    <br/>
    <Container>
      <h1>Welcome! to Pitcher VS.</h1>
      <h2>Pit 2 flamethrowers up against eachother to compare their stats!</h2>
      <ToggleButtonGroup
        color="primary"
        value={year}
        exclusive
        onChange={handleChange}
        aria-label="Year"
      >
        <ToggleButton value="2020">2020</ToggleButton>
        <ToggleButton disabled="true" value="2021">2021</ToggleButton>
        <ToggleButton disabled="true" value="2022">2022</ToggleButton>
        <ToggleButton disabled="true" value="2023">2023</ToggleButton>
        <ToggleButton disabled="true" value="2024">2024</ToggleButton>
      </ToggleButtonGroup>
      <Dashboard valueFromParent={selectedFile}></Dashboard>
    </Container>
    </div>
  )
}

export { Home };