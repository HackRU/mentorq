import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Settings = () => {

    return (
        <Container style={{ position: 'relative', zIndex: '2' }}>
            <Checkbox label="Allow notifications?"/>
        </Container>
    );
    
}