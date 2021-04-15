import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import { getProfileById } from "../../actions/profile"; 

const Profile = ({ 
  getProfileById,
  profile: {profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
        getProfileById(match.params.id);
  }, [getProfileById,  match.params.id]); 

  console.log("profile loaded: ",profile); 
  getProfileById(match.params.id);
  return (
    <Fragment>
      {profile === null || loading ? <Spinner />:<Fragment>
          <Link to="/profiles" className="btn btn-light">
           View All Profiles
          </Link>
          
 
              <Link to='/edit-profile' className='btn btn-dark'>
                click to edit 
              </Link> 

              
          </Fragment>
      }

 
  
    </Fragment>
  );
};

Profile.propTypes = { 
 
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
