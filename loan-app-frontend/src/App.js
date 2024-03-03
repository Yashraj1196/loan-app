import './App.css';
import Router from './routes';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <>
    <SnackbarProvider>
    <Router />
    </SnackbarProvider>
    </>
  );
}

export default App;
