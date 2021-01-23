import React, { useContext, useEffect, useState } from 'react';
import {IPage} from '../types/pages';
import logging from '../config/logging';
import { Button, FormGroup, Input } from 'reactstrap';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import AuthContainer from '../components/index';
import UserContext from '../contexts/user';

const LoginPage: React.FunctionComponent<IPage> = props => {
    const [authing, setAuthing] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [redirect, setRedirect] = useState<string>('');

    const userContext = useContext(UserContext);

    useEffect(() => {
        logging.info(`Loading ${props.name}`);
    }, [props.name]);

    const Login = async () => {
        if (error !== '')
            setError('');

        setAuthing(true);

        try 
        {
            const response = await Axios({
                method: 'POST',
                url: 'http://localhost:1337/users/login',
                data: {
                    email,
                    password
                }
            });

            if (response.status === 200 || response.status === 304)
            {
                userContext.Login(response.data.user, response.data.token);
                setRedirect('/');
            }
            else
            {
                setError('Unable to sign in, please try again!');
                setAuthing(false);
            }
        } 
        catch (error) 
        {
            setError('Unable to sign in, please try again!');
            logging.error(error, 'Login');
            setAuthing(false);
        }
    }

    if (redirect !== '')
    {
        return <Redirect to={redirect} />;
    }

    return (
        <AuthContainer cardHeader="Login" >
            <FormGroup>
                <Input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email ..."
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                />
            </FormGroup>
            <FormGroup>
                <Input 
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password ..."
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />
            </FormGroup>
            <Button
                disabled={authing}
                color="info"
                block
                onClick={Login}
            >
                Login
            </Button>
            <small>
                <p className="m-1 text-center">
                    Don't have an account? <Link to="/register">Register.</Link>
                </p>
            </small>
            {error !== '' && <small className="text-danger">{error}</small>}
        </AuthContainer>
    );
}

export default LoginPage;