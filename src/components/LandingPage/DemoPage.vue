<template>
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
        <!-- Skip to content -->
        <a href="#landingpage" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-white focus:border focus:border-emerald-300 focus:rounded-lg">Skip to content</a>
		<!-- Top Bar -->
		<header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all duration-300">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<router-link
						to="/"
						class="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-semibold transition-all duration-200 hover:gap-1"
						title="Back to Landing Page"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200 hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
						Back
					</router-link>
					<span class="text-slate-300">/</span>
					<h1 class="text-slate-800 text-base sm:text-lg font-bold">AeroTech Demo Guide</h1>
				</div>
				<div class="flex items-center gap-2 sm:gap-3">
					<button @click="copyShareLink" aria-label="Copy share link" class="px-3 py-1.5 text-sm rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 hover:shadow-sm">
						<span class="hidden sm:inline">Share</span>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>
					</button>
					<router-link
						to="/auth"
						class="px-3 sm:px-4 py-1.5 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
					>Get Started</router-link>
				</div>
			</div>
		</header>

		<!-- Mobile Menu Button -->
		<button 
			@click="sidebarOpen = !sidebarOpen"
			class="lg:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
			aria-label="Toggle navigation menu"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300" :class="sidebarOpen ? 'rotate-90' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<line x1="3" y1="12" x2="21" y2="12"/>
				<line x1="3" y1="6" x2="21" y2="6"/>
				<line x1="3" y1="18" x2="21" y2="18"/>
			</svg>
			<span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
		</button>

		<!-- Mobile Sidebar Overlay -->
		<transition name="fade">
			<div 
				v-if="sidebarOpen" 
				@click="sidebarOpen = false"
				class="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
			></div>
		</transition>

		<!-- Mobile Sidebar -->
		<transition name="slide-in">
			<aside 
				v-if="sidebarOpen"
				class="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto"
			>
				<div class="sticky top-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 p-6 z-10">
					<div class="flex items-center justify-between mb-4">
						<div class="flex items-center gap-3">
							<div class="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H2v7h7V5ZM22 5h-7v7h7V5ZM9 15H2v7h7v-7ZM22 15h-7v7h7v-7Z"/></svg>
							</div>
							<div>
								<p class="text-xl font-bold text-white">AeroTech</p>
								<p class="text-xs text-white/80">Demo Navigation</p>
							</div>
						</div>
						<button 
							@click="sidebarOpen = false"
							class="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
							aria-label="Close menu"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<line x1="18" y1="6" x2="6" y2="18"/>
								<line x1="6" y1="6" x2="18" y2="18"/>
							</svg>
						</button>
					</div>
					<div class="h-1 w-full bg-white/20 rounded-full overflow-hidden">
						<div class="h-full bg-white/60 rounded-full" :style="`width: ${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`"></div>
					</div>
				</div>
				<nav class="p-4 space-y-2">
					<a
						v-for="(s, idx) in sections"
						:key="s.id"
						:href="`#${s.id}`"
						@click.prevent="handleAnchorClick(s.id); sidebarOpen = false"
						:aria-current="activeSection === s.id ? 'location' : null"
						class="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 group relative overflow-hidden"
						:class="activeSection === s.id ? 'bg-gradient-to-r from-emerald-50 to-teal-50 shadow-md' : 'hover:bg-slate-50'"
						:style="`animation-delay: ${idx * 0.05}s`"
					>
						<div class="relative z-10 flex items-center gap-3 flex-1">
							<div 
								class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300"
								:class="activeSection === s.id ? 'bg-emerald-600 text-white shadow-lg scale-110' : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-600'"
							>
								{{ idx + 1 }}
							</div>
							<span 
								class="font-medium transition-all duration-200 text-sm"
								:class="activeSection === s.id ? 'text-emerald-800' : 'text-slate-700 group-hover:text-emerald-700'"
							>
								{{ s.title }}
							</span>
						</div>
						<svg 
							v-if="activeSection === s.id"
							xmlns="http://www.w3.org/2000/svg" 
							class="h-5 w-5 text-emerald-600 animate-pulse" 
							viewBox="0 0 24 24" 
							fill="currentColor"
						>
							<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
						</svg>
						<div 
							v-if="activeSection === s.id"
							class="absolute inset-0 bg-gradient-to-r from-emerald-100/0 via-emerald-100/50 to-emerald-100/0 animate-shimmer"
						></div>
					</a>
				</nav>
				<div class="p-4 pb-6">
					<div class="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl p-4 shadow-xl">
						<div class="flex items-start gap-3">
							<div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
							</div>
							<div>
								<p class="text-sm font-bold mb-1">Pro Tip</p>
								<p class="text-xs opacity-90 leading-relaxed">Use the Back button above to jump to the live section and try it out.</p>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</transition>

		<!-- Page Content -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12 grid lg:grid-cols-[300px_1fr] gap-8">
			<!-- Desktop TOC -->
			<aside class="hidden lg:block">
				<div class="sticky top-24 space-y-4 animate-fade-in">
					<div class="bg-white rounded-2xl border border-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 backdrop-blur-sm group">
						<div class="flex items-center gap-3 mb-6">
							<div class="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 5H2v7h7V5ZM22 5h-7v7h7V5ZM9 15H2v7h7v-7ZM22 15h-7v7h7v-7Z"/></svg>
							</div>
							<div>
								<p class="text-2xl font-bold text-emerald-700">AeroTech</p>
								<p class="text-xs text-slate-500 font-medium">Demo Guide</p>
							</div>
						</div>
						<div class="mb-4">
							<div class="flex items-center justify-between text-xs text-slate-600 mb-2">
								<span class="font-medium">Progress</span>
								<span class="font-bold">{{ sections.findIndex(s => s.id === activeSection) + 1 }}/{{ sections.length }}</span>
							</div>
							<div class="h-2 bg-slate-100 rounded-full overflow-hidden">
								<div 
									class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 shadow-sm"
									:style="`width: ${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`"
								></div>
							</div>
						</div>
						<nav class="space-y-1">
							<a
								v-for="(s, idx) in sections"
								:key="s.id"
								:href="`#${s.id}`"
								@click.prevent="handleAnchorClick(s.id)"
								:aria-current="activeSection === s.id ? 'location' : null"
								class="flex items-center gap-3 text-sm py-3 px-3 rounded-xl transition-all duration-300 group relative overflow-hidden"
								:class="activeSection === s.id ? 'text-emerald-800 font-semibold bg-gradient-to-r from-emerald-50 to-teal-50 shadow-md scale-[1.02]' : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70 hover:scale-[1.01]'"
							>
								<div 
									class="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0"
									:class="activeSection === s.id ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600'"
								>
									{{ idx + 1 }}
								</div>
								<span class="flex-1 truncate">{{ s.title }}</span>
								<div 
									class="w-2 h-2 rounded-full transition-all duration-300" 
									:class="activeSection === s.id ? 'bg-emerald-600 shadow-lg shadow-emerald-500/50' : 'bg-slate-300 group-hover:bg-emerald-400'"
								></div>
								<div 
									v-if="activeSection === s.id"
									class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600 rounded-r-full"
								></div>
							</a>
						</nav>
					</div>
					<div class="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
						<div class="flex items-start gap-3">
							<div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-lg">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
							</div>
							<div>
								<p class="text-sm font-bold mb-1.5">Pro Tip</p>
								<p class="text-sm opacity-95 leading-relaxed">Use the Back button above to jump to the live section and try it out.</p>
							</div>
						</div>
					</div>
				</div>
			</aside>

			<!-- Main -->
			<main class="space-y-12">
				<!-- Intro -->
				<section id="landingpage" tabindex="-1" class="bg-white rounded-3xl border border-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 animate-fade-in">
					<div class="p-6 sm:p-10 space-y-8">
						<header class="space-y-3">
							<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-2">
								<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
								PUBLIC ACCESS
							</div>
							<h2 class="text-3xl sm:text-4xl font-bold text-emerald-800 tracking-tight">Landing Page</h2>
							<p class="text-slate-600 max-w-2xl text-base leading-relaxed">A comprehensive aerotech landing page where users can freely navigate the public sections. Unauthenticated user can freely contact the support through contact us section.</p>
						</header>
						<div class="grid md:grid-cols-2 gap-8 lg:gap-10">
							<figure class="relative rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
								<div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-emerald-700 shadow-sm">Preview</div>
								<img src="/demo/landingpage.png" @error="imgError($event)" alt="Landing page screenshot placeholder" class="w-full h-52 object-contain select-none transition-transform duration-300 group-hover:scale-105" loading="lazy" />
							</figure>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
										Tutorial
									</h3>
									<span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Video Guide</span>
								</div>
								<div class="relative rounded-2xl overflow-hidden border-2 border-emerald-100 bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300">
									<video
										v-if="videoURLs.landingpage"
										:ref="el => (videoEls.landingpage = el)"
										class="w-full aspect-video bg-black"
										controls
										preload="metadata"
										@canplay="videoReady.landingpage = true"
										@error="videoError('landingpage')"
									>
										<source :src="videoURLs.landingpage" type="video/mp4" />
									</video>
									<div v-else class="absolute inset-0 grid place-items-center p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
										<p class="text-white">Loading video...</p>
									</div>
								</div>
							</div>
						</div>
						<section aria-labelledby="landing-instructions" class="pt-4 bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
							<h3 id="landing-instructions" class="text-sm font-bold tracking-wide text-emerald-700 uppercase flex items-center gap-2 mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H2v7h7V5ZM22 5h-7v7h7V5ZM9 15H2v7h7v-7ZM22 15h-7v7h7v-7Z"/></svg>
								Step-by-Step Instructions
							</h3>
							<ol class="text-sm text-slate-700 list-none columns-1 md:columns-2 gap-8 space-y-3 md:space-y-0">
								<li v-for="(step, idx) in instructions.landingpage" :key="step.slice(0,20)" class="break-inside-avoid flex gap-3 items-start group">
									<span class="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-200">{{ idx + 1 }}</span>
									<span class="flex-1 leading-relaxed group-hover:text-emerald-800 transition-colors duration-200">{{ step }}</span>
								</li>
							</ol>
						</section>
					</div>
				</section>

				<!-- Hero Section -->
				<section id="login" tabindex="-1" class="bg-white rounded-3xl border border-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 animate-fade-in">
					<div class="p-6 sm:p-10 space-y-8">
						<header class="space-y-3">
							<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">
								<span class="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
								USER AUTHENTICATION
							</div>
							<h2 class="text-3xl sm:text-4xl font-bold text-emerald-800 tracking-tight">Login Page</h2>
							<p class="text-slate-600 max-w-2xl text-base leading-relaxed">Gateway for existing users. Emphasizes trust, quick access and recovery options. Provides clear links to registration and password reset flows.</p>
						</header>
						<div class="grid md:grid-cols-2 gap-8 lg:gap-10">
							<figure class="relative rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
								<div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-emerald-700 shadow-sm">Preview</div>
								<img src="/demo/login.png" @error="imgError($event)" alt="Login page screenshot placeholder" class="w-full h-52 object-contain select-none transition-transform duration-300 group-hover:scale-105" loading="lazy" />
							</figure>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
										Tutorial
									</h3>
									<span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Video Guide</span>
								</div>
								<div class="relative rounded-2xl overflow-hidden border-2 border-emerald-100 bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300">
									<video
										:ref="el => (videoEls.login = el)"
										class="w-full aspect-video bg-black"
										controls
										preload="metadata"
										@canplay="videoReady.login = true"
										@error="videoError('login')"
									>
										<source v-if="videoURLs.login" :src="videoURLs.login" type="video/mp4" />
									</video>
									<div v-if="!videoReady.login" class="absolute inset-0 grid place-items-center p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
										<div class="text-center space-y-3">
											<button @click="play('login')" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-medium">
												<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
												Play Video
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<section aria-labelledby="login-instructions" class="pt-4 bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
							<h3 id="login-instructions" class="text-sm font-bold tracking-wide text-emerald-700 uppercase flex items-center gap-2 mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H2v7h7V5ZM22 5h-7v7h7V5ZM9 15H2v7h7v-7ZM22 15h-7v7h7v-7Z"/></svg>
								Step-by-Step Instructions
							</h3>
							<ol class="text-sm text-slate-700 list-none columns-1 md:columns-2 gap-8 space-y-3 md:space-y-0">
								<li v-for="(step, idx) in instructions.login" :key="step.slice(0,20)" class="break-inside-avoid flex gap-3 items-start group">
									<span class="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-200">{{ idx + 1 }}</span>
									<span class="flex-1 leading-relaxed group-hover:text-emerald-800 transition-colors duration-200">{{ step }}</span>
								</li>
							</ol>
						</section>
					</div>
				</section>

				<!-- Stats Section -->
				<section id="register" tabindex="-1" class="bg-white rounded-3xl border border-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 animate-fade-in">
					<div class="p-6 sm:p-10 space-y-8">
						<header class="space-y-3">
							<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-2">
								<span class="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
								NEW USER SIGNUP
							</div>
							<h2 class="text-3xl sm:text-4xl font-bold text-emerald-800 tracking-tight">Register Page</h2>
							<p class="text-slate-600 max-w-2xl text-base leading-relaxed">Conversion-focused onboarding flow. Encourages quick account creation while highlighting benefits and reassuring about data privacy & terms.</p>
						</header>
						<div class="grid md:grid-cols-2 gap-8 lg:gap-10">
							<figure class="relative rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
								<div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-emerald-700 shadow-sm">Preview</div>
								<img src="/demo/register.png" @error="imgError($event)" alt="Register page screenshot placeholder" class="w-full h-52 object-contain select-none transition-transform duration-300 group-hover:scale-105" loading="lazy" />
							</figure>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
										Tutorial
									</h3>
									<span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Video Guide</span>
								</div>
								<div class="relative rounded-2xl overflow-hidden border-2 border-emerald-100 bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300">
									<video
										:ref="el => (videoEls.register = el)"
										class="w-full aspect-video bg-black"
										controls
										preload="metadata"
										@canplay="videoReady.register = true"
										@error="videoError('register')"
									>
										<source v-if="videoURLs.register" :src="videoURLs.register" type="video/mp4" />
									</video>
									<div v-if="!videoReady.register" class="absolute inset-0 grid place-items-center p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
										<div class="text-center space-y-3">
											<button @click="play('register')" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-medium">
												<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
												Play Video
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<section aria-labelledby="register-instructions" class="pt-4 bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
							<h3 id="register-instructions" class="text-sm font-bold tracking-wide text-emerald-700 uppercase flex items-center gap-2 mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H2v7h7V5ZM22 5h-7v7h7V5ZM9 15H2v7h7v-7ZM22 15h-7v7h7v-7Z"/></svg>
								Step-by-Step Instructions
							</h3>
							<ol class="text-sm text-slate-700 list-none columns-1 md:columns-2 gap-8 space-y-3 md:space-y-0">
								<li v-for="(step, idx) in instructions.register" :key="step.slice(0,20)" class="break-inside-avoid flex gap-3 items-start group">
									<span class="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-200">{{ idx + 1 }}</span>
									<span class="flex-1 leading-relaxed group-hover:text-emerald-800 transition-colors duration-200">{{ step }}</span>
								</li>
							</ol>
						</section>
					</div>
				</section>

				<!-- Dashboard Section -->
				<section id="dashboard" tabindex="-1" class="bg-white rounded-3xl border border-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 animate-fade-in">
					<div class="p-6 sm:p-10 space-y-8">
						<header class="space-y-3">
							<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold mb-2">
								<span class="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
								USER DASHBOARD
							</div>
							<h2 class="text-3xl sm:text-4xl font-bold text-emerald-800 tracking-tight">Dashboard</h2>
							<p class="text-slate-600 max-w-2xl text-base leading-relaxed">Central hub for monitoring for aerotech. Real-time data visualization, and analytics in one comprehensive interface with quick action shortcuts.</p>
						</header>
						<div class="grid md:grid-cols-2 gap-8 lg:gap-10">
							<figure class="relative rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
								<div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-emerald-700 shadow-sm">Preview</div>
								<img src="/demo/dashboard.png" @error="imgError($event)" alt="Dashboard screenshot placeholder" class="w-full h-52 object-contain select-none transition-transform duration-300 group-hover:scale-105" loading="lazy" />
							</figure>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
										Tutorial
									</h3>
									<span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Video Guide</span>
								</div>
								<div class="relative rounded-2xl overflow-hidden border-2 border-emerald-100 bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300">
									<video
										:ref="el => (videoEls.dashboard = el)"
										class="w-full aspect-video bg-black"
										controls
										preload="metadata"
										@canplay="videoReady.dashboard = true"
										@error="videoError('dashboard')"
									>
										<source v-if="videoURLs.dashboard" :src="videoURLs.dashboard" type="video/mp4" />
									</video>
									<div v-if="!videoReady.dashboard" class="absolute inset-0 grid place-items-center p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
										<div class="text-center space-y-3">
											<button @click="play('dashboard')" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-medium">
												<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
												Play Video
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<section aria-labelledby="dashboard-instructions" class="pt-4 bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
							<h3 id="dashboard-instructions" class="text-sm font-bold tracking-wide text-emerald-700 uppercase flex items-center gap-2 mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H2v7h7V5ZM22 5h-7v7h7V5ZM9 15H2v7h7v-7ZM22 15h-7v7h7v-7Z"/></svg>
								Step-by-Step Instructions
							</h3>
							<ol class="text-sm text-slate-700 list-none columns-1 md:columns-2 gap-8 space-y-3 md:space-y-0">
								<li v-for="(step, idx) in instructions.dashboard" :key="step.slice(0,20)" class="break-inside-avoid flex gap-3 items-start group">
									<span class="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-200">{{ idx + 1 }}</span>
									<span class="flex-1 leading-relaxed group-hover:text-emerald-800 transition-colors duration-200">{{ step }}</span>
								</li>
							</ol>
						</section>
					</div>
				</section>

				<!-- Community Chat Section -->
				<section id="chat" tabindex="-1" class="bg-white rounded-3xl border border-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 animate-fade-in">
					<div class="p-6 sm:p-10 space-y-8">
						<header class="space-y-3">
							<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold mb-2">
								<span class="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
								REAL-TIME MESSAGING
							</div>
							<h2 class="text-3xl sm:text-4xl font-bold text-emerald-800 tracking-tight">Community Chat</h2>
							<p class="text-slate-600 max-w-2xl text-base leading-relaxed">Connect with other users in real-time. Share messages, files, and reactions. Stay informed with instant notifications and threaded conversations.</p>
						</header>
						<div class="grid md:grid-cols-2 gap-8 lg:gap-10">
							<figure class="relative rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
								<div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-emerald-700 shadow-sm">Preview</div>
								<img src="/demo/chat.png" @error="imgError($event)" alt="Community chat screenshot placeholder" class="w-full h-52 object-contain select-none transition-transform duration-300 group-hover:scale-105" loading="lazy" />
							</figure>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
										Tutorial
									</h3>
									<span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Video Guide</span>
								</div>
								<div class="relative rounded-2xl overflow-hidden border-2 border-emerald-100 bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300">
									<video
										:ref="el => (videoEls.chat = el)"
										class="w-full aspect-video bg-black"
										controls
										preload="metadata"
										@canplay="videoReady.chat = true"
										@error="videoError('chat')"
									>
										<source v-if="videoURLs.chat" :src="videoURLs.chat" type="video/mp4" />
									</video>
									<div v-if="!videoReady.chat" class="absolute inset-0 grid place-items-center p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
										<div class="text-center space-y-3">
											<button @click="play('chat')" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-medium">
												<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
												Play Video
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<section aria-labelledby="chat-instructions" class="pt-4 bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
							<h3 id="chat-instructions" class="text-sm font-bold tracking-wide text-emerald-700 uppercase flex items-center gap-2 mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H2v7h7V5ZM22 5h-7v7h7V5ZM9 15H2v7h7v-7ZM22 15h-7v7h7v-7Z"/></svg>
								Step-by-Step Instructions
							</h3>
							<ol class="text-sm text-slate-700 list-none columns-1 md:columns-2 gap-8 space-y-3 md:space-y-0">
								<li v-for="(step, idx) in instructions.chat" :key="step.slice(0,20)" class="break-inside-avoid flex gap-3 items-start group">
									<span class="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-200">{{ idx + 1 }}</span>
									<span class="flex-1 leading-relaxed group-hover:text-emerald-800 transition-colors duration-200">{{ step }}</span>
								</li>
							</ol>
						</section>
					</div>
				</section>

				<!-- Financial Management Section -->
				<section id="financial" tabindex="-1" class="bg-white rounded-3xl border border-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 animate-fade-in">
					<div class="p-6 sm:p-10 space-y-8">
						<header class="space-y-3">
							<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
								<span class="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
								FINANCIAL TRACKING
							</div>
							<h2 class="text-3xl sm:text-4xl font-bold text-emerald-800 tracking-tight">Financial Management</h2>
							<p class="text-slate-600 max-w-2xl text-base leading-relaxed">Complete financial tracking system. Monitor income and expenses, set budgets, analyze spending patterns, and export detailed reports.</p>
						</header>
						<div class="grid md:grid-cols-2 gap-8 lg:gap-10">
							<figure class="relative rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
								<div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-emerald-700 shadow-sm">Preview</div>
								<img src="/demo/financial.png" @error="imgError($event)" alt="Financial management screenshot placeholder" class="w-full h-52 object-contain select-none transition-transform duration-300 group-hover:scale-105" loading="lazy" />
							</figure>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
										Tutorial
									</h3>
									<span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Video Guide</span>
								</div>
								<div class="relative rounded-2xl overflow-hidden border-2 border-emerald-100 bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300">
									<video
										:ref="el => (videoEls.financial = el)"
										class="w-full aspect-video bg-black"
										controls
										preload="metadata"
										@canplay="videoReady.financial = true"
										@error="videoError('financial')"
									>
										<source v-if="videoURLs.financial" :src="videoURLs.financial" type="video/mp4" />
									</video>
									<div v-if="!videoReady.financial" class="absolute inset-0 grid place-items-center p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
										<div class="text-center space-y-3">
											<button @click="play('financial')" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-medium">
												<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
												Play Video
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<section aria-labelledby="financial-instructions" class="pt-4 bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
							<h3 id="financial-instructions" class="text-sm font-bold tracking-wide text-emerald-700 uppercase flex items-center gap-2 mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H2v7h7V5ZM22 5h-7v7h7V5ZM9 15H2v7h7v-7ZM22 15h-7v7h7v-7Z"/></svg>
								Step-by-Step Instructions
							</h3>
							<ol class="text-sm text-slate-700 list-none columns-1 md:columns-2 gap-8 space-y-3 md:space-y-0">
								<li v-for="(step, idx) in instructions.financial" :key="step.slice(0,20)" class="break-inside-avoid flex gap-3 items-start group">
									<span class="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-200">{{ idx + 1 }}</span>
									<span class="flex-1 leading-relaxed group-hover:text-emerald-800 transition-colors duration-200">{{ step }}</span>
								</li>
							</ol>
						</section>
					</div>
				</section>

				<!-- Crop Analysis Section -->
				<section id="cropanalysis" tabindex="-1" class="bg-white rounded-3xl border border-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 animate-fade-in">
					<div class="p-6 sm:p-10 space-y-8">
						<header class="space-y-3">
							<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-2">
								<span class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
								AI-POWERED ANALYSIS
							</div>
							<h2 class="text-3xl sm:text-4xl font-bold text-emerald-800 tracking-tight">Lettuce Crop Analysis</h2>
							<p class="text-slate-600 max-w-2xl text-base leading-relaxed">AI-powered lettuce disease detection system. Upload images or use live camera to identify health issues, compare treatments, and track analysis history.</p>
						</header>
						<div class="grid md:grid-cols-2 gap-8 lg:gap-10">
							<figure class="relative rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
								<div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-emerald-700 shadow-sm">Preview</div>
								<img src="/demo/cropanalysis.png" @error="imgError($event)" alt="Crop analysis screenshot placeholder" class="w-full h-52 object-contain select-none transition-transform duration-300 group-hover:scale-105" loading="lazy" />
							</figure>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
										Tutorial
									</h3>
									<span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Video Guide</span>
								</div>
								<div class="relative rounded-2xl overflow-hidden border-2 border-emerald-100 bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300">
									<video
										:ref="el => (videoEls.cropanalysis = el)"
										class="w-full aspect-video bg-black"
										controls
										preload="metadata"
										@canplay="videoReady.cropanalysis = true"
										@error="videoError('cropanalysis')"
									>
										<source v-if="videoURLs.cropanalysis" :src="videoURLs.cropanalysis" type="video/mp4" />
									</video>
									<div v-if="!videoReady.cropanalysis" class="absolute inset-0 grid place-items-center p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
										<div class="text-center space-y-3">
											<button @click="play('cropanalysis')" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-medium">
												<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
												Play Video
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<section aria-labelledby="cropanalysis-instructions" class="pt-4 bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
							<h3 id="cropanalysis-instructions" class="text-sm font-bold tracking-wide text-emerald-700 uppercase flex items-center gap-2 mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H2v7h7V5ZM22 5h-7v7h7V5ZM9 15H2v7h7v-7ZM22 15h-7v7h7v-7Z"/></svg>
								Step-by-Step Instructions
							</h3>
							<ol class="text-sm text-slate-700 list-none columns-1 md:columns-2 gap-8 space-y-3 md:space-y-0">
								<li v-for="(step, idx) in instructions.cropanalysis" :key="step.slice(0,20)" class="break-inside-avoid flex gap-3 items-start group">
									<span class="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-200">{{ idx + 1 }}</span>
									<span class="flex-1 leading-relaxed group-hover:text-emerald-800 transition-colors duration-200">{{ step }}</span>
								</li>
							</ol>
						</section>
					</div>
				</section>

				<!-- Device Sensor Data Section -->
				<section id="sensordata" tabindex="-1" class="bg-white rounded-3xl border border-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 animate-fade-in">
					<div class="p-6 sm:p-10 space-y-8">
						<header class="space-y-3">
							<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">
								<span class="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
								REAL-TIME MONITORING
							</div>
							<h2 class="text-3xl sm:text-4xl font-bold text-emerald-800 tracking-tight">Device Sensor Data</h2>
							<p class="text-slate-600 max-w-2xl text-base leading-relaxed">Real-time IoT sensor monitoring dashboard. Track environmental parameters, configure threshold alerts, and visualize historical trends from your connected devices.</p>
						</header>
						<div class="grid md:grid-cols-2 gap-8 lg:gap-10">
							<figure class="relative rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
								<div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-emerald-700 shadow-sm">Preview</div>
								<img src="/demo/sensordata.png" @error="imgError($event)" alt="Device sensor data screenshot placeholder" class="w-full h-52 object-contain select-none transition-transform duration-300 group-hover:scale-105" loading="lazy" />
							</figure>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
										Tutorial
									</h3>
									<span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Video Guide</span>
								</div>
								<div class="relative rounded-2xl overflow-hidden border-2 border-emerald-100 bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300">
									<video
										:ref="el => (videoEls.sensordata = el)"
										class="w-full aspect-video bg-black"
										controls
										preload="metadata"
										@canplay="videoReady.sensordata = true"
										@error="videoError('sensordata')"
									>
										<source v-if="videoURLs.sensordata" :src="videoURLs.sensordata" type="video/mp4" />
									</video>
									<div v-if="!videoReady.sensordata" class="absolute inset-0 grid place-items-center p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
										<div class="text-center space-y-3">
											<button @click="play('sensordata')" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-medium">
												<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
												Play Video
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<section aria-labelledby="sensordata-instructions" class="pt-4 bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
							<h3 id="sensordata-instructions" class="text-sm font-bold tracking-wide text-emerald-700 uppercase flex items-center gap-2 mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H2v7h7V5ZM22 5h-7v7h7V5ZM9 15H2v7h7v-7ZM22 15h-7v7h7v-7Z"/></svg>
								Step-by-Step Instructions
							</h3>
							<ol class="text-sm text-slate-700 list-none columns-1 md:columns-2 gap-8 space-y-3 md:space-y-0">
								<li v-for="(step, idx) in instructions.sensordata" :key="step.slice(0,20)" class="break-inside-avoid flex gap-3 items-start group">
									<span class="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-200">{{ idx + 1 }}</span>
									<span class="flex-1 leading-relaxed group-hover:text-emerald-800 transition-colors duration-200">{{ step }}</span>
								</li>
							</ol>
						</section>
					</div>
				</section>

				<!-- Settings Section -->
				<section id="settings" tabindex="-1" class="bg-white rounded-3xl border border-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 animate-fade-in">
					<div class="p-6 sm:p-10 space-y-8">
						<header class="space-y-3">
							<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
								<span class="h-2 w-2 rounded-full bg-slate-500 animate-pulse"></span>
								ACCOUNT MANAGEMENT
							</div>
							<h2 class="text-3xl sm:text-4xl font-bold text-emerald-800 tracking-tight">Settings</h2>
							<p class="text-slate-600 max-w-2xl text-base leading-relaxed">Comprehensive account settings management. Update profile information, change security settings, and manage your account preferences all in one place.</p>
						</header>
						<div class="grid md:grid-cols-2 gap-8 lg:gap-10">
							<figure class="relative rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
								<div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-emerald-700 shadow-sm">Preview</div>
								<img src="/demo/settings.png" @error="imgError($event)" alt="Settings screenshot placeholder" class="w-full h-52 object-contain select-none transition-transform duration-300 group-hover:scale-105" loading="lazy" />
							</figure>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
										Tutorial
									</h3>
									<span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Video Guide</span>
								</div>
								<div class="relative rounded-2xl overflow-hidden border-2 border-emerald-100 bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300">
									<video
										:ref="el => (videoEls.settings = el)"
										class="w-full aspect-video bg-black"
										controls
										preload="metadata"
										@canplay="videoReady.settings = true"
										@error="videoError('settings')"
									>
										<source v-if="videoURLs.settings" :src="videoURLs.settings" type="video/mp4" />
									</video>
									<div v-if="!videoReady.settings" class="absolute inset-0 grid place-items-center p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
										<div class="text-center space-y-3">
											<button @click="play('settings')" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-medium">
												<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
												Play Video
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<section aria-labelledby="settings-instructions" class="pt-4 bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
							<h3 id="settings-instructions" class="text-sm font-bold tracking-wide text-emerald-700 uppercase flex items-center gap-2 mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H2v7h7V5ZM22 5h-7v7h7V5ZM9 15H2v7h7v-7ZM22 15h-7v7h7v-7Z"/></svg>
								Step-by-Step Instructions
							</h3>
							<ol class="text-sm text-slate-700 list-none columns-1 md:columns-2 gap-8 space-y-3 md:space-y-0">
								<li v-for="(step, idx) in instructions.settings" :key="step.slice(0,20)" class="break-inside-avoid flex gap-3 items-start group">
									<span class="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-200">{{ idx + 1 }}</span>
									<span class="flex-1 leading-relaxed group-hover:text-emerald-800 transition-colors duration-200">{{ step }}</span>
								</li>
							</ol>
						</section>
					</div>
				</section>

				<!-- Footer CTA -->
				<section class="text-center py-8">
					<div class="max-w-2xl mx-auto space-y-6">
						<div class="space-y-3">
							<h3 class="text-2xl sm:text-3xl font-bold text-slate-800">Ready to Get Started?</h3>
							<p class="text-slate-600">Join AeroTech today and experience the future of smart agriculture.</p>
						</div>
						<router-link to="/auth" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 font-semibold text-base">
							Start Using EcoMist
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
						</router-link>
					</div>
				</section>
			</main>
		</div>
	</div>

	<!-- Back to top -->
	<transition name="slide-fade">
		<button v-if="showBackToTop" @click="backToTop" class="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white border-2 border-emerald-200 text-emerald-700 shadow-lg hover:shadow-xl hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 hover:-translate-y-1 group">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
			<span class="font-medium">Top</span>
		</button>
	</transition>

	

	

	<!-- Toast -->
	<transition name="slide-up">
		<div v-if="toast.show" role="status" aria-live="polite" class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm px-6 py-3 rounded-xl shadow-2xl backdrop-blur-sm border border-slate-700 flex items-center gap-3">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
			<span class="font-medium">{{ toast.msg }}</span>
		</div>
	</transition>
  
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'

const sections = [
	{ id: 'landingpage', title: 'Landing Page' },
	{ id: 'login', title: 'Login' },
	{ id: 'register', title: 'Register' },
	{ id: 'dashboard', title: 'Dashboard' },
	{ id: 'chat', title: 'Community Chat' },
	{ id: 'financial', title: 'Financial Management' },
	{ id: 'cropanalysis', title: 'Crop Analysis' },
	{ id: 'sensordata', title: 'Device Sensor Data' },
	{ id: 'settings', title: 'Settings' },
]

const activeSection = ref('landingpage')
const showBackToTop = ref(false)
const headerOffset = ref(64)
const videoEls = ref({})
const videoReady = ref({ landingpage: false, login: false, register: false, dashboard: false, chat: false, financial: false, cropanalysis: false, sensordata: false, settings: false })
const showAdmin = ref(false)
const toast = ref({ show: false, msg: '' })
const sidebarOpen = ref(false)
const videoURLs = ref({}); // Ensure videoURLs is initialized as an empty object
const instructions = {
	landingpage: [
		'Agree on required permissions (cookies, notifications)',
		'Review metrics/benefits for credibility',
		'Use navigation to jump to feature highlights',
		'Click Get Started or Login depending on status',
		'Click "Download App" to get mobile version'
	],
	login: [
		'Enter registered email and password',
        'Make sure the credentials are correct',
		'Use “Forgot password” to recover password , forgot password link will be sent to your email inbox/spam click it and enter new password',
		'Click “Register” link if you lack an account',
		'Use Google Sign-In for quick access depending on signup method, will automatically choose google account if already logged in browser',
		'After success you are redirected to dashboard'
	],
	register: [
		'Choose a sign-up method you prefer either email/password or google sign-in',
        'Fill in all required fields accurately following validation rules',
		'Accept terms & privacy',
		'Submit form to create account',
		'Check email inbox or spam folder for email verification (for email/password only)',
        'Click the link in the verification email to activate your account then proceed to login',
        'Sign up with google will automatically redirect after success registration'
	],
	dashboard: [
		'View quick stats cards showing financial balance, crop analyses, devices, and feedback status',
		'Monitor financial overview with income vs expenses chart and recent transactions',
		'Track crop health distribution with doughnut chart showing healthy, bacterial, fungal, and critical cases',
		'Access recent crop analyses with confidence scores and health indicators',
		'Use quick action buttons to navigate to transactions, crop analysis, sensors, messages, feedback, and settings',
		'Check system status banner for operational notifications'
	],
	chat: [
		'Send real-time messages with text, emojis, images, PDFs, and videos to the community',
		'Search through messages and users using the search bar',
		'React to messages with quick emoji reactions (👍, ❤️, 😂, 😮, 😢, 👏)',
		'Edit or delete your own messages using the message options menu',
		'Reply in threads to organize conversations and pin important messages',
		'Receive browser notifications for new messages, mentions, and reactions'
	],
	financial: [
		'Track income and expenses with detailed summary cards showing totals, net profit, and transaction count',
		'Add new transactions with amount, type, category, date, and optional notes',
		'Create custom categories and set budget limits for different spending categories (daily, weekly, monthly, yearly)',
		'Filter transactions by time period (today, week, month, year, or custom date range)',
		'View analytics with charts and visualize spending patterns by category',
		'Export financial data to CSV, Excel, or PDF formats with full reports'
	],
	cropanalysis: [
		'Choose between LettuceModel V2 or V3 for AI-powered disease detection with different accuracy levels',
		'Upload lettuce images via drag-and-drop, file picker, or capture directly from camera',
		'Switch to Compare Mode to analyze two images side-by-side and track treatment progress',
		'View detailed analysis results with confidence scores, disease classification (Healthy, Bacterial, Fungal, Mosaic Virus, Nutrient Deficiency)',
		'Access all probability scores for each disease class and view model information (version, input shape, classes)',
		'Save analysis results to history with timestamps for tracking,exports and review later'
	],
	sensordata: [
		'Monitor real-time sensor readings with live updates for humidity, air/water temperature, water level, pH, and TDS',
		'View visual alerts and status indicators (OK/ALERT) for each sensor with color-coded badges',
		'Configure threshold limits (min/max) for each sensor parameter to trigger automatic alerts',
		'Analyze sensor trends with interactive historical graphs showing data over time',
		'Receive instant toast notifications when sensor values breach configured threshold limits',
		'Restore default threshold values with one click or save custom configurations for your specific needs',
        'Device management: add, edit, or remove IoT devices from your account easily with device internet connectivity',
        'Export sensor data history to CSV for further analysis'

	],
	settings: [
		'Navigate between Profile Overview, Edit Profile, and Reset Password tabs with clean tabbed interface',
		'Update profile picture by clicking on the image, preview before uploading (max 5MB, JPG/PNG/GIF)',
		'Edit personal information including name, birthday, age, cellphone, gender, and complete address',
		'Reset your password with current password verification and strength requirements',
		'Deactivate account with secure verification via email code or password confirmation',
		'View profile overview with all personal details, contact info, and account statistics'
	]
}

function openLive(hash = '') {
	window.open(`/${hash.replace('#top', '')}`, '_blank')
}

function videoError(key) {
	videoReady.value[key] = false
}

function play(key) {
	const v = videoEls.value[key]
	if (v && v.play) {
		v.play().catch(() => {})
	}
}

function imgError(e) {
	e.target.src = '/aerotech-rbg.png'
	e.target.classList.add('opacity-70')
}

function copyShareLink() {
	try {
		const url = window.location.href
		navigator.clipboard.writeText(url)
		toast.value = { show: true, msg: 'Link copied to clipboard' }
		setTimeout(() => (toast.value.show = false), 1800)
	} catch {
		toast.value = { show: true, msg: 'Copy failed. Copy from the address bar.' }
		setTimeout(() => (toast.value.show = false), 2000)
	}
}

function handleAnchorClick(id) {
	scrollToSection(id)
}

function scrollToSection(id) {
	const el = document.getElementById(id)
	if (!el) return
	const header = document.querySelector('header')
	const offset = header ? header.offsetHeight + 8 : headerOffset.value
	const top = el.getBoundingClientRect().top + window.scrollY - offset
	window.scrollTo({ top, behavior: 'smooth' })
	// Move focus for accessibility after scroll
	setTimeout(() => el.focus({ preventScroll: true }), 350)
}

onMounted(() => {
	const header = document.querySelector('header')
	if (header) headerOffset.value = header.offsetHeight

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeSection.value = entry.target.id
				}
			})
		},
		{ root: null, rootMargin: `-${headerOffset.value + 8}px 0px -60% 0px`, threshold: 0.2 }
	)

	sections.forEach((s) => {
		const el = document.getElementById(s.id)
		if (el) observer.observe(el)
	})

	const onScroll = () => {
		showBackToTop.value = window.scrollY > 300
	}
	window.addEventListener('scroll', onScroll, { passive: true })

	// Cleanup
	onUnmounted(() => {
		observer.disconnect()
		window.removeEventListener('scroll', onScroll)
	})
})

function backToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function fetchVideoURL(key, path) {
  try {
    const storage = getStorage();
    const videoRef = storageRef(storage, path);
    const url = await getDownloadURL(videoRef);
    videoURLs.value[key] = url;
  } catch (error) {
    console.error(`Failed to fetch video URL for ${key}:`, error);
  }
}

onMounted(() => {
  fetchVideoURL('landingpage', 'videos/landingpage.mp4');
  fetchVideoURL('login', 'videos/login.mp4');
  fetchVideoURL('register', 'videos/register.mp4');
  fetchVideoURL('dashboard', 'videos/dashboard.mp4');
  fetchVideoURL('chat', 'videos/chat.mp4');
  fetchVideoURL('financial', 'videos/financial.mp4');
  fetchVideoURL('cropanalysis', 'videos/cropanalysis.mp4');
  fetchVideoURL('sensordata', 'videos/sensordata.mp4');
  fetchVideoURL('settings', 'videos/settings.mp4');
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { 
	transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to { 
	opacity: 0;
}

.slide-fade-enter-active {
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-leave-active {
	transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}
.slide-fade-enter-from {
	transform: translateY(20px);
	opacity: 0;
}
.slide-fade-leave-to {
	transform: translateY(10px);
	opacity: 0;
}

.slide-up-enter-active {
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-up-leave-active {
	transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}
.slide-up-enter-from {
	transform: translate(-50%, 20px);
	opacity: 0;
}
.slide-up-leave-to {
	transform: translate(-50%, -10px);
	opacity: 0;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in {
	animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Stagger animations for sections */
#landingpage {
	animation-delay: 0.1s;
}
#login {
	animation-delay: 0.2s;
}
#register {
	animation-delay: 0.3s;
}
#dashboard {
	animation-delay: 0.4s;
}
#chat {
	animation-delay: 0.5s;
}
#financial {
	animation-delay: 0.6s;
}
#cropanalysis {
	animation-delay: 0.7s;
}
#sensordata {
	animation-delay: 0.8s;
}
#settings {
	animation-delay: 0.9s;
}

/* Smooth scroll behavior */
html {
	scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
	width: 10px;
}
::-webkit-scrollbar-track {
	background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
	background: #10b981;
	border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
	background: #059669;
}

/* Mobile sidebar transitions */
.slide-in-enter-active,
.slide-in-leave-active {
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-in-enter-from {
	transform: translateX(-100%);
}
.slide-in-leave-to {
	transform: translateX(-100%);
}

/* Shimmer animation for active menu item */
@keyframes shimmer {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(100%);
	}
}
.animate-shimmer {
	animation: shimmer 2s infinite;
}

</style>

