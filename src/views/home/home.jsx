import {React, useState, Component, useEffect} from 'react';
import Axios from 'axios';
import {
  Container,
  Button,
  Label
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import csv from 'csvtojson';

// Internal imports
import TopBar from '../../components/topnavbar';
import { Dashboard } from '../dashboard/dashboard';

const Home = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setDataStatus] = useState(false);

  const processCSVData = (csv) => {
    var lines = csv.split('\r');
    var result = [];
    var headers = lines[0].split(",");
    for(var i = 1; i < lines.length; i++){
      var obj = {};
      // Reg expression to bypass comma in player_name
      var currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      for(var j = 0; j < headers.length; j++){
        // Check for null values
        if (currentline[j] == "NULL") {
          obj[headers[j]] = null;
        } else {
          obj[headers[j]] = currentline[j];
        }
      }
      result.push(obj);
    }
    return JSON.stringify(result);
  };

  const fileSelectedHandler = event => {
    let file = event.target.files[0];
    const fileReader = new FileReader();
    if (file) {
      fileReader.readAsText(file, "ISO-8859-1");
      fileReader.onload = (event) => {
        const data = processCSVData(event.target.result);
        localStorage.setItem("json_data", data);
        setSelectedFile(data);
      }
    }
  };

  // Persist data
  useEffect(() => {
    let data = localStorage.getItem("json_data");
    if (data) {
      setSelectedFile(data);
      setDataStatus(false);  // Set to true if have user upload once
    } else {
      setDataStatus(false);
    }
  }, []);
  
  return(
    <div>
    <TopBar />
    <br/>
    <br/>
    <br/>
    <Container>
      <h1>Hello, Welcome</h1>
      <h1>Please upload the devtest.csv file</h1>
      <Button
        variant="contained"
        component="label"
      >
        Upload File
        <input type="file" disabled={data} onChange={(event) => 
          fileSelectedHandler(event)
          }></input>
      </Button>
      <Dashboard valueFromParent={selectedFile}></Dashboard>
    </Container>
    <br />
    <br />
    <Container>
    </Container>
    </div>
  )
}

export { Home };