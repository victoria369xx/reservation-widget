import { useState} from 'react';
import {Grid, Typography, TextField,FormHelperText, Button, Box, Alert} from '@mui/material';
import { AlertDialog } from './AlertDialog';

export function ClientInfo (props) { 
  const dataFromLS = JSON.parse(localStorage.getItem('clientInfo'));
  const [name, setName] = useState(dataFromLS?.name || '');
  const [company, setCompany] = useState(dataFromLS?.company || '');
  const [email, setEmail] = useState(dataFromLS?.email || '');
  const [phone, setPhone] = useState(dataFromLS?.phone || ''); 
  const [numOfPeople, setNumOfPeople] = useState(dataFromLS?.numOfPeople || '');  
  const [error, setError] = useState(false)

  const saveDataToLS = () => {
      const clientInfo = {
        name:name,
        company: company,
        email:email,
        phone:phone,
        numOfPeople: numOfPeople
    } 
    localStorage.setItem('clientInfo', JSON.stringify(clientInfo)); 
  } 



  const handleChangeName = (e) => {
    setName(e.target.value);
  }; 
  const handleChangeCompany = (e) => {
    setCompany(e.target.value);
  }; 
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }; 
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  }; 
  const handleChangeNumOfPeople = (e) => {
    setNumOfPeople(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let regexp = new RegExp(`^[+7][0-9]{11}$`) 
    if(regexp.test(phone)){
      setError(false);
      saveDataToLS();
      props.setDisabled(false);
    } else {
      setError(true)
      return;
    }
    
  }

  const clearForm = () => {
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setNumOfPeople('');
    localStorage.removeItem('clientInfo');
  }

    return (
        <>
         <Typography variant="h6" gutterBottom>
            Как с вами связаться? 
        </Typography>
        <p><b>Внимание.</b> Нажмите кнопку "Сохранить", чтобы перейти к следующему шагу.</p>
        <form onSubmit={handleSubmitForm}>
        <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            id="clientName"
            value={name}
            label="Ваше имя"
            fullWidth
            variant="standard"
            onChange={handleChangeName}
            autoFocus
          /> 
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="company"
            value={company}
            label="Компания"
            fullWidth
            variant="standard"
            onChange={handleChangeCompany}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            value={email}
            type='email'
            label="Эл. почта"
            fullWidth
            variant="standard" 
            onChange={handleChangeEmail}
          />
          <FormHelperText> Введите вашу почту в формате example@mail.ru </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            value={phone}
            type='tel'
            label="Телефон"
            fullWidth
            variant="standard"
            onChange={handleChangePhone}
          />           
          {
            error ? <Alert severity="error">Введите ваш номер телефона в формате <b>+ 7 777 123 45 67</b></Alert> : 
            <FormHelperText> Введите ваш номер телефона в формате + 7 777 123 45 67 </FormHelperText> 
          }
          
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="numOfPeople"
            value={numOfPeople}
            type='number'
            label="Количество участников"
            inputProps={{ min: 1, max: 100 }}
            fullWidth
            variant="standard"
            onChange={handleChangeNumOfPeople}
          /> 
          <FormHelperText> Укажите цифрой, сколько людей посетит ваше мероприятие </FormHelperText>
        </Grid> 
        <Grid item xs={12}>
          <Box sx={{marginTop:2, marginBottom:2, display:'flex', justifyContent:'space-between'}}>
          <AlertDialog clearForm={clearForm}/>
          <Button type='submit' variant='outlined' size='large'>Сохранить</Button>
          </Box>
        </Grid>
      </Grid> 
        </form>
        </>
    )
}