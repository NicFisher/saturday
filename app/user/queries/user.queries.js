export const userQuery = () => (
  `query { 
    viewer {
	    id
	    firstName
	    lastName
	    email
	  }
  }`
);

export const createUserQuery = () => (
  `mutation ($params: CreateUserInput){
    createUser (params: $params){
      id
  	  email
      firstName
      lastName
    }
  }`
);