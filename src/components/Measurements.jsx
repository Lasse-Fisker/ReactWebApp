import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import { format } from "date-fns";


const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});

export const Measurements = ({ measurements, onlyLatest }) => {
  const classes = useStyles();
  const buildTimeHeader = () => {
    if (measurements.length) {
      return <h2> {measurements[0].timestamp}</h2>;
    }
  };

  const buildMeasurementRow = (measurement) => (
    <TableRow>
      <TableCell align="left">{measurement.timestamp}</TableCell>
      <TableCell align="left">{measurement.lysthusTemp}&#8451;</TableCell>
      <TableCell align="left">{measurement.lysthusFugt}%</TableCell>
      <TableCell align="left">{measurement.udeTemp}&#8451;</TableCell>
      <TableCell align="left">{measurement.udeFugt}%</TableCell>
    </TableRow>
  );

  return (
    <div>
      {buildTimeHeader()}
      {!measurements.length && <CircularProgress />}
      {measurements.length && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Tid</TableCell>
                <TableCell align="left">Temp. lysthus</TableCell>
                <TableCell align="left">Fugt lysthus</TableCell>
                <TableCell align="left">Temp. bag lysthus</TableCell>
                <TableCell align="left">Fugt bag lysthus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {onlyLatest
                ? buildMeasurementRow(measurements[0])
                : measurements.map(buildMeasurementRow)}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
