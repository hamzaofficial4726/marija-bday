import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: "Thank You - Hamza Birthday Party 🎉",
	description:
		"Thank you all for making Hamza birthday celebration on November 08th absolutely magical! Relive the memories! 💖✨",
	openGraph: {
		title: "Thank You - Hamza Birthday Party 🎉",
		description:
			"Thank you all for making Hamza birthday celebration on November 08th absolutely magical! Relive the memories! 💖✨",
		type: 'website',
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className='min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 antialiased'>
				{children}
			</body>
		</html>
	)
}
