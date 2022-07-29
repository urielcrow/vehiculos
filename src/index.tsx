import ReactDOM from 'react-dom/client';
import { VehicleProvider } from './context/VehicleContext';
import TabsContainer from './tabs/TabsContainer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <VehicleProvider>
    <TabsContainer />
  </VehicleProvider>
);
