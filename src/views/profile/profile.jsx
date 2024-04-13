import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Link,
  makeStyles,
  Button,
} from '@material-ui/core';
import { Box } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// Internal Imports
import TopBar from '../../components/topnavbar';
import ScatterChart from '../../components/scatterchart';
import Polar from '../../components/polarchart';
import HorizontalBarChart from '../../components/barcart';
import { PlayerServices } from '../../services/playerServices';
import { PitchingServices } from '../../services/pitchingServices';

// for material style guild
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F4F6F8',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    padding: '24px',
  },
  card: {
    height: '100%',
    borderRadius: 8,
    boxShadow: '3px 0 15px 0 rgba(0,0,0,0.03)',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'hidden',
  },
  avatar: {
    cursor: 'pointer',
    width: 77,
    height: 77,
    margin: '0 auto 20px',
    backgroundColor: '#47A1B6',
    fontSize: 28,
    fontWeight: 600,
  },
  id: {
    color: '#263238',
    fontWeight: 400,
    fontSize: 16,
    opacity: 0.7,
    marginBottom: '27px',
  },
}));

const PlayerProfile = ({match}) => {
  const { id } = match.params;
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  // Player hooks
  const [playerDetailInfo, setplayerDetailInfo] = useState({});
  const [pitch, setPitch] = useState("four_seam");
  const [pitch_speed, setPitchSpeed] = useState({});
  const [pitch_spin, setPitchSpin] = useState({});
  const [pitch_pct, setPitchPct] = useState({});
  const [pitches_pct, setPitchesPct] = useState({});
  const [pitch_count_avg, setPitchCntAvg] = useState(0);
  const [player_pitch_cnt, setPlayerPitchCount] = useState(0);
  const [player_plate_app, setPlayerPlateApp] = useState(0);
  const [league_plate_app, setLeaguePlateApp] = useState(0);

  const playerServices = new PlayerServices();
  const pitchingServices = new PitchingServices();
  const player_data = localStorage.getItem("json_data");

  useEffect(() => {
    loadPlayerProfile();
  }, []);

  const loadPlayerProfile = () => {
    let player = playerServices.getPlayerById(player_data, id);
    if (player) {
      let player_name = player.player_name_last_first;
      setplayerDetailInfo({
        player_name_last_first: player_name,
        player_id: player.player_id,
        team_abbrev: player.team_abbrev,
        pitch_hand: player.pitch_hand,
        pitches: [
          player.four_seam_speed ? "4-seam fastball, " : "",
          player.change_up_speed ? "Change-up, " : "",
          player.curve_speed ? "Curve, " : "",
          player.cutter_speed ? "Cutter, " : "",
          player.sinker_speed ? "Sinker, " : "",
          player.slider_speed ? "Slider, " : "",
          player.splitter_speed ? "Splitter, " : "",
        ],
        player: player
      });

      // load charts upon page load
      let player_pitch_pct = pitchingServices.getPitchPCT(player);
      setPitchesPct(player_pitch_pct);

      setSpeedChart(pitch, player);
      setSpinChart(pitch, player);
      setPctChart(pitch, player);

      let league_pitch_count = pitchingServices.getLeaguePitchCount(player_data);
      setPlayerPitchCount(player.num_pitches);
      setPitchCntAvg(league_pitch_count);

      let league_plate_count = pitchingServices.getLeaguePlateAppearance(player_data);
      setPlayerPlateApp(player.plate_appearances);
      setLeaguePlateApp(league_plate_count);
    }
  };

  const setSpeedChart = (pitch, player) => {
    let metric = "speed";

    const leagueAvg = pitchingServices.getLeaguePitchAverage(player_data, pitch, metric);
    const pitchersNumPitches = player.num_pitches * player[`${pitch}_pct`];

    setPitchSpeed({
      label: pitch,
      league_data: {
        x: leagueAvg[1],
        y: leagueAvg[0]
      },
      player_data: {
        x: pitchersNumPitches,
        y: player[`${pitch}_${metric}`]
      }
    });
  };

  const setSpinChart = (pitch, player) => {
    let metric = "spin";

    const leagueAvg = pitchingServices.getLeaguePitchAverage(player_data, pitch, metric);
    const pitchersNumPitches = player.num_pitches * player[`${pitch}_pct`];

    setPitchSpin({
      label: pitch,
      league_data: {
        x: leagueAvg[1],
        y: leagueAvg[0]
      },
      player_data: {
        x: pitchersNumPitches,
        y: player[`${pitch}_${metric}`]
      }
    });
  };

  const setPctChart = (pitch, player) => {
    let metric = "pct";

    const leagueAvg = pitchingServices.getLeaguePitchAverage(player_data, pitch, metric);
    const pitchersNumPitches = player.num_pitches * player[`${pitch}_pct`];

    setPitchPct({
      label: pitch,
      league_data: {
        x: leagueAvg[1],
        y: leagueAvg[0]
      },
      player_data: {
        x: pitchersNumPitches,
        y: player[`${pitch}_${metric}`]
      }
    });
  };

  const onHandleChange = (event) => {
    setPitch(event.target.value);
    setSpeedChart(event.target.value, playerDetailInfo.player);
    setSpinChart(event.target.value, playerDetailInfo.player);
    setPctChart(event.target.value, playerDetailInfo.player);
  }

  // cancel dailoge
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <div>
              <Typography variant="h4" className="mb-16 SecondaryColor">
                Player Profile
              </Typography>
              <div className="font-14 mb-16">
                <Link href="/">
                  {' '}
                  <ArrowBackIosIcon style={{ fontSize: 10 }} />
                  {' '}
                  Back to Dashboard
                </Link>
              </div>
              <Container maxWidth={false} className="p-0">
                <Grid container spacing={3}>
                  <Grid item lg={4} md={4} xl={4} xs={12}>
                    <Card className={classes.card}>
                      <CardContent className="profile_card">
                        <div>
                          <Avatar className={classes.avatar}>
                            {playerDetailInfo.player_name_last_first
                              ? playerDetailInfo.player_name_last_first.substring(0, 1)
                              : 'N/A'}
                          </Avatar>
                          <Typography variant="h5" className="SecondaryColor">
                            {playerDetailInfo.player_name_last_first
                              ? playerDetailInfo.player_name_last_first
                              : 'N/A'}
                          </Typography>
                          <Typography className={classes.id}>
                            {playerDetailInfo.player_id
                              ? playerDetailInfo.player_id
                              : '#XXXXXX'}
                          </Typography>
                          <Typography variant="h7" className="SecondaryColor">
                            TEAM: {playerDetailInfo.team_abbrev
                              ? playerDetailInfo.team_abbrev
                              : 'N/A'}
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={8} md={8} xl={8} xs={12}>
                    <Card className={classes.card}>
                      <CardContent>
                        <ul className="profile_detail_list">
                          <li>
                            <div className="font-14"> Player ID</div>
                            <Typography variant="body2">
                              {'  '}
                              {playerDetailInfo.player_id
                                ? playerDetailInfo.player_id
                                : '-'}
                            </Typography>
                          </li>
                          <br/>
                          <li>
                            <div className="font-14"> Player Name</div>
                            <Typography variant="body2">
                              {' '}
                              {playerDetailInfo.player_name_last_first
                                ? playerDetailInfo.player_name_last_first
                                : '-'}
                              {' '}
                            </Typography>
                          </li>
                          <br/>
                          <li>
                            <div className="font-14"> Pitch Hand</div>
                            <Typography variant="body2">
                              {' '}
                              {playerDetailInfo.pitch_hand
                                ? playerDetailInfo.pitch_hand
                                : '-'}
                              {' '}
                            </Typography>
                          </li>
                          <br/>
                          <li>
                            <div className="font-14"> Pitches</div>
                            <Typography variant="body2">
                              {playerDetailInfo.pitches
                                ? playerDetailInfo.pitches
                                : '-'}
                            </Typography>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={12} md={12} xl={12} xs={12}>
                    <div >
                      <TableContainer>
                      <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Pitch Type</InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={pitch}
                          label="Pitch Type"
                          onChange={onHandleChange}
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
                      </TableContainer>
                    </div>
                  </Grid>
                  <Grid lg={4} md={4} xl={4} xs={12}>
                    <div className="report_table">
                      <TableContainer component={Paper}>
                        <div className="d-flex space-between table_header">
                          <div>
                            <ScatterChart 
                              title="Speed (mph)" 
                              data={pitch_speed.data}
                              league_data={pitch_speed.league_data}
                              player_data={pitch_speed.player_data} 
                              label={pitch_speed.label}>
                            </ScatterChart>
                          </div>
                          <div />
                        </div>
                      </TableContainer>
                    </div>
                  </Grid>
                  <Grid lg={4} md={4} xl={4} xs={12}>
                    <div className="report_table">
                      <TableContainer component={Paper}>
                        <div className="d-flex space-between table_header">
                          <div>
                            <ScatterChart 
                              title="Spin rate (rpm)" 
                              data={pitch_spin.data}
                              league_data={pitch_spin.league_data}
                              player_data={pitch_spin.player_data} 
                              label={pitch_spin.label}>
                            </ScatterChart>
                          </div>
                          <div />
                        </div>
                      </TableContainer>
                    </div>
                  </Grid>
                  <Grid lg={4} md={4} xl={4} xs={12}>
                    <div className="report_table">
                      <TableContainer component={Paper}>
                        <div className="d-flex space-between table_header">
                          <div>
                            <ScatterChart 
                              title="% thrown" 
                              data={pitch_pct.data}
                              league_data={pitch_pct.league_data}
                              player_data={pitch_pct.player_data} 
                              label={pitch_pct.label}>
                            </ScatterChart>
                          </div>
                          <div />
                        </div>
                      </TableContainer>
                    </div>
                  </Grid>
                  <Grid item lg={12} md={12} xl={12} xs={12}>
                  </Grid>
                  <Grid item lg={6} md={6} xl={6} xs={12}>
                    <div className="report_table">
                      <TableContainer component={Paper}>
                        <div className="d-flex space-between table_header">
                          <div>
                            <Polar 
                              title="Pitch PCT" 
                              data={pitches_pct}
                              league_data={pitch_speed.league_data}
                              player_data={pitch_speed.player_data} 
                              label={pitch_speed.label}>
                            </Polar>
                          </div>
                          <div />
                        </div>
                      </TableContainer>
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6} xl={6} xs={12}>
                    <div className="report_table">
                      <TableContainer component={Paper}>
                        <HorizontalBarChart 
                          component={Paper}
                          axis_label="Num pitches"
                          league_data={pitch_count_avg}
                          player_data={player_pitch_cnt}>
                        </HorizontalBarChart>
                        <HorizontalBarChart 
                          component={Paper}
                          axis_label="Plate apps"
                          league_data={league_plate_app}
                          player_data={player_plate_app}>
                        </HorizontalBarChart>
                      </TableContainer>
                    </div>
                  </Grid>
                  
                </Grid>
              </Container>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className="preview_dialog"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant="body2">Preview</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="scroll-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PlayerProfile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  counter: PropTypes.string,
};

export { PlayerProfile };
