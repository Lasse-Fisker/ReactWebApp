import React, { useEffect, useState } from "react";
import { Measurements } from "./components/Measurements";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { parse } from "date-fns";
import theme from "./theme";
import "./App.css";
import { Button, Typography } from "@material-ui/core";

const stripAndConvertStringToNumber = (stringToConvert) =>
  Number.parseFloat(stringToConvert.trim(), 10);

const mapMeasurement = (measurement) => ({   
  timestamp: measurement.Timestamp, 
  lysthusTemp: measurement.LysthusTemp,
  lysthusFugt: measurement.LysthusFUgt,
  udeTemp: measurement.UdeTemp,
  udeFugt: measurement.UdeFugt,
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 70,
  },
  table: {
    marginTop: 30,
    width: "80%",
    maxWidth: 900,
  },
});

function App() {
  const [measurements, setMeasurements] = useState([]);
  const [onlyLatest, setOnlyLatest] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    fetch("/.netlify/functions/get")
      .then((res) => res.json())
      .then((res) => {
        const mappedMeasurements = res.data.map(mapMeasurement);
        setMeasurements(mappedMeasurements);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Typography variant="h2" component="h1">
          Lysthus 2.0.1
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOnlyLatest(!onlyLatest)}
        >
          {onlyLatest ? "Vis alle målinger" : "Vis seneste måling"}
        </Button>
        <div className={classes.table}>
          
          {<Measurements measurements={measurements} onlyLatest={onlyLatest} />}
        </div>
      </div>
    </ThemeProvider>
  );
}
export default App;