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
  id: measurement._id,
  timestamp: parse(measurement.Timestamp, "dd-MM-yyyy HH:mm:ss", new Date()),
  lysthusTemp: stripAndConvertStringToNumber(measurement.LysthusTemp),
  lysthusFugt: stripAndConvertStringToNumber(measurement.LysthusFugt),
  udeTemp: stripAndConvertStringToNumber(measurement.UdeTemp),
  udeFugt: stripAndConvertStringToNumber(measurement.UdeFugt),
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
  const [onlyLatest, setOnlyLatest] = useState(false);
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
          Lysthus 1.0.0
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOnlyLatest(!onlyLatest)}
        >
          {onlyLatest ? "Vis alle målinger" : "Vis seneste målinger"}
        </Button>
        <div className={classes.table}>
          {<Measurements measurements={measurements} onlyLatest={onlyLatest} />}
        </div>
      </div>
    </ThemeProvider>
  );
}
export default App;
