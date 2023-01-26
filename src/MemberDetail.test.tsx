import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { MemberDetail } from "./member_detail/MemberDetail"
import { store } from "./store"

test('Renders member detail page', async () => {
  render(<MemoryRouter initialEntries={['/member/1']}>
    <Provider store={store}><MemberDetail /></Provider>
  </MemoryRouter>)

  await screen.findByText(/member details/i)
})
