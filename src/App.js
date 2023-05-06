import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ReservationForm } from "./components/ReservationForm";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReservationForm/>  
    </LocalizationProvider>
   
  );
}

export default App;
