'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </>
  );
};
export default Providers;
