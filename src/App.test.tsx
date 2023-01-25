import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store';

const ReduxProvider = ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
)

test('renders overview page with loading screen', () => {
  render(<ReduxProvider><App /></ReduxProvider>, { wrapper: BrowserRouter });

  const headerElement = screen.getByText(/Absence Manager/i);
  const absenceTypeElement = screen.getByText(/ABSENCE TYPE/i);
  const loadingElement = screen.getByText(/Loading/i);
  expect(loadingElement).toBeInTheDocument();
  expect(headerElement).toBeInTheDocument();
  expect(absenceTypeElement).toBeInTheDocument();
});

test('renders overview page with data', async () => {
  render(<ReduxProvider><App /></ReduxProvider>, { wrapper: BrowserRouter });

  await screen.findByText('Mike')
});
