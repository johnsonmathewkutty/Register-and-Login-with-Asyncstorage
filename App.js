import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Src/Home";
import Register from "./Src/Register";
import Login from "./Src/Login";
import { NavigationContainer } from "@react-navigation/native";


const App=()=>{
  const stack=createStackNavigator()
  return(
<NavigationContainer>
<stack.Navigator
initialRouteName="Login">
      <stack.Screen name="Home" component={Home}
      options={{
        headerShown:false
      }}/>
      <stack.Screen name="Login" component={Login}
       options={{
        headerShown:false
      }}/>
      <stack.Screen name="Register" component={Register}
       options={{
        headerShown:false
      }}/>
    </stack.Navigator>
</NavigationContainer>
  )
}

export default App;