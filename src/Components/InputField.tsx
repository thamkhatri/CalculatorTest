
import React from 'react';
import { InputWrapper, Label, Input, ErrorText } from './Calculator.styles';

type Field = 'day' | 'month' | 'year';

interface InputFieldProps {
  field: Field;
  value: string;
  error?: string;
  onChange: (field: Field, value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ field, value, error, onChange }) => {
  if (!field) {
    console.error('InputField: "field" prop is missing or undefined');
    return null;
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
        hasError={!!error}
      />
      {error && <ErrorText data-testid={`error-${field}`}>{error}</ErrorText>}
    </InputWrapper>
  );
};

export default InputField;
