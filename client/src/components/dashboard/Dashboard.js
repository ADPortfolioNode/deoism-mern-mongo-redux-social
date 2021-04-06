import React, { useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import { getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import setAuthToken from '../../utils/setAuthToken';

if (localStorage.token) {
    setAuthToken(localStorage.token);
  }  
   
const Dashboard = ({ getCurrentProfile, auth:{user}, profile:{profile, loading}}) => {
  
    useEffect(() => {
         getCurrentProfile(); 
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 
return(  <Fragment> <h1 className="LARGE text-primary"> Dashboard</h1>
    <p className= "lead">
          <i className="fas fa-user"> </i>Welcome {user && user.name }<br />
          
      </p >

      {profile !== null ? (
<Fragment>
  <DashboardActions />

</Fragment>
      ):(
        <Fragment>
          <p> Please set up Profile here...</p>
          <Link to="/create-profile" className="btn btn-primary my-l" >
            Create Profile
          </Link >
        </Fragment>
      )}
     </Fragment>);
   
    
    
};

Dashboard.propTypes = {
getCurrentProfile: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
profile: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
auth: state.auth,
profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
