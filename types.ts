export interface Treatment {
    id: string;
    name: string;
    description: string;
    price: number;
    points: number;
  }
  
  
  export interface Booking {
      id?: number
      treatments?: Treatment[] | undefined
      when?: string;
      time?: string;
      total?: number;
    }
  
  export interface AppContextProps {
    treatments: Treatment[];
    loyaltyPoints: number;
    addPoints: (points: number) => void;
    fetchTreatments: () => void;
    addBooking: (details: Booking) => void;
    resetBooking: () => void;
    addBookingToHistory: (newBooking: Booking) => void;
    booking: Booking | undefined;
    bookingHistory: Booking[] | null;
    user: UserProps | undefined;
    storeUser: (user: UserProps) => void
  }

  export interface UserProps {
    email: string;
    name: string;
  }