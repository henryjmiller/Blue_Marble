import { render, screen, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import OceanMetrics from '../src/app/ocean-metrics/page'

jest.mock('chart.js', () => ({
    Chart: { register: jest.fn() },
    CategoryScale: {},
    LinearScale: {},
    LineElement: {},
    PointElement: {},
    Tooltip: {},
    Legend: {},
    Filler: {},
}))

jest.mock('react-chartjs-2', () => ({
    Line: () => <div data-testid="line-chart" />,
}))

beforeEach(() => {
    global.fetch = jest.fn((url) => {
        if (url.includes('sea-level')) {
            return Promise.resolve({
                json: () => Promise.resolve([{ time: 1993.0, seaLevelMm: 0 }]),
            })
        }
        if (url.includes('ocean-temperature')) {
            return Promise.resolve({
                json: () => Promise.resolve([{ year: 2000, avgTemp: 0.5, upperBound: 0.7, lowerBound: 0.3 }]),
            })
        }
        if (url.includes('ocean-ph')) {
            return Promise.resolve({
                json: () => Promise.resolve([{ day: '01/01/2000', monthlyAvg: 8.1 }]),
            })
        }
    })
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('AT-OM1: Ocean Metrics page structure', () => {

    it('renders the page title and subtitle', async () => {
        await act(async () => { render(<OceanMetrics />) })
        expect(screen.getByRole('heading', { name: 'Ocean Metrics' })).toBeInTheDocument()
        expect(screen.getByText(/Our oceans are warming/)).toBeInTheDocument()
    })

    it('renders all three section headings', async () => {
        await act(async () => { render(<OceanMetrics />) })
        expect(screen.getByText('Global Mean Sea Level Rise')).toBeInTheDocument()
        expect(screen.getByText('Ocean Surface Temperature Anomaly')).toBeInTheDocument()
        expect(screen.getByText('Ocean pH (Acidification)')).toBeInTheDocument()
    })

    it('shows a loading placeholder for each chart before data arrives', () => {
        global.fetch = jest.fn(() => new Promise(() => {}))
        render(<OceanMetrics />)
        expect(screen.getAllByText('Loading data…')).toHaveLength(3)
    })

})

describe('AT-OM2: Ocean Metrics data and stats', () => {

    it('renders sea level stat cards', async () => {
        await act(async () => { render(<OceanMetrics />) })
        expect(screen.getByText('103mm')).toBeInTheDocument()
        expect(screen.getByText('Rise since 1993')).toBeInTheDocument()
        expect(screen.getByText('3.8mm')).toBeInTheDocument()
        expect(screen.getByText('Average rise per year')).toBeInTheDocument()
    })

    it('renders ocean temperature stat cards', async () => {
        await act(async () => { render(<OceanMetrics />) })
        expect(screen.getByText('+0.95°C')).toBeInTheDocument()
        expect(screen.getByText('+1.24°C')).toBeInTheDocument()
    })

    it('renders ocean pH stat cards', async () => {
        await act(async () => { render(<OceanMetrics />) })
        expect(screen.getByText('8.04')).toBeInTheDocument()
        expect(screen.getByText('-0.07')).toBeInTheDocument()
    })

    it('renders all three charts after data loads', async () => {
        render(<OceanMetrics />)
        await waitFor(() => {
            expect(screen.getAllByTestId('line-chart')).toHaveLength(3)
        })
    })

})
