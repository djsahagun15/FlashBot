import { useMediaQuery } from 'react-responsive';
import MobileLayout from './layouts/MobileLayout';
import DesktopLayout from './layouts/DesktopLayout';

import './App.css'

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return isMobile ? <MobileLayout/> : <DesktopLayout/>;
}

export default App
