import React, { FC, useEffect, useState } from 'react';
import logging from '../config/logging';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { IPage } from '../type/pages';

const AboutPage: FC<IPage & RouteComponentProps<{ number: string }>> = props => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    logging.info(`Loading ${props.name}`);

    // let number = props.match.params.number;
    let number = props.match.params.number;

    if (number) {
      setMessage(`The Number is ${number}`);
    }
    else {
      setMessage(`No number provided!`);
    }
  }, [props])

  return (
    <div>
      <p>{message}</p>
      <Link to="/">Go to the home page!</Link>
    </div>
  );
}

export default withRouter(AboutPage);