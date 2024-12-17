import LoginOverview from '@components/home/loginOverview';
import { render, screen } from '@testing-library/react';
import React from 'react';

window.React = React;

jest.mock('next-i18next', () => ({
    useTranslation: () => ({
        t: (key : any) => {
            switch (key) {
                case 'logingegevens.email':
                    return 'Email';
                case 'logingegevens.password':
                    return 'Password';
                case 'logingegevens.role':
                    return 'Role';
                default:
                    return key;
            }
        },
    }),
}));

test('When going to home page, a table is rendered with john doe email inside of it', async () => {
    render(<LoginOverview />);

    expect(screen.getByText('johndoe@gmail.com'))

})

test('When going to home page, a table is rendered with john doe password inside of it', async () => {
    render(<LoginOverview />);

    expect(screen.getByText('john'))

})

test('When going to home page, a table is rendered with john doe role inside of it', async () => {
    render(<LoginOverview />);

    expect(screen.getByText('admin'))

})

test('When going to home page, a table is rendered with jane doe email inside of it', async () => {
    render(<LoginOverview />);

    expect(screen.getByText('janedoe@gmail.com'))
})

test('When going to home page, a table is rendered with jane doe password inside of it', async () => {
    render(<LoginOverview />);

    expect(screen.getByText('jane'))

})

test('When going to home page, a table is rendered with jane doe role inside of it', async () => {
    render(<LoginOverview />);

    expect(screen.getByText('visitor'))

})  

test('When going to home page, a table is rendered with mikel jordan email inside of it', async () => {
    render(<LoginOverview />);

    expect(screen.getByText('mikeljordan@gmail.com'))

})

test('When going to home page, a table is rendered with mikel jordan password inside of it', async () => {
    render(<LoginOverview />);

    expect(screen.getByText('baseball'))

})

test('When going to home page, a table is rendered with mikel jordan role inside of it', async () => {
    render(<LoginOverview />);

    expect(screen.getByText('player'))

})

test('When going to home page, a table is rendered', () => {
    render(<LoginOverview />);
    const table = screen.getByRole('table')
    expect(table)
});

test('When going to home page, table headers are rendered correctly', () => {
    render(<LoginOverview />);
    expect(screen.getByText('Email'))
    expect(screen.getByText('Password'))
    expect(screen.getByText('Role'))
});

