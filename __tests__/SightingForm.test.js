import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import SightingForm from '../src/components/Sightings/SightingForm/SightingForm'

// Mock next/navigation as Jest cannot use the Next.js router
// useRouter is used in SightingForm to redirect after submission
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
}))

// Mock next/link as Jest cannot render the Next.js Link component
jest.mock('next/link', () => {
    return function MockLink({ children, href }) {
        return <a href={href}>{children}</a>
    }
})

// Mock the fetch call that loads creatures into the dropdown option field
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                { id: '1', name: 'Common Toad' }
            ]),
        })
    )
})

// Clear all mocks after each test to avoid state leaking between tests
afterEach(() => {
    jest.clearAllMocks()
})

// AT-4
// AC-6: Given that I am on the New Sighting form, when I fail to fill out
// the required fields correctly, then a clear error message should tell me what is missing
describe('AT-4: SightingForm validation error messages', () => {

    // Test that submitting with no creature selected shows the correct error message
    it('shows error message when no creature is selected', async () => {
        // Render the SightingForm component
        render(<SightingForm />)

        // Submit the form without selecting a creature
        // We submit the form directly to bypass browser native required field validation
        const form = document.querySelector('form')
        fireEvent.submit(form)

        // Error message should appear telling the user to select a creature
        await waitFor(() => {
            expect(screen.getByText('Please select a creature before submitting.')).toBeInTheDocument()
        })
    })

    it('shows error message when date is not provided', async () => {
        render(<SightingForm />)
    
        // Wait for creatures to load into the dropdown (needed to prevent failure)
        await waitFor(() => {
            expect(screen.getByText('Common Toad')).toBeInTheDocument()
        })
    
        // Now select the creature
        const select = screen.getByRole('combobox')
        fireEvent.change(select, { target: { value: 'Common Toad' } })
    
        const form = document.querySelector('form')
        fireEvent.submit(form)
    
        await waitFor(() => {
            expect(screen.getByText('Please select the date of the sighting.')).toBeInTheDocument()
        })
    })

    // Test that submitting with a creature and date but no location shows the correct error message
    it('shows error message when location is not provided', async () => {
        // Render the SightingForm component
        render(<SightingForm />)

        await waitFor(() => {
            expect(screen.getByText('Common Toad')).toBeInTheDocument()
        })

        // Select a creature to pass the first validation check
        const select = screen.getByRole('combobox')
        fireEvent.change(select, { target: { value: 'Common Toad' } })

        // Enter a date to pass the second validation check
        const dateInput = document.querySelector('input[type="date"]')
        fireEvent.change(dateInput, { target: { value: '2026-05-01' } })

        // Submit the form without a location
        const form = document.querySelector('form')
        fireEvent.submit(form)

        // Error message should appear telling the user to enter a location
        await waitFor(() => {
            expect(screen.getByText('Please tell us where you saw the creature.')).toBeInTheDocument()
        })
    })

})