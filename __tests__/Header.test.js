import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../src/components/Header/Header'
import { useAuth } from '../src/context/AuthContext'

jest.mock('next/link', () => {
    return function MockLink({ children, href }) {
        return <a href={href}>{children}</a>
    }
})

jest.mock('../src/context/AuthContext', () => ({
    useAuth: jest.fn(),
}))

afterEach(() => {
    jest.clearAllMocks()
})

describe('AT-H1: Header navigation', () => {

    beforeEach(() => {
        useAuth.mockReturnValue({ user: null, logout: jest.fn() })
    })

    it('renders the Blue Marble brand name', () => {
        render(<Header />)
        expect(screen.getByText('Blue Marble')).toBeInTheDocument()
    })

    it('renders all six navigation links', () => {
        render(<Header />)
        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Events' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Event Map' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Sightings' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Creatures' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Ocean Metrics' })).toBeInTheDocument()
    })

})

describe('AT-H2: Header auth state', () => {

    it('shows Log In link when no user is logged in', () => {
        useAuth.mockReturnValue({ user: null, logout: jest.fn() })
        render(<Header />)
        expect(screen.getByRole('link', { name: 'Log In' })).toBeInTheDocument()
        expect(screen.queryByText('Log Out')).not.toBeInTheDocument()
    })

    it('shows display name and role badge when a user is logged in', () => {
        useAuth.mockReturnValue({
            user: { displayName: 'Alice', role: 'admin' },
            logout: jest.fn(),
        })
        render(<Header />)
        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(screen.getByText('admin')).toBeInTheDocument()
        expect(screen.queryByRole('link', { name: 'Log In' })).not.toBeInTheDocument()
    })

    it('calls logout when the Log Out button is clicked', () => {
        const mockLogout = jest.fn()
        useAuth.mockReturnValue({
            user: { displayName: 'Alice', role: 'admin' },
            logout: mockLogout,
        })
        render(<Header />)
        fireEvent.click(screen.getByRole('button', { name: 'Log Out' }))
        expect(mockLogout).toHaveBeenCalledTimes(1)
    })

})
