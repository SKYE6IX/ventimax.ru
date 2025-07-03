import { render, screen } from '@testing-library/react';
import Logo from '@/components/logo/Logo';

describe('Logo', () => {
  it('render company title', () => {
    render(<Logo />);
    const title = screen.getByText('Ventimax');
    expect(title).toBeInTheDocument();
  });

  it('render company logo', () => {
    render(<Logo />);
    const image = screen.getByAltText('company logo');
    expect(image).toBeInTheDocument();
  });
});
