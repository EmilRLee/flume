import React from 'react';
import {HomeOutlined} from '@material-ui/icons';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <HomeOutlined /><br />
                <Link to="/home">Home</Link><br />
                <Link to="/service">Services Calendar</Link>
            </div>  
        </>
    )
}

export default Sidebar
