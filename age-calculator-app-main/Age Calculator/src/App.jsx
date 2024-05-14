import { useState } from 'react'

function App() {
  const [required, setRequired] = useState("")
  const [req, setReq] = useState(false)
  const [years, setYears] = useState(null)
  const [months, setMonths] = useState(null)
  const [date, setDate] = useState(null)
  const [dateErr, setDateErr] = useState(false)
  const [monthErr, setMonthErr] = useState(false)
  const [yearErr, setYearErr] = useState(false)
  const leapYear = (year) => {
    if (year % 4 == 0 && (year % 400 == 0 || year % 100 != 0)) {
      return true;
    }
    return false;
  }
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const clean = () => {
    setDateErr(false)
    setMonthErr(false)
    setYearErr(false)
    setReq(false)
    setRequired("")
  }
  const submitHandler = (event) => {
    clean()

    const date = new Date();
    const d = Number.parseInt(event.target[0].value == "" ? 0 : event.target[0].value);
    const m = Number.parseInt(event.target[1].value == "" ? 0 : event.target[1].value);
    const y = Number.parseInt(event.target[2].value == "" ? 0 : event.target[2].value);
    if (d == 0 && m == 0 && y == 0) {
      setRequired("This field is required")
      setReq(true)
      console.log(req)
    }
    else {
      setReq(false);
      setRequired("")
    }
    if ((d > 31 || (m != 0 && days[m - 1] < d && m != 2) || (m == 2 && ((leapYear(y) && d > 29) || (!leapYear(y) && d > 28)))) || (isNaN(d) || (d == 0)) || (y == date.getFullYear() && m == date.getMonth() + 1 && d > date.getDay())) {
      console.log(date.getDay())
      setDateErr(true)
      console.log(req)
    }
    else {
      setDateErr(false)
    }
    if ((m > 12 || (y == date.getFullYear() && m > date.getMonth() + 1)) || (isNaN(m)) || m == 0) {
      setMonthErr(true)
      console.log(req)
    }
    else {
      setMonthErr(false);
    }

    if ((y > date.getUTCFullYear()) || isNaN(y) || y == 0 || (y < 1900)) {
      setYearErr(true);
      console.log(req)
    }
    if ((y > date.getUTCFullYear()) || isNaN(y) || y == 0 || (y < 1900) ||
      ((m > 12 || (y == date.getUTCFullYear() && m > date.getMonth())) || (isNaN(m)) || m == 0) || (d > 31 || (m != 0 && days[m - 1] < d && m != 2) || (m == 2 && ((leapYear(y) && d > 29) || (!leapYear(y) && d > 28)))) || (isNaN(d) || (d == 0) || (y == date.getFullYear() && m == date.getMonth() && d > date.getDay()))
    ) {

    }
    else {
      setYears((year) => {
        year = date.getFullYear() - y;
        return year;
      });
      setMonths((month) => {
        if ((m < (date.getMonth() + 1)) || ((m == (date.getMonth() + 1)) && d <= date.getDate())) {
          month = date.getMonth() + 1 - m;
          return month;
        }
        else {
          month = 12 + (date.getMonth() + 1) - m;
          setYears((y) => y - 1)
          return month;
        }
      })
      setDate((da) => {
        if (d <= date.getDate()) {
          da = date.getDate() - d;
          return da;
        } else {
          if (months == 1) {
            setMonths(11);
            setYears(years - 1);
          } else {
            setMonths((mo) => mo - 1);
          }
          da = getDiffDays(y, m) + date.getDate() - d;
          return da
        }
      })

    }
    const getDiffDays = (year, month) => {
      return new Date(year, month, 0).getDate();
    }
    // calcDiff(date, d, m, y);
    event.preventDefault();
    return true;
  }
  // const calcDiff = (date, d, m, y) => {
  //   if ((!req) && (!dateErr) && (!monthErr) && (!yearErr)) {
  //     setYears((date.getFullYear() - y))
  //   }
  //   console.log(date.getUTCFullYear(), d, m, y)
  //   console.log(dateErr, monthErr, yearErr)
  // }
  return (
    <>
      <div className="calculator">
        <div className="form-box">
          <form action="#" className="form" onSubmit={submitHandler}>
            <div className="inp-1">
              <label htmlFor="date" className={`label ${dateErr || monthErr || req || yearErr ? "error" : ""}`}>DAY</label>
              <input type="text" name="date" id="date" placeholder="DD" maxLength={2} className={`${dateErr || monthErr || req || yearErr ? "error inp-error" : ""}`} />
              {/* onChange={clean} */}
              <p className={`${dateErr || monthErr || req || yearErr ? "error" : ""}`} style={{ fontSize: "12px" }}>{dateErr ? "Must be a valid day" : required}</p>
            </div>
            <div className="inp-2">
              <label htmlFor="month" className={`label ${dateErr || monthErr || req || yearErr ? "error" : ""}`}>MONTH</label>
              <input type="text" name="month" id="month" placeholder="MM" maxLength={2} className={`${dateErr || monthErr || req || yearErr ? "error inp-error" : ""}`} />
              {/* onChange={clean} */}
              <p className={`${dateErr || monthErr || req || yearErr ? "error" : ""}`} style={{ fontSize: "12px" }} >{monthErr ? "Must be a valid month" : required}</p>
            </div>
            <div className="inp-3">
              <label htmlFor="year" className={`label ${dateErr || monthErr || req || yearErr ? "error" : ""}`}>YEAR</label>
              <input type="text" name="year" id="year" placeholder="YYYY" maxLength={4} className={`${dateErr || monthErr || req || yearErr ? "error inp-error" : ""}`} />
              {/* onChange={clean} */}
              <p className={`${dateErr || monthErr || req || yearErr ? "error" : ""}`} style={{ fontSize: "12px" }}>{yearErr ? "Must be a valid past" : required}</p>
            </div>
            <button className="arrow"></button>
          </form>
        </div>
        <h1><span className="values">{years == null ? "--" : ((!req) && (!dateErr) && (!monthErr) && (!yearErr)) ? years : "--"}</span> years</h1>
        <h1><span className="values">{months == null ? "--" : (!req) && (!dateErr) && (!monthErr) && (!yearErr) ? months : "--"}</span> months</h1>
        <h1><span className="values">{date == null ? "--" : ((!req) && (!dateErr) && (!monthErr) && (!yearErr)) ? date : "--"}</span> days</h1>
      </div>
    </>
  )
}

// I've just completed a front-end coding challenge from @frontendmentor! 🎉

// You can see my solution here: https://www.frontendmentor.io/solutions/age-calculator-app-4k4qx1JR6h

// Any suggestions on how I can improve are welcome!
export default App
