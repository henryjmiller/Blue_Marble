import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CreatureCard from '@/components/Sightings/CreatureCard/CreatureCard'

// Mock next/image as Jest cannot render the Next.JS Image component
// This replaces it with a plain HTML img tag for testing purposes
jest.mock('next/image', () => {
    return function MockImage({ src, alt }) {
        return <img src={src} alt={alt} />
    }
})

// Mock creature data to simulate a real creature object from the database
const mockCreature = {
    id: '1',
    name: 'Common Toad',
    scientificName: 'Bufo bufo',
    conservationStatus: 'Least Concern',
    description: 'A familiar garden visitor with warty, dry skin.',
    funFact: 'Common toads can live for up to 40 years!',
    image: '/images/common-toad.jpg'
}

// AT-1: Tests for AC-1 — Kids Mode toggle behaviour on the CreatureCard component
// AC-1: Given that I am on the Creature Guide, when I toggle Kids Mode,
// then Latin names should be removed, and child friendly fun facts should replace the about section.
describe('AT-1: CreatureCard Kids Mode Test Suite', () => {
    // Test that in normal mode, the scientific name and description are visible
    // and the fun fact is NOT shown
    // test() and it() are interchangable providing they read as english sentences
    it('shows scientific name and description in normal mode', () => {
        // Render the CreatureCard with kidsMode set to false (normal mode)
        render(<CreatureCard creature={mockCreature} kidsMode={false} />)

        // Scientific name should be visible in normal mode
        expect(screen.getByText('Bufo bufo')).toBeInTheDocument()

        // Description should be visible in normal mode
        expect(screen.getByText('A familiar garden visitor with warty, dry skin.')).toBeInTheDocument()

        // Fun fact should NOT be visible in normal mode
        expect(screen.queryByText('Common toads can live for up to 40 years!')).not.toBeInTheDocument()
    })
    // Test that in Kids Mode, the fun fact is shown
    // and the scientific name and description are NOT shown
    it('hides scientific name and shows fun fact in Kids Mode', () => {
        // Render the CreatureCard with kidsMode set to true (kids mode)
        render(<CreatureCard creature={mockCreature} kidsMode={true} />)

        // Scientific name should NOT be visible in kids mode
        expect(screen.queryByText('Bufo bufo')).not.toBeInTheDocument()

        // Fun fact should be visible in kids mode
        expect(screen.getByText('Common toads can live for up to 40 years!')).toBeInTheDocument()

        // Description should NOT be visible in kids mode
        expect(screen.queryByText('A familiar garden visitor with warty, dry skin.')).not.toBeInTheDocument()
    })
})