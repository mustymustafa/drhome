import React from 'react';
import { render } from '@testing-library/react-native';
import { AppContext } from '@/context/AppContext';
import LoyaltyScreen from '../loyalty';
import { mockBookingContext } from '@/mock/jest';

describe('Loyalty Screen', () => {
  it('renders the booking history correctly', () => {

    const { getByText } = render(
      <AppContext.Provider value={mockBookingContext}>
        <LoyaltyScreen />
      </AppContext.Provider>
    );

    // Check if the loyalty points text is rendered
    expect(getByText('Loyalty Points 🎉')).toBeTruthy();
    expect(getByText('150')).toBeTruthy();

    // Check if the bookings are rendered
    expect(getByText('Treatment A')).toBeTruthy();
    expect(getByText('£50.00')).toBeTruthy();
    expect(getByText('2024-12-11')).toBeTruthy();
    expect(getByText('10:00 AM')).toBeTruthy();

    expect(getByText('Treatment B')).toBeTruthy();
    expect(getByText('£75.00')).toBeTruthy();
    expect(getByText('2024-12-12')).toBeTruthy();
    expect(getByText('2:00 PM')).toBeTruthy();
  });
});
