import React, { useState } from 'react'
import "../style/componentPrincipal.css"
import IconButton from "../images/icon-arrow.svg";


export const ComponentPrincipal = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState(false);
    const [age, setAge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de campos vacíos
        if (!day || !month || !year) {
            setError('Todos los campos son requeridos.');
            return;
        }

        const birthdate = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();

        // Validación de fecha válida
        if (isNaN(birthdate.getTime())) {
            setError('La fecha de nacimiento no es válida.');
            return;
        }

        // Validación de fecha en el futuro
        if (birthdate.getTime() > currentDate.getTime()) {
            setError('La fecha de nacimiento no puede estar en el futuro.');
            return;
        }

        const ageYears = currentDate.getFullYear() - birthdate.getFullYear();
        const ageMonths = currentDate.getMonth() - birthdate.getMonth();
        const ageDays = currentDate.getDate() - birthdate.getDate();

        // // Corrección de meses y días negativos
        if (ageMonths < 0 || (ageMonths === 0 && currentDate.getDate() < birthdate.getDate())) {
            ageYears--;
            ageMonths += 12;
        }

        // if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    setAge({
        years: ageYears,
        months: ageMonths,
        days: ageDays
    });
    setError('');



    return (
        <div className="container">


            <form onSubmit={handleSubmit}>

                <div className="container_box_input">
                    <div className="box_input">
                        <h6>DAY</h6>
                        <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder="DD" maxLength="2" min="1" max="31" />
                        <div className="error">{error}</div>
                    </div>

                    <div className="box_input">
                        <h6>MONTH</h6>
                        <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="MM" maxLength="2" />
                        <div className="error">{error}</div>
                    </div>

                    <div className="box_input">
                        <h6>YEAR</h6>
                        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="YYY" maxLength="4" />
                        <div className="error">{error}</div>
                    </div>
                </div>

                <div className="container_button">
                    <div className="line"></div>
                    <button>
                        <img src={IconButton} alt="iconButton" />
                    </button>

                </div>


                <div className="results">
                    <span>{age.years}</span>years
                </div>
                <div className="results">
                    <span>{age.months}</span>months
                </div>
                <div className="results">
                    <span>{age.days}</span> days
                </div>
            </form >
        </div>

    )

}


export default ComponentPrincipal;