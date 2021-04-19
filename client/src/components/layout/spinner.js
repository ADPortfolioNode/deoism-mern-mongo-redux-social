/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment } from "react";

import spinner from "../../img/3DYinyang.gif";
export default () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt='loading...'
      />
    </Fragment>
  );
};
