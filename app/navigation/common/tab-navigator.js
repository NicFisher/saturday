import React from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import CalendarPage from "../../calendar/screens/calendar-page";
import ProfilePage from "../../profile/screens/profile-page";
import {ActivitiesStack} from "./navigation";
import WelcomePage from "../../auth/screens/welcome-page";
import RegisterLoginPage from "../../auth/screens/register-login-page";

export const TabNavigation = createBottomTabNavigator({
  Activities: {
    screen: ActivitiesStack,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <Icon size={30} name="md-list" style={{color: tintColor}} tintColor={tintColor} />
    }
  },
  Calendar: {
    screen: CalendarPage,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <Icon size={30} name="ios-calendar" style={{color: tintColor}} tintColor={tintColor} />
    }
  },
  Profile: {
    screen: ProfilePage,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <Icon size={30} name="ios-contact" style={{color: tintColor}} />
    }
  }
}, {
    initialRouteName: 'Activities',
    navigationOptions: ({navigation}) => {
      return {
        tabBarOptions: {
          activeTintColor: '#252C3F',
          inactiveTintColor: "#CCC",
          inactiveBackgroundColor: '#fff',
          activeBackgroundColor: '#fff',
        }
      }
    }
  }
);

export const WelcomeStack = createStackNavigator({
  Welcome: {
    screen: WelcomePage,
  },
  RegisterLoginPage: {
    screen: RegisterLoginPage
  }
}, {
  headerMode: 'none'
});

export const createRootNavigator = (authenticated = false) => {
  return createSwitchNavigator(
    {
      Welcome: {
        screen: WelcomeStack
      },
      Tabs: {
        screen: TabNavigation
      }
    },
    {
      initialRouteName: authenticated ? "Tabs" : "Welcome"
    }
  )
};
