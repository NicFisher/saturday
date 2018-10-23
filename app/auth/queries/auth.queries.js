export const loginQuery = () => (
  `mutation ($params: CreateAuthInput){
    createAuthToken (params: $params){
      authenticationToken
    }
  }`
);
