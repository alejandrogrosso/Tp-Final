
import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import StackUsuario from './components/StackNavigator/index';
import StackAdmin from './components/StackNavigator/indexAdmin';
import StackLogin from './components/StackNavigator/indexLogin';
import GlobalContext, { authData, resultsMostrar } from './components/globals/context';


export default function App() {
  const [AuthData, setAuthData] = useState(authData)
  const [resultsGlobal, setResultsGlobal] = useState(resultsMostrar)
  const isAuthenticated = () => AuthData.dni !== ""
  return (
    <GlobalContext.Provider value={{ AuthData, setAuthData, resultsGlobal, setResultsGlobal }} >
      {/*console.log(AuthData)*/}
      <NavigationContainer >
        {
          (isAuthenticated() && (AuthData.rol == "Admin") &&
            <StackAdmin />
          )
          ||
          (isAuthenticated() &&
            <StackUsuario />
          )
          ||
          (!isAuthenticated() &&
            <StackLogin />
          )
        }
      </NavigationContainer>
    </GlobalContext.Provider >
  );
}
