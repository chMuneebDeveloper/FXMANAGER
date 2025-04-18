import RootStack from './app/navigation/RootStack';
import {NavigationContainer} from '@react-navigation/native';
 const App = () => {
  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
}

export default App;