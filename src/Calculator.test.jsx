import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Components/Age';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Calculator component', () => {
    beforeEach(() => {
        render(<Calculator />);
    });

    it('renders input fields and button', () => {
        expect(screen.getByTestId('input-day')).toBeInTheDocument();
        expect(screen.getByTestId('input-month')).toBeInTheDocument();
        expect(screen.getByTestId('input-year')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    it('shows validation errors if fields are empty', () => {
        fireEvent.click(screen.getByTestId('submit-button'));
        // expect(screen.getByTestId('error-day')).toBeInTheDocument();
        expect(screen.getByTestId('error-month')).toBeInTheDocument();
        expect(screen.getByTestId('error-year')).toBeInTheDocument();

    });

    it('shows error on invalid date input', () => {
        fireEvent.change(screen.getByTestId('input-day'), { target: { value: '32' } });
        fireEvent.change(screen.getByTestId('input-month'), { target: { value: '13' } });
        fireEvent.change(screen.getByTestId('input-year'), { target: { value: 'abc' } });
        fireEvent.click(screen.getByTestId('submit-button'));

        expect(screen.getByTestId('error-day')).toBeInTheDocument();
        expect(screen.getByTestId('error-month')).toBeInTheDocument();
        expect(screen.getByTestId('error-year')).toBeInTheDocument();

    });

    it('shows correct age for a valid input', () => {
        const today = new Date();
        const birthYear = today.getFullYear() - 20;
        const birthMonth = today.getMonth() + 1;
        const birthDay = today.getDate();

        fireEvent.change(screen.getByTestId('input-day'), { target: { value: birthDay.toString() } });
        fireEvent.change(screen.getByTestId('input-month'), { target: { value: birthMonth.toString() } });
        fireEvent.change(screen.getByTestId('input-year'), { target: { value: birthYear.toString() } });

        fireEvent.click(screen.getByTestId('submit-button'));

        // Instead of getByText, you could check output spans by ID or testid, for example:
        expect(document.getElementById('output-years').textContent.trim()).toBe('20');
        expect(document.getElementById('output-months').textContent.trim()).toMatch(/\d+/);  // some months number
        expect(document.getElementById('output-days').textContent.trim()).toMatch(/\d+/);    // some days number
    });

    it('shows error for future date', () => {
        const nextYear = new Date().getFullYear() + 1;

        fireEvent.change(screen.getByTestId('input-day'), { target: { value: '1' } });
        fireEvent.change(screen.getByTestId('input-month'), { target: { value: '1' } });
        fireEvent.change(screen.getByTestId('input-year'), { target: { value: nextYear.toString() } });

        fireEvent.click(screen.getByTestId('submit-button'));

        // Since your component sets yearError, check for that error using testid:
        expect(screen.getByTestId('error-year')).toBeInTheDocument();
        expect(screen.getByTestId('error-year').textContent).toMatch(/invalid year/i);
    });


    it('displays the exact calculated age correctly', () => {
        // Setup birth date and today’s date info
        const input_date = new Date(2025, 7, 7); // August 4, 2025 (month 0-based)
        const birthDate = new Date(2000, 4, 15); // May 15, 2000

        let years = input_date.getFullYear() - birthDate.getFullYear(); // 25
        let months = input_date.getMonth() - birthDate.getMonth(); // 7 - 4 = 3
        let days = input_date.getDate() - birthDate.getDate(); // 4 - 15 = -11

        if (days < 0) {
            months--;
            days += 30; // Approximate
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        // Fire events on inputs
        fireEvent.change(screen.getByTestId('input-day'), { target: { value: '15' } });
        fireEvent.change(screen.getByTestId('input-month'), { target: { value: '5' } });
        fireEvent.change(screen.getByTestId('input-year'), { target: { value: '2000' } });

        // Click the calculate button
        fireEvent.click(screen.getByTestId('submit-button'));

        // Assert outputs using document.getElementById
        expect(document.getElementById('output-years').textContent.trim()).toBe(years.toString());
        expect(document.getElementById('output-months').textContent.trim()).toBe(months.toString());
        expect(document.getElementById('output-days').textContent.trim()).toBe(days.toString());

    });
    it('calculates age without day (only month and year)', () => {
    const today = new Date();
    const birthYear = today.getFullYear() - 10;
    const birthMonth = today.getMonth() + 1;

    // Leave day empty
    fireEvent.change(screen.getByTestId('input-month'), { target: { value: birthMonth.toString() } });
    fireEvent.change(screen.getByTestId('input-year'), { target: { value: birthYear.toString() } });

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(document.getElementById('output-years').textContent.trim()).toBe('10');
    expect(document.getElementById('output-months').textContent.trim()).toMatch(/\d+/);
    expect(document.getElementById('output-days').textContent.trim()).toBe('--'); // Day not shown
});


});
