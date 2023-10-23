import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Icon } from '@rneui/themed';

import ContactsScreen from './screens/ContactsScreen';
import ContactDetailScreen from './screens/ContactDetailsScreen';
import ContactEditScreen from './screens/ContactEdit';
import GroupsScreen from './screens/GroupsScreen';
import SettingsScreen from './screens/SettingsScreen';
import { rootReducer } from './Reducer';
import { loadOnInit } from './Actions';
import { useEffect } from 'react';

const store = configureStore({
  reducer: rootReducer
});

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function ContactsTabStack() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadOnInit());
  }, []);

  return (
      <Stack.Navigator initialRouteName='ContactList' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ContactList' component={ContactsScreen}/>
        <Stack.Screen name='ContactDetails' component={ContactDetailScreen}/>
        <Stack.Screen name='ContactEdit' component={ContactEditScreen}/>
      </Stack.Navigator>
  );
}

function AppContainer() {

  return(
    <Provider store={store}>
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
          {/* <Tabs.Screen 
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
            }}/> */}
        </Tabs.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default AppContainer;