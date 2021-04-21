/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment } from "react";

<<<<<<< HEAD
import spinner from "../../img/Spinner.gif";
=======
import spinner from "../../img/spinner.gif";
>>>>>>> parent of 64758ac (clean up and adding likes (not complete))
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
