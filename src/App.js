import { useState, useEffect } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

import AuthContext from './contexts/AuthContext';

// ----------------------------------------------------------------------

export default function App() {
  // state for rtl status of page
  const [isRTL, setIsRTL] = useState(false);

  const rtl = localStorage.getItem("rtl")

  // state for auth status for context
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setIsRTL(rtl === true || rtl === "true")
  }, [])

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <HelmetProvider>
          <BrowserRouter>
            <ThemeProvider>
              <ScrollToTop />
              <StyledChart />
              <Router setIsRTL={setIsRTL} />
            </ThemeProvider>
          </BrowserRouter>
        </HelmetProvider>
      </AuthContext.Provider>
    </div>
  );
}
