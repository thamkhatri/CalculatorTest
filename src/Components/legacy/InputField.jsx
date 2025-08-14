import React from 'react';
import { InputWrapper, Label, Input, ErrorText } from '../Calculator.styles';



const InputField = ({ field, value, error, onChange, onEnter }) => {
  if (!field) {
    console.error('InputField: "field" prop is missing or undefined');
    return null; // or fallback UI
  }

  return (
    <InputWrapper>
      <Label htmlFor={`input-${field}`}>
        {field.toUpperCase()}
      </Label>
      <Input
        id={`input-${field}`}
        data-testid={`input-${field}`}
        type="text"
        placeholder={field === 'year' ? 'YYYY' : field === 'month' ? 'MM' : 'DD'}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onEnter()}
        hasError={!!error}
      />
      {error && <ErrorText data-testid={`error-${field}`}>{error}</ErrorText>}
    </InputWrapper>
  );
};

export default InputField;
