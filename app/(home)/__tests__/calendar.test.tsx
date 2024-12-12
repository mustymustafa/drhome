import { render, fireEvent } from '@testing-library/react-native';
import React from 'react'; 
import { AppContext } from '@/context/AppContext';
import { router } from 'expo-router';
import CalendarScreen from '../calendar';
import {  mockContext } from '@/mock/jest';



describe('CalendarScreen', () => {
 
  it('renders the CalendarScreen correctly', () => {
    const { getByText } = render(
        <AppContext.Provider value={mockContext}>
          <CalendarScreen />
        </AppContext.Provider>
      );
 
    expect(getByText('When are you free?')).toBeTruthy();
    expect(getByText('Select a Time')).toBeTruthy();
  });

  })