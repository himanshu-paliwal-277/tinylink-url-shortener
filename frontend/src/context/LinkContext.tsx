'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface LinkContextType {
  searchQuery: string;
  // eslint-disable-next-line no-unused-vars
  setSearchQuery: (query: string) => void;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <LinkContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};

export const useLink = () => {
  const context = useContext(LinkContext);
  if (context === undefined) {
    throw new Error('useLink must be used within a LinkProvider');
  }
  return context;
};
