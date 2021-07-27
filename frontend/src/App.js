import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Theme, { lightTheme, darkTheme } from "./components/Theme";
import Log from "./components/Log";
import { makeStyles } from "@material-ui/core/styles";
import { NumberRequest } from "./api/Number_pb";
import { NumbersClient } from "./api/Number_grpc_web_pb";

const gateway_url = process.env.REACT_APP_GATEWAY_URL;
const client = new NumbersClient(window.location.protocol + "//" + gateway_url);

const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
enableDevTools([client]);

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%vh",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
}));
function App() {
  const [theme, setTheme] = useState(true);
  const [number, setNumber] = useState({});
  const classes = useStyles();

  const getNumberStream = () => {
    const numberRequest = new NumberRequest();
    numberRequest.setUseragent(navigator.userAgent);
    let stream = client.getNumbers(numberRequest, {});

    stream.on("data", (data) => {
      setNumber({
        value: data.getValue(),
        timestamp: data.getTs(),
        userAgent: data.getUseragent(),
        count: data.getCount(),
      });
    });
    stream.on('status', function(status) {
      console.log(status.code);
      console.log(status.details);
      console.log(status.metadata);
    });
    stream.on("end",end =>{
      console.log("End stream")
    })
  };

  useEffect(() => {
    // var r = setTimeout(() => {
    //   setNumber({
    //     count: i,
    //     value: i % 2 == 0,
    //     timestamp: "2021-06-15 00:40:26.412407866 +0000 UTC m=+825.734898835",
    //     userAgent:
    //       "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36",
    //   });
    //   i++;
    // }, 3000);
    getNumberStream();
  }, [number]);
  return (
    <div>
      <Theme theme={theme === true ? lightTheme : darkTheme}>
        <Header changeTheme={() => setTheme(theme === true ? false : true)} />
        <div className={classes.container}>
          {number.timestamp !== undefined && <Log number={number} />}
        </div>
      </Theme>
    </div>
  );
}

export default App;
