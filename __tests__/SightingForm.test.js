import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SightingForm from "../src/components/Sightings/SightingForm/SightingForm";

jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("next/link", () => {
    return ({ children, href }) => <a href={href}>{children}</a>;
});

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]),
        })
    );
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("SightingForm validation", () => {

    test("AT-1: shows error when no creature is selected", async () => {
        render(<SightingForm />);
        fireEvent.click(screen.getByText("Submit Sighting"));
        await waitFor(() => {
            expect(screen.getByText("Please select a creature before submitting.")).toBeInTheDocument();
        });
    });

    test("AT-2: shows error when date is empty", async () => {
        render(<SightingForm />);
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "Common Toad" } });
        fireEvent.click(screen.getByText("Submit Sighting"));
        await waitFor(() => {
            expect(screen.getByText("Please select the date of the sighting.")).toBeInTheDocument();
        });
    });

    test("AT-3: shows error when location is empty", async () => {
        render(<SightingForm />);
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "Common Toad" } });
        const dateInput = screen.getByDisplayValue("");
        fireEvent.change(dateInput, { target: { value: "2026-05-01" } });
        fireEvent.click(screen.getByText("Submit Sighting"));
        await waitFor(() => {
            expect(screen.getByText("Please tell us where you saw the creature.")).toBeInTheDocument();
        });
    });

});