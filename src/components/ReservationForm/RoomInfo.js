import { useEffect, useState } from "react";
import {FormGroup,FormControl, FormHelperText, InputLabel, Select, MenuItem, Box, TextField, Button } from "@mui/material";
import { AlertDialog } from "./AlertDialog";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs' 
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; 
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ru';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { ruRU as coreRuRU } from '@mui/material/locale';
import { ruRU } from '@mui/x-date-pickers/locales';
import { DatePicker, TimePicker } from '@mui/x-date-pickers'; 

dayjs.extend(utc); 
dayjs.extend(timezone)
const userTimeZone = () => {
 const guessedZone = dayjs.tz.guess()
 return String(guessedZone)
} 
dayjs.tz.setDefault(userTimeZone())


const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    ruRU, // use 'ru' locale for UI texts (start, next month, ...)
    coreRuRU 
  );
  

export function RoomInfo () {

  const now = dayjs.tz() 
  const getTodayDate = () => {
    const FORMAT_MONTH = 1
    const todayYear = now.year() 
    const todayMonth = (now.month() + FORMAT_MONTH) < 10 ? `0${now.month() + FORMAT_MONTH}` : now.month() + FORMAT_MONTH
    const todayDay = now.date() < 10 ? `0${now.date()}` : now.date()

    return `${todayYear}-${todayMonth}-${todayDay}`
  }

  const getTimeNow = () => {
    const todayHour = now.hour() < 10 ? `0${now.hour()}` : now.hour()
    const todayMinute = now.minute() < 10 ? `0${now.minute()}` : now.minute()

    return `${todayHour}:${todayMinute}`
  }

  const todayDate = getTodayDate()
  const timeNow = getTimeNow()

    const [renderCheck, setRenderCheck] = useState(true) //default true because default date is today
    const [tower, setTower] = useState('');
    const [floor, setFloor] = useState('');
    const [room, setRoom] = useState('');
    const [date, setDate] = useState(dayjs.utc(todayDate));
    const [time, setTime] = useState(dayjs.utc(`${todayDate}T${timeNow}`));
    const [duration, setDuration] = useState('');
    const [comment, setComment] = useState('');

    const floors = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
    const rooms = [1,2,3,4,5,6,7,8,9,10]
    const durationRange = ['1 час', '2 часа', '4 часа','6 часов','8 часов']

  const isUserDateIsTodayCheck = () => { 
    const userInput = dayjs.utc(date)
    const FORMAT_MONTH = 1
    const userYear = userInput.year() 
    const userMonth = (userInput.month() + FORMAT_MONTH) < 10 ? `0${userInput.month() + FORMAT_MONTH}` : userInput.month() + FORMAT_MONTH
    const userDay = userInput.date() < 10 ? `0${userInput.date()}` : userInput.date()

    const userDate = `${userYear}-${userMonth}-${userDay}`

   if(userDate === todayDate){ 
        setRenderCheck(true)
      } else {
        setRenderCheck(false) 
      }
  } 


   useEffect(()=> {
      isUserDateIsTodayCheck()
    },[date])


  const handleChangeTower = (e) => {
    setTower(e.target.value);
  };

  const handleChangeFloor = (e) => {
    setFloor(e.target.value)
  } 

  const handleChangeRoom = (e) => {
    setRoom(e.target.value)
  }

  const handleChangeDuration = (e) => {
      setDuration(e.target.value)
  }

  const handleChangeComment = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const reservationInfo = {
        id: Math.random(),
        tower: tower,
        floor: floor,
        room: room,
        date: date,
        time: time,
        duration: duration,
        comment: comment
    } 
    const request = JSON.stringify(reservationInfo)
    console.log(request)
    clearForm()
  } 

  const clearForm = () => {
    setTower('');
    setFloor('');
    setRoom('');
    setDate(dayjs.utc(todayDate))
    setTime(dayjs.utc(`${todayDate}T${timeNow}`));
    setDuration('');
    setComment('');
  }

    return (
                    <form onSubmit={handleSubmit}> 
                    <FormGroup>
                        <FormControl required>
                        <InputLabel id="Tower">Башня</InputLabel>
                        <Select
                            labelId="Tower"
                            value={tower}
                            label="Башня *"
                            onChange={handleChangeTower}
                        >
                            <MenuItem value={"А"}>А</MenuItem>
                            <MenuItem value={"Б"}>Б</MenuItem>
                        </Select> 
                        <FormHelperText> Обязательное поле </FormHelperText>
                        </FormControl>

                        <FormControl required sx={{marginTop:2}}>
                        <InputLabel id="Floor">Этаж</InputLabel>
                        <Select
                            labelId="Floor"
                            value={floor}
                            label="Этаж *"
                            onChange={handleChangeFloor}
                        >
                            {
                                floors?.map((el,index)=>{
                                    return <MenuItem value={el} key={index}>{el}</MenuItem>
                                })
                            }
                            
                        </Select> 
                        <FormHelperText> Обязательное поле </FormHelperText>
                        </FormControl> 

                        <FormControl required sx={{marginTop:2}}>
                        <InputLabel id="Room">Комната</InputLabel>
                        <Select
                            labelId="Room"
                            value={room}
                            label="Комната *"
                            onChange={handleChangeRoom}
                        >
                            {
                                rooms?.map((el,index)=>{
                                    return <MenuItem value={el} key={index}>{el}</MenuItem>
                                })
                            }
                            
                        </Select> 
                        <FormHelperText> Обязательное поле </FormHelperText>
                        </FormControl>

                        <Box sx={{display:"flex", justifyContent:"space-around"}}>
                            <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc} adapterLocale="ru">
                                <DatePicker sx={{marginTop:2}} label="Выберите дату *"  minDate={dayjs.utc(todayDate)} maxDate={dayjs.utc('2024-01-01')} value={date} onChange={(newValue) => setDate(newValue)}/> 
                                {
                                  renderCheck ? <TimePicker sx={{marginTop:2}}  label="Время начала аренды *" value={time} minTime={dayjs.utc(`${todayDate}T${timeNow}`)} onChange={(newValue) => setTime(newValue)} /> :
                                  <TimePicker sx={{marginTop:2}}  label="Время начала аренды *" value={time} onChange={(newValue) => setTime(newValue)} />

                                }
                                
                                </LocalizationProvider>
                            </ThemeProvider> 
                        </Box>  

                        <FormControl required sx={{marginTop:2}}>
                        <InputLabel id="Duration">Длительность аренды</InputLabel>
                        <Select
                            labelId="Duration"
                            value={duration}
                            label="Длительность аренды *"
                            onChange={handleChangeDuration}
                        >
                            {
                                durationRange?.map((el,index)=>{
                                    return <MenuItem value={el} key={index}>{el}</MenuItem>
                                })
                            }
                            
                        </Select> 
                        <FormHelperText> Обязательное поле </FormHelperText>
                        </FormControl> 
                        

                        <TextField
                        label="Пожелания по аренде"
                        multiline
                        rows={6}
                        placeholder="Здесь вы можете оставить комментарий"
                        value={comment}
                        onChange={handleChangeComment}
                        sx={{marginTop:2}} /> 

                        <Box sx={{display:"flex", justifyContent:"space-around", marginTop:2, marginBottom:4}}>
                            <AlertDialog clearForm={clearForm}/>
                            <Button variant="contained" size="large" type="submit">Отправить</Button>
                        </Box>
                        </FormGroup>
                    </form>

    )
}