
export const mockTreatments = [
    { id: '1', name: 'Treatment A', price: 50, description: 'Description A' },
    { id: '2', name: 'Treatment B', price: 100, description: 'Description B' },
  ];

  export const mockBookingContext = {
    loyaltyPoints: 150,
    bookingHistory: [
      {
        id: '1',
        treatments: [{ name: 'Treatment A' }],
        total: 50,
        when: '2024-12-11',
        time: '10:00 AM',
      },
      {
        id: '2',
        treatments: [{ name: 'Treatment B' }],
        total: 75,
        when: '2024-12-12',
        time: '2:00 PM',
      },
    ],
  };
export const mockContext = {
    treatments: mockTreatments,
    booking: { treatments: [] },
    fetchTreatments: jest.fn(),
    addBooking: jest.fn(),
  };