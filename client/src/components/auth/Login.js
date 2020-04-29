import React from "react";
import styled from "styled-components";
import { Button } from "../../styles";

const FormGroup = styled.div``;

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <FormGroup>
        <label htmlFor="email">Name</label>
        <input type="email" name="email" value="email" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value="password" />
      </FormGroup>
      <Button type="submit">Login</Button>
    </div>
  );
}

export default Login;
