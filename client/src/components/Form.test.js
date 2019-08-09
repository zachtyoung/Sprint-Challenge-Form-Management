import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import Form from './Form'

describe('<Form/>', () =>{
    it('renders without crashing', () =>{
        render(<Form/>);
    });
    it('submit', () =>{
        const {getByText} = render(<Form/>);
        getByText(/submit/i)
    });
    it('matches', () => {
        const { getByTestId } = render(<Form/>);
        const username = getByTestId('username');
        fireEvent.change(username, {target: {value: 'Demo'}});
        expect(username.value).toBe('Demo');
      });
      
}); 