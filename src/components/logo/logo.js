import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import Brain from './brain.png';

const logo=()=>{
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img style={{paddingTop: '12px'}}alt='' src= {Brain}/> 
                </div>
            </Tilt>
        </div>
    );
}
export default logo;