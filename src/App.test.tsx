import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store';

const ReduxProvider = ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
)

test('renders overview page with loading screen', async () => {
  render(<ReduxProvider><App /></ReduxProvider>, { wrapper: BrowserRouter });
  const loadingElement = screen.getByText(/Loading/i);
  expect(loadingElement).toBeInTheDocument();
  await screen.findByText(/Absence Manager/i)

});

test('renders overview page with data', async () => {
  render(<ReduxProvider><App /></ReduxProvider>, { wrapper: BrowserRouter });

  await screen.findByText('Mike')
});
