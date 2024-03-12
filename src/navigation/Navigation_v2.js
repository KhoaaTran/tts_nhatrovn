import React, {useEffect, useContext, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {FilterRoomScreen} from '../screens'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName='FilterRoomScreen'
      >
        <Stack.Screen name='FilterRoomScreen' component={FilterRoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
