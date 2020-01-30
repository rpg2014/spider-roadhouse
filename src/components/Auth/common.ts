import { CognitoUser } from "amazon-cognito-identity-js";
import { useEffect } from "react";
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
    // if there is not a saved authToken but there is auth data OR the saved AuthToken is different than the one in authData
    if ((!authToken && authData) || (authToken && authData && authToken !== authData?.getSignInUserSession()?.getAccessToken().getJwtToken())) {
      dispatch(registerAuthData(authData));
      if (!isRefreshIdSet) {
        id = setTimeout(() => {
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
    }
  }, [authData, authToken, dispatch, isRefreshIdSet])
}