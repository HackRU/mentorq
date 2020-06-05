import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "../Card";
import { request } from "../../util";
// import styled from "styled-components";
import Label from "../Label/styled/Label";
// const Select = styled.select`
//   width: 100%;
//   height: 48px;
//   display: block;
// `;

const Stats = () => {
    const token = useSelector(({ auth: { accessToken } }) => accessToken);
    const [stats, setStats] = useState({
        averageClaimed: 0,
        averageClosed: 0
    });

    useEffect(() => {
        if (token) {
            (async () => {
                // console.log(token)
                const response = await request({
                    path: '/tickets/stats/'
                })
                // console.log(response)

                setStats({
                    averageClaimed: response.average_claimed_datetime_seconds,
                    averageClosed: response.average_closed_datetime_seconds
                });
            })();
        }
    }, [token]);

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
