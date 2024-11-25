import { useState } from "react";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate()
  const authentoken = useCallback(async () => {
    try {
      const token=localStorage.getItem("token")
      const response = await fetch("http://localhost:4003/authen_token",{ method:'POST',
        headers:{
            'Authorization':token
        }});
      
      const data = await response.json();
      console.log(data)
      if(data.success)(
        navigate("/post")
      )
    } catch (e) {
       console.log(e);
    }
  }, []);
  useEffect(() => {
    authentoken();
  }, [authentoken]);

  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginInput((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  
  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInput),
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token",`Bearer ${data.token}`)
      if(data.success){
        navigate("/post")
      }

      // You could add logic here to handle successful login,
      // e.g., storing a token or redirecting the user

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <h3>Login</h3>
      <hr />
      <div className="row mt-5">
        <div className="col-md-12">
          <h6 className="section-secondary-title">Username</h6>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              value={loginInput.username}
              onChange={handleChange}
            />
          </div>
          <h6 className="section-secondary-title">Password</h6>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={loginInput.password}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

