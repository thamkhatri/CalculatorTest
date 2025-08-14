
import ErrorBoundary from './Components/ErrorBoundary';
import CalculatorTs from './Components/Updated_Claculator';
function App() {
  return (
    <>
      <ErrorBoundary>
        <CalculatorTs />
      </ErrorBoundary>
    </>
  )
}

export default App
