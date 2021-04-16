import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import setAuthToken from "../../utils/setAuthToken";

import { getCurrentProfile, deleteAccount } from "../../actions/profile";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading, avatar }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'> {"Dashboard"}</h1>
      <p className='lead'>
        <i className='fas fa-user'> </i>Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <Link to='/edit-profile' className='btn btn-success'>
              Edit {user && user.name} Profile
            </Link>
            <button
              className='btn btn-danger'
              onClick={() => deleteAccount()}
              label='delete'>
              Delete {user && user.name} Profile
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p> Please set up Profile here...</p>
          <Link to='/create-profile' className='btn btn-primary my-l'>
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
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
