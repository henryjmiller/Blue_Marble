import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import CreatureGame from '../src/components/Sightings/CreatureGame/CreatureGame'

// mock next/image as Jest cannot render the Next.js Image component, mocks with img tag
jest.mock('next/image', () => {
    return function MockImage({ src, alt }) {
        return <img src={src} alt={alt} />
    }
})

// mock creature data for rounds and buttons (5 rounds, 4 potential answers each round)
const mockCreatures = [
    { id: '1', name: 'Common Toad', image: '/toad.jpg' },
    { id: '2', name: 'Emperor Dragonfly', image: '/dragonfly.jpg' },
    { id: '3', name: 'Atlantic Salmon', image: '/salmon.jpg' },
    { id: '4', name: 'European Eel', image: '/eel.jpg' },
    { id: '5', name: 'Water Vole', image: '/vole.jpg' },
]

// AT-2 and AT-3
describe('Creature Quiz Tests Suite', () => {

    // AT-2
    // AC-3 Given that I am on the Creature Quiz, when I select the correct answer in time, 
    // then my score should increase by one point.
    it('increments score by one when the correct answer is selected', async () => {
        // render the CreatureGame component with our mock creatures
        render(<CreatureGame creatures={mockCreatures} />)
    
        // wait for the quiz to load and score to appear
        await waitFor(() => {
            expect(screen.getByText('Score: 0')).toBeInTheDocument()
        })
    
        // select the correct answer
        fireEvent.click(screen.getByTestId('correct-answer'))
    
        // score should increment by 1
        await waitFor(() => {
            expect(screen.getByText('Score: 1')).toBeInTheDocument()
        })
    
        // user feedback present for correct answer
        await waitFor(() => {
            expect(screen.getByText('Correct! Well done!')).toBeInTheDocument()
        })
    })

    // AT-3
    // AC-4
    it('does not increment score when a wrong answer is selected', async () => {
        // render the CreatureGame component with our mock creatures
        render(<CreatureGame creatures={mockCreatures} />)

        // wait for the quiz to load and score to appear
        await waitFor(() => {
            expect(screen.getByText('Score: 0')).toBeInTheDocument()
        })

        // click the first wrong answer button
        fireEvent.click(screen.getAllByTestId('wrong-answer')[0])

        // score should remain at 0
        await waitFor(() => {
            expect(screen.getByText('Score: 0')).toBeInTheDocument()
        })

        // feedback message should appear
        await waitFor(() => {
            expect(screen.getByText(/Not quite!/i)).toBeInTheDocument()
        })
    })

})