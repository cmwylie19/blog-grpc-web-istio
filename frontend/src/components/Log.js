import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ClearIcon from "@material-ui/icons/Clear";
import CardContent from "@material-ui/core/CardContent";
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 300,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    color: theme.palette.primary.contrastText,
  },
  pos: {
    color: theme.palette.primary.main.constrastText,
    marginBottom: 12,
  },
}));
const Log = ({ number }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          align="center"
        >
          {number.timestamp.split(" ")[0]}
        </Typography>
        <Typography variant="h5" component="h2">
          {number.value.toString()}
          {bull}
          {number.value.toString() === "true" ? (
            <CheckIcon style={{ color: "green" }} />
          ) : (
            <ClearIcon style={{ color: "red" }} />
          )}
          <br />
          <b>Count</b>
          {bull}{number.count.toString()}
        </Typography>
        <Typography className={classes.pos}>
          {number.timestamp.split(" ")[1]} <b>UTC</b>
        </Typography>
        <Typography variant="body2" component="p">
          {number.userAgent}
        </Typography>
      </CardContent>
      {/* <CardActions>
{number.value.toString()}
</CardActions> */}
    </Card>
  );
};

export default Log;
