import { mockData } from '@/mock/treatments';
import { AppContextProps, Treatment, Booking, UserProps } from '@/types';
import React, { createContext, useState, useContext, ReactNode } from 'react';


const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [booking, setBooking] = useState<Booking | undefined>(undefined);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [bookingHistory, setBookingHistory] = useState<Booking[] | []>([]);

  const fetchTreatments = async () => {

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
    setBooking(undefined)
  }

  const storeUser = (user: UserProps) => {
    setUser(user)
  }

  const addBookingToHistory = (newBooking: Booking) => {

    setBookingHistory((prevBooking) => 
      [...prevBooking, newBooking] )

  }

  const removeTreatment = (id: string) => {
  const newTreatments =  booking?.treatments?.filter((treatment) => treatment.id != id )
  addBooking({treatments: newTreatments})

  }
      
      return (
    <AppContext.Provider value={{ treatments, loyaltyPoints, addPoints, fetchTreatments, addBooking, booking, bookingHistory, resetBooking, addBookingToHistory, user, storeUser, removeTreatment}}>
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

export {AppContext};
