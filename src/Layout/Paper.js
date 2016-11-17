import React from 'react';
import Paper from 'material-ui/Paper';
import './Paper.css';

export default function PaddedPaper(props) {
    return (
        <Paper {...props} className="padded-paper" />
    )
}