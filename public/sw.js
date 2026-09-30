/**
 * BRICS AgriNet Service Worker
 * Provides offline caching for agro-advisories, satellite telemetry,
 * crop pathology diagnostics, and offline emergency field packs.
 */

const CACHE_NAME = 'brics-agrinet-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Offline fallback responses for API calls when disconnected
const OFFLINE_FALLBACK_ADVISORY = {
  advisoryTitle: 'Offline Mode: Pre-Cached Regenerative Field Advisory',
  farmerRiskLevel: 'Medium',
  executiveSummary: 'You are currently operating in offline mode. This advisory is loaded from your device\'s local cache. Maintain moisture via surface mulching, apply microbial compost inoculants, and practice companion planting.',
  regenerativeCropStrategy: {
    recommendedCrops: [
      {
        name: 'Drought-Tolerant Primary Cultivar',
        role: 'Primary Cash Crop',
        benefits: 'Preserves baseline yield under low-moisture conditions',
        sowingAdvice: 'Adopt zero-till direct seeding into residue stubble to minimize soil disturbance',
      },
      {
        name: 'Cowpea / Pigeon Pea (Pulse)',
        role: 'Nitrogen Fixer',
        benefits: 'Atmospheric biological nitrogen fixation and soil shading',
        sowingAdvice: 'Intercrop at 4:1 row ratio with primary crop',
      },
    ],
    rotationPlan: 'Rotate with legume cover crops following harvest.',
    intercroppingPattern: 'Strip intercropping with moisture-trapping boundary hedgerows.',
  },
  soilRestorationPlan: {
    organicCarbonIntervention: 'Apply 2 t/ha compost blended with 100 kg biochar to preserve moisture sponge.',
    biofertilizersRecommended: ['Rhizobium inoculant', 'Trichoderma viride', 'Phosphate solubilizing bacteria'],
    naturalSoilConditioner: 'Mulch with available crop residues (straw, husk, dried leaves).',
    phCorrection: 'Maintain balanced organic matter to buffer soil pH naturally.',
  },
  waterAndClimateGuidance: {
    irrigationSchedule: 'Irrigate during early dawn to minimize evaporative losses.',
    waterRetentionMethod: 'Maintain 5-8 cm organic biomass mulch over active root zone.',
    weatherAlertMitigation: 'If heatwave hits, suspend chemical sprays and prioritize shaded mulching.',
  },
  bricsKnowledgeTransfer: {
    sourceNation: 'BRICS Offline Agricultural Knowledge Base',
    techniqueName: 'Zero-Till Mulch Farming & Biological Inoculation',
    adaptationInsight: 'Proven techniques from Brazilian oxisols and Indian rainfed regions maintain soil moisture for up to 14 days without rainfall.',
  },
  priorityWeeklyTasks: [
    {
      dayRange: 'Day 1 - 2',
      task: 'Check soil moisture under mulch layer at 10cm depth',
      impact: 'Prevents premature drought stress without unnecessary irrigation',
    },
    {
      dayRange: 'Day 3 - 4',
      task: 'Prepare fermented bio-concoction (neem, garlic, compost tea)',
      impact: 'Strengthens crop immunity against early fungal spores',
    },
  ],
  translatedLanguage: 'Offline Cached Mode',
};

// Install Event: Precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('🌾 [Service Worker] Precaching app shell & offline assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Some assets could not be precached during install:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('🌾 [Service Worker] Purging outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Network-First for APIs with Cache Fallback; Stale-While-Revalidate for Assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Handle API requests (/api/*)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If response is valid, clone and cache it for offline use
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          console.log(`🌾 [Service Worker] Network offline. Serving cached API: ${url.pathname}`);
          // Attempt to match in cache
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // If it's the advisory endpoint, return emergency offline advisory
          if (url.pathname.includes('/advisory')) {
            return new Response(JSON.stringify(OFFLINE_FALLBACK_ADVISORY), {
              headers: { 'Content-Type': 'application/json' },
            });
          }

          // Otherwise return standard offline message
          return new Response(
            JSON.stringify({
              offline: true,
              message: 'Offline mode active. Data retrieved from local storage cache.',
            }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        })
    );
    return;
  }

  // Handle Static Assets: Stale-While-Revalidate / Cache-First
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback for HTML navigation
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
