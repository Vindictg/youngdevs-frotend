import React from 'react';
import { render, screen } from '@testing-library/react';

import Login from './Login';

describe('Login page tests', () => {
  test('when login page is rendered it should show login button', () => {
    // given
    const loginPage = <Login />;

    // when
    render(loginPage);
    const linkElement = screen.getByText(/Google login/i);

    // then
    expect(linkElement).toBeInTheDocument();
  });
});
