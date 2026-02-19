import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { StarIcon } from './StarIcon';

describe('StarIcon', () => {
  it('render_whenFull_usesPrimaryVividFillAndStroke', () => {
    const { container } = render(<StarIcon fill="full" />);

    const path = container.querySelector('path');
    expect(path).toHaveAttribute('fill', 'var(--color-primary-vivid)');
    expect(path).toHaveAttribute('stroke', 'var(--color-primary-vivid)');
  });

  it('render_whenEmpty_usesTransparentFillAndStarEmptyStroke', () => {
    const { container } = render(<StarIcon fill="empty" />);

    const path = container.querySelector('path');
    expect(path).toHaveAttribute('fill', 'transparent');
    expect(path).toHaveAttribute('stroke', 'var(--color-star-empty)');
  });

  it('render_whenHalf_rendersGradientWithPrimaryVivid', () => {
    const { container } = render(<StarIcon fill="half" />);

    const stops = container.querySelectorAll('stop');
    expect(stops).toHaveLength(2);
    expect(stops[0]).toHaveAttribute('stop-color', 'var(--color-primary-vivid)');
    expect(stops[1]).toHaveAttribute('stop-color', 'transparent');
  });

  it('render_whenHalf_usesGradientFillAndPrimaryVividStroke', () => {
    const { container } = render(<StarIcon fill="half" />);

    const path = container.querySelector('path');
    const gradient = container.querySelector('linearGradient');
    expect(path).toHaveAttribute('fill', `url(#${gradient?.id})`);
    expect(path).toHaveAttribute('stroke', 'var(--color-primary-vivid)');
  });

  it('render_setsAriaHidden', () => {
    const { container } = render(<StarIcon fill="full" />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('render_whenCustomSize_appliesSizeToSvg', () => {
    const { container } = render(<StarIcon fill="full" size={32} />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });
});
