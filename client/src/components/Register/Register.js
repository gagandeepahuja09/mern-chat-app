import React, { useState } from 'react';

import axios from 'axios';

const URL = "http://localhost:5000/";

const Register = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const handleRegister = () => {
        console.log("Yes");
        axios.post(URL + 'users/enter', { name: name, password: room })
          .then((res) => {
            console.log(res);
          });
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Password" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                </div>
                <button className={'button mt-20'} onClick= {handleRegister}>Reg</button>
            </div>
        </div>
    );
}

export default Register;