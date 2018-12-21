import React, {Component} from 'react';
import {Animated, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard} from 'react-native';
import Register from "../components/register";
import Login from "../components/login";

class RegisterLoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedScreen: 'Register',
      pagePaddingBottom: new Animated.Value(100)
    }
  }

  Components = {
    Register,
    Login
  };

  componentDidMount() {
    // keyboard event listeners
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    const selectedScreen = this.props.navigation.getParam('selectedScreen');
    if(selectedScreen !== this.state.selectedScreen) {
      this.setState({selectedScreen: selectedScreen})
    }
  }

  _activeScreen = (screen) => {
    return screen === this.state.selectedScreen;
  };

  componentWillUnmount() {
    // removes keyboard event listeners
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = () => {
    Animated.timing( this.state.pagePaddingBottom, { toValue: 5, duration: 200}).start();
  };

  keyboardWillHide = () => {
    Animated.timing( this.state.pagePaddingBottom, { toValue: 100, duration: 200}).start();
  };

  render() {
    const {pagePaddingBottom} = this.state;
    const Component = this.Components[this.state.selectedScreen];
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => this.setState({selectedScreen: 'Register'})}>
              <Text style={[styles.headerText, {color: (this._activeScreen('Register') ? '#252C3F' : '#ddd')}]}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({selectedScreen: 'Login'})}>
              <Text style={[styles.headerText, {color: (this._activeScreen('Login') ? '#252C3F' : '#ddd')}]}>Login</Text>
            </TouchableOpacity>
          </View>
          <Animated.View style={[styles.buttonContainer, {paddingBottom: pagePaddingBottom}]}>
            <Component />
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default RegisterLoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'left',
    fontSize: 28,
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginButton: {
    width: '80%',
    height: 40,
    borderColor: '#4b4b4b',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
  },
  registerButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#4b4b4b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});
