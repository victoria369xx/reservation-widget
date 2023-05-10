import { useState } from 'react';
import {CssBaseline, Box, Container, Paper, Stepper, Step, StepLabel, Button, Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ClientInfo } from './ClientInfo';
import { RoomInfo } from './RoomInfo';
import { Additionals } from './Additionals';

const theme = createTheme();


export function ReservationForm () { 
const steps = ['Контактная информация', 'Выберите переговорную', 'Выберите услуги']; 
const [activeStep, setActiveStep] = useState(0);
const [disabled, setDisabled] = useState(true);

const handleNext = () => {
  setActiveStep(activeStep + 1);
};

const handleBack = () => {
  setActiveStep(activeStep - 1);
  setDisabled(true);
};


function getStepContent(step) {
  switch (step) {
    case 0:
      return <ClientInfo setDisabled={setDisabled}/>;
    case 1:
      return <RoomInfo setDisabled={setDisabled}/>;
    case 2:
      return <Additionals setDisabled={setDisabled}/>;
    default:
      throw new Error('Unknown step');
  }
}

  const handleFormSend = () => {
    handleNext();
    console.log(localStorage.getItem('clientInfo'), localStorage.getItem('roomInfo'), localStorage.getItem('additionalsInfo'));
    localStorage.removeItem('clientInfo');
    localStorage.removeItem('roomInfo');
    localStorage.removeItem('additionalsInfo');
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Бронирование переговорной
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Благодарим, что выбрали нас! 
              </Typography>
              <Typography variant="subtitle1">
                Мы уже получили информацию о вашем бронировании.
                Наш менеджер свяжется с вами в течение 15 минут.
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Назад
                  </Button>
                )}

                {
                  activeStep === steps.length - 1 ? <Button variant="contained" disabled={disabled} onClick={handleFormSend} sx={{ mt: 3, ml: 1 }}> Отправить </Button> :  
                  <Button variant="contained" disabled={disabled} onClick={handleNext}  sx={{ mt: 3, ml: 1 }}> Далее </Button>
                }
               
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
