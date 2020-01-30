import { CognitoUser } from "amazon-cognito-identity-js";
import { useEffect, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import IApplicationStore from "../../interfaces/IApplicationStore";
import { registerAuthData, removeRefreshTimoutId, setRefreshTimoutId, setAccessToken } from "../../actions/authAction";
import { Auth } from "aws-amplify";

export const extractAuthToken = (authData: CognitoUser, authState: string) => {
    if(authData && authState){
        try {
          if(authData.getSignInUserSession() !== null){
            let userSession = authData.getSignInUserSession();
        
            if(userSession!==null && authState === "signedIn") {
            
              return userSession.getAccessToken();
            }
          }
          
        } catch (error) {
          
        }
      }
}


export const useAuthData = (authData?: CognitoUser) => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: IApplicationStore) => state.authDetails.accessToken ? state.authDetails.accessToken.getJwtToken() : undefined);
  const isRefreshIdSet: boolean = useSelector((state: IApplicationStore) => state.authDetails.refreshTimeoutId ? true : false);

  useEffect(() => {
    let id: NodeJS.Timeout;
    // if there is not a saved authToken but there is auth data
    if (!authToken && authData) {
      dispatch(registerAuthData(authData));
      if (!isRefreshIdSet) {
        setRefreshTimeout(dispatch)
      }
      // if authToken has been refreshed but the authData hasnt.  In this case authToken is up to date so set the refresh but not the authdata
    } else if(authToken && authData && authToken !== authData?.getSignInUserSession()?.getAccessToken().getJwtToken()){
      if(!isRefreshIdSet) {
        setRefreshTimeout(dispatch)
      }
    }
  }, [authData, authToken, dispatch, isRefreshIdSet])
}



const setRefreshTimeout = (dispatch: Dispatch<any>) => {
  let id = setTimeout(() => {
    console.log('Refreshing Session')
    Auth.currentSession().then(data => {
      console.log(data)
      if(data.isValid()){
        dispatch(setAccessToken(data.getAccessToken()))
      }
    })
    dispatch(removeRefreshTimoutId());
  }, 3600000); // 1 hour
  // set Id in store
  dispatch(setRefreshTimoutId(id));
}