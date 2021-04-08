/* eslint-disable import/no-anonymous-default-export */
import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR,EDIT_PROFILE,UPDATE_PROFILE} from '../actions/types';

const initialState = {
    profile:null,
    profiles:[],
    repos: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const {type, payload } = action;

    switch (type) {
        case GET_PROFILE: 
          
            return {
                ...state,
                profile: payload,
                loading: false
            };
            case EDIT_PROFILE:
          
                return {
                    ...state,
                    profile: payload,
                    loading: false,
                    edit:true
                };
            case UPDATE_PROFILE:
          
            return {
                ...state,
                profile: payload,
                loading: false,
                edit:false
            };

    case PROFILE_ERROR: console.error();
        return{
            ...state,
            error:payload,
            loading:false,
            profile: null,
            repos :[]
        };
     case   CLEAR_PROFILE:
        console.error();
        return{
            ...state,
            error:payload,
            loading:false,
            profile: null,
            repos :[]
        };

    default:
        return state;
    }
}