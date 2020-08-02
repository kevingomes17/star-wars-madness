import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import Films from '../components/films';

afterEach(cleanup);

it('renders EMPTY component', () => {
    const { getByTestId } = render(<Films />);
    expect(getByTestId('films')).toBeEmpty();
});

it('renders non-EMPTY component', () => {
    const mockData = {
        results: [
            { title: '' }
        ]
    };
    const { getByTestId } = render(<Films data={mockData} />);
    expect(getByTestId('films')).not.toBeEmpty();
});

it('data is default sorted by Title', () => {
    const mockData = {
        results: [
            { title: 'The Empire Strikes Back', episode_id: 5, release_date: '1980-05-17', director: 'Irvin Kershner' },
            { title: 'A New Hope', episode_id: 4, release_date: '1977-05-25', director: 'George Lucas' }
        ]
    };
    const { getByTestId, getByText } = render(<Films data={mockData} />);
    expect(getByTestId('record-0')).toHaveTextContent('A New Hope');
});

it('descending sort on the Title works', () => {
    const mockData = {
        results: [
            { title: 'The Empire Strikes Back', episode_id: 5, release_date: '1980-05-17', director: 'Irvin Kershner' },
            { title: 'A New Hope', episode_id: 4, release_date: '1977-05-25', director: 'George Lucas' }
        ]
    };
    const { getByTestId, getByText } = render(<Films data={mockData} />);
    fireEvent.click(getByText('Title'));
    expect(getByTestId('record-0')).toHaveTextContent('The Empire Strikes Back');
});