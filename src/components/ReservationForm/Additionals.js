import { useState, useEffect} from 'react';
import {Box, Typography, FormControlLabel, FormControl, FormGroup, Checkbox,  InputLabel, Select, MenuItem, Button} from '@mui/material';
import { AlertDialog } from './AlertDialog';

export function Additionals (props) { 
  const [settle, setSettle] = useState('');
  const [equipment, setEquipment] = useState({
    laptop: false,
    projector: false,
    clicker: false,
  });
  const [food, setFood] = useState({
      coffeBreak: false, 
      lunch: false,
      waterCooler: false
  })

  const handleChangeSettle = (e) => {
    setSettle(e.target.value)
  }

  const handleChangeEquipment = (e) => {
    setEquipment({
      ...equipment,
      [e.target.name]: e.target.checked,
    });
  }; 

  const handleChangeFood = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.checked,
    });
  }; 

 
  
  const { laptop, projector, clicker } = equipment;
  const {coffeBreak, lunch, waterCooler} = food;


  useEffect(()=> {
    props.setDisabled(true)
  }, [])

  const saveDataToLS = () => {
    const additionalsInfo = [
        { settle : settle}, 
        { equipment: equipment},
        { food: food}
    ]
    localStorage.setItem('additionalsInfo', JSON.stringify(additionalsInfo)); 

  } 

  const handleSubmitForm = (e) => {
    e.preventDefault();
    saveDataToLS();
    props.setDisabled(false);
  }

  const clearForm = () => {
      setSettle('');
      setEquipment({
        laptop: false,
        projector: false,
        clicker: false,
      });
      setFood({
        coffeBreak: false, 
        lunch: false,
        waterCooler: false
    });
      localStorage.removeItem('additionalsInfo');
  }

 
    return (
        <>
            <Box> 
                    <Typography variant="h6" gutterBottom>
                         Выберите дополнительные услуги
                    </Typography>
                    <p><b>Внимание.</b> Нажмите кнопку "Сохранить", чтобы перейти к следующему шагу.</p>
              <Typography variant="subtitle1" sx={{textAlign:'justify'}}>
                Если вы еще не знаете, какие услуги вам понадобятся, вы можете оставить поля пустыми — наш менеджер проконсультирует вас при подтверждении бронирования.
              </Typography> 
              <form onSubmit={handleSubmitForm}>
              <Typography variant="h6" sx={{mt:2}}>
                Выберите рассадку 
              </Typography>
              <Box>
              <FormGroup>
                        <FormControl>
                        <InputLabel id="Settle">Рассадка</InputLabel>
                        <Select
                            labelId="SettleId"
                            value={settle}
                            label="Выберите рассадку" 
                            onChange={handleChangeSettle}
                            autoFocus
                        >
                            <MenuItem value={"Театр"}> Театр </MenuItem>
                            <MenuItem value={"Класс"}> Класс </MenuItem> 
                            <MenuItem value={"Круглый стол"}> Круглый стол </MenuItem>
                        </Select> 
                        </FormControl>
              </FormGroup>
              </Box> 
              <Typography variant="h6" sx={{mt:2}}>
                 Выберите оборудование 
              </Typography>
              <Box>
              <FormControlLabel control={<Checkbox checked={laptop} onChange={handleChangeEquipment} name="laptop"/>} label="Ноутбук" /> 
              <FormControlLabel control={<Checkbox checked={projector}  onChange={handleChangeEquipment} name="projector"/>} label="Экран и проектор" />
              <FormControlLabel control={<Checkbox checked={clicker} onChange={handleChangeEquipment} name="clicker"/>} label="Кликер" />
              </Box> 
              <Typography variant="h6" sx={{mt:2}}>
                Выберите питание
              </Typography>
              <Box>
              <FormControlLabel control={<Checkbox checked={coffeBreak} onChange={handleChangeFood} name="coffeBreak"/>} label="Кофе-брейк" />
              <FormControlLabel control={<Checkbox checked={lunch} onChange={handleChangeFood} name="lunch"/>} label="Бизнес-ланч" />
              <FormControlLabel control={<Checkbox checked={waterCooler} onChange={handleChangeFood} name="waterCooler"/>} label="Кулер" />
              </Box> 
              <Box sx={{marginTop:2, marginBottom:2, display:'flex', justifyContent:'space-between'}}>
              <AlertDialog clearForm={clearForm}/>
              <Button type='submit' variant='outlined' size='large'>Сохранить</Button> 
              </Box>
              </form>
        </Box>
        </>
    )
}