import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MemoryItem {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'image';
  thumbnail: string;
  imageUrl: string;
  category: string;
  year: string;
  rowSection: string;
  isInMyList?: boolean;
}

interface MyListContextType {
  myList: Set<number>;
  toggleMyList: (itemId: number) => void;
  isInMyList: (itemId: number) => boolean;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useMyList must be used within a MyListProvider');
  }
  return context;
};

interface MyListProviderProps {
  children: ReactNode;
}

export const MyListProvider: React.FC<MyListProviderProps> = ({ children }) => {
  const [myList, setMyList] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('myList');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(Array.from(myList)));
  }, [myList]);

  const toggleMyList = (itemId: number) => {
    setMyList(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const isInMyList = (itemId: number) => {
    return myList.has(itemId);
  };

  return (
    <MyListContext.Provider value={{ myList, toggleMyList, isInMyList }}>
      {children}
    </MyListContext.Provider>
  );
};
