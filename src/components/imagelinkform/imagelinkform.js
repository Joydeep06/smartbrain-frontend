import React from 'react';
import './imagelinkform.css';

const imagelinkform=({onInputChange, onPictureSubmit})=>{
    return(
    <div className='f3'>
        <p>This Magic brain will detect faces in the pictures. Give it a try</p>
        <div className='center'>
            <div className=' form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onPictureSubmit}>Detect</button>
            </div>
        </div>
    </div>
    );
}
export default imagelinkform;