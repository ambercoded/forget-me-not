import React from "react";
import styled from "styled-components";
import { Button } from "../../styles";

const FormGroup = styled.div``;

function Register() {
  return (
    <div>
      <h1>Register</h1>
      <FormGroup>
        <label htmlFor="name">Name</label>
        <input type="name" name="name" value="name" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="email">Name</label>
        <input type="email" name="email" value="email" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value="password" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password2">Confirm Password</label>
        <input type="password" name="password2" value="password2" />
      </FormGroup>
      <Button type="submit">Register</Button>
    </div>
  );
}

export default Register;
