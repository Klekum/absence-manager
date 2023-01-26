import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { Routing } from './Routing';
import { store } from './store';

const ReduxProvider = ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
)

test('renders overview page with data', async () => {
  render(<Routing />, { wrapper: ReduxProvider });

  await screen.findByText('Mike')
});

test('renders member detail page on click', async () => {
  render(<Routing />, { wrapper: ReduxProvider });

  await screen.findByText('Mike')
  const memberLink = screen.getByText('Mike')
  act(() => {
    memberLink.click()
  });
  await screen.findByText(/Member Detail/i)
})