'use client'

import { Calendar, Clock, Heart, Music, Users, Trophy, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import Image from 'next/image'

type Language = 'en' | 'no' | 'sr' | 'nl'

const translations = {
	en: {
		thankYou: '✨ Thank You All ✨',
		birthday: 'Birthday',
		subtitle: 'What an amazing evening we had together! 🎂💖',
		eventRecap: 'Time Since Our Party',
		days: 'Days',
		hours: 'Hours',
		minutes: 'Minutes',
		seconds: 'Seconds',
		ago: 'ago',
		when: 'When It Was',
		whatANight: 'What A Night',
		partyHighlights: 'How It Went',
		teamGame: 'Game Night Winners',
		teamGameInfo: 'Congrats to the winning team! (North Korea totally counts as one word 😉)',
		balloonArch: 'The Setup',
		balloonArchInfo: 'Balloon arch, good food & drinks 🎈',
		nightOut: 'Amsterdam',
		nightOutInfo: 'Ended the night dancing at Amsterdam nightclub 💃',
		casualParty: 'Perfect Evening 🎀',
		musicAndMemories: 'Music & Vibes 🎵💭',
		playlistTitle: 'Party Playlist',
		playlistSubtitle: 'The soundtrack to our night - feel free to keep adding songs!',
		gratitude: 'Thanks for making it such a fun night! 🎉',
		magical: 'You all made this birthday really special ✨',
		location: '📍 Oslo, Norway',
		partyMemory: 'Party Memory',
		goodTimes: 'Good times captured',
	},
	no: {
		thankYou: '✨ Tusen Takk Alle ✨',
		birthday: 'Bursdag',
		subtitle: 'For en fantastisk kveld vi hadde sammen! 🎂💖',
		eventRecap: 'Tid Siden Festen Vår',
		days: 'Dager',
		hours: 'Timer',
		minutes: 'Minutter',
		seconds: 'Sekunder',
		ago: 'siden',
		when: 'Da Det Var',
		whatANight: 'For En Kveld',
		partyHighlights: 'Hvordan Det Gikk',
		teamGame: 'Spillkveld Vinnere',
		teamGameInfo: 'Gratulerer til vinnerlaget! (Nord-Korea teller helt klart som ett ord 😉)',
		balloonArch: 'Oppsettet',
		balloonArchInfo: 'Ballongbuer, god mat og drikke 🎈',
		nightOut: 'Amsterdam',
		nightOutInfo: 'Avsluttet kvelden med dans på Amsterdam nattklubb 💃',
		casualParty: 'Perfekt Kveld 🎀',
		musicAndMemories: 'Musikk & Stemning 🎵💭',
		playlistTitle: 'Fest spilleliste',
		playlistSubtitle: 'Lydbildet til kvelden vår - bare å legge til flere sanger!',
		gratitude: 'Takk for at dere gjorde det til en så fin kveld! 🎉',
		magical: 'Dere gjorde denne bursdagen virkelig spesiell ✨',
		location: '📍 Oslo, Norge',
		partyMemory: 'Fest Minne',
		goodTimes: 'Fine øyeblikk fanget',
	},
	sr: {
		thankYou: '✨ Hvala Svima ✨',
		birthday: 'Rođendan',
		subtitle: 'Kakvo neverovatno veče smo imali zajedno! 🎂💖',
		eventRecap: 'Vreme Od Naše Žurke',
		days: 'Dana',
		hours: 'Sati',
		minutes: 'Minuta',
		seconds: 'Sekundi',
		ago: 'ranije',
		when: 'Kada Je Bilo',
		whatANight: 'Kakvo Veče',
		partyHighlights: 'Kako Je Prošlo',
		teamGame: 'Pobednici Igre',
		teamGameInfo: 'Čestitke pobedničkom timu! (Severna Koreja se apsolutno računa kao jedna reč 😉)',
		balloonArch: 'Postavljanje',
		balloonArchInfo: 'Baloni, dobra hrana i piće 🎈',
		nightOut: 'Amsterdam',
		nightOutInfo: 'Završili veče plesom u Amsterdam klubu 💃',
		casualParty: 'Savršeno Veče 🎀',
		musicAndMemories: 'Muzika & Atmosfera 🎵💭',
		playlistTitle: 'Žurka plejlista',
		playlistSubtitle: 'Soundtrack našeg večera - slobodno dodajte još pesama!',
		gratitude: 'Hvala što ste učinili da bude tako zabavno veče! 🎉',
		magical: 'Svi ste učinili ovaj rođendan zaista posebnim ✨',
		location: '📍 Oslo, Norveška',
		partyMemory: 'Sećanje Sa Žurke',
		goodTimes: 'Lepi trenuci uhvaćeni',
	},
	nl: {
		thankYou: '✨ Dankjewel Allemaal ✨',
		birthday: 'Verjaardag',
		subtitle: 'Wat een geweldige avond hebben we samen gehad! 🎂💖',
		eventRecap: 'Tijd Sinds Ons Feest',
		days: 'Dagen',
		hours: 'Uren',
		minutes: 'Minuten',
		seconds: 'Seconden',
		ago: 'geleden',
		when: 'Toen Het Was',
		whatANight: 'Wat Een Avond',
		partyHighlights: 'Hoe Het Ging',
		teamGame: 'Spelletjesavond Winnaars',
		teamGameInfo: 'Gefeliciteerd aan het winnende team! (Noord-Korea telt zeker als één woord 😉)',
		balloonArch: 'De Opzet',
		balloonArchInfo: 'Ballonnenboog, goed eten en drinken 🎈',
		nightOut: 'Amsterdam',
		nightOutInfo: 'Eindigden de avond met dansen bij Amsterdam nachtclub 💃',
		casualParty: 'Perfecte Avond 🎀',
		musicAndMemories: 'Muziek & Sfeer 🎵💭',
		playlistTitle: 'Feest afspeellijst',
		playlistSubtitle: 'De soundtrack van onze avond - voeg gerust meer nummers toe!',
		gratitude: "Bedankt dat jullie er zo'n leuke avond van hebben gemaakt! 🎉",
		magical: 'Jullie hebben deze verjaardag echt speciaal gemaakt ✨',
		location: '📍 Oslo, Noorwegen',
		partyMemory: 'Feest Herinnering',
		goodTimes: 'Goede tijden vastgelegd',
	},
}

export default function BirthdayPartyThankYou() {
	const [language, setLanguage] = useState<Language>('en')
	const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })
	const [timeSince, setTimeSince] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	const t = translations[language]

	useEffect(() => {
		const updateWindowDimensions = () => {
			setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
		}

		updateWindowDimensions()
		window.addEventListener('resize', updateWindowDimensions)

		// Time since party - November 08th, 2025 at 19:30
		const partyDate = new Date('2025-11-08T19:30:00').getTime()

		const updateTimeSince = () => {
			const now = new Date().getTime()
			const distance = now - partyDate

			if (distance > 0) {
				setTimeSince({
					days: Math.floor(distance / (1000 * 60 * 60 * 24)),
					hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
					minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
					seconds: Math.floor((distance % (1000 * 60)) / 1000),
				})
			}
		}

		updateTimeSince()
		const timeSinceInterval = setInterval(updateTimeSince, 1000)

		return () => {
			window.removeEventListener('resize', updateWindowDimensions)
			clearInterval(timeSinceInterval)
		}
	}, [])

	const partyDetails = {
		name: 'Hamza',
		date: 'Friday, November 08th',
		dateNo: 'Fredag, 08. november',
		dateSr: 'Petak, 08. noyabr',
		dateNl: 'Vrijdag, 08 novembri',
		time: '7:30 PM',
		timeNo: '19:30',
		timeSr: '19:30',
		timeNl: '19:30',
	}

	const getLocalizedDate = () => {
		switch (language) {
			case 'no':
				return partyDetails.dateNo
			case 'sr':
				return partyDetails.dateSr
			case 'nl':
				return partyDetails.dateNl
			default:
				return partyDetails.date
		}
	}

	const getLocalizedTime = () => {
		switch (language) {
			case 'no':
				return partyDetails.timeNo
			case 'sr':
				return partyDetails.timeSr
			case 'nl':
				return partyDetails.timeNl
			default:
				return partyDetails.time
		}
	}

	// Motion variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 100,
				damping: 15,
				duration: 0.6,
			},
		},
	}

	const floatingVariants = {
		animate: {
			y: [-3, 3, -3],
			transition: {
				duration: 2.5,
				repeat: Infinity,
				repeatType: 'reverse' as const,
				ease: 'easeInOut',
			},
		},
	}

	const pulseVariants = {
		animate: {
			scale: [1, 1.05, 1],
			transition: {
				duration: 2,
				repeat: Infinity,
				repeatType: 'reverse' as const,
				ease: 'easeInOut',
			},
		},
	}

	const languageButtonVariants = {
		hover: {
			scale: 1.05,
			transition: { type: 'spring', stiffness: 400, damping: 10 },
		},
		tap: {
			scale: 0.95,
			transition: { type: 'spring', stiffness: 400, damping: 10 },
		},
	}

	const getLanguageFlag = (lang: Language) => {
		switch (lang) {
			case 'en':
				return '🇺🇸 EN'
			case 'no':
				return '🇳🇴 NO'
			case 'sr':
				return '🇷🇸 SR'
			case 'nl':
				return '🇧🇪 NL'
			default:
				return lang as Language
		}
	}

	return (
		<div className='min-h-screen relative'>
			{/* Gradient Background */}
			<div className='fixed inset-0 bg-gradient-to-br from-pink-300/20 via-rose-200/30 to-pink-400/20' />
			<div className='fixed inset-0 bg-gradient-to-tl from-pink-200/10 via-transparent to-rose-300/10' />

			{/* Always visible confetti */}
			<div className='fixed inset-0 pointer-events-none z-40'>
				<Confetti
					width={windowDimensions.width}
					height={windowDimensions.height}
					recycle={true}
					numberOfPieces={60}
					wind={0.02}
					gravity={0.08}
					colors={['#fce7f3', '#fda4af', '#f472b6', '#ec4899', '#db2777', '#be185d']}
				/>
			</div>

			{/* Language Switcher */}
			<motion.div
				className='fixed top-6 right-6 z-50 flex gap-2 flex-wrap'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, duration: 0.6 }}
			>
				{(['en', 'no', 'sr', 'nl'] as Language[]).map((lang) => (
					<motion.button
						key={lang}
						variants={languageButtonVariants}
						whileHover='hover'
						whileTap='tap'
						onClick={() => setLanguage(lang)}
						className={`px-3 py-2 rounded-full font-semibold text-xs transition-colors ${
							language === lang
								? 'bg-pink-500 text-white shadow-lg'
								: 'bg-white/80 backdrop-blur-sm text-pink-700 hover:bg-pink-100'
						}`}
					>
						{getLanguageFlag(lang)}
					</motion.button>
				))}
			</motion.div>

			<motion.div
				className='relative z-10 container mx-auto px-4 py-16 max-w-5xl'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				{/* Hero Section */}
				<motion.div
					className='text-center mb-20'
					variants={itemVariants}
				>
					<motion.div
						className='inline-block mb-8'
						variants={floatingVariants}
						animate='animate'
					>
						<Badge className='border-pink-300 bg-white/80 backdrop-blur-sm text-pink-700 px-6 py-3 text-sm font-semibold rounded-full shadow-lg'>
							{t.thankYou}
						</Badge>
					</motion.div>

					<AnimatePresence mode='wait'>
						<motion.h1
							key={language}
							className='text-6xl md:text-8xl font-bold tracking-tight mb-8'
							variants={itemVariants}
							initial='hidden'
							animate='visible'
							exit='hidden'
						>
							<span className='bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 bg-clip-text text-transparent'>
								Hamza&apos;s
							</span>
							<br />
							<span className='text-slate-700 flex items-center justify-center gap-6'>
								<Heart className='h-16 w-16 md:h-20 md:w-20 text-pink-500 fill-pink-500' />
								{t.birthday}
								<Heart className='h-16 w-16 md:h-20 md:w-20 text-pink-500 fill-pink-500' />
							</span>
						</motion.h1>
					</AnimatePresence>

					<AnimatePresence mode='wait'>
						<motion.p
							key={`subtitle-${language}`}
							className='text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto'
							variants={itemVariants}
							initial='hidden'
							animate='visible'
							exit='hidden'
						>
							{t.subtitle}
						</motion.p>
					</AnimatePresence>
				</motion.div>

				{/* Party Photo */}
				<motion.div
					className='mb-16'
					variants={itemVariants}
				>
					<Card className='border-0 bg-white/85 backdrop-blur-xl shadow-2xl shadow-pink-200/30 rounded-3xl overflow-hidden'>
						<CardContent className='p-8'>
							<div className='text-center mb-8'>
								<AnimatePresence mode='wait'>
									<motion.h2
										key={`memories-title-${language}`}
										className='text-3xl font-bold text-slate-700 mb-4'
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.3 }}
									>
										{t.partyMemory}
									</motion.h2>
								</AnimatePresence>
								<AnimatePresence mode='wait'>
									<motion.p
										key={`memories-subtitle-${language}`}
										className='text-lg text-slate-600 font-medium'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										{t.goodTimes}
									</motion.p>
								</AnimatePresence>
							</div>

							{/* Party Photo */}
							<motion.div
								className='rounded-2xl overflow-hidden shadow-xl mx-auto max-w-3xl'
								whileHover={{ scale: 1.02 }}
								transition={{ type: 'spring', stiffness: 300, damping: 20 }}
							>
								<Image
									src='/image.jpeg'
									alt='Party memory with friends'
									width={800}
									height={600}
									className='w-full h-auto'
									priority
								/>
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Event Details Card */}
				<motion.div
					className='mb-16'
					variants={itemVariants}
				>
					<Card className='border-0 bg-white/85 backdrop-blur-xl shadow-2xl shadow-pink-200/30 rounded-3xl overflow-hidden'>
						<CardContent className='p-12'>
							<div className='grid md:grid-cols-2 gap-12 mb-12'>
								{/* Date & Time */}
								<motion.div
									className='text-center md:text-left'
									whileHover={{ scale: 1.02 }}
									transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								>
									<div className='flex items-center justify-center md:justify-start gap-4 mb-6'>
										<div className='p-4 rounded-2xl bg-gradient-to-br from-pink-200 to-pink-300 shadow-lg'>
											<Calendar className='h-6 w-6 text-pink-700' />
										</div>
										<h3 className='text-lg font-bold text-pink-600 uppercase tracking-wider'>
											{t.when}
										</h3>
									</div>
									<AnimatePresence mode='wait'>
										<motion.div
											key={`date-${language}`}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.3 }}
										>
											<p className='text-3xl font-bold text-slate-800 mb-3'>
												{getLocalizedDate()}
											</p>
											<div className='flex items-center justify-center md:justify-start gap-3'>
												<Clock className='h-5 w-5 text-pink-500' />
												<p className='text-xl text-slate-600 font-semibold'>
													{getLocalizedTime()}
												</p>
											</div>
										</motion.div>
									</AnimatePresence>
								</motion.div>

								{/* What a Night */}
								<motion.div
									className='text-center md:text-left'
									whileHover={{ scale: 1.02 }}
									transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								>
									<div className='flex items-center justify-center md:justify-start gap-4 mb-6'>
										<div className='p-4 rounded-2xl bg-gradient-to-br from-rose-200 to-rose-300 shadow-lg'>
											<Sparkles className='h-6 w-6 text-rose-700' />
										</div>
										<h3 className='text-lg font-bold text-rose-600 uppercase tracking-wider'>
											{t.whatANight}
										</h3>
									</div>
									<p className='text-xl text-slate-800 leading-relaxed font-semibold mb-4'>
										{t.location}
									</p>
									<div className='text-sm text-slate-600 font-medium'>
										<span className='font-bold text-rose-600'>{t.gratitude}</span>
									</div>
								</motion.div>
							</div>

							{/* Party Highlights Grid */}
							<div className='text-center mb-8'>
								<AnimatePresence mode='wait'>
									<motion.h3
										key={`highlights-title-${language}`}
										className='text-2xl font-bold text-slate-700 mb-8'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										{t.partyHighlights}
									</motion.h3>
								</AnimatePresence>
							</div>

							<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
								{/* Team Game */}
								<motion.div
									className='text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200'
									whileHover={{ scale: 1.05, y: -5 }}
									transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								>
									<Trophy className='h-8 w-8 text-pink-500 mx-auto mb-4' />
									<h4 className='text-sm font-bold text-pink-600 uppercase tracking-wider mb-3'>
										{t.teamGame}
									</h4>
									<p className='text-slate-700 font-semibold text-sm'>{t.teamGameInfo}</p>
								</motion.div>

								{/* Balloon Arch & Setup */}
								<motion.div
									className='text-center p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200'
									whileHover={{ scale: 1.05, y: -5 }}
									transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								>
									<Sparkles className='h-8 w-8 text-rose-500 mx-auto mb-4' />
									<h4 className='text-sm font-bold text-rose-600 uppercase tracking-wider mb-3'>
										{t.balloonArch}
									</h4>
									<p className='text-slate-700 font-semibold'>{t.balloonArchInfo}</p>
								</motion.div>

								{/* Amsterdam Club */}
								<motion.div
									className='text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 sm:col-span-2 lg:col-span-1'
									whileHover={{ scale: 1.05, y: -5 }}
									transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								>
									<Users className='h-8 w-8 text-pink-500 mx-auto mb-4' />
									<h4 className='text-sm font-bold text-pink-600 uppercase tracking-wider mb-3'>
										{t.nightOut}
									</h4>
									<p className='text-slate-700 font-semibold'>{t.nightOutInfo}</p>
								</motion.div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Timer moved down here */}
				<motion.div
					className='mb-16'
					variants={itemVariants}
				>
					<Card className='border-0 bg-white/85 backdrop-blur-xl shadow-2xl shadow-pink-200/30 rounded-3xl overflow-hidden'>
						<CardContent className='p-6 md:p-8 text-center'>
							<AnimatePresence mode='wait'>
								<motion.h2
									key={`timer-title-${language}`}
									className='text-xl md:text-2xl font-bold text-slate-700 mb-8 flex items-center justify-center gap-3'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
								>
									<Clock className='h-6 w-6 text-pink-500' />
									{t.eventRecap}
									<Clock className='h-6 w-6 text-pink-500' />
								</motion.h2>
							</AnimatePresence>

							{/* Timer with 4 columns including days */}
							<div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto'>
								<motion.div
									className='bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-4 md:p-8 shadow-lg'
									variants={pulseVariants}
									animate='animate'
								>
									<div className='text-3xl md:text-5xl lg:text-6xl font-bold text-rose-600 mb-2'>
										{timeSince.days}
									</div>
									<div className='text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider'>
										{t.days}
									</div>
								</motion.div>

								<motion.div
									className='bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-4 md:p-8 shadow-lg'
									variants={pulseVariants}
									animate='animate'
									transition={{ delay: 0.1 }}
								>
									<div className='text-3xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-2'>
										{timeSince.hours}
									</div>
									<div className='text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider'>
										{t.hours}
									</div>
								</motion.div>

								<motion.div
									className='bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-4 md:p-8 shadow-lg'
									variants={pulseVariants}
									animate='animate'
									transition={{ delay: 0.2 }}
								>
									<div className='text-3xl md:text-5xl lg:text-6xl font-bold text-rose-600 mb-2'>
										{timeSince.minutes}
									</div>
									<div className='text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider'>
										{t.minutes}
									</div>
								</motion.div>

								<motion.div
									className='bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-4 md:p-8 shadow-lg'
									variants={pulseVariants}
									animate='animate'
									transition={{ delay: 0.3 }}
								>
									<div className='text-3xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-2'>
										{timeSince.seconds}
									</div>
									<div className='text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider'>
										{t.seconds}
									</div>
								</motion.div>
							</div>

							<AnimatePresence mode='wait'>
								<motion.p
									key={`ago-${language}`}
									className='text-lg md:text-xl text-slate-600 font-medium mt-6'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
								>
									{t.ago}
								</motion.p>
							</AnimatePresence>
						</CardContent>
					</Card>
				</motion.div>

				{/* Music Section */}
				<motion.div
					className='mb-16'
					variants={itemVariants}
				>
					<Card className='border-0 bg-white/85 backdrop-blur-xl shadow-xl shadow-pink-200/20 rounded-3xl overflow-hidden'>
						<CardContent className='p-8'>
							<div className='text-center mb-8'>
								<AnimatePresence mode='wait'>
									<motion.h2
										key={`music-title-${language}`}
										className='text-3xl font-bold text-slate-700 mb-4'
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.3 }}
									>
										{t.musicAndMemories}
									</motion.h2>
								</AnimatePresence>
							</div>

							{/* Playlist Section */}
							<div className='space-y-6 max-w-2xl mx-auto'>
								<div className='text-center'>
									<AnimatePresence mode='wait'>
										<motion.h3
											key={`playlist-title-${language}`}
											className='text-2xl font-bold text-pink-600 mb-3 flex items-center justify-center gap-3'
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.3 }}
										>
											<Music className='h-6 w-6' />
											{t.playlistTitle}
										</motion.h3>
									</AnimatePresence>
									<AnimatePresence mode='wait'>
										<motion.p
											key={`playlist-subtitle-${language}`}
											className='text-slate-600 font-medium mb-6'
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.3 }}
										>
											{t.playlistSubtitle}
										</motion.p>
									</AnimatePresence>
								</div>

								{/* Spotify Embed */}
								<motion.div
									className='rounded-xl overflow-hidden shadow-lg'
									whileHover={{ scale: 1.02 }}
									transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								>
									<iframe
										style={{ borderRadius: '12px' }}
										src='https://open.spotify.com/embed/playlist/0dnNZVkOVfiROcygf2D0XB?utm_source=generator'
										width='100%'
										height='352'
										frameBorder='0'
										allowFullScreen
										allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
										loading='lazy'
									/>
								</motion.div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Footer Message */}
				<motion.div
					className='text-center'
					variants={itemVariants}
					whileHover={{ scale: 1.02 }}
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}
				>
					<div className='inline-block p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl border border-pink-200'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={`footer-${language}`}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
							>
								<p className='text-2xl font-bold text-slate-700 mb-3'>{t.gratitude}</p>
								<p className='text-lg text-slate-600 font-medium'>{t.magical}</p>
							</motion.div>
						</AnimatePresence>
					</div>
				</motion.div>
			</motion.div>
		</div>
	)
}
