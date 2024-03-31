import { useState } from 'react'
import './App.css'
import arrow from "./assets/images/arrow.svg"


function App() {
  const [userdata, setUserdata] = useState({
    day: '',
    month: '',
    year: ''
  });

  const [requiredDay, setRequiredDay] = useState(null);
  const [requiredMonth, setRequiredMonth] = useState(null);
  const [requiredYear, setRequiredYear] = useState(null);

  const [validDay, setValidDay] = useState(null);
  const [validMonth, setValidMonth] = useState(null);
  const [validYear, setValidYear] = useState(null);
  const [validDate, setValidDate] = useState(null);
  const [finalOutput, setFinalOutput] = useState(null)

  const [yearOld, setYearOld] = useState(0);
  const [monthOld, setMonthOld] = useState(0);
  const [dayOld, setDayOld] = useState(0);

  let currentDate = new Date();
  let date = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();


  const handleChange = (event) => {
    let { name, value } = event.target;
    if(/^\d*$/.test(value)) {

      // console.log(event.target);
      setUserdata({
        ...userdata,
        [name]: parseInt(value) || ''
      });
    }
    console.log(userdata);
    if (event.target.name === 'day') {
      setRequiredDay(false);
      setValidDay(false);
      setValidDate(false);
    }
    else if (event.target.name == 'month') {
      setRequiredMonth(false);
      setValidMonth(false);
    }
    else if (event.target.name == 'year') {
      setRequiredYear(false);
      setValidYear(false);
    }
  }

  const handleClick = (event) => {
    if (userdata.day === '') {
      setRequiredDay(true)
    }
    if (userdata.month === '') {
      setRequiredMonth(true)
    }
    if (userdata.year === '') {
      setRequiredYear(true)
    }

    if (userdata.day < 0 || userdata.day > 31) {
      setValidDay(true)
    }
    if (userdata.month < 0 || userdata.month > 12) {
      setValidMonth(true);
    }
    if (userdata.year < 0 || userdata.year > year) {
      setValidYear(true);
    }

    if ((userdata.month === 2 && ((userdata.year % 4 === 0 && userdata.year % 100 === 0 && userdata.year % 400 === 0)?(userdata.day > 29):(userdata.day > 28))) || (userdata.month === 4 && userdata.day === 31) || (userdata.month === 6 && userdata.day === 31) || (userdata.month === 9 && userdata.day === 31) || (userdata.month === 11 && userdata.day === 31)) {
      setValidDate(true);
    }

    if((requiredDay === false && requiredMonth  === false && requiredYear === false && validDay === false && validMonth === false && validYear === false && validDate === false)) {

      let year_old = year - userdata.year;
      let month_old = month - userdata.month + 1;
      let day_old = date - userdata.day;
      
      if (day_old < 0) {
        month_old -= 1;
        var previousMonthDays = new Date(year, month, 0).getDate();
        day_old += previousMonthDays
      }
      
      if(month_old < 0) {
        year_old -= 1;
        month_old += 12;
      }
      console.log(year_old, month_old, day_old);
      if (year_old > 0 && month_old > 0 && day_old > 0) {
        setYearOld(year_old);
        setMonthOld(month_old);
        setDayOld(day_old);
        setFinalOutput(true);
      }
    }
  }

  return (
    <>
      <div className="container md:w-[820px] w-[90%] md:h-[510px] bg-white md:absolute md:top-0 md:left-0 md:bottom-0 md:right-0 md:m-auto mx-auto rounded-3xl md:rounded-br-[11.5rem] rounded-br-[7.5rem] my-8 md:my-auto">
        <div className="user-input flex md:gap-10 gap-4 md:p-10 p-4 pb-2">
          <label htmlFor="dd">
            <p className={`font-semibold text-gray-500 pb-1 ${(requiredDay || validDate || validDay)?'text-red-400':''}`}>DAY</p>
            <input value={userdata.day} onChange={handleChange} className={`border-2 py-2.5 md:text-xl text-lg px-2 rounded-lg md:w-36 w-[90%] font-bold outline-none focus:border-[#854dff] ${(requiredDay || validDate || validDay)?'border-red-400':''}`} type="number" name="day" id="dd" placeholder='DD' />
            {requiredDay &&
                <p className='text-sm pt-2 text-[#ff5757]'>This field is required</p>
            }
            {validDay &&
              <p className='text-sm pt-2 text-[#ff5757]'>Must be a valid day</p>
            }
            {validDate &&
              <p className='text-sm pt-2 text-[#ff5757]'>Must be a valid date</p>
            }
          </label>
          <label htmlFor="mm">
            <p className={`font-semibold text-gray-500 pb-1 ${(requiredMonth || validMonth)?'text-red-400':''}`}>MONTH</p>
            <input value={userdata.month} onChange={handleChange} className={`border-2 py-2.5 md:text-xl text-lg px-2 rounded-lg md:w-36 w-[90%] font-bold outline-none focus:border-[#854dff] ${(requiredMonth || validMonth)?'border-red-400':''}`} type="number" name="month" id="mm" placeholder='MM' />
            {requiredMonth &&
              <p className='text-sm pt-2 text-[#ff5757]'>This field is required</p>
            }
            {validMonth &&
              <p className='text-sm pt-2 text-[#ff5757]'>Must be a valid month</p>
            }
          </label>
          <label htmlFor="yy">
            <p className={`font-semibold text-gray-500 pb-1 ${(requiredYear || validYear)?'text-red-400':''}`}>YEAR</p>
            <input value={userdata.year} onChange={handleChange} className={`border-2 py-2.5 md:text-xl text-lg px-2 rounded-lg md:w-36 w-[90%] font-bold outline-none focus:border-[#854dff] ${(requiredYear || validYear)?'border-red-400':''}`} type="number" name="year" id="yy" placeholder='YYYY' />
            {requiredYear &&
              <p className='text-sm pt-2 text-[#ff5757]'>This field is required</p>
            }
            {validYear &&
              <p className='text-sm pt-2 text-[#ff5757]'>Must be in the past</p>
            }
            
          </label>
        </div>
        <div className="submit flex md:px-10 px-4 items-center">
          <div className="line w-[45%] md:w-[90%] h-0.5 bg-[#e9e8e8]"></div>
          <button onClick={handleClick} className='bg-[#854dff] hover:bg-black p-4 rounded-full' type="submit"><img className='md:w-10 w-8' src={arrow} alt="arrow icon" /></button>
          <div className="md:hidden block line w-[45%] md:w-[90%] h-0.5 bg-[#e9e8e8]"></div>
        </div>
        {
        <div className="user-output md:px-10 px-4 md:text-7xl text-5xl font-extrabold flex flex-col gap-4 py-4">
          <p><span className='text-[#854dff]'>{finalOutput?yearOld:'--'}</span>years</p>
          <p><span className='text-[#854dff]'>{finalOutput?monthOld:'--'}</span>months</p>
          <p><span className='text-[#854dff]'>{finalOutput?dayOld:'--'}</span>days</p>
        </div>
        }
      </div>
    </>
  )
}

export default App
