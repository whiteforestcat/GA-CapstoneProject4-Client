import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = (props) => {
  return (
    <div>
      <h1 className="">Existing User? Log in Here</h1>
      <form onSubmit={props.handleLoginForm}>
        <label htmlFor="logInEmail">Email</label>
        <input type="text" id="logInEmail" ref={props.emailRef} />
        <label htmlFor="logInPassword">Password</label>
        <input type="text" id="logInPassword" ref={props.passwordRef} />
        <NavLink to="/">
          <button type="submit">Submit redirect</button>
        </NavLink>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HomePage;
