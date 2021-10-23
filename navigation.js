import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "./screens/Homescreen";
import NewPostscreen from "./screens/NewPostscreen";
import LogInscreen from "./screens/LogInscreen";
import SignUpscreen from "./screens/SignUpscreen";
const Stack = createStackNavigator();

const screenOptions = { headerShown: false };

const SignedInStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Homescreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="HomeScreen" component={Homescreen} />
      <Stack.Screen name="NewPostscreen" component={NewPostscreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LogInscreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="SignUpscreen" component={SignUpscreen} />
      <Stack.Screen name="LogInscreen" component={LogInscreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export { SignedInStack, SignedOutStack };
