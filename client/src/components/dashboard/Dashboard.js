import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from './Experience';
import Education from './Education';
import setAuthToken from "../../utils/setAuthToken";

import { getCurrentProfile } from "../../actions/profile"; 
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading, avatar },
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <h1 className="large text-primary"> {"Dashboard"}</h1>
      <p className="lead">
        <i className="fas fa-user"> </i>Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions /> 
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <p> Please set up Profile here...</p>
          <Link to="/create-profile" className="btn btn-primary my-l">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
