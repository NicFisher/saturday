import * as auth from '../../auth/actions/auth.actions';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Field, getFormValues, reduxForm, submit, isValid} from "redux-form";
import {connect} from "react-redux";
import {renderInputFieldWithIcon} from "../../common/form/input-field-with-icon";

class Login extends Component {
  _submitHandler = () => {
    const {loginFormValues, login} = this.props;
    if(isValid) {
      login(loginFormValues);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Field
          name="email"
          type="email"
          autoCapitalize="none"
          keyboardType="email-address"
          component={renderInputFieldWithIcon}
          placeholder="Email"
          iconName="ios-mail"
        />
        <Field
          name="password"
          secureTextEntry={true}
          component={renderInputFieldWithIcon}
          placeholder="Password"
          iconName="ios-lock"
        />
        <TouchableOpacity style={styles.registerButton} onPress={() => this._submitHandler()}>
          <Text style={{color: '#fff'}}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const mapStateToProps = state => ({
  loginFormValues: getFormValues('login')(state),
  isValid: isValid('login')(state),
});

const mapDispatchToProps = {
  login: auth.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'login'})(Login));

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  registerButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#252C3F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});
