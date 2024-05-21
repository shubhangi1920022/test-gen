import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders the component correctly', () => {
  render(<MyComponent />);
  const element = screen.getByText(/hello world/i);
  expect(element).toBeInTheDocument();
});

test('handles button click', () => {
  render(<MyComponent />);
  const button = screen.getByRole('button', { name: /click me/i });
  fireEvent.click(button);
  const output = screen.getByText(/button clicked/i);
  expect(output).toBeInTheDocument();
});
