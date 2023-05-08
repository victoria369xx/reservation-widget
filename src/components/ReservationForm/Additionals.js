import {Box, Typography, FormControlLabel, Checkbox} from '@mui/material';
export function Additionals () {
    return (
        <>
            <Box> 
              <Typography variant="h5" gutterBottom>
                Дополнительные услуги
              </Typography>
              <Typography variant="subtitle1" sx={{textAlign:'justify'}}>
                Если вы еще не знаете, какие услуги вам понадобятся, вы можете оставить поля пустыми — наш менеджер проконсультирует вас при подтверждении бронирования.
              </Typography> 
              <Typography variant="h6" sx={{mt:2}}>
                Выберите рассадку 
              </Typography>
              <Box>
              <FormControlLabel control={<Checkbox/>} label="Театр" /> 
              <FormControlLabel control={<Checkbox/>} label="Класс" /> 
              <FormControlLabel control={<Checkbox/>} label="U-образная"/>
              <FormControlLabel control={<Checkbox/>} label="Банкет" />
              </Box> 
              <Typography variant="h6" sx={{mt:2}}>
                 Выберите оборудование 
              </Typography>
              <Box>
              <FormControlLabel control={<Checkbox/>} label="Ноутбук" /> 
              <FormControlLabel control={<Checkbox/>} label="Экран и проектор" />
              <FormControlLabel control={<Checkbox/>} label="Кликер" />
              </Box> 
              <Typography variant="h6" sx={{mt:2}}>
                Выберите питание
              </Typography>
              <Box>
              <FormControlLabel control={<Checkbox/>} label="Кофе-брейк" />
              <FormControlLabel control={<Checkbox/>} label="Бизнес-ланч" />
              <FormControlLabel control={<Checkbox/>} label="Кулер" />
              </Box>
        </Box>
        </>
    )
}