import LoginForm from '@components/login/loginForm';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: any) => {
      switch (key) {
        case 'login.email':
          return 'Email';
        case 'login.password':
          return 'Password';
        case 'login.login':
          return 'Login';
        case 'login.errorMessage':
          return 'Invalid credentials';
        case 'login.statusMessage':
          return 'Logged in successfully';
        case 'login.register':
          return 'Register';
        default:
          return key;
      }
    },
  }),
}));

jest.mock('@services/userService', () => ({
  loginUser: jest.fn(),
}));

window.React = React;

test('renders email and password fields', () => {
  render(<LoginForm />);

  expect(screen.getByLabelText('Email'));
  expect(screen.getByLabelText('Password'));
});

test('submits form with valid data', async () => {
    const mockLoginUser = require('@services/userService').loginUser;
    mockLoginUser.mockResolvedValueOnce({ email: 'johndoe@gmail.com' });
  
    render(<LoginForm />);
  
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'johndoe@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByText('Login'));
  
    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith('johndoe@gmail.com', 'password123');
      expect(screen.getByText('Logged in successfully'))
    });
});

test('displays error message on invalid login', async () => {
    const mockLoginUser = require('@services/userService').loginUser;
    mockLoginUser.mockRejectedValueOnce(new Error('Invalid credentials'));
  
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'wrongemail@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    
    fireEvent.click(screen.getByText('Login'));
  
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials'))
  });
});

test('displays generic error message on unexpected error', async () => {
    const mockLoginUser = require('@services/userService').loginUser;
    mockLoginUser.mockRejectedValueOnce('Unexpected error');
  
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'wrongemail@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    
    fireEvent.click(screen.getByText('Login'));
  
    await waitFor(() => {
      expect(screen.getByText('An unexpected error occurred'))
    });
});


  
  