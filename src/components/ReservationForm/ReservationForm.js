import { useState } from 'react';
import {CssBaseline, Box, Container, Paper, Stepper, Step, StepLabel, Button, Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ClientInfo } from './ClientInfo';
import { RoomInfo } from './RoomInfo';
import { Additionals } from './Additionals';



const steps = ['Контактная информация', 'Выберите переговорную', 'Выберите услуги'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ClientInfo />;
    case 1:
      return <RoomInfo />;
    case 2:
      return <Additionals/>;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export function ReservationForm () {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Отправить' : 'Далее'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
