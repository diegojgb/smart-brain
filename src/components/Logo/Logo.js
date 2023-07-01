import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain-icon.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='tilt-logo br2 shadow-2' style={{width: '150px', height: '150px', backgroundColor: 'darkgreen' }}>
                <div>
                    <img style={{width: '70%', height: '70%', paddingTop: '20px'}} alt='brain logo' src={brain}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;