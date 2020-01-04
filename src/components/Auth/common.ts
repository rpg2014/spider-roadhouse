import { CognitoUser } from "amazon-cognito-identity-js";

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