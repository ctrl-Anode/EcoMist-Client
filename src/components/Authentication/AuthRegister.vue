<template>
  <section class="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col items-center max-w-4xl w-full mx-auto space-y-6">

    <!-- Compatibility Warning -->
    <transition name="slide-down">
      <div v-if="!isDeviceCompatible" class="w-full p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
        <p class="text-xs text-red-200 text-center flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          Your device or browser may not be fully supported. For best results, use the latest Chrome, Firefox, or Edge.
        </p>
      </div>
    </transition>

    <!-- Global Alert -->
    <transition name="slide-down">
      <div v-if="globalAlert.show"
           :class="['p-4 rounded-lg flex items-center gap-3 w-full shadow-lg',
             globalAlert.type === 'error' ? 'bg-red-500/20 border border-red-400/30 text-red-100' : 'bg-green-500/20 border border-green-400/30 text-green-100']">
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path v-if="globalAlert.type === 'success'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <span class="text-sm font-medium">{{ globalAlert.message }}</span>
      </div>
    </transition>

    <!-- Header -->
    <header class="text-center space-y-2 mb-2">
      <div class="relative inline-block">
        <img src="/aerotech-rbg-index.png" alt="AeroTech Logo" class="w-20 h-20 mb-3 mx-auto rounded-full object-cover shadow-lg ring-4 ring-white/20" />
        <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400/20 to-blue-400/20 animate-pulse"></div>
      </div>
      <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Create Account</h1>
      <p class="text-sm text-white/70">Join us and start your journey today</p>
    </header>

    <!-- Progress Steps -->
    <div class="w-full">
      <div class="flex items-center justify-between mb-8">
        <!-- Step 1 -->
        <div class="flex flex-col items-center flex-1">
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300',
            currentStep >= 1 ? 'bg-green-500 text-white shadow-lg' : 'bg-white/20 text-white/50'
          ]">
            <svg v-if="currentStep > 1" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span v-else>1</span>
          </div>
          <span class="text-xs mt-2 text-white/70 hidden sm:block">Personal Info</span>
        </div>
        
        <!-- Line 1 -->
        <div class="flex-1 h-1 mx-2 rounded-full bg-white/20 overflow-hidden">
          <div :class="['h-full bg-green-500 transition-all duration-500', currentStep >= 2 ? 'w-full' : 'w-0']"></div>
        </div>

        <!-- Step 2 -->
        <div class="flex flex-col items-center flex-1">
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300',
            currentStep >= 2 ? 'bg-green-500 text-white shadow-lg' : 'bg-white/20 text-white/50'
          ]">
            <svg v-if="currentStep > 2" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span v-else>2</span>
          </div>
          <span class="text-xs mt-2 text-white/70 hidden sm:block">Security</span>
        </div>

        <!-- Line 2 -->
        <div class="flex-1 h-1 mx-2 rounded-full bg-white/20 overflow-hidden">
          <div :class="['h-full bg-green-500 transition-all duration-500', currentStep >= 3 ? 'w-full' : 'w-0']"></div>
        </div>

        <!-- Step 3 -->
        <div class="flex flex-col items-center flex-1">
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300',
            currentStep >= 3 ? 'bg-green-500 text-white shadow-lg' : 'bg-white/20 text-white/50'
          ]">
            3
          </div>
          <span class="text-xs mt-2 text-white/70 hidden sm:block">Confirm</span>
        </div>
      </div>
    </div>

    <!-- Step Content -->
    <div class="w-full min-h-[400px]">
      <!-- Step 1: Personal Information & Profile -->
      <transition name="slide-fade" mode="out-in">
        <div v-if="currentStep === 1" key="step1" class="space-y-6">
          <!-- Profile Image Upload -->
          <div class="w-full bg-white/5 rounded-xl p-6 space-y-3 border border-white/10">
            <h3 class="text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Profile Picture (Optional)
            </h3>
            <div class="flex flex-col items-center gap-3">
              <div class="relative group">
                <div class="relative w-24 h-24 rounded-full border-4 border-green-400/40 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 shadow-xl group-hover:border-green-400/60 transition-all duration-300">
                  <img
                    v-if="profileImagePreview"
                    :src="profileImagePreview"
                    alt="Profile Preview"
                    class="object-cover w-full h-full"
                  />
                  <img
                    v-else
                    src="/default-avatar.png"
                    alt="Default Avatar"
                    class="object-cover w-full h-full opacity-60"
                  />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-3">
                <input id="profile-upload" type="file" accept="image/*" @change="handleProfileImageChange" class="hidden" />
                <label for="profile-upload" class="px-4 py-2 bg-green-600/80 hover:bg-green-600 text-white text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                  </svg>
                  Upload
                </label>
                <button v-if="profileImagePreview" @click="clearProfileImage" class="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95">
                  Remove
                </button>
              </div>

              <transition name="fade">
                <p v-if="profileImageError" class="text-xs text-red-300 flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  {{ profileImageError }}
                </p>
              </transition>
            </div>
          </div>

          <!-- Personal Information Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Username -->
            <div class="space-y-1">
              <label class="text-xs text-white/70 font-medium">Username *</label>
              <div class="relative">
                <input
                  v-model="registerForm.username"
                  type="text"
                  placeholder="Enter username"
                  @blur="validateUsername"
                  :class="[
                    'w-full rounded-lg px-4 py-3 pr-10 transition-all focus:outline-none focus:ring-2',
                    registerErrors.username
                      ? 'border-2 border-red-400 bg-red-500/10 text-white'
                      : registerForm.username && registerForm.username.length >= 3
                      ? 'border-2 border-green-400 bg-green-500/10 text-white'
                      : 'bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:border-green-400/50'
                  ]"
                  :disabled="loading"
                  required
                />
                <div class="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg v-if="registerForm.username && registerForm.username.length >= 3 && !registerErrors.username" class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <transition name="fade">
                <p v-if="registerErrors.username" class="text-red-300 text-xs">{{ registerErrors.username }}</p>
                <p v-else-if="registerForm.username && registerForm.username.length >= 3" class="text-green-300 text-xs">✓ Username available!</p>
              </transition>
            </div>

            <!-- Full Name -->
            <div class="space-y-1">
              <label class="text-xs text-white/70 font-medium">Full Name *</label>
              <input
                v-model="registerForm.completeName"
                type="text"
                placeholder="Enter full name"
                :class="[
                  'w-full rounded-lg px-4 py-3 transition-all focus:outline-none focus:ring-2',
                  registerForm.completeName && registerForm.completeName.length >= 3
                    ? 'border-2 border-green-400 bg-green-500/10 text-white'
                    : 'bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:border-green-400/50'
                ]"
                :disabled="loading"
                required
              />
            </div>

            <!-- Birthday -->
            <div class="space-y-1">
              <label for="birthday" class="text-xs text-white/70 font-medium">Birthday *</label>
              <input
                id="birthday"
                v-model="registerForm.birthday"
                type="date"
                :class="[
                  'w-full rounded-lg px-4 py-3 transition-all focus:outline-none focus:ring-2',
                  registerForm.birthday
                    ? 'border-2 border-green-400 bg-green-500/10 text-white'
                    : 'bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:border-green-400/50'
                ]"
                :disabled="loading"
                required
              />
            </div>

            <!-- Phone -->
            <div class="space-y-1">
              <label class="text-xs text-white/70 font-medium">Phone Number *</label>
              <input
                v-model="registerForm.cellphone"
                type="tel"
                placeholder="09XXXXXXXXX"
                :class="[
                  'w-full rounded-lg px-4 py-3 transition-all focus:outline-none focus:ring-2',
                  registerErrors.cellphone
                    ? 'border-2 border-red-400 bg-red-500/10 text-white'
                    : registerForm.cellphone.length === 11
                    ? 'border-2 border-green-400 bg-green-500/10 text-white'
                    : 'bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:border-green-400/50'
                ]"
                :disabled="loading"
                required
                maxlength="11"
                @input="onCellphoneInput"
              />
              <transition name="fade">
                <p v-if="registerErrors.cellphone" class="text-red-300 text-xs">{{ registerErrors.cellphone }}</p>
              </transition>
            </div>

            <!-- Gender -->
            <div class="space-y-1">
              <label class="text-xs text-white/70 font-medium">Gender *</label>
              <select
                v-model="registerForm.gender"
                :class="[
                  'w-full rounded-lg px-4 py-3 transition-all focus:outline-none focus:ring-2 appearance-none',
                  registerForm.gender
                    ? 'border-2 border-green-400 bg-green-500/10 text-white'
                    : 'bg-white/20 border-2 border-white/30 text-white focus:border-green-400/50'
                ]"
                :disabled="loading"
                required
              >
                <option value="" disabled class="bg-gray-800">Select Gender</option>
                <option value="male" class="bg-gray-800">Male</option>
                <option value="female" class="bg-gray-800">Female</option>
                <option value="other" class="bg-gray-800">Other</option>
              </select>
            </div>

            <!-- Address -->
            <div class="space-y-1 sm:col-span-2">
              <label class="text-xs text-white/70 font-medium">Address *</label>
              <input
                v-model="registerForm.address"
                type="text"
                placeholder="Enter your address"
                :class="[
                  'w-full rounded-lg px-4 py-3 transition-all focus:outline-none focus:ring-2',
                  registerForm.address && registerForm.address.length >= 5
                    ? 'border-2 border-green-400 bg-green-500/10 text-white'
                    : 'bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:border-green-400/50'
                ]"
                :disabled="loading"
                required
              />
            </div>
          </div>
        </div>
      </transition>

      <!-- Step 2: Account Security -->
      <transition name="slide-fade" mode="out-in">
        <div v-if="currentStep === 2" key="step2" class="space-y-6">
          <div class="text-center mb-6">
            <h3 class="text-lg font-semibold text-white flex items-center justify-center gap-2">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Account Security
            </h3>
            <p class="text-sm text-white/60 mt-1">Create your login credentials</p>
          </div>

          <!-- Email -->
          <div class="space-y-1">
            <label class="text-xs text-white/70 font-medium">Email Address *</label>
            <div class="relative">
              <input
                v-model="registerForm.email"
                type="email"
                placeholder="your@email.com"
                :class=" [
                  'w-full rounded-lg px-4 py-3 pr-10 transition-all focus:outline-none focus:ring-2',
                  registerErrors.email
                    ? 'border-2 border-red-400 bg-red-500/10 text-white'
                    : registerForm.email.includes('@')
                    ? 'border-2 border-green-400 bg-green-500/10 text-white'
                    : 'bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:border-green-400/50'
                ]"
                :disabled="loading"
                required
              />
              <div class="absolute right-3 top-1/2 -translate-y-1/2">
                <svg v-if="registerForm.email.includes('@') && !registerErrors.email" class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-1">
            <label class="text-xs text-white/70 font-medium">Password *</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="registerForm.password"
                @input="validatePassword"
                @focus="showPasswordRequirements = true"
                placeholder="Enter password"
                class="w-full rounded-lg px-4 py-3 pr-12 transition-all focus:outline-none focus:ring-2 bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:border-green-400/50"
                required
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 bg-white/10 rounded-full hover:bg-white/20 transition flex items-center justify-center"
              >
                <svg v-if="!showPassword" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                </svg>
                <svg v-else class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <transition name="fade">
              <p v-if="registerErrors.password" class="text-red-300 text-xs">{{ registerErrors.password }}</p>
            </transition>
          </div>

          <!-- Confirm Password -->
          <div class="space-y-1">
            <label class="text-xs text-white/70 font-medium">Confirm Password *</label>
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="registerForm.confirmPassword"
                @input="validateConfirmPassword"
                placeholder="Confirm password"
                :class=" [
                  'w-full rounded-lg px-4 py-3 pr-12 transition-all focus:outline-none focus:ring-2',
                  registerErrors.confirmPassword
                    ? 'border-2 border-red-400 bg-red-500/10 text-white'
                    : registerForm.confirmPassword && registerForm.confirmPassword === registerForm.password
                    ? 'border-2 border-green-400 bg-green-500/10 text-white'
                    : 'bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:border-green-400/50'
                ]"
                :disabled="loading"
                required
              />
              <button
                type="button"
                @click="toggleConfirmPassword"
                class="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 bg-white/10 rounded-full hover:bg-white/20 transition flex items-center justify-center"
              >
                <svg v-if="!showConfirmPassword" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                </svg>
                <svg v-else class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <transition name="fade">
              <p v-if="registerErrors.confirmPassword" class="text-red-300 text-xs">{{ registerErrors.confirmPassword }}</p>
              <p v-else-if="registerForm.confirmPassword && registerForm.confirmPassword === registerForm.password" class="text-green-300 text-xs">✓ Passwords match!</p>
            </transition>
          </div>

          <!-- Password Requirements & Strength -->
          <div class="bg-white/5 rounded-lg p-4 space-y-3 border border-white/10">
            <transition name="fade">
              <div v-if="showPasswordRequirements" class="space-y-2">
                <p class="text-xs text-white/80 font-medium">Password Requirements:</p>
                <ul class="space-y-1 text-xs">
                  <li :class="registerForm.password.length >= 8 ? 'text-green-300' : 'text-white/60'" class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    At least 8 characters
                  </li>
                  <li :class="/[A-Z]/.test(registerForm.password) ? 'text-green-300' : 'text-white/60'" class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    One uppercase letter
                  </li>
                  <li :class="/\d/.test(registerForm.password) ? 'text-green-300' : 'text-white/60'" class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    One number
                  </li>
                  <li :class="/[!@#$%^&*]/.test(registerForm.password) ? 'text-green-300' : 'text-white/60'" class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    One special character
                  </li>
                </ul>
              </div>
            </transition>

            <div class="space-y-2">
              <p class="text-xs font-medium" :class="{
                'text-red-300': passwordStrength.score < 2,
                'text-yellow-300': passwordStrength.score === 2,
                'text-green-300': passwordStrength.score >= 3
              }">
                Password Strength: {{ passwordStrength.feedback }}
              </p>
              <div class="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  :class="{
                    'bg-red-400': passwordStrength.score < 2,
                    'bg-yellow-400': passwordStrength.score === 2,
                    'bg-green-400': passwordStrength.score >= 3
                  }"
                  :style="{ width: (passwordStrength.score * 25) + '%' }"
                  class="h-full rounded-full transition-all duration-500 ease-out"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Step 3: Review & Confirm -->
      <transition name="slide-fade" mode="out-in">
        <div v-if="currentStep === 3" key="step3" class="space-y-6">
          <div class="text-center mb-6">
            <h3 class="text-lg font-semibold text-white">Review Your Information</h3>
            <p class="text-sm text-white/60 mt-1">Please review before creating your account</p>
          </div>

          <!-- Review Cards -->
          <div class="space-y-4">
            <!-- Personal Info Review -->
            <div class="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 class="text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Personal Information
            </h4>
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p class="text-white/50 text-xs">Username</p>
                  <p class="text-white">{{ registerForm.username }}</p>
                </div>
                <div>
                  <p class="text-white/50 text-xs">Full Name</p>
                  <p class="text-white">{{ registerForm.completeName }}</p>
                </div>
                <div>
                  <p class="text-white/50 text-xs">Birthday</p>
                  <p class="text-white">{{ registerForm.birthday }}</p>
                </div>
                <div>
                  <p class="text-white/50 text-xs">Phone</p>
                  <p class="text-white">{{ registerForm.cellphone }}</p>
                </div>
                <div>
                  <p class="text-white/50 text-xs">Gender</p>
                  <p class="text-white capitalize">{{ registerForm.gender }}</p>
                </div>
                <div class="col-span-2">
                  <p class="text-white/50 text-xs">Address</p>
                  <p class="text-white">{{ registerForm.address }}</p>
                </div>
              </div>
            </div>

            <!-- Account Info Review -->
            <div class="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 class="text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Account Information
              </h4>
              <div class="text-sm">
                <p class="text-white/50 text-xs">Email Address</p>
                <p class="text-white">{{ registerForm.email }}</p>
              </div>
            </div>
          </div>

          <!-- Terms & Conditions -->
          <div class="bg-white/5 rounded-lg p-4 border border-white/10">
            <div class="flex items-start gap-3">
              <input
                type="checkbox"
                v-model="registerForm.agreeToTerms"
                id="terms"
                class="w-5 h-5 mt-0.5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                :disabled="loading"
              />
              <label for="terms" class="text-sm text-white/80 cursor-pointer">
                I agree to the
                <button type="button" @click="$emit('showTerms')" class="text-green-300 hover:text-green-400 hover:underline font-medium">
                  Terms of Service
                </button>
                and
                <button type="button" @click="$emit('showPrivacy')" class="text-green-300 hover:text-green-400 hover:underline font-medium">
                  Privacy Policy
                </button>
              </label>
            </div>
            <transition name="fade">
              <p v-if="registerErrors.agreeToTerms" class="text-red-300 text-xs mt-2 ml-8">
                {{ registerErrors.agreeToTerms }}
              </p>
            </transition>
          </div>

          <!-- Email Verification Notice -->
          <transition name="slide-down">
            <div v-if="showVerificationPrompt" class="w-full p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
              <p class="text-sm text-blue-100 text-center flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Please check your email to verify your account
              </p>
            </div>
          </transition>
        </div>
      </transition>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex items-center justify-between w-full gap-4 pt-4 border-t border-white/10">
      <!-- Back Button -->
      <button
        v-if="currentStep > 1"
        @click="previousStep"
        :disabled="loading"
        class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </button>

      <div v-else></div>

      <!-- Next/Submit Button -->
      <button
        v-if="currentStep < 3"
        @click="nextStep"
        :disabled="loading || !canProceedToNextStep"
        class="ml-auto px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        Next
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <button
        v-else
        @click="handleRegister"
        :disabled="loading || !registerForm.agreeToTerms"
        class="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <span v-if="!loading" class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
          </svg>
          Create Account
        </span>
        <span v-else class="flex items-center gap-2">
          <EcoSpinner size="18px" color="#fff" :centered="false" />
          Creating...
        </span>
      </button>
    </div>

    <!-- Divider (only show on step 1) -->
    <div v-if="currentStep === 1" class="flex items-center w-full gap-4 my-2">
      <div class="flex-1 h-px bg-white/20"></div>
      <span class="text-xs text-white/60 font-medium">OR</span>
      <div class="flex-1 h-px bg-white/20"></div>
    </div>

    <!-- Google Sign-Up (only show on step 1) -->
    <button
      v-if="currentStep === 1"
      type="button"
      @click="handleGoogleSignUp"
      class="w-full bg-white text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg"
      :disabled="loading"
    >
      <img src="/google-icon.png" alt="Google" class="w-5 h-5" />
      <span v-if="!loading">Sign Up with Google</span>
      <span v-else class="flex items-center gap-2">
        <EcoSpinner size="16px" color="#444" :centered="false" />
        Signing up...
      </span>
    </button>

    <!-- Login Link -->
    <transition name="fade">
      <p class="text-sm text-white/80 mt-4 text-center">
        Already have an account?
        <button @click="$emit('toggleView')" class="text-green-300 hover:text-green-400 hover:underline font-semibold">
          Sign In
        </button>
      </p>
    </transition>

    <!-- Google Terms Confirmation Dialog -->
    <transition name="fade">
      <div v-if="showGoogleTermsDialog" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="showGoogleTermsDialog = false">
        <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all" @click.stop>
          <!-- Header with Icon -->
          <div class="flex flex-col items-center mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 text-center">Terms & Conditions</h3>
            <p class="text-sm text-gray-500 mt-2 text-center">Please review before continuing</p>
          </div>

          <!-- Content -->
          <div class="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
            <p class="text-sm text-gray-700 leading-relaxed">
              By signing up with Google, you agree to our
              <button @click="$emit('showTerms')" class="text-blue-600 hover:text-blue-700 underline font-semibold transition-colors">Terms of Service</button>
              and
              <button @click="$emit('showPrivacy')" class="text-blue-600 hover:text-blue-700 underline font-semibold transition-colors">Privacy Policy</button>.
            </p>
          </div>

          <!-- Info Note -->
          <div class="flex items-start gap-3 mb-6 bg-gray-50 rounded-lg p-3">
            <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            <p class="text-xs text-gray-600">You'll need to complete additional information after connecting with Google.</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3">
            <button 
              @click="showGoogleTermsDialog = false" 
              class="flex-1 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 active:scale-95 border border-gray-200"
            >
              Cancel
            </button>
            <button 
              @click="confirmGoogleSignUp" 
              class="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              I Agree
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Google Profile Completion Dialog -->
    <transition name="fade">
      <div v-if="showGoogleCompletionDialog" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl transform transition-all my-8">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
              <h3 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Complete Your Profile
              </h3>
              <p class="text-sm text-gray-500 mt-1">Just a few more details to get started</p>
            </div>
            <button @click="cancelGoogleSignUp" class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Progress Indicator -->
          <div class="mb-6">
            <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Profile completion</span>
              <span class="font-semibold">{{ completionPercentage }}%</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                :style="{ width: completionPercentage + '%' }"
                class="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
              ></div>
            </div>
          </div>

          <!-- Form Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <!-- Username -->
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-gray-700 flex items-center gap-1">
                Username *
                <svg v-if="registerForm.username && registerForm.username.length >= 3 && !registerErrors.username" class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </label>
              <input 
                v-model="registerForm.username" 
                type="text" 
                placeholder="Enter username"
                @blur="validateUsername"
                :class=" [
                  'w-full border-2 rounded-xl px-4 py-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                  registerErrors.username 
                    ? 'border-red-300 bg-red-50' 
                    : registerForm.username && registerForm.username.length >= 3
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                ]"
              />
              <transition name="fade">
                <p v-if="registerErrors.username" class="text-xs text-red-600 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
                  {{ registerErrors.username }}
                </p>
              </transition>
            </div>

            <!-- Full Name -->
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-gray-700 flex items-center gap-1">
                Full Name *
                <svg v-if="registerForm.completeName && registerForm.completeName.length >= 3" class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </label>
              <input 
                v-model="registerForm.completeName" 
                type="text" 
                placeholder="Enter full name"
                :class=" [
                  'w-full border-2 rounded-xl px-4 py-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                  registerForm.completeName && registerForm.completeName.length >= 3
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                ]"
              />
            </div>

            <!-- Birthday -->
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-gray-700 flex items-center gap-1">
                Birthday *
                <svg v-if="registerForm.birthday" class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </label>
              <input 
                v-model="registerForm.birthday" 
                type="date" 
                :class=" [
                  'w-full border-2 rounded-xl px-4 py-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                  registerForm.birthday
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                ]"
              />
            </div>

            <!-- Phone -->
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-gray-700 flex items-center gap-1">
                Phone Number *
                <svg v-if="registerForm.cellphone.length === 11 && !registerErrors.cellphone" class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </label>
              <input 
                v-model="registerForm.cellphone" 
                type="tel" 
                placeholder="09XXXXXXXXX"
                maxlength="11"
                @input="onCellphoneInput"
                :class=" [
                  'w-full border-2 rounded-xl px-4 py-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                  registerErrors.cellphone
                    ? 'border-red-300 bg-red-50'
                    : registerForm.cellphone.length === 11
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                ]"
              />
              <transition name="fade">
                <p v-if="registerErrors.cellphone" class="text-xs text-red-600 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
                  {{ registerErrors.cellphone }}
                </p>
              </transition>
            </div>

            <!-- Gender -->
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-gray-700 flex items-center gap-1">
                Gender *
                <svg v-if="registerForm.gender" class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </label>
              <select 
                v-model="registerForm.gender" 
                :class=" [
                  'w-full border-2 rounded-xl px-4 py-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer',
                  registerForm.gender
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                ]"
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <!-- Address -->
            <div class="sm:col-span-2 space-y-1.5">
              <label class="text-sm font-medium text-gray-700 flex items-center gap-1">
                Address *
                <svg v-if="registerForm.address && registerForm.address.length >= 5" class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </label>
              <input 
                v-model="registerForm.address" 
                type="text" 
                placeholder="Enter your complete address"
                :class=" [
                  'w-full border-2 rounded-xl px-4 py-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                  registerForm.address && registerForm.address.length >= 5
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                ]"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button 
              @click="cancelGoogleSignUp" 
              class="flex-1 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 active:scale-95 border border-gray-200 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Cancel
            </button>
            <button 
              @click="completeGoogleSignUp"
              :disabled="completionPercentage < 100 || loading"
              class="flex-1 px-5 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="!loading" class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Finish Setup
              </span>
              <span v-else class="flex items-center gap-2">
                <EcoSpinner size="18px" color="#fff" :centered="false" />
                Processing...
              </span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted} from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // Adjust path as needed
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "vue-toastification";
import { logAuthEvent } from "../../utils/logAuthEvent";

import EcoSpinner from "../EcoLoader/EcoSpinner.vue"; // adjust path as needed
const toast = useToast();


const emit = defineEmits(['toggleView', 'showTerms', 'showPrivacy']);

const router = useRouter();
///add
const resetForm = () => {
  registerForm.username = "";
  registerForm.completeName = "";
  registerForm.birthday = "";
  registerForm.cellphone = "";
  registerForm.gender = "";
  registerForm.address = "";
  registerForm.email = "";
  registerForm.password = "";
  registerForm.confirmPassword = "";
  registerForm.agreeToTerms = false;
  profileImagePreview.value = null;
  profileImageError.value = "";
  Object.keys(registerErrors).forEach(key => registerErrors[key] = "");
};

///
const registerForm = reactive({
  username: "",
  completeName: "",
  birthday: "",
  cellphone: "",
  gender: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
});

const registerErrors = reactive({});
const profileImagePreview = ref(null);
const profileImageError = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false)
const loading = ref(false);
const globalAlert = reactive({ show: false, message: "", type: "success" });
const showVerificationPrompt = ref(false);
const uploadingImage = ref(false);

const isDeviceCompatible = ref(true);
const showPasswordRequirements = ref(false);
const showGoogleTermsDialog = ref(false); // Define ref for terms confirmation dialog
const showGoogleCompletionDialog = ref(false); // Define ref for profile completion dialog
const googleUserData = ref(null); // Define ref for storing Google user data

const validatePassword = () => {
  const pw = registerForm.password;
  if (!pw || pw.length < 8 || !/[A-Z]/.test(pw) || !/\d/.test(pw)) {
    registerErrors.password = "Password must be 8+ characters, include a number and uppercase letter.";
  } else {
    registerErrors.password = "";
  }
};

const validateConfirmPassword = () => {
  registerErrors.confirmPassword =
    registerForm.confirmPassword !== registerForm.password
      ? "Passwords do not match."
      : "";
};

const validateUsername = () => {
  registerErrors.username =
    !registerForm.username || registerForm.username.length < 3
      ? "Username must be at least 3 characters."
      : "";
};

const handleProfileImageChange = (event) => {
  const file = event.target.files[0];
  profileImageError.value = "";
  if (!file) {
    profileImagePreview.value = null;
    return;
  }
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!validTypes.includes(file.type)) {
    profileImageError.value = "Invalid image file (JPEG, PNG, GIF)";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    profileImageError.value = "Image must be under 5MB";
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    profileImagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const clearProfileImage = () => {
  profileImagePreview.value = null;
  profileImageError.value = "";
};

const handleRegister = async () => {
  validateUsername();
  validatePassword();
  validateConfirmPassword();

  if (
    registerErrors.username ||
    registerErrors.password ||
    registerErrors.confirmPassword ||
    !registerForm.agreeToTerms
  ) {
    globalAlert.message = "Some fields are invalid. Please check your inputs.";
    globalAlert.type = "error";
    globalAlert.show = true;
    return;
  }

  loading.value = true;
  globalAlert.show = false;
  toast.info("Creating account...", { timeout: 1500 });
  try {
    // Step 1: Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      registerForm.email,
      registerForm.password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);

    // Step 2: Save additional data to Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      username: registerForm.username,
      email: registerForm.email,
      profileImageUrl: profileImagePreview.value || "",
      completeName: registerForm.completeName,
      birthday: registerForm.birthday,
      cellphone: registerForm.cellphone,
      gender: registerForm.gender,
      address: registerForm.address,
      role: "user",
      status: "active",
      createdAt: new Date().toISOString(),
      emailVerified: false,
      authProvider: "email",
      loginCount: 1,
      agreedToTerms: registerForm.agreeToTerms, // Add this field
    });

    globalAlert.message = "Account created successfully! Please verify your email.";
    globalAlert.type = "success";
    globalAlert.show = true;
    showVerificationPrompt.value = true;

    await logAuthEvent({
      type: "register",
      status: "success",
      email: registerForm.email,
      uid: user.uid,
      method: "email",
    });

    resetForm();

    setTimeout(() => {
      globalAlert.message = "Account created successfully! Please verify your email.";
      toast.success("📩 A verification link has been sent to your Gmail. Please verify before logging in.");
      globalAlert.type = "success";
      globalAlert.show = true;
      showVerificationPrompt.value = true;

      emit('toggleView'); // ✅ This tells the parent to show the Login page
    }, 3000);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("❗ Email is already in use. Please use a different email.");
    }
    await logAuthEvent({
      type: "register",
      status: "failed",
      email: registerForm.email,
      reason: error.code || error.message,
    });
    toast.error(error.message || "❗ Registration failed.");
    globalAlert.message = error.message || "Registration failed.";
    globalAlert.type = "error";
    globalAlert.show = true;
  } finally {
    loading.value = false;
  }
};

function togglePassword() {
  showPassword.value = !showPassword.value
}
function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}
const handleGoogleSignUp = async () => {
  loading.value = true;
  globalAlert.show = false;

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    googleUserData.value = result.user; // Store Google user data temporarily

    // Check if the user already exists in Firestore
    const userRef = doc(db, "users", googleUserData.value.uid);
    const userSnapshot = await getDoc(userRef); // Use getDoc to fetch the document

    if (userSnapshot.exists() && userSnapshot.data().completeName && userSnapshot.data().email) {
      // User already exists with complete information
      toast.info("This Gmail is already registered. Redirecting to login...");
      setTimeout(() => {
        emit('toggleView'); // Redirect to login
      }, 2000);
      return;
    }

    // Pre-fill the form with Google user data
    registerForm.username = googleUserData.value.displayName || "GoogleUser";
    registerForm.email = googleUserData.value.email;
    registerForm.completeName = googleUserData.value.displayName || "";
    registerForm.profileImageUrl = googleUserData.value.photoURL || "";

    showGoogleTermsDialog.value = true; // Show terms confirmation dialog
  } catch (err) {
    if (err.code === "auth/popup-closed-by-user") {
      console.warn("Google Sign-Up popup closed by user.");
      return;
    }
    toast.error(err.message || "Google Sign-Up failed.");
    globalAlert.message = err.message || "Google Sign-In failed.";
    globalAlert.type = "error";
    globalAlert.show = true;
  } finally {
    loading.value = false;
  }
};

const confirmGoogleSignUp = async () => {
  showGoogleTermsDialog.value = false; // Close terms dialog
  loading.value = true;
  globalAlert.show = false;
  toast.info("🔓 Signing up with Google...", { timeout: 1500 });

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    googleUserData.value = result.user; // Store Google user data temporarily

    // Check if the user already exists in Firestore
    const userRef = doc(db, "users", googleUserData.value.uid);
    const userSnapshot = await getDoc(userRef); // Use getDoc to fetch the document

    if (userSnapshot.exists() && userSnapshot.data().completeName && userSnapshot.data().email) {
      // User already exists with complete information
      toast.info("This Gmail is already registered. Redirecting to login...");
      setTimeout(() => {
        emit('toggleView'); // Redirect to login
      }, 2000);
      return;
    }

    // Pre-fill the form with Google user data
    registerForm.username = googleUserData.value.displayName || "GoogleUser";
    registerForm.email = googleUserData.value.email;
    registerForm.completeName = googleUserData.value.displayName || "";
    registerForm.profileImageUrl = googleUserData.value.photoURL || "";

    showGoogleCompletionDialog.value = true; // Show profile completion dialog
  } catch (err) {
    if (err.code === "auth/popup-closed-by-user") {
      console.warn("Google Sign-Up popup closed by user.");
      return;
    }
    toast.error(err.message || "Google Sign-Up failed.");
    globalAlert.message = err.message || "Google Sign-In failed.";
    globalAlert.type = "error";
    globalAlert.show = true;
  } finally {
    loading.value = false;
  }
};

const completeGoogleSignUp = async () => {
  validateUsername();
  validateCellphone();

  if (
    registerErrors.username ||
    registerErrors.cellphone ||
    !registerForm.completeName ||
    !registerForm.birthday ||
    !registerForm.cellphone ||
    !registerForm.gender ||
    !registerForm.address
  ) {
    toast.warning("Please fill in all required fields correctly.");
    return;
  }

  loading.value = true;
  globalAlert.show = false;

  try {
    const userRef = doc(db, "users", googleUserData.value.uid);
    await setDoc(userRef, {
      username: registerForm.username,
      email: registerForm.email,
      profileImageUrl: registerForm.profileImageUrl || "",
      completeName: registerForm.completeName,
      birthday: registerForm.birthday,
      cellphone: registerForm.cellphone,
      gender: registerForm.gender,
      address: registerForm.address,
      role: "user",
      status: "active",
      createdAt: new Date().toISOString(),
      emailVerified: googleUserData.value.emailVerified,
      authProvider: "google",
      loginCount: 1,
    });

    toast.success("✅ Signed up with Google!");
    globalAlert.message = "Signed up with Google successfully!";
    globalAlert.type = "success";
    globalAlert.show = true;

    await logAuthEvent({
      type: "register",
      status: "success",
      email: googleUserData.value.email,
      uid: googleUserData.value.uid,
      method: "google",
    });

    router.push("/user/dashboard");
  } catch (err) {
    toast.error(err.message || "Google Sign-Up failed.");
    globalAlert.message = err.message || "Google Sign-In failed.";
    globalAlert.type = "error";
    globalAlert.show = true;
  } finally {
    loading.value = false;
    showGoogleCompletionDialog.value = false;
    googleUserData.value = null; // Clear temporary data
  }
};

const cancelGoogleSignUp = () => {
  showGoogleCompletionDialog.value = false;
  googleUserData.value = null; // Clear temporary data
  resetForm(); // Reset the form
  toast.info("Google Sign-Up canceled.");
};

const passwordStrength = computed(() => {
  const pw = registerForm.password || "";
  let score = 0;
  if (/[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (pw.length >= 8) score++;

  const feedback = ["Very Weak", "Weak", "Moderate", "Strong"][score] || "";
  return { score, feedback };
});

const completionPercentage = computed(() => {
  const fields = [
    registerForm.username && registerForm.username.length >= 3 && !registerErrors.username,
    registerForm.completeName && registerForm.completeName.length >= 3,
    registerForm.birthday,
    registerForm.cellphone && registerForm.cellphone.length === 11 && !registerErrors.cellphone,
    registerForm.gender,
    registerForm.address && registerForm.address.length >= 5,
  ];
  const filledFields = fields.filter(Boolean).length;
  return Math.round((filledFields / fields.length) * 100);
});

const checkDeviceCompatibility = () => {
  const ua = navigator.userAgent.toLowerCase();
  isDeviceCompatible.value = /chrome|firefox|edg/.test(ua) && !/mobile/.test(ua);
};

onMounted(() => {
  checkDeviceCompatibility();
  // Pre-fill cellphone with '09' if empty
  if (!registerForm.cellphone) {
    registerForm.cellphone = "09";
  }
});

const onCellphoneInput = (e) => {
  // Only allow numbers, always start with '09'
  let value = e.target.value.replace(/\D/g, "");
  if (!value.startsWith("09")) {
    value = "09" + value.replace(/^09/, "");
  }
  // Limit to 11 digits
  if (value.length > 11) value = value.slice(0, 11);
  registerForm.cellphone = value;
  validateCellphone();
};

const validateCellphone = () => {
  if (!/^09\d{9}$/.test(registerForm.cellphone)) {
    registerErrors.cellphone = "Phone number must start with 09 and be 11 digits.";
  } else {
    registerErrors.cellphone = "";
  }
};

const currentStep = ref(1);

const canProceedToNextStep = computed(() => {
  if (currentStep.value === 1) {
    return (
      registerForm.username.length >= 3 &&
      registerForm.completeName.length >= 3 &&
      registerForm.birthday &&
      registerForm.cellphone.length === 11 &&
      registerForm.gender &&
      registerForm.address.length >= 5 &&
      !registerErrors.username &&
      !registerErrors.cellphone
    );
  }
  if (currentStep.value === 2) {
    return (
      registerForm.email.includes('@') &&
      registerForm.password.length >= 8 &&
      registerForm.confirmPassword === registerForm.password &&
      !registerErrors.password &&
      !registerErrors.confirmPassword
    );
  }
  return true;
});

const nextStep = () => {
  if (currentStep.value === 1) {
    // Validate Step 1 fields
    validateUsername();
    validateCellphone();
    if (
      !registerForm.username ||
      registerForm.username.length < 3 ||
      registerErrors.username ||
      !registerForm.completeName ||
      registerForm.completeName.length < 3 ||
      !registerForm.birthday ||
      !registerForm.cellphone ||
      registerForm.cellphone.length !== 11 ||
      registerErrors.cellphone ||
      !registerForm.gender ||
      !registerForm.address ||
      registerForm.address.length < 5
    ) {
      toast.warning("Please fill in all required fields correctly in Step 1.");
      return;
    }
  }

  if (currentStep.value === 2) {
    // Validate Step 2 fields
    validatePassword();
    validateConfirmPassword();
    if (
      !registerForm.email ||
      !registerForm.email.includes("@") ||
      !registerForm.password ||
      registerForm.password.length < 8 ||
      registerErrors.password ||
      !registerForm.confirmPassword ||
      registerForm.confirmPassword !== registerForm.password ||
      registerErrors.confirmPassword
    ) {
      toast.warning("Please fill in all required fields correctly in Step 2.");
      return;
    }
  }

  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-down-enter-active {
  transition: all 0.4s ease-out;
}
.slide-down-leave-active {
  transition: all 0.3s ease-in;
}
.slide-down-enter-from {
  transform: translateY(-20px);
  opacity: 0;
  max-height: 0;
}
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
  max-height: 0;
}

/* Smooth input transitions */
input, select {
  transition: all 0.2s ease;
}

input:focus, select:focus {
  transform: translateY(-1px);
}

/* Loading animation */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(34, 197, 94, 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 197, 94, 0.7);
}
</style>

