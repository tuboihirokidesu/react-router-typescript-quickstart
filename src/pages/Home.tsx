import React, { FC, useEffect } from 'react'
import logging from '../config/logging'
import { IPage } from '../type/pages'

const Home: FC<IPage> = ({ name }) => {
  useEffect(() => {
    logging.info(`Loading ${name}`)
  }, [name])
  return (
    <div>
      This is the HOME page!
    </div>
  )
}

export default Home
