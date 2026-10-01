import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider, testFirebaseConnection } from '../lib/firebase';

interface FirebaseContextType {
  currentUser: User | null;
  loading: boolean;
  isConnected: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType>({
  currentUser: null,
  loading: true,
  isConnected: false,
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    testFirebaseConnection().then((connected) => setIsConnected(connected));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Failed to sign in with Google', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Failed to sign out', error);
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        currentUser,
        loading,
        isConnected,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
