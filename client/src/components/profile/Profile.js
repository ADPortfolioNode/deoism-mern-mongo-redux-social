import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/spinner';
import {getProfileById} from '../../actions/profile';


const Profile = ({getProfileById,profile:{profile, loading},auth,match}) => 
{
    useEffect(() =>{
        getProfileById(match.params.id);
    },[getProfileById]);

 
   return (<div>
        {profile && loading ? <profile/> : <Fragment><Spinner /></Fragment>}
    </div>) 
}


Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, profile) => ({
    profile: PropTypes.object.isRequired,
    auth: state.auth
});

export default Profile;