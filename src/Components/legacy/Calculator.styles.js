// Calculator.styles.js
import styled, { css } from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1.5rem;
  border-bottom-right-radius: 100px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
  width: 100%;
  max-width: 32rem;
  position: relative;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: #4b5563;
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: flex-start;
`;


export const Input = styled.input`
  width: 6rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: #9ca3af;
  outline-color: #7c3aed;

  ${(props) =>
    props.hasError &&
    css`
      border-color: #ef4444;
    `}
`;

export const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const GeneralError = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-align: left;
`;

export const DividerWrapper = styled.div`
  position: relative;
  margin: 1.5rem 0;
  background-color: #fbbf24;
`;

export const DividerLine = styled.hr`
  border-top: 1px solid #e5e7eb;
  margin: 0;
`;

export const CalculateButton = styled.button`
  position: absolute;
  right: 0;
  top: -1.5rem;
  background-color: #7c3aed;
  padding: 1rem;
  border-radius: 9999px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #6d28d9;
  }

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

export const AgeDisplay = styled.div`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.05em;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AgeLine = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;

`;

export const AgeNumber = styled.span`
  color: #7c3aed;
  font-style: italic;
  font-size: 3.75rem;
  margin-right: 0.25rem;
`;

export const AgeLabel = styled.span`
  font-style: italic;
  font-size: 3rem;
`;
