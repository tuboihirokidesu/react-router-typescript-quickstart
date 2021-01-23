import React, { useEffect, useState } from "react";
import { IPage } from "../types/pages";
import logging from "../config/logging";
import { Button, FormGroup, Input } from "reactstrap";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import AuthContainer from "../components/index";

const RegisterPage: React.FunctionComponent<IPage> = (props) => {
  const [authing, setAuthing] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [redirect, setRedirect] = useState<string>("");

  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  const Register = async () => {
    // Do some error checking!
    if (password !== confirm) {
      setError("Passwords dont match!");
      return;
    }

    if (error !== "") setError("");

    setAuthing(true);

    try {
      const response = await Axios({
        method: "POST",
        url: "http://localhost:1337/users/register",
        data: {
          name,
          email,
          password,
        },
      });

      if (response.status === 201) {
        // Could also use history.push('/login')
        setRedirect("/login");
      } else {
        setError("Unable to register, please try again!");
        setAuthing(false);
      }
    } catch (error) {
      setError("Unable to register, please try again!");
      logging.error(error, "Register");
      setAuthing(false);
    }
  };

  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }

  return (
    <AuthContainer cardHeader='Register'>
      <FormGroup>
        <Input
          type='text'
          name='name'
          id='name'
          placeholder='Enter name ...'
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type='email'
          name='email'
          id='email'
          placeholder='Enter email ...'
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type='password'
          name='password'
          id='password'
          placeholder='Enter password ...'
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type='password'
          name='confirm'
          id='confirm'
          placeholder='Confirm password ...'
          onChange={(event) => setConfirm(event.target.value)}
          value={confirm}
        />
      </FormGroup>
      <Button disabled={authing} color='info' block onClick={Register}>
        Register!
      </Button>
      <small>
        <p className='m-1 text-center'>
          Already have an account? <Link to='/login'>Login.</Link>
        </p>
      </small>
      {error !== "" && <small className='text-danger'>{error}</small>}
    </AuthContainer>
  );
};

export default RegisterPage;

type None = { type: "None" };
type Some<T> = { type: "Some"; value: T };
type Option<T> = None | Some<T>;

type ValueOfOption<V extends Option<unknown>> = V extends Some<infer R>
  ? R
  : undefined;

type T1 = Option<number> extends Some<infer R> ? R : undefined;
