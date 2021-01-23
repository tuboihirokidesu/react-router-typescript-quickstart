import React, { useEffect } from "react";
import { IPage } from "../types/pages";
import logging from "../config/logging";
import { Card, CardBody, CardHeader } from "reactstrap";

const HomePage: React.FunctionComponent<IPage> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  return (
    <Card>
      <CardHeader>Auth Example</CardHeader>
      <CardBody>
        This page needs auth! If you can see me, you are authenitcated!
      </CardBody>
    </Card>
  );
};

export default HomePage;
