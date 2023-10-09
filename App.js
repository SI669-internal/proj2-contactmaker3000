import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Icon } from '@rneui/themed';

import ContactsScreen from './screens/ContactsScreen';
import ContactDetailScreen from './screens/ContactDetailsScreen';
import ContactEditScreen from './screens/ContactEdit';
import GroupsScreen from './screens/GroupsScreen';
import SettingsScreen from './screens/SettingsScreen';
import { rootReducer } from './Reducer';

function ContactsTabStack() {
  const Stack = createNativeStackNavigator();

  const store = configureStore({
    reducer: rootReducer
  });

  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName='ContactList' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ContactList' component={ContactsScreen}/>
        <Stack.Screen name='ContactDetails' component={ContactDetailScreen}/>
        <Stack.Screen name='ContactEdit' component={ContactEditScreen}/>
      </Stack.Navigator>
    </Provider>
  );
}

function AppContainer() {
  const Tabs = createBottomTabNavigator();

  return(
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={{headerShown: false}}
        >
          <Tabs.Screen 
            name="Contacts" 
            component={ContactsTabStack}
            options={{
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <Icon 
                    name="list"
                    type="font-awesome"
                    color={color}
                    size={size}
                  />
                );
              }
            }}
          />
          <Tabs.Screen 
            name="Groups" 
            component={GroupsScreen}
            options={{
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <Icon 
                    name="group"
                    type="material"
                    color={color}
                    size={size}
                  />
                );
              }
            }}/>
          <Tabs.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <Icon 
                    name="gear"
                    type="font-awesome"
                    color={color}
                    size={size}
                  />
                );
              }
            }}/>
        </Tabs.Navigator>
      </NavigationContainer>
  );
}

export default AppContainer;