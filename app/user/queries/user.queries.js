export const userQuery = () => (
  `query { 
    viewer {
	    id
	    firstName
	    lastName
	    email
	    photo
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
      photo
    }
  }`
);

export const updateUserPhoto = () => (
  `mutation($url: String!) {
    updateUserPhoto(url: $url) {
      id
      email
      firstName
      lastName
      photo
    }
  }`
);

export const createSignedUrl = () => (
  `mutation ($params: CreateSignedUrlInput!) {
    createSignedUrl(params: $params) {}
  }`
);
