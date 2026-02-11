import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner@2.0.3';

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
