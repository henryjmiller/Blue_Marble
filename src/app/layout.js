import "./globals.css";
import { Inter, Quicksand } from "next/font/google";
import Providers from "../components/Providers";
import Header from "../components/Header/Header";

const inter = Inter({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-inter",
	display: "swap",
});

const quicksand = Quicksand({
	subsets: ["latin"],
	weight: "500",
	variable: "--font-quicksand",
	display: "swap",
});

export const metadata = {
	title: "Blue Marble",
	description: "Marine Conservation Awareness",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.variable} ${quicksand.variable}`}>
				<Providers>
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	);
}
