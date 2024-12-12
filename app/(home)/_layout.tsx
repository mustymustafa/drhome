import { Stack } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          headerShown: true,
         headerBackButtonDisplayMode: 'generic',
         headerBackVisible: true
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          title: 'Payment'
        }}
      />


    
  
      
    </Stack>
  );
}
