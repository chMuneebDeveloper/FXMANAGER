import RootStack from './app/navigation/RootStack';
import {NavigationContainer} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';
const App = () => {
  return (
    <NavigationContainer>
      <MenuProvider >
        <RootStack />
      </MenuProvider>
    </NavigationContainer>
  );
};

export default App;
