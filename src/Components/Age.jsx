import React, { useState } from 'react';
const Calculator = () => {
    const [day, setday] = useState("")
    const [month, setmonth] = useState("")
    const [year, setyear] = useState("")
    const [age, setage] = useState(null)
    const [dayError, setDayError] = useState("");
    const [monthError, setMonthError] = useState("");
    const [yearError, setYearError] = useState("");
    const [error, setError] = useState("");

    const calulate_age = () => {
        let valid = true;

        //   reset for all errors 
        setDayError("");
        setMonthError("");
        setYearError("");
        setError("");
        const d_day = parseInt(day, 10);
        const d_month = parseInt(month, 10);
        const d_year = parseInt(year, 10);

        if (day) {
            if (isNaN(d_day) || d_day < 1 || d_day > 31) {
                setDayError("Invalid day");
                valid = false;
            }
        }
        if (!month) {
            setMonthError("Please enter month");
            valid = false;
        } else if (isNaN(d_month) || d_month < 1 || d_month > 12) {
            setMonthError("Invalid month");
            valid = false;
        }

        if (!year) {
            setYearError("Please enter Year");
            valid = false;
        } else if (isNaN(d_year) || d_year < 1000 || year > new Date().getFullYear()) {
            setYearError("Invalid year");
            valid = false;
        }
        if (!valid) {
            setage(null)
            return;
        }
      const birth = new Date(d_year, d_month - 1, day ? d_day : 1); // use 1 if day is not provided

        const today = new Date();

        if (birth > today || isNaN(birth)) {
            setError("Please enter valid date")
            setage(null)
            return;

        }
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();
        if (days < 0) {
            months--;
            days = days + 30;
        }
        if (months < 0) {
            years--;
            months = months + 12;
        }
        setage({ years, months, days })
        if (!day) {
            setage({ years, months, days: null }); // or days: undefined
        } else {
            setage({ years, months, days });
        }


    }

    return (
        <div className='min-h-screen bg-gray-100 flex items-center  justify-center p-4 '>
            <div className='bg-white p-8  rounded-2xl rounded-br-[100px] shadow-sm w-full  max-w-lg relative '>
                <div className='flex gap-4 mb-8'>
                    <div className='flex flex-col'>
                        <label className="text-xs tracking-widest font-bold  text-gray-600 mb-1  flex justify-start">DAY </label>
                        <input
                            id="input-day"
                            data-testid="input-day"
                            type="text"
                            placeholder="DD"
                            value={day}
                            onChange={(e) => setday(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && calulate_age()}
                            className={`w-25 px-3 py-2 border rounded-lg font-bold text-2xl text-gray-300 focus:outline-purple-500 ${dayError ? "border-red-500" : ""}`}
                        />
                        {dayError && <span data-testid="error-day" className="text-red-500 text-xs mt-1">{dayError}</span>}

                    </div>
                    <div className='flex flex-col'>
                        <label className="text-xs  text-gray-600 mb-1 font-bold tracking-widest flex justify-start">MONTH </label>
                        <input
                            id="input-month"
                            data-testid="input-month"
                            type="text"
                            placeholder="MM"
                            value={month}
                            onChange={(e) => setmonth(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && calulate_age()}
                            className={`w-25 px-3 py-2 border rounded-lg font-bold text-2xl text-gray-300 focus:outline-purple-500 ${monthError ? "border-red-500" : ""}`}
                        />
                        {monthError && <span data-testid="error-month" className="text-red-500 text-xs mt-1">{monthError}</span>}
                    </div>

                    <div className='flex flex-col'>
                        <label className="text-xs tracking-widest font-bold text-gray-600 mb-1  flex justify-start">YEAR </label>
                        <input
                            id="input-year"
                            data-testid="input-year"
                            type="text"
                            placeholder='YYYY'
                            value={year}
                            onChange={(e) => setyear(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && calulate_age()}
                            className={`w-25 px-3 py-2 border rounded-lg font-bold text-2xl text-gray-300 focus:outline-purple-500 ${yearError ? "border-red-500" : ""}`}
                        />
                        {yearError && <span data-testid="error-year" className="text-red-500 text-xs mt-1">{yearError}</span>}
                    </div>


                </div>
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-left">{error}</p>
                )}

                {/* Divider with button  */}

                <div className='realtive my-6 bg-amber-300 '>
                    <hr className='border-t border-gray-200' />
                    <button
                        id="calculate-button"
                        data-testid="submit-button"
                        onClick={calulate_age}
                        className="absolute right-0 top-32 bg-purple-600 p-4  px- rounded-full text-white hover:bg-purple-700 transition">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>

                    </button>
                </div>


                {/* /* Age Display */}
                <div className="text-5xl font-bold leading-snug tracking-wide text-black space-y-2">
                    <p className="flex justify-start">
                        <span id="output-years" className="text-purple-600 italic text-6xl">{age ? `${age.years}` : "--"}{" "}</span>
                        <span className="italic text-6xl ">years</span>
                    </p>
                    <p className="flex justify-start">
                        <span id="output-months" className="text-purple-600 italic text-6xl">{age ? `${age.months}` : "--"}{" "}</span>
                        <span className="italic text-6xl">months</span>
                    </p>
                    <p className="flex justify-start">
                        <span id="output-days" className="text-purple-600 italic text-6xl">
                            {day && age ? `${age.days}` : "--"}{" "}
                        </span>

                        <span className="italic text-6xl">days</span>
                    </p>
                </div>

            </div>
        </div>
    )


}
export default Calculator