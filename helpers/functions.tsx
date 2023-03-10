import dayjs from "dayjs"

export const hourMessage = ()=>{
  const hourString :string =  dayjs().format('HH');
  const hour:number = parseInt(hourString)
  let message:string = '';
  switch (true) {
    case hour <= 10:
      message = 'Good Morning';
      break;
    case 11 <= hour && hour <= 17:
      message = 'Good Noon';
      break;
    case 18 <= hour:
      message = 'Good Night';
      break;
    default:
      break;
  }
  return message
}