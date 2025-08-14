import React from 'react';
import { DividerWrapper, DividerLine, CalculateButton as StyledButton } from './Calculator.styles';

interface CalculateButtonProps {
  onClick: () => void;
}

const CalculateButton: React.FC<CalculateButtonProps> = ({ onClick }) => {
  return (
    <DividerWrapper>
      <DividerLine />
      <StyledButton
        id="calculate-button"
        data-testid="submit-button"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </StyledButton>
    </DividerWrapper>
  );
};

export default CalculateButton;
