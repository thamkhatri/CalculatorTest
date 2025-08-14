import React, { useReducer } from 'react';
import {
  PageContainer,
  Card,
  InputGroup,
  GeneralError
} from '../Calculator.styles';

import InputField from '../InputField';
import CalculateButton from '../CalculateButton';
import AgeResult from '../AgeResult';

const FIELDS = ['day', 'month', 'year'];
const initialState = {
  day: '',
  month: '',
  year: '',
  errors: { day: '', month: '', year: '', general: '' },
  age: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    case 'CLEAR_ERRORS':
      return { ...state, errors: { day: '', month: '', year: '', general: '' } };
    case 'SET_AGE':
      return { ...state, age: action.age };
    case 'RESET_AGE':
      return { ...state, age: null };
    default:
      return state;
  }
}

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { day, month, year, errors, age } = state;

  const handleInputChange = (field, value) => {
    console.log('handleInputChange', field, value);
    dispatch({ type: 'SET_INPUT', field, value });
  };

  const calculateAge = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
      console.log('calculateAge called');
    let valid = true;

    const d_day = parseInt(day, 10);
    const d_month = parseInt(month, 10);
    const d_year = parseInt(year, 10);

    if (day) {
      if (isNaN(d_day) || d_day < 1 || d_day > 31) {
        dispatch({ type: 'SET_ERROR', field: 'day', message: 'Invalid day' });
        valid = false;
      }
    }
    if (!month) {
      dispatch({ type: 'SET_ERROR', field: 'month', message: 'Please enter month' });
      valid = false;
    } else if (isNaN(d_month) || d_month < 1 || d_month > 12) {
      dispatch({ type: 'SET_ERROR', field: 'month', message: 'Invalid month' });
      valid = false;
    }
    const currentYear = new Date().getFullYear();
    if (!year) {
      dispatch({ type: 'SET_ERROR', field: 'year', message: 'Please enter year' });
      valid = false;
    } else if (isNaN(d_year) || d_year < 1000 || d_year > currentYear) {
      dispatch({ type: 'SET_ERROR', field: 'year', message: 'Invalid year' });
      valid = false;
    }

    if (!valid) {
      dispatch({ type: 'RESET_AGE' });
      return;
    }

    const birth = new Date(d_year, d_month - 1, day ? d_day : 1);
    const today = new Date();

    if (birth > today || isNaN(birth.getTime())) {
      dispatch({ type: 'SET_ERROR', field: 'general', message: 'Please enter a valid date' });
      dispatch({ type: 'RESET_AGE' });
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += 30;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    dispatch({
      type: 'SET_AGE',
      age: { years, months, days: day ? days : null },
    });
  };

  return (
    <PageContainer>
      <Card>
        <InputGroup>
          {FIELDS.map((field) => (
            <InputField
              key={field}
              field={field}
              value={state[field]}
              error={errors[field]}
              onChange={handleInputChange}
              onEnter={calculateAge}
            />
          ))}
        </InputGroup>

        {errors.general && <GeneralError>{errors.general}</GeneralError>}

        <CalculateButton onClick={calculateAge} />

        <AgeResult age={age} showDays={!!day} />
      </Card>
    </PageContainer>
  );
};

export default Calculator;
