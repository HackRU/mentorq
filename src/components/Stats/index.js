import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, FormLabel as Label } from "@material-ui/core";
import { request } from "../../util";

const Stats = () => {
  const token = useSelector(({ auth: { accessToken } }) => accessToken);
  const [stats, setStats] = useState({
    averageClaimed: 0,
    averageClosed: 0,
  });
  var response;
  useEffect(() => {
    if (token) {
      (async () => {
        console.log(token)
        //response = await request({
          path: "/tickets/stats/",
        });
        //console.log(response)
        setStats({
          averageClaimed: response.average_claimed_datetime_seconds,
          averageClosed: response.average_closed_datetime_seconds,
        });
      })();
    }
  }, [token]);
  if (stats.averageClaimed === undefined) {
    console.log("Invalid credentials for stats.");
    return null;
  }
  return (
    <Card>
      <Label>Stats</Label>
      <div>
        <Label>Claim Time: {stats.averageClaimed} </Label>
      </div>
      <div>
        <Label>Close Time: {stats.averageClosed}</Label>
      </div>
    </Card>
  );
};

export { Stats };
