import * as userThunks from '../../user/thunks/user.thunk';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Field, getFormValues, isValid, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import {email, required, password} from "../../common/form/validators";
import {renderInputFieldWithIcon} from "../../common/form/input-field-with-icon";
import {Form} from "native-base";

class Register extends Component {
  submitHandler = () => {
    const {registerFormValues, isValid, register} = this.props;
    if(isValid) {
      register(registerFormValues);
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <Form onSubmit={this.submitHandler}>
          <Field
            name="firstName"
            component={renderInputFieldWithIcon}
            placeholder='First Name'
            iconName='ios-contact'
            validate={[required]}
          />
          <Field
            name="lastName"
            component={renderInputFieldWithIcon}
            placeholder='Last Name'
            iconName='ios-contact'
            validate={[required]}
          />
          <Field
            name="email"
            type="email"
            autoCapitalize="none"
            component={renderInputFieldWithIcon}
            placeholder="Email"
            iconName="ios-mail"
            validate={[required, email]}
          />
          <Field
            name="password"
            secureTextEntry={true}
            component={renderInputFieldWithIcon}
            placeholder="Password"
            iconName="ios-lock"
            validate={[required, password]}
          />
        </Form>
        <TouchableOpacity style={styles.registerButton} onPress={() => this.submitHandler()}>
          <Text style={{color: '#fff'}}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  registerFormValues: getFormValues('register')(state),
  isValid: isValid('register')(state),
});

const mapDispatchToProps = {
  register: userThunks.create,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'register', touchOnBlur: true})(Register));

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
