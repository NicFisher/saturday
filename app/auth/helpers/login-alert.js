import {Alert} from 'react-native';

export const loginAlert = () => (
  Alert.alert(
    'Couldnt Log In',
    'Please check your email and password.',
    [
      {text: 'OK'},
    ],
  )
);
