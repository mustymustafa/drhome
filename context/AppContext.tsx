import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  }

interface AppContextProps {
  treatments: Treatment[];
  loyaltyPoints: number;
  addPoints: (points: number) => void;
  fetchTreatments: () => void;
  addBooking: (details: Booking) => void;
  resetBooking: () => void;
  booking: Booking | null;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [booking, setBooking] = useState<Booking | null>();
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  const fetchTreatments = async () => {
    // Mock API or hardcoded JSON
    const mockData: Treatment[] = [
      { id: '1', name: 'Consultation', description: 'initial consultation to assess your needs...', points: 1, price: 100 },
      { id: '2', name: 'Botox - One Area', description: 'one of forehead lines/frown lines/crows feet/bunny lines/mar...', points: 1, price: 150 },
      { id: '3', name: 'Botox - 2 Areas', description: 'one of forehead lines/frown lines/crows feet/bunny lines/mar...', points: 2, price: 200 },
      { id: '4', name: 'Botox - 3 Areas', description: 'one of forehead lines/frown lines/crows feet/bunny lines/mar...', points: 2, price: 300 },
      { id: '5', name: 'Botox For Jawline Slimming', description: 'for jawline slimming/teeth grinding...', points: 4, price: 400 },
      { id: '6', name: 'Botox For Hyperhyidrosis', description: 'for excessive underarm sweating...', points: 5, price: 500 },

    ];
    setTreatments(mockData);
  };

  const addPoints = (points: number) => {
    setLoyaltyPoints((prev) => prev + points);
  };

  //It is partial so that it allows us pass only the fields we want to update
  const addBooking = (details: Partial<Booking>) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      ...details
    }));
  };

  const resetBooking = () => {
    setBooking(null)
  }


  return (
    <AppContext.Provider value={{ treatments, loyaltyPoints, addPoints, fetchTreatments, addBooking, booking, resetBooking}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
