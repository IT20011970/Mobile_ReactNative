import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import seed from '../data/tips.json';
import { sendLocalNotification } from '../utils/notifications';

const STORAGE_KEY = 'tips_v2';
const TipsContext = createContext(null);

export function TipsProvider({ children }) {
  const [tips, setTips] = useState([]);
  const [notice, setNotice] = useState(''); // global message shown on all UIs

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTips(JSON.parse(stored));
        } else {
          setTips(seed);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
        }
      } catch (e) {
        setTips(seed);
      }
    })();
  }, []);

  const addTip = async (entry) => {
    const newTip = { ...entry, id: String(Date.now()) };
    const next = [newTip, ...tips];
    setTips(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {}

   
    setNotice('✅ New tip added');
    setTimeout(() => setNotice(''), 3000);
    sendLocalNotification('New tip added', newTip.title);
  };

  return (
    <TipsContext.Provider value={{ tips, addTip, notice }}>
      {children}
    </TipsContext.Provider>
  );
}

export function useTips() {
  return useContext(TipsContext);
}
