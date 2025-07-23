<template>
  <section id="benefits" class="px-4 sm:px-6 py-16 sm:py-20 relative z-10">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Benefits of Eco-Mist
        </h2>
        <div class="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto rounded-full"></div>
      </div>

      <!-- Grid Layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <!-- Benefit 1 -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8">
          <div class="flex items-start gap-4 mb-6">
            <div class="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg flex-shrink-0">
              <Droplets class="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h3 class="text-green-800 text-xl sm:text-2xl font-bold mb-2">Resource Efficiency</h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Eco-Mist's precision control system reduces water usage by up to 95% compared to traditional farming methods.
              </p>
            </div>
          </div>
          <p class="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            Smart nutrient delivery ensures plants receive exactly what they need, minimizing waste and maximizing efficiency.
          </p>
          <ul class="space-y-2">
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-green-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Reduced water consumption</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-green-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Optimized nutrient usage</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-green-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Lower energy requirements</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-green-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Minimal environmental impact</span>
            </li>
          </ul>
        </div>

        <!-- Benefit 2 -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8">
          <div class="flex items-start gap-4 mb-6">
            <div class="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl shadow-lg flex-shrink-0">
              <Brain class="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h3 class="text-emerald-800 text-xl sm:text-2xl font-bold mb-2">Smart Technology</h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                AI-powered monitoring and automated adjustments ensure optimal growing conditions 24/7.
              </p>
            </div>
          </div>
          <p class="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            Real-time sensors and machine learning algorithms continuously optimize your growing environment for maximum yield.
          </p>
          <ul class="space-y-2">
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">AI-powered monitoring</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Automated adjustments</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Real-time analytics</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Predictive maintenance</span>
            </li>
          </ul>
        </div>

        <!-- Benefit 3 -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8">
          <div class="flex items-start gap-4 mb-6">
            <div class="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl shadow-lg flex-shrink-0">
              <Leaf class="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h3 class="text-emerald-800 text-xl sm:text-2xl font-bold mb-2">Sustainable Growth</h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Achieve higher yields while maintaining environmental responsibility and sustainability.
              </p>
            </div>
          </div>
          <p class="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            Our eco-friendly approach ensures long-term soil health and biodiversity while maximizing crop production.
          </p>
          <ul class="space-y-2">
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Increased crop yields</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Soil health preservation</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Biodiversity support</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Carbon footprint reduction</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Droplets, Brain, Leaf, Check } from 'lucide-vue-next'
</script>
