import React from 'react';
import { AgeDisplay, AgeLine, AgeNumber, AgeLabel } from '../Calculator.styles';

const AgeResult = ({ age, showDays }) => {
  return (
    <AgeDisplay>
      <AgeLine>
        <AgeNumber id="output-years">{age ? age.years : '--'}</AgeNumber>
        <AgeLabel>years</AgeLabel>
      </AgeLine>
      <AgeLine>
        <AgeNumber id="output-months">{age ? age.months : '--'}</AgeNumber>
        <AgeLabel>months</AgeLabel>
      </AgeLine>
      <AgeLine>
        <AgeNumber id="output-days">
          {showDays && age ? age.days : '--'}
        </AgeNumber>
        <AgeLabel>days</AgeLabel>
      </AgeLine>
    </AgeDisplay>
  );
};

export default AgeResult;
