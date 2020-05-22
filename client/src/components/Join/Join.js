
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';

import './Join.css';

const URL = "http://localhost:5000/";

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [correct, setCorrect] = useState(false);

  const handleLogIn = () => {
    console.log("Yes");
    axios.post(URL + 'users/login', { name: name, password: room })
      .then((res) => {
        console.log(res);
        if(res === 'Success') {
          // this.props.location.search = `/chat?name=${name}&room=${room}`;
        }
        else {
          // this.props.location.search += `/chat?name=${name}&room=${room}`;
          // console.log(this.props.location.search);
        }
      });
      // console.log(this.props.location.search);
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
        <Link to = '/register'> 
          <button className={'button mt-20'} onClick= {handleLogIn}>Reg</button>
        </Link>
        <Link>
          <button className={'button mt-20'} onClick= {handleLogIn}>Log In</button>
        </Link>
      </div>
    </div>
  );
}