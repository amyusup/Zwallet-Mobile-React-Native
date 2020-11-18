import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  SignIn,
  SignUp,
  CreatePin,
  PinSuccess,
  ForgotPassword,
  CreatePassword,
  Main,
  Logout,
  History,
  Profile,
  Transfer,
  PersonalInfo,
  ManagePhone,
  AddPhone,
  InputAmount,
  InputPin,
  TransferStatus,
  Details
} from '../screens';
import {useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import color from '../styles/constant'
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => {
  const [initialRoute, setInitialRoute] = React.useState('Main');
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(initialRoute); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}
      />
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}
      />
      <Stack.Screen name="CreatePin" component={CreatePin} options={{headerShown: false}}
      />
      <Stack.Screen name="PinSuccess" component={PinSuccess} options={{headerShown: false}}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}
      />
      <Stack.Screen name="CreatePassword" component={CreatePassword} options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
      <Stack.Screen name="Logout" component={Logout} options={{headerShown: false}} />
      <Stack.Screen name="History" component={History}  options={{ headerStyle: {backgroundColor: color.secondary, elevation:0}}} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerStyle: {backgroundColor: color.secondary, elevation:0}}} />
      <Stack.Screen name="Transfer" component={Transfer} options={{ headerStyle: {backgroundColor: color.secondary, elevation:0}, headerTitle:"Find Receiver"}} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{ headerStyle: {backgroundColor: color.secondary, elevation:0}}} />
      <Stack.Screen name="ManagePhone" component={ManagePhone} options={{ headerStyle: {backgroundColor: color.secondary, elevation:0}}} />
      <Stack.Screen name="AddPhone" component={AddPhone} options={{ headerStyle: {backgroundColor: color.secondary, elevation:0}}} />
      <Stack.Screen name="InputAmount" component={InputAmount} options={{ headerStyle: {backgroundColor: color.primary, elevation:0}, headerTitle:"Transfer", headerTintColor:color.white}} />
      <Stack.Screen name="InputPin" component={InputPin} options={{ headerStyle: {backgroundColor: color.secondary, elevation:0}, headerTitle:"Enter Your PIN"}} />
      <Stack.Screen name="TransferStatus" component={TransferStatus} options={{headerShown: false}}  />
      <Stack.Screen name="Details" component={Details} options={{ headerStyle: {backgroundColor: color.secondary, elevation:0}, headerTitle:"Transaction"}}  />
    </Stack.Navigator>
  );
};
const MainNavigator = (props) => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  const {isLogin} = useSelector((state) => state.Auth);
  return (
    <NavigationContainer>
      <Drawer.Navigator>
      {!isLogin ?(
        <Drawer.Screen name="Auth" component={AuthStack} navigation={props.navigation} />
      ):(
        <Drawer.Screen name="Dashboard" component={DashboardStack} navigation={props.navigation} />
      )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
