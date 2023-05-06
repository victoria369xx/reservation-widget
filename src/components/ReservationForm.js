import { useState } from "react";
import {Container, Paper, FormGroup,FormControl, InputLabel, Select, MenuItem, Box, TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { ruRU as coreRuRU } from '@mui/material/locale';
import { ruRU } from '@mui/x-date-pickers/locales';
import { DatePicker, TimePicker } from '@mui/x-date-pickers'; 

const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    ruRU, // use 'ru' locale for UI texts (start, next month, ...)
    coreRuRU 
  );
  

export function ReservationForm () {
    const [age, setAge] = useState('');
    const [floor, setFloor] = useState('');
    const [room, setRoom] = useState('');

    const floors = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
    const rooms = [1,2,3,4,5,6,7,8,9,10]

  const handleChangeTower = (e) => {
    setAge(e.target.value);
  };

  const handleChangeFloor = (e) => {
    setFloor(e.target.value)
  } 

  const handleChangeRoom = (e) => {
    setRoom(e.target.value)
  }
    return (
        <Container maxWidth="md" sx={{marginTop:4}}>
            <Paper sx={{padding:2}}> 
                    <FormGroup>

                        <FormControl>
                        <InputLabel id="Tower">Башня</InputLabel>
                        <Select
                            labelId="Tower"
                            value={age}
                            label="Башня"
                            onChange={handleChangeTower}
                        >
                            <MenuItem value={"А"}>А</MenuItem>
                            <MenuItem value={"Б"}>Б</MenuItem>
                        </Select>
                        </FormControl>

                        <FormControl sx={{marginTop:2}}>
                        <InputLabel id="Floor">Этаж</InputLabel>
                        <Select
                            labelId="Floor"
                            value={floor}
                            label="Этаж"
                            onChange={handleChangeFloor}
                        >
                            {
                                floors?.map((el,index)=>{
                                    return <MenuItem value={el} key={index}>{el}</MenuItem>
                                })
                            }
                            
                        </Select>
                        </FormControl> 

                        <FormControl sx={{marginTop:2}}>
                        <InputLabel id="Room">Комната</InputLabel>
                        <Select
                            labelId="Room"
                            value={room}
                            label="Комната"
                            onChange={handleChangeRoom}
                        >
                            {
                                rooms?.map((el,index)=>{
                                    return <MenuItem value={el} key={index}>{el}</MenuItem>
                                })
                            }
                            
                        </Select>
                        </FormControl>

                        <Box sx={{display:"flex", justifyContent:"space-around"}}>
                        <ThemeProvider theme={theme}>
                            <DatePicker sx={{marginTop:2}}/> 
                            <TimePicker sx={{marginTop:2}} label="Выберите время" />
                        </ThemeProvider>;
                        </Box>

                        <TextField
                        label="Пожелания по аренде"
                        multiline
                        rows={6}
                        placeholder="Здесь вы можете оставить комментарий"
                        sx={{marginTop:2}} />

                    </FormGroup>

                    <Box sx={{display:"flex", justifyContent:"space-around", marginTop:2, marginBottom:4}}>
                            <Button variant="outlined" color="error" size="large">Очистить</Button> 
                            <Button variant="contained" size="large">Отправить</Button>
                        </Box>
            </Paper>
        </Container>
    )
}