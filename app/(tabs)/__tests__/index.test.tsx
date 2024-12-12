import { render, fireEvent } from '@testing-library/react-native';
import { AppContext } from '@/context/AppContext';
import HomeScreen from '..';
import { mockContext, mockTreatments } from '@/mock/jest';
describe('HomeScreen', () => {
      
  it('renders the treatment list', () => {
    const { getByText } = render(

      <AppContext.Provider value={mockContext}>
        <HomeScreen />
      </AppContext.Provider>
    );

    expect(getByText('Treatment A')).toBeTruthy();
    expect(getByText('£50')).toBeTruthy();
    expect(getByText('Description A')).toBeTruthy();

    expect(getByText('Treatment B')).toBeTruthy();
    expect(getByText('£100')).toBeTruthy();
    expect(getByText('Description B')).toBeTruthy();
  });

});
