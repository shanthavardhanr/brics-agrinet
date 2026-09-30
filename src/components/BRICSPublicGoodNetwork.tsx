import React, { useState } from 'react';
import { BRICSPublicGoodItem } from '../types/agriculture';
import { BricsLanguage, t, getLocalizedPublicGoods } from '../utils/translations';
import {
  Globe2,
  Database,
  Share2,
  Download,
  Copy,
  Check,
  Search,
  BookOpen,
  HeartHandshake,
  ShieldCheck,
  Code2,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface BRICSPublicGoodNetworkProps {
  selectedLanguage: BricsLanguage;
}

export const BRICSPublicGoodNetwork: React.FC<BRICSPublicGoodNetworkProps> = ({ selectedLanguage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Live Query State
  const [coopQuery, setCoopQuery] = useState<string>(
    'How can Indian natural farming consortia (ZBNF) be adapted to Brazilian degraded oxisols and South African highveld pastures?'
  );
  const [queryCategory, setQueryCategory] = useState<string>('Genetic Models & Regenerative Inputs');
  const [queryResult, setQueryResult] = useState<any | null>(null);
  const [isQueryLoading, setIsQueryLoading] = useState<boolean>(false);

  // Schema Explorer State
  const [schemaType, setSchemaType] = useState<'jsonld' | 'geojson' | 'agriGateway'>('jsonld');
  const [copied, setCopied] = useState<boolean>(false);

  const categories = [
    'All',
    'Genetic Models',
    'Soil Carbon',
    'Satellite Algorithms',
    'Biological Pest Control',
    'Water Governance',
  ];

  const publicGoodsData = getLocalizedPublicGoods(selectedLanguage);

  const filteredGoods = publicGoodsData.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leadNation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getLanguagePromptName = (lang: BricsLanguage): string => {
    switch (lang) {
      case 'te': return 'Telugu';
      case 'hi': return 'Hindi';
      case 'pt': return 'Portuguese';
      case 'ru': return 'Russian';
      case 'zh': return 'Mandarin Chinese';
      case 'ar': return 'Arabic';
      case 'sw': return 'Swahili';
      default: return 'English';
    }
  };

  // Handle Query
  const handleQueryNetwork = async () => {
    setIsQueryLoading(true);
    try {
      const res = await fetch('/api/cooperation/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: queryCategory,
          query: coopQuery,
          partnerNation: 'All BRICS (Brazil, Russia, India, China, South Africa, Egypt, Ethiopia)',
          language: getLanguagePromptName(selectedLanguage),
        }),
      });
      const data = await res.json();
      setQueryResult(data);
    } catch (err) {
      console.error('Cooperation query error:', err);
    } finally {
      setIsQueryLoading(false);
    }
  };

  // Sample Schemas for Interoperability
  const sampleJsonLd = {
    '@context': [
      'https://schema.org',
      'https://open-agri.brics.org/contexts/agri-advisory.jsonld',
    ],
    '@type': 'AgroAdvisoryBulletin',
    identifier: 'urn:brics:agrin:advisory:in:2026:09:8821',
    publisher: {
      '@type': 'Consortium',
      name: 'BRICS Agricultural Research Platform (AgriNet)',
      memberNations: ['Brazil', 'Russia', 'India', 'China', 'South Africa', 'Egypt', 'Ethiopia'],
    },
    agroEcologicalZone: {
      '@type': 'Place',
      name: 'Indo-Gangetic Alluvial Basin',
      geo: { '@type': 'GeoCoordinates', latitude: 30.73, longitude: 76.78 },
    },
    soilHealthObservation: {
      '@type': 'Observation',
      ph: 7.2,
      organicCarbonPercent: 0.48,
      nitrogenKgPerHa: 185,
    },
    satelliteTelemetry: {
      '@type': 'Observation',
      source: 'Sentinel-2 MSI / CBERS-4A',
      ndvi: 0.44,
      surfaceTemperatureCelsius: 32.8,
    },
    regenerativeInterventions: [
      {
        '@type': 'Action',
        category: 'BioFertilization',
        agent: 'Rhizobium leguminosarum consortia',
        rate: '500g / ha seed coating',
      },
      {
        '@type': 'Action',
        category: 'MoistureHarvesting',
        method: 'Straw residue mulch retention',
        thicknessCm: 5.0,
      },
    ],
  };

  const sampleGeoJson = {
    type: 'FeatureCollection',
    name: 'BRICS_AgriNet_Soil_Carbon_Registry',
    crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
    features: [
      {
        type: 'Feature',
        properties: {
          hub_id: 'BRICS-HUB-CHERN-01',
          nation: 'Russia',
          region: 'Voronezh Central Chernozem',
          humus_pct: 4.8,
          carbon_sequestration_rate_t_ha_yr: 1.4,
          management: 'Permanent no-till with cover crop mixture',
        },
        geometry: { type: 'Point', coordinates: [39.20, 51.66] },
      },
      {
        type: 'Feature',
        properties: {
          hub_id: 'BRICS-HUB-CERR-02',
          nation: 'Brazil',
          region: 'Goiás Cerrado Oxisol',
          humus_pct: 1.3,
          carbon_sequestration_rate_t_ha_yr: 1.8,
          management: 'Brachiaria straw cover with biological nitrogen fixation',
        },
        geometry: { type: 'Point', coordinates: [-47.92, -15.78] },
      },
    ],
  };

  const sampleAgriGateway = {
    openapi: '3.1.0',
    info: {
      title: 'BRICS AgriNet Interoperable Agricultural API Gateway',
      version: '1.2.0',
      description: 'Open Digital Public Good specifications for national ministries of agriculture.',
      license: { name: 'Open Data Commons Open Database License (ODbL)' },
    },
    paths: {
      '/v1/advisories/evaluate': {
        post: {
          summary: 'Compute localized regenerative advisory from telemetry',
          parameters: [{ name: 'brics-node-auth', in: 'header', required: false }],
          requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/TelemetryPayload' } } } },
          responses: { '200': { description: 'Verified FAO-compliant localized advisory bulletin' } },
        },
      },
      '/v1/germplasm/federated-search': {
        get: {
          summary: 'Search open climate-hardy landraces across national genebanks',
          responses: { '200': { description: 'Open access seed genotypes without patent encumbrance' } },
        },
      },
    },
  };

  const currentSchemaString =
    schemaType === 'jsonld'
      ? JSON.stringify(sampleJsonLd, null, 2)
      : schemaType === 'geojson'
      ? JSON.stringify(sampleGeoJson, null, 2)
      : JSON.stringify(sampleAgriGateway, null, 2);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(currentSchemaString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSchema = () => {
    const blob = new Blob([currentSchemaString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brics-agrinet-${schemaType}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              <span>{t('dpgTheme', selectedLanguage)}</span>
              <span aria-hidden="true">·</span>
              <span>{t('dpgAlliance', selectedLanguage)}</span>
            </div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-stone-900 tracking-tight">
              {t('dpgTitle', selectedLanguage)}
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              {t('dpgSubtitle', selectedLanguage)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-900 text-xs font-medium rounded-xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t('dpgOpenBadge', selectedLanguage)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Network Query Terminal */}
      <div className="bg-gradient-to-br from-[#0F2E1E] to-[#1A4329] text-white rounded-2xl p-6 shadow-md border border-emerald-800/60">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>{t('queryTerminalTitle', selectedLanguage)}</span>
        </div>

        <h2 className="font-serif text-lg font-bold text-white mb-2">
          {t('queryTerminalHeading', selectedLanguage)}
        </h2>
        <p className="text-xs text-stone-300 mb-4 max-w-2xl">
          {t('queryTerminalDesc', selectedLanguage)}
        </p>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={coopQuery}
              onChange={(e) => setCoopQuery(e.target.value)}
              placeholder="e.g. How to adapt Brazilian oxisol no-till systems to Indian alluvial soils..."
              className="flex-1 bg-stone-900/60 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            <button
              onClick={handleQueryNetwork}
              disabled={isQueryLoading}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isQueryLoading ? 'animate-spin' : ''}`} />
              <span>{isQueryLoading ? t('btnConsulting', selectedLanguage) : t('btnQueryNetwork', selectedLanguage)}</span>
            </button>
          </div>

          {/* Preset Query Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300 pt-1">
            <span className="text-[11px] text-emerald-300">{t('quickInquiries', selectedLanguage)}</span>
            <button
              onClick={() => {
                setCoopQuery('How does EMBRAPA biological nitrogen fixation cut urea dependency in tropical oxisols?');
              }}
              className="text-[11px] bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              Brazil BNF Bio-inputs
            </button>
            <button
              onClick={() => {
                setCoopQuery('What are the phenotypic traits of Indian drought-hardy pearl millets under heat stress?');
              }}
              className="text-[11px] bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              India Climate Millets
            </button>
            <button
              onClick={() => {
                setCoopQuery('How do Chinese saline-alkali super rice cultivars perform on coastal delta soils?');
              }}
              className="text-[11px] bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              China Saline Rice
            </button>
          </div>
        </div>

        {/* Query Results Box */}
        {queryResult && (
          <div className="mt-5 p-4 rounded-xl bg-stone-900/80 border border-emerald-700/60 text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-stone-700 pb-2">
              <span className="font-bold text-emerald-300">{queryResult.topic}</span>
              <span className="text-[10px] text-stone-400 font-mono">Verified BRICS AgriN Public Good</span>
            </div>
            <p className="text-stone-200 leading-relaxed">{queryResult.cooperationHighlight}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {queryResult.openPublicGoods?.map((item: any, idx: number) => (
                <div key={idx} className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 space-y-1">
                  <div className="font-bold text-white text-xs">{item.title}</div>
                  <div className="text-[10px] text-emerald-300 font-mono">
                    Lead: {item.leadNation} · {item.institutionalPartner}
                  </div>
                  <div className="text-[11px] text-stone-300">{item.impactMetric}</div>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-emerald-900/40 rounded-lg text-emerald-200 text-[11px]">
              <span className="font-bold">Farmer Benefit: </span>
              {queryResult.farmerBenefitSummary}
            </div>
          </div>
        )}
      </div>

      {/* Open Public Goods Catalog */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-950/10 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-lg text-stone-900">
              {t('catalogTitle', selectedLanguage)}
            </h2>
            <p className="text-xs text-stone-500">
              {t('catalogSubtitle', selectedLanguage)}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder', selectedLanguage)}
              className="text-xs bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-stone-900 w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Goods Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGoods.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-emerald-700/60 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-base">{item.leadFlag}</span>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded font-medium">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-sm text-stone-900 mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-2">
                  {item.description}
                </p>
                <div className="text-[11px] text-stone-500 font-mono">
                  {item.institutionalPartner}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200/80 space-y-2">
                <div className="text-[11px] font-medium text-emerald-900 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                  <span className="font-bold">Impact: </span>
                  {item.impactMetric}
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                  <span className="text-[10px] font-mono truncate">{item.downloadDataSize}</span>
                  <button
                    onClick={() => {
                      alert(`Initiated open data transfer for: ${item.title}\nLicense: ${item.license}`);
                    }}
                    className="flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-semibold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('btnAccessAsset', selectedLanguage)}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interoperable Data Standards Sandbox */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-950/10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-800" />
              <h2 className="font-serif font-bold text-lg text-stone-900">
                {t('sandboxTitle', selectedLanguage)}
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {t('sandboxSubtitle', selectedLanguage)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200">
              <button
                onClick={() => setSchemaType('jsonld')}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer ${
                  schemaType === 'jsonld' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                JSON-LD
              </button>
              <button
                onClick={() => setSchemaType('geojson')}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer ${
                  schemaType === 'geojson' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                GeoJSON
              </button>
              <button
                onClick={() => setSchemaType('agriGateway')}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer ${
                  schemaType === 'agriGateway' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                OpenAPI 3.1
              </button>
            </div>

            <button
              onClick={handleCopySchema}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
              title="Copy Schema"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleDownloadSchema}
              className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
              title="Download Schema File"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Block Container */}
        <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono text-slate-400">
            <span>brics-agrinet-{schemaType}.json</span>
            <span>UTF-8 · FAO AgGateway Compliant</span>
          </div>
          <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-72 leading-relaxed">
            <code>{currentSchemaString}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
