import React from 'react';
import {Row as FGRow, Col as FGCol, Grid as FGGrid} from 'react-flexbox-grid';
import './FlexBoxGrid.css';

export function Row (props) {
    return (
        <FGRow {...props} className="padded-row" />
    )
}

export function Col (props) {
    return (
        <FGCol {...props} className="" />
    )
}

export function Grid (props) {
    return (
        <FGGrid {...props} className="" />
    )
}