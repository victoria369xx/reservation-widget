import {Grid, Typography, TextField,FormHelperText} from '@mui/material';
import { AlertDialog } from './AlertDialog';

export function ClientInfo () {
    return (
        <>
         <Typography variant="h6" gutterBottom>
            Как с вами связаться? 
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            id="clientName"
            label="Ваше имя"
            fullWidth
            variant="standard"
          /> 
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="company"
            label="Компания"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            type='email'
            label="Эл. почта"
            fullWidth
            variant="standard"
          />
          <FormHelperText> Введите вашу почту в формате example@mail.ru </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            type='tel'
            label="Телефон"
            fullWidth
            variant="standard"
          /> 
          <FormHelperText> Введите ваш номер телефона в формате + 7 777 123 45 67 </FormHelperText>
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="numOfPeople"
            type='number'
            label="Количество участников"
            fullWidth
            variant="standard"
          /> 
          <FormHelperText> Укажите цифрой, сколько людей посетит ваше мероприятие </FormHelperText>
        </Grid> 
        <Grid item xs={12} >
          <AlertDialog/>
        </Grid>
      </Grid>
        </>
    )
}