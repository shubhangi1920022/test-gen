import React from 'react';
import { render } from '@testing-library/react';
import Nav from '../components/Nav';

test('renders component on the screen', () => {
    // Render the component
    const { getByTestId } = render(<Nav />);
  
    // Query for an element using data-testid (you can use other query functions too)
    const componentElement = getByTestId('nav');
  
    // Assert that the element is present on the screen
    expect(componentElement).toBeInTheDocument();
  });
  
describe('Nav Component', () => {

    test('test',()=>{
        expect(true).toBe(true);
    })

    test('test false ',()=>{
        expect(true).toBe(false);
    })

})
