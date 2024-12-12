import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { AppContext } from '@/context/AppContext';

import { mockContext } from '@/mock/jest';
import PaymentScreen from '../payment';

jest.mock('@stripe/stripe-react-native', () => ({
    confirmPlatformPayPayment: jest.fn(),
    PlatformPay: {
      ButtonType: {
        Pay: 'Pay',
      },
      ButtonStyle: {
        Black: 'Black',
      },
      PaymentType: {
        Immediate: 'Immediate',
      },
    },
    PlatformPayButton: () => 'Mocked PlatformPayButton',
    useStripe: () => ({
      initPaymentSheet: jest.fn(),
      presentPaymentSheet: jest.fn(),
    }),
  }));
  
describe('PaymentScreen', () => {
    
  it('renders the PaymentScreen correctly', () => {
    const { getByText, getByRole } = render(
      <AppContext.Provider value={mockContext}>
        <PaymentScreen />
      </AppContext.Provider>
    );

    expect(getByText('Dr Home Aesthetics Checkout')).toBeTruthy();
    expect(getByText('Treatments')).toBeTruthy();
    expect(getByText('Patient Details')).toBeTruthy();
    expect(getByText('Secure Checkout')).toBeTruthy();
  });

});
