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

test('When going to login page, a form is loaded with Email and Password', () => {
  render(<LoginForm />);

  expect(screen.getByLabelText('Email'));
  expect(screen.getByLabelText('Password'));
});

test('When on login page, and you try to log in with correct data, you get logged in', async () => {
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

test('When you are on login page, and you enter wrong data, you get error messages', async () => {
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

test('When on login page and you enter wrong data, you get error message', async () => {
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


  
  