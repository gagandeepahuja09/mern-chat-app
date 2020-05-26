
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';

import './Join.css';

const URL = "http://localhost:5000/";

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [incorrectText, setincorrectText] = useState('');

  const handleLogIn = () => {
    axios.post(URL + 'users/login', { name: name, password: room })
      .then((res) => {
        console.log(res);
        setincorrectText(res.data);
        if(res.data === '') {
          var url = window.location.origin;
          url = url +  `/users/?name=${name}`;
          window.location.href = url;
        }
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
        <div>{incorrectText}</div>
        <button className={'button mt-20'} onClick= {handleLogIn}>Log In</button>
        <Link to = '/register'> 
          <button className={'button btn-blue mt-20'} onClick= {handleLogIn}>Register</button>
        </Link>
      </div>
    </div>
  );
}