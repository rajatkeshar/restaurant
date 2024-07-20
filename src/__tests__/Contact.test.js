import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Contact from '../components/Contact';


describe('Contact us test cases', () => {
    it('should load contact us component', ()=> {
        render(<Contact />)
    
        const heading = screen.getByRole('heading');
    
        expect(heading).toBeInTheDocument();
    })
});