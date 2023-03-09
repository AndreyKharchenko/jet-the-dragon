import * as Oidc from 'oidc-client';

const config = {
    authority: "https://localhost:7186",
    client_id: "js",
    redirect_uri: "http://localhost:3000", 
    //response_type: "id_token token",
    response_type: "code",
    scope:"openid profile esapi",
    post_logout_redirect_uri : "http://localhost:3000",
  }
    
  export const mgr = new Oidc.UserManager(config)
  
  export const login = () => mgr.signinRedirect()
    
  export const logout = () => mgr.signoutRedirect()