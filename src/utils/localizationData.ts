import type { BricsLanguage } from './translations';
import { PitchSlide } from '../data/pitchDeckData';
import { SampleDiseaseCase } from '../data/sampleDiseases';
import { BRICSPublicGoodItem, ExtremeWeatherAlert } from '../types/agriculture';

/**
 * Multilingual Extreme Weather Alerts dictionary
 */
export const LOCALIZED_WEATHER_ALERTS: Record<
  BricsLanguage,
  Record<
    string,
    {
      headline: string;
      description: (rain: number, temp: number, soilMoisture: number) => string;
      expectedOnset: string;
      immediateTacticalSteps: Array<{ step: string; urgency: string }>;
    }
  >
> = {
  en: {
    flood: {
      headline: 'FLASH FLOOD & SATURATION WARNING',
      description: (rain) =>
        `Heavy precipitation (${rain}mm) expected. Root-zone waterlogging risk is high. Immediate drainage channels required.`,
      expectedOnset: 'Within 6 to 12 Hours',
      immediateTacticalSteps: [
        { step: 'Open furrow trench outlets to discharge standing runoff from low contours', urgency: 'Immediate (0-2h)' },
        { step: 'Suspend all urea and fertilizer applications to prevent nutrient leaching', urgency: 'Immediate' },
        { step: 'Prepare microbial anti-rot drench (Trichoderma) post-drainage', urgency: 'Within 24h' },
      ],
    },
    drought: {
      headline: 'PROLONGED DROUGHT & HEAT ANOMALY',
      description: (_, temp, moisture) =>
        `Severe soil desiccation (${moisture}% moisture) and extreme heat (${temp}°C). High evapotranspiration rate.`,
      expectedOnset: 'Ongoing - Next 7 Days',
      immediateTacticalSteps: [
        { step: 'Apply 7-10 cm crop straw residue mulch over beds to reduce soil evaporation', urgency: 'Immediate' },
        { step: 'Shift irrigation to nocturnal / pre-dawn hours to reduce 45% evaporative loss', urgency: 'Tonight' },
        { step: 'Apply foliar silica or kaolin clay spray to reduce canopy heat transpiration', urgency: 'Within 48h' },
      ],
    },
    frost: {
      headline: 'RAPID GROUND FROST & FREEZE EVENT',
      description: (_, temp) =>
        `Sub-zero nocturnal dip (expected low ${temp}°C). Severe risk of crop tissue ice crystallization.`,
      expectedOnset: 'Tonight (02:00 - 06:30 AM)',
      immediateTacticalSteps: [
        { step: 'Apply light evening micro-sprinkler irrigation to release latent heat of fusion', urgency: 'Sunset Today' },
        { step: 'Cover sensitive nursery seedlings with agro-textile straw tarps', urgency: 'Before Dusk' },
        { step: 'Create controlled perimeter smokeless biochar biomass smolders upwind', urgency: 'Midnight' },
      ],
    },
    cyclone_storm: {
      headline: 'HIGH-VELOCITY SQUALL & GALE WARNING',
      description: () =>
        'Severe convective squall with wind gusts over 60 km/h. High lodging and branch breakage risk.',
      expectedOnset: 'Within 3 to 6 Hours',
      immediateTacticalSteps: [
        { step: 'Earthing-up tall crops (maize/sorghum) and reinforce bamboo staking for vines', urgency: 'Immediate' },
        { step: 'Clear perimeter drainage ditches to prevent deluge flash pooling', urgency: 'Within 2h' },
        { step: 'Secure greenhouse polyhouse films and shade netting anchors', urgency: 'Immediate' },
      ],
    },
  },
  te: {
    flood: {
      headline: 'తీవ్ర ఆకస్మిక వరద & నీటి ముంపు హెచ్చరిక',
      description: (rain) =>
        `భారీ వర్షపాతం (${rain}మి.మీ) అంచనా. వేరు వ్యవస్థ వద్ద నీరు నిలిచి కుళ్ళే ప్రమాదం ఉంది. తక్షణమే నీటి పారుదల కాలువలు తెరవండి.`,
      expectedOnset: 'రాబోయే 6 నుండి 12 గంటల్లో',
      immediateTacticalSteps: [
        { step: 'పొలంలో నిలిచిన నీటిని దిగువ కాలువల ద్వారా బయటకు పంపడానికి గట్లను తెరవండి', urgency: 'తక్షణం (0-2 గంటలు)' },
        { step: 'ఎరువులు నీటిలో కొట్టుకుపోకుండా యూరియా మరియు రసాయన ఎరువుల వాడకాన్ని ఆపండి', urgency: 'తక్షణం' },
        { step: 'నీరు తగ్గిన తర్వాత వేరుకుళ్ళు నివారణకు ట్రైకోడెర్మా బయో-ద్రావణాన్ని పిచికారీ చేయండి', urgency: '24 గంటల్లో' },
      ],
    },
    drought: {
      headline: 'తీవ్ర కరువు & అధిక ఉష్ణోగ్రత హెచ్చరిక',
      description: (_, temp, moisture) =>
        `నేలలో తేమ తీవ్రంగా పడిపోయింది (${moisture}% తేమ) మరియు గరిష్ట ఉష్ణోగ్రత (${temp}°C). బాష్పీభవన నష్టం చాలా ఎక్కువ.`,
      expectedOnset: 'ప్రస్తుతం కొనసాగుతోంది - రాబోయే 7 రోజులు',
      immediateTacticalSteps: [
        { step: 'నేలలో తేమ ఆరిపోకుండా 7-10 సెం.మీ ఎండిన వరి గడ్డి లేదా ఆకులతో మల్చింగ్ చేయండి', urgency: 'తక్షణం' },
        { step: 'బాష్పీభవన నష్టాన్ని 45% తగ్గించడానికి రాత్రి లేదా వేకువజామున మాత్రమే నీటి తడులు ఇవ్వండి', urgency: 'ఈ రాత్రి' },
        { step: 'ఆకులపై ఎండ వేడిమిని తట్టుకోవడానికి సిలికా లేదా వేపనూనె పిచికారీ చేయండి', urgency: '48 గంటల్లో' },
      ],
    },
    frost: {
      headline: 'ఆకస్మిక మంచు తుఫాను & గడ్డకట్టే చలి హెచ్చరిక',
      description: (_, temp) =>
        `రాత్రి పూట ఉష్ణోగ్రత సున్నా స్థాయికి (${temp}°C) పడిపోయే అవకాశం ఉంది. మొక్కల కణజాలం దెబ్బతినే ప్రమాదం ఉంది.`,
      expectedOnset: 'ఈ రాత్రి (తెల్లవారుజామున 02:00 - 06:30)',
      immediateTacticalSteps: [
        { step: 'భూమి ఉష్ణోగ్రత కాపాడటానికి సాయంత్రం వేళల్లో తేలికపాటి నీటి తడి ఇవ్వండి', urgency: 'ఈ సాయంత్రం' },
        { step: 'సున్నితమైన నారుమళ్లను గడ్డి కప్పులు లేదా పరదాలతో కప్పి ఉంచండి', urgency: 'చీకటి పడేలోపు' },
        { step: 'గాలి వీచే దిశలో పొగ వేయడం ద్వారా మంచు తీవ్రతను తగ్గించండి', urgency: 'అర్ధరాత్రి' },
      ],
    },
    cyclone_storm: {
      headline: 'తీవ్ర పెనుగాలి & ఈదురు గాలుల హెచ్చరిక',
      description: () =>
        'గంటకు 60 కి.మీ పైగా వేగంతో ఈదురు గాలులు వీచే అవకాశం ఉంది. పైర్లు నేలకూలే ప్రమాదం ఉంది.',
      expectedOnset: 'రాబోయే 3 నుండి 6 గంటల్లో',
      immediateTacticalSteps: [
        { step: 'మొక్కజొన్న, జొన్న వంటి పంటల మొదళ్ల వద్ద మట్టిని ఎగదోయండి; తీగ పంటలకు కర్రల సపోర్ట్ ఇవ్వండి', urgency: 'తక్షణం' },
        { step: 'వర్షపు నీరు పొలంలో నిలవకుండా డ్రైనేజీ కాలువలను సిద్ధం చేయండి', urgency: '2 గంటల్లో' },
        { step: 'పాలీహౌస్ మరియు షేడ్‌నెట్లను గట్టిగా కట్టి భద్రపరచండి', urgency: 'తక్షణం' },
      ],
    },
  },
  hi: {
    flood: {
      headline: 'आकस्मिक बाढ़ एवं जलभराव चेतावनी',
      description: (rain) =>
        `अत्यधिक वर्षा (${rain} मिमी) का अनुमान। जड़ क्षेत्र में सड़न का खतरा। तुरंत जल निकासी नालियां खोलें।`,
      expectedOnset: 'अगले 6 से 12 घंटों में',
      immediateTacticalSteps: [
        { step: 'खेत से अतिरिक्त पानी निकालने के लिए मेड़ों के निकास रास्ते तुरंत खोलें', urgency: 'तत्काल (0-2 घंटे)' },
        { step: 'पोषक तत्वों के बहने से बचने के लिए यूरिया व रासायनिक खादों का प्रयोग रोकें', urgency: 'तत्काल' },
        { step: 'जल निकासी के बाद ट्राइकोडर्मा जैविक कवकनाशी का छिड़काव करें', urgency: '24 घंटे के भीतर' },
      ],
    },
    drought: {
      headline: 'गंभीर सूखा एवं अत्यधिक ताप चेतावनी',
      description: (_, temp, moisture) =>
        `मिट्टी में अत्यधिक नमी की कमी (${moisture}%) एवं भारी तापमान (${temp}°C)। वाष्पीकरण की दर बहुत अधिक है।`,
      expectedOnset: 'जारी - आगामी 7 दिन',
      immediateTacticalSteps: [
        { step: 'नमी बचाने के लिए खेत में पुआल/घासफूस की 7-10 सेमी मोटी मल्चिंग करें', urgency: 'तत्काल' },
        { step: 'वाष्पीकरण नुकसान कम करने के लिए केवल रात्रि या भोर में ही सिंचाई करें', urgency: 'आज रात' },
        { step: 'फसलों को लू से बचाने के लिए पोटाश या सिलिका का पर्णीय छिड़काव करें', urgency: '48 घंटे में' },
      ],
    },
    frost: {
      headline: 'पाला एवं शीतलहर चेतावनी',
      description: (_, temp) =>
        `रात का तापमान शून्य के करीब (${temp}°C) गिरने की संभावना। फसलों में पाला लगने का अत्यधिक जोखिम।`,
      expectedOnset: 'आज रात (02:00 - 06:30 बजे)',
      immediateTacticalSteps: [
        { step: 'तापमान सुरक्षित रखने के लिए शाम के समय हल्की सिंचाई करें', urgency: 'आज सूर्यास्त' },
        { step: 'कोमल पौधों और नर्सरी को पुआल या प्लास्टिक शीट से ढकें', urgency: 'शाम से पहले' },
        { step: 'हवा की दिशा में रात को धुआं करके तापमान बढ़ाएं', urgency: 'मध्यरात्रि' },
      ],
    },
    cyclone_storm: {
      headline: 'तेज आंधी एवं चक्रवाती तूफान चेतावनी',
      description: () =>
        '60 किमी/घंटा से अधिक की रफ्तार से तेज हवाएं। खड़ी फसलों के गिरने का खतरा।',
      expectedOnset: 'अगले 3 से 6 घंटे में',
      immediateTacticalSteps: [
        { step: 'मक्का और गन्ने की जड़ों पर मिट्टी चढ़ाएं और सहारा दें', urgency: 'तत्काल' },
        { step: 'खेत की जल निकासी नालियां साफ रखें ताकि जलभराव न हो', urgency: '2 घंटे में' },
        { step: 'पॉलीहाउस और शेडनेट की रस्सियों को मजबूती से बांधें', urgency: 'तत्काल' },
      ],
    },
  },
  pt: {
    flood: {
      headline: 'ALERTA DE INUNDAÇÃO E SATURAÇÃO DO SOLO',
      description: (rain) =>
        `Precipitação intensa (${rain}mm) prevista. Risco crítico de asfixia radicular. Abra valas de drenagem imediatamente.`,
      expectedOnset: 'Dentro de 6 a 12 horas',
      immediateTacticalSteps: [
        { step: 'Abrir saídas de sulcos para escoar o excesso de água das baixadas', urgency: 'Imediato (0-2h)' },
        { step: 'Suspender aplicações de adubos nitrogenados para evitar lixiviação', urgency: 'Imediato' },
        { step: 'Aplicar biofungicida Trichoderma após a drenagem para prevenir podridão', urgency: 'Em 24h' },
      ],
    },
    drought: {
      headline: 'ALERTA DE SECA SEVERA E ONDA DE CALOR',
      description: (_, temp, moisture) =>
        `Ressecamento crítico do solo (${moisture}% umidade) e temperatura extrema (${temp}°C). Alta evapotranspiração.`,
      expectedOnset: 'Em andamento - Próximos 7 dias',
      immediateTacticalSteps: [
        { step: 'Aplicar cobertura morta (palhada de 7-10 cm) para conservar a umidade', urgency: 'Imediato' },
        { step: 'Irrigar exclusivamente no período noturno para reduzir 45% de evaporação', urgency: 'Esta noite' },
        { step: 'Pulverização foliar de silício para aumentar a tolerância térmica', urgency: 'Em 48h' },
      ],
    },
    frost: {
      headline: 'ALERTA DE GEADA E ONDA DE FRIO POLAR',
      description: (_, temp) =>
        `Queda térmica noturna crítica (${temp}°C). Alto risco de queima foliar por congelamento celular.`,
      expectedOnset: 'Hoje à noite (02:00 - 06:30)',
      immediateTacticalSteps: [
        { step: 'Ligar microaspersão no final da tarde para liberar calor latente', urgency: 'Ao pôr do sol' },
        { step: 'Cobrir mudas e canteiros com manta térmica ou palha', urgency: 'Antes de escurecer' },
        { step: 'Fazer queima controlada de biomassa a montante do vento para fumaça protetora', urgency: 'Meia-noite' },
      ],
    },
    cyclone_storm: {
      headline: 'ALERTA DE VENDAVAL E TEMPESTADE SEVERA',
      description: () =>
        'Rajadas de vento acima de 60 km/h com tempestade convectiva. Risco de tombamento de culturas.',
      expectedOnset: 'Dentro de 3 a 6 horas',
      immediateTacticalSteps: [
        { step: 'Chegar terra ao pé de plantas altas e reforçar tutoramento', urgency: 'Imediato' },
        { step: 'Desobstruir drenos pluviais contra enxurradas', urgency: 'Em 2h' },
        { step: 'Reforçar amarrações em estufas e telados agrícolas', urgency: 'Imediato' },
      ],
    },
  },
  ru: {
    flood: {
      headline: 'ПРЕДУПРЕЖДЕНИЕ О ЗАТОПЛЕНИИ И ПЕРЕУВЛАЖНЕНИИ',
      description: (rain) =>
        `Ожидаются обильные осадки (${rain} мм). Высокий риск загнивания корней. Немедленно откройте дренаж.`,
      expectedOnset: 'В течение 6-12 часов',
      immediateTacticalSteps: [
        { step: 'Открыть водоотводные борозды для сброса застойных вод с низин', urgency: 'Срочно (0-2 ч)' },
        { step: 'Приостановить внесение азотных удобрений во избежание вымывания', urgency: 'Немедленно' },
        { step: 'Обработать прикорневую зону триходермой после схода воды', urgency: 'В течение 24 ч' },
      ],
    },
    drought: {
      headline: 'ПРЕДУПРЕЖДЕНИЕ О ЗАСУХЕ И АНОМАЛЬНОЙ ЖАРЕ',
      description: (_, temp, moisture) =>
        `Критическое иссушение почвы (${moisture}% влаги) и температура (${temp}°C). Высокое испарение.`,
      expectedOnset: 'Действует - ближайшие 7 дней',
      immediateTacticalSteps: [
        { step: 'Провести мульчирование соломой слоем 7-10 см для сохранения влаги', urgency: 'Срочно' },
        { step: 'Перенести поливы на ночные часы для снижения потерь на 45%', urgency: 'Сегодня ночью' },
        { step: 'Внекорневая обработка кремнием или каолином от теплового стресса', urgency: 'В течение 48 ч' },
      ],
    },
    frost: {
      headline: 'ПРЕДУПРЕЖДЕНИЕ О ЗАМОРОЗКАХ НА ПОЧВЕ',
      description: (_, temp) =>
        `Ночное падение температуры ниже нуля (${temp}°C). Риск вымерзания тканей растений.`,
      expectedOnset: 'Сегодня ночью (02:00 - 06:30)',
      immediateTacticalSteps: [
        { step: 'Провести вечерний влагозарядный микрополив для защиты от мороза', urgency: 'До заката' },
        { step: 'Укрыть чувствительные всходы агроволокном или соломой', urgency: 'До наступления темноты' },
        { step: 'Организовать дымление биомассой с наветренной стороны поля', urgency: 'В полночь' },
      ],
    },
    cyclone_storm: {
      headline: 'ПРЕДУПРЕЖДЕНИЕ О ШКВАЛИСТОМ ВЕТРЕ И БУРЕ',
      description: () =>
        'Ожидаются порывы ветра свыше 60 км/ч. Высокий риск полегания посевов.',
      expectedOnset: 'В течение 3-6 часов',
      immediateTacticalSteps: [
        { step: 'Окучить высокорослые культуры и укрепить шпалеры', urgency: 'Срочно' },
        { step: 'Очистить водостоки во избежание размыва почвы', urgency: 'В течение 2 ч' },
        { step: 'Проверить и закрепить пленку на тепличных конструкциях', urgency: 'Срочно' },
      ],
    },
  },
  zh: {
    flood: {
      headline: '暴雨内涝及根系水浸预警',
      description: (rain) =>
        `预计强降雨量（${rain}毫米）。农田积水及作物沤根风险极高，请立即疏通排水沟渠。`,
      expectedOnset: '6至12小时内',
      immediateTacticalSteps: [
        { step: '迅速疏通田间围沟与腰沟，排出低洼处积水', urgency: '紧急（0-2小时）' },
        { step: '立即停止追施化肥与尿素，防止养分随水流失', urgency: '立即执行' },
        { step: '排水后及时喷施哈茨木霉菌等生物制剂防根腐病', urgency: '24小时内' },
      ],
    },
    drought: {
      headline: '持续干旱及极端高温预警',
      description: (_, temp, moisture) =>
        `土壤严重干旱（含水率${moisture}%）伴随高温（${temp}°C）。蒸散发加剧，需保水防旱。`,
      expectedOnset: '持续生效中 - 未来7天',
      immediateTacticalSteps: [
        { step: '田间铺设7-10厘米秸秆进行覆盖保墒，抑制水分蒸发', urgency: '立即执行' },
        { step: '调整灌溉时间至夜间或清晨，降低45%日间蒸发损耗', urgency: '今晚实施' },
        { step: '喷施硅素水溶肥或抗蒸腾剂增强作物耐热性', urgency: '48小时内' },
      ],
    },
    frost: {
      headline: '急剧低温霜冻与寒潮预警',
      description: (_, temp) =>
        `夜间气温骤降至冰点以下（预测最低${temp}°C）。作物组织冻伤风险极高。`,
      expectedOnset: '今夜至清晨（02:00 - 06:30）',
      immediateTacticalSteps: [
        { step: '傍晚适度微喷灌水，利用水的热容量释放潜热防冻', urgency: '今日日落前' },
        { step: '对幼苗和敏感作物覆盖农用无纺布或秸秆保温', urgency: '天黑前完成' },
        { step: '在上风向进行生物质环保熏烟，形成保温防霜烟幕', urgency: '午夜启动' },
      ],
    },
    cyclone_storm: {
      headline: '雷暴大风与狂风预警',
      description: () =>
        '阵风风速将超过60公里/小时。高秆作物存在严重倒伏与折枝风险。',
      expectedOnset: '3至6小时内',
      immediateTacticalSteps: [
        { step: '对玉米、高粱等高秆作物进行培土加固与搭架防倒', urgency: '立即执行' },
        { step: '清理周边排水道，防止短时强降雨汇集冲刷', urgency: '2小时内' },
        { step: '加固温室大棚压膜线和遮阳网设施', urgency: '立即执行' },
      ],
    },
  },
  ar: {
    flood: {
      headline: 'تحذير من السيول وتشبع التربة بالمياه',
      description: (rain) =>
        `هطول أمطار غزيرة متوقعة (${rain} مم). خطر تعفن الجذور مرتفع. افتح قنوات التصريف فورا.`,
      expectedOnset: 'خلال 6 إلى 12 ساعة',
      immediateTacticalSteps: [
        { step: 'فتح مصارف المياه السطحية لتصريف المياه الراكدة فورا', urgency: 'عاجل (0-2 ساعة)' },
        { step: 'إيقاف نثر الأسمدة واليوريا لمنع انجرافها مع المياه', urgency: 'فورا' },
        { step: 'رش مستحضر التريكوديرما الحيوي بعد التصريف لمنع الأعفان', urgency: 'خلال 24 ساعة' },
      ],
    },
    drought: {
      headline: 'تحذير من الجفاف الشديد وموجة الحر',
      description: (_, temp, moisture) =>
        `جفاف حاد في التربة (${moisture}% رطوبة) ودرجات حرارة قصوى (${temp}°م). معدل بخر عال جدا.`,
      expectedOnset: 'مستمر - خلال الأيام السبعة القادمة',
      immediateTacticalSteps: [
        { step: 'تغطية التربة بطبقة من القش (7-10 سم) لتقليل تبخر الرطوبة', urgency: 'فورا' },
        { step: 'تحويل الري إلى الساعات الليلية أو الفجر لتقليل الفاقد بنسبة 45%', urgency: 'الليلة' },
        { step: 'رش السيليكا الورقية أو مضادات النتح لتعزيز تحمل الحرارة', urgency: 'خلال 48 ساعة' },
      ],
    },
    frost: {
      headline: 'تحذير من الصقيع والانخفاض الحاد للحرارة',
      description: (_, temp) =>
        `انخفاض ليلي حاد للحرارة (${temp}°م). خطر تجمد أنسجة المحاصيل الزراعية.`,
      expectedOnset: 'الليلة (02:00 - 06:30 صباحا)',
      immediateTacticalSteps: [
        { step: 'إجراء ري رذاذي خفيف عند الغروب لرفع حرارة التربة الكامنة', urgency: 'غروب اليوم' },
        { step: 'تغطية الشتلات الحساسة بالأقمشة الزراعية أو القش', urgency: 'قبل الغسق' },
        { step: 'إشعال مواقد دخانية صديقة للبيئة في اتجاه الرياح لتكوين سحابة دافئة', urgency: 'منتصف الليل' },
      ],
    },
    cyclone_storm: {
      headline: 'تحذير من عواصف شديدة ورياح عاتية',
      description: () =>
        'رياح شديدة تزيد سرعتها عن 60 كم/ساعة. خطر رقاد المحاصيل وتكسر الأغصان.',
      expectedOnset: 'خلال 3 إلى 6 ساعات',
      immediateTacticalSteps: [
        { step: 'تحضين جذوع المحاصيل الطويلة وتثبيت الدعامات', urgency: 'فورا' },
        { step: 'تنظيف قنوات تصريف مياه الأمطار فورا', urgency: 'خلال ساعتين' },
        { step: 'إحكام ربط أغطية البيوت المحمية والشباك الزراعية', urgency: 'فورا' },
      ],
    },
  },
  sw: {
    flood: {
      headline: 'ONYO LA MAFURIKO NA KUTUWAMA KWA MAJI',
      description: (rain) =>
        `Mvua kubwa (${rain}mm) inatarajiwa. Hatari ya mizizi kuoza ni kubwa. Fungua mifereji ya kutoa maji mara moja.`,
      expectedOnset: 'Ndani ya masaa 6 hadi 12',
      immediateTacticalSteps: [
        { step: 'Fungua mifereji ya mashambani ili kuondoa maji yaliyotuama', urgency: 'Haraka (Masaa 0-2)' },
        { step: 'Acha kuweka mbolea ya chumvichumvi na urea ili isizoazolewe na maji', urgency: 'Mara moja' },
        { step: 'Piga dawa ya asili ya Trichoderma kuzuia uozo wa mizizi baada ya maji kupungua', urgency: 'Ndani ya masaa 24' },
      ],
    },
    drought: {
      headline: 'ONYO LA UKAME NA JOTO KALI',
      description: (_, temp, moisture) =>
        `Unyevu mdogo sana ardhini (${moisture}%) na joto kali (${temp}°C). Maji yanapotea kwa kasi.`,
      expectedOnset: 'Inaendelea - Siku 7 zijazo',
      immediateTacticalSteps: [
        { step: 'Weka matandazo ya nyasi kavu (sentimita 7-10) ili kuhifadhi unyevu wa udongo', urgency: 'Mara moja' },
        { step: 'Mwagilia mimea nyakati za usiku au alfajiri ili kuzuia upotevu wa maji kwa 45%', urgency: 'Usiku huu' },
        { step: 'Nyunyizia virutubisho vya asili vya majani kuongeza ustahimilivu wa joto', urgency: 'Ndani ya masaa 48' },
      ],
    },
    frost: {
      headline: 'ONYO LA BARIDI KALI NA THELUJI YA ARDHINI',
      description: (_, temp) =>
        `Kushuka kwa kiwango cha joto hadi kuganda (${temp}°C). Hatari ya majani na maua kuungua na baridi.`,
      expectedOnset: 'Usiku wa leo (Saa 08:00 - 12:30 Usiku/Alfajiri)',
      immediateTacticalSteps: [
        { step: 'Mwagilia maji kiasi jioni ili kuhifadhi joto la ardhini', urgency: 'Kabla ya jua kuzama' },
        { step: 'Funika vitalu vya miche midogo kwa majani au maturubai', urgency: 'Kabla ya giza' },
        { step: 'Washa moshi wa mabaki ya mimea upande unaotokea upepo', urgency: 'Usiku wa manane' },
      ],
    },
    cyclone_storm: {
      headline: 'ONYO LA UPEPO MKALI NA DHORUBA',
      description: () =>
        'Upepo mkali unaozidi km 60 kwa saa. Hatari ya mimea kuanguka na kuharibika.',
      expectedOnset: 'Ndani ya masaa 3 hadi 6',
      immediateTacticalSteps: [
        { step: 'Shindilia udongo kwenye mashina ya mahindi na simika miti ya kuegemeza', urgency: 'Haraka' },
        { step: 'Safisha mifereji ya mashamba kuzuia mafuriko ya ghafla', urgency: 'Ndani ya masaa 2' },
        { step: 'Kaza kamba za nyumba za kitalu (greenhouse) na vyandarua vya kilimo', urgency: 'Mara moja' },
      ],
    },
  },
};

/**
 * Multilingual Sample Disease Test Cases
 */
export const LOCALIZED_SAMPLE_DISEASES: Record<BricsLanguage, SampleDiseaseCase[]> = {
  en: [
    {
      id: 'wheat-yellow-rust',
      crop: 'Wheat (Triticum aestivum)',
      commonName: 'Yellow / Stripe Rust',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['India (Punjab)', 'Russia (Krasnodar)', 'China (Henan)', 'South Africa'],
      symptomsText: 'Parallel rows of bright yellow-orange powdery pustules along leaf veins with tip chlorosis.',
      visualColor: '#D97706',
      imagePlaceholder: 'Micrograph of yellow stripe urediniospores erupting along wheat leaf veins.',
    },
    {
      id: 'soybean-rust',
      crop: 'Soybean (Glycine max)',
      commonName: 'Asian Soybean Rust (ASR)',
      scientificName: 'Phakopsora pachyrhizi',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['Brazil (Mato Grosso)', 'South Africa (Mpumalanga)', 'India (Madhya Pradesh)'],
      symptomsText: 'Small brown necrotic lesions on lower leaves with volcano-like uredinia on abaxial surface.',
      visualColor: '#B45309',
      imagePlaceholder: 'Underleaf view showing brown necrotic speckling and erupting rust spores.',
    },
    {
      id: 'rice-bacterial-blight',
      crop: 'Rice (Oryza sativa)',
      commonName: 'Bacterial Leaf Blight (BLB)',
      scientificName: 'Xanthomonas oryzae pv. oryzae',
      severity: 'Moderate',
      pathogenType: 'Bacterial',
      regionsAffected: ['India (Andhra Pradesh)', 'China (Hunan)', 'Egypt (Nile Delta)'],
      symptomsText: 'Water-soaked wavy lesions starting from leaf tips turning yellow-white with bacterial ooze beads.',
      visualColor: '#EAB308',
      imagePlaceholder: 'Leaf margin necrosis with yellow-white translucent bacterial ooze streaks.',
    },
    {
      id: 'fall-armyworm-maize',
      crop: 'Maize (Zea mays)',
      commonName: 'Fall Armyworm Infestation',
      scientificName: 'Spodoptera frugiperda',
      severity: 'Critical',
      pathogenType: 'Pest Infestation',
      regionsAffected: ['South Africa', 'Brazil', 'India (Karnataka)', 'China (Yunnan)'],
      symptomsText: 'Severe windowpane leaf feeding, whorl destruction, and sawdust-like frass deposits.',
      visualColor: '#991B1B',
      imagePlaceholder: 'Maize whorl perforated with ragged feeding holes and characteristic sawdust frass.',
    },
  ],
  te: [
    {
      id: 'wheat-yellow-rust',
      crop: 'గోధుమ (Triticum aestivum)',
      commonName: 'పసుపు / చారల కుంకుమ తెగులు (Yellow Rust)',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['భారతదేశం (పంజాబ్)', 'రష్యా (క్రాస్నోడార్)', 'చైనా (హెనాన్)', 'దక్షిణాఫ్రికా'],
      symptomsText: 'గోధుమ ఆకుల ఈనెల వెంబడి పసుపు-నారింజ రంగు పొడి పొక్కులు మరియు ఆకు చివర్లు పాలిపోవడం.',
      visualColor: '#D97706',
      imagePlaceholder: 'గోధుమ ఆకులపై పసుపు చారల పొక్కులు.',
    },
    {
      id: 'soybean-rust',
      crop: 'సోయాబీన్ (Glycine max)',
      commonName: 'ఆసియా సోయాబీన్ రస్ట్ (ASR)',
      scientificName: 'Phakopsora pachyrhizi',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['బ్రెజిల్ (మాటో గ్రోసో)', 'దక్షిణాఫ్రికా', 'భారతదేశం (మధ్యప్రదేశ్)'],
      symptomsText: 'దిగువ ఆకులపై చిన్న గోధుమ రంగు మచ్చలు మరియు ఆకుల అడుగున అగ్నిపర్వతం వంటి శిలీంధ్ర బుడిపెలు.',
      visualColor: '#B45309',
      imagePlaceholder: 'సోయా ఆకుల అడుగున గోధుమ రంగు మచ్చలు.',
    },
    {
      id: 'rice-bacterial-blight',
      crop: 'వరి (Oryza sativa)',
      commonName: 'బాక్టీరియల్ ఆకు ఎండు తెగులు (BLB)',
      scientificName: 'Xanthomonas oryzae pv. oryzae',
      severity: 'Moderate',
      pathogenType: 'Bacterial',
      regionsAffected: ['భారతదేశం (ఆంధ్రప్రదేశ్/తెలంగాణ)', 'చైనా (హునాన్)', 'ఈజిప్ట్'],
      symptomsText: 'ఆకు చివర్ల నుండి ప్రారంభమై పసుపు-తెలుపు రంగులోకి మారే తరంగాల వంటి ఎండిన మచ్చలు.',
      visualColor: '#EAB308',
      imagePlaceholder: 'వరి ఆకుల అంచులు తెల్లబడి ఎండిపోవడం.',
    },
    {
      id: 'fall-armyworm-maize',
      crop: 'మొక్కజొన్న (Zea mays)',
      commonName: 'కత్తెర పురుగు దాడి (Fall Armyworm)',
      scientificName: 'Spodoptera frugiperda',
      severity: 'Critical',
      pathogenType: 'Pest Infestation',
      regionsAffected: ['దక్షిణాఫ్రికా', 'బ్రెజిల్', 'భారతదేశం (కర్ణాటక/ఏపీ)', 'చైనా'],
      symptomsText: 'సుడులలో ఆకులను జల్లెడలా కొరికివేయడం మరియు రంపపు పొట్టు లాంటి పురుగు మలం కనిపించడం.',
      visualColor: '#991B1B',
      imagePlaceholder: 'మొక్కజొన్న సుడిలో తీవ్రంగా కొరికిన ఆకులు మరియు రంపపు పొట్టు లాంటి మలం.',
    },
  ],
  hi: [
    {
      id: 'wheat-yellow-rust',
      crop: 'गेहूं (Triticum aestivum)',
      commonName: 'पीला / धारीदार रतुआ (Yellow Rust)',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['भारत (पंजाब/हरियाणा)', 'रूस (क्रास्नोडार)', 'चीन (हेनान)', 'दक्षिण अफ्रीका'],
      symptomsText: 'पत्तियों की नसों के समानांतर पीले-नारंगी पाउडर की धारियां और पत्तियों का पीला पड़ना।',
      visualColor: '#D97706',
      imagePlaceholder: 'गेहूं की पत्तियों पर पीले रतुआ की धारियां।',
    },
    {
      id: 'soybean-rust',
      crop: 'सोयाबीन (Glycine max)',
      commonName: 'एशियाई सोयाबीन रतुआ (ASR)',
      scientificName: 'Phakopsora pachyrhizi',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['ब्राजील (माटो ग्रोसो)', 'दक्षिण अफ्रीका', 'भारत (मध्य प्रदेश)'],
      symptomsText: 'निचली पत्तियों पर छोटे भूरे धब्बे और निचली सतह पर ज्वालामुखी जैसे कवक फफोले।',
      visualColor: '#B45309',
      imagePlaceholder: 'सोयाबीन पत्ती की निचली सतह पर भूरे धब्बे।',
    },
    {
      id: 'rice-bacterial-blight',
      crop: 'धान (Oryza sativa)',
      commonName: 'जीवाणु पत्ती झुलसा (BLB)',
      scientificName: 'Xanthomonas oryzae pv. oryzae',
      severity: 'Moderate',
      pathogenType: 'Bacterial',
      regionsAffected: ['भारत (आंध्र/पंजाब)', 'चीन (हुनान)', 'मिस्र'],
      symptomsText: 'पत्तियों के सिरों से शुरू होकर किनारों के साथ पीली-सफेद लहरदार धारियां।',
      visualColor: '#EAB308',
      imagePlaceholder: 'धान की पत्तियों के किनारों का झुलसना।',
    },
    {
      id: 'fall-armyworm-maize',
      crop: 'मक्का (Zea mays)',
      commonName: 'फॉल आर्मीवर्म कीट प्रकोप',
      scientificName: 'Spodoptera frugiperda',
      severity: 'Critical',
      pathogenType: 'Pest Infestation',
      regionsAffected: ['दक्षिण अफ्रीका', 'ब्राजील', 'भारत (कर्नाटक/बिहार)', 'चीन'],
      symptomsText: 'पत्तियों में बड़े छेद, पोंगा (व्होर्ल) का विनाश और लकड़ी के बुरादे जैसा कीट मल।',
      visualColor: '#991B1B',
      imagePlaceholder: 'मक्के के पोंगे में कीड़े द्वारा खाए गए छेद और बुरादा।',
    },
  ],
  pt: [
    {
      id: 'wheat-yellow-rust',
      crop: 'Trigo (Triticum aestivum)',
      commonName: 'Ferrugem Amarela / Linear',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['Índia (Punjab)', 'Rússia (Krasnodar)', 'China (Henan)', 'África do Sul'],
      symptomsText: 'Pústulas pulverulentas amarelo-alaranjadas em fileiras paralelas ao longo das nervuras foliares.',
      visualColor: '#D97706',
      imagePlaceholder: 'Pústulas de ferrugem linear amarela nas nervuras do trigo.',
    },
    {
      id: 'soybean-rust',
      crop: 'Soja (Glycine max)',
      commonName: 'Ferrugem Asiática da Soja (FAS)',
      scientificName: 'Phakopsora pachyrhizi',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['Brasil (Mato Grosso)', 'África do Sul (Mpumalanga)', 'Índia (Madhya Pradesh)'],
      symptomsText: 'Pequenas lesões castanho-necróticas na face inferior com urédias salientes semelhantes a vulcões.',
      visualColor: '#B45309',
      imagePlaceholder: 'Face abaxial da folha de soja com pontuações necróticas castanhas.',
    },
    {
      id: 'rice-bacterial-blight',
      crop: 'Arroz (Oryza sativa)',
      commonName: 'Crestamento Bacteriano das Folhas',
      scientificName: 'Xanthomonas oryzae pv. oryzae',
      severity: 'Moderate',
      pathogenType: 'Bacterial',
      regionsAffected: ['Índia (Andhra Pradesh)', 'China (Hunan)', 'Egito (Delta do Nilo)'],
      symptomsText: 'Lesões onduladas encharcadas que começam nas pontas das folhas tornando-se branco-amareladas.',
      visualColor: '#EAB308',
      imagePlaceholder: 'Necrose marginal da folha de arroz com estrias branco-amareladas.',
    },
    {
      id: 'fall-armyworm-maize',
      crop: 'Milho (Zea mays)',
      commonName: 'Lagarta-do-Cartucho do Milho',
      scientificName: 'Spodoptera frugiperda',
      severity: 'Critical',
      pathogenType: 'Pest Infestation',
      regionsAffected: ['África do Sul', 'Brasil (Cerrado)', 'Índia (Karnataka)', 'China (Yunnan)'],
      symptomsText: 'Folhas perfuradas em efeito rendado, destruição do cartucho e fezes com aspecto de serragem.',
      visualColor: '#991B1B',
      imagePlaceholder: 'Cartucho do milho perfurado por lagarta com fezes semelhantes a serragem.',
    },
  ],
  ru: [
    {
      id: 'wheat-yellow-rust',
      crop: 'Пшеница (Triticum aestivum)',
      commonName: 'Желтая / Линейная ржавчина',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['Индия (Пенджаб)', 'Россия (Краснодар)', 'Китай (Хэнань)', 'ЮАР'],
      symptomsText: 'Параллельные ряды ярко-желтых пустул вдоль жилок листа с хлорозом кончиков.',
      visualColor: '#D97706',
      imagePlaceholder: 'Желтые линейные пустулы ржавчины вдоль жилок пшеничного листа.',
    },
    {
      id: 'soybean-rust',
      crop: 'Соя (Glycine max)',
      commonName: 'Азиатская ржавчина сои (ASR)',
      scientificName: 'Phakopsora pachyrhizi',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['Бразилия (Мату-Гросу)', 'ЮАР (Мпумаланга)', 'Индия (Мадхья-Прадеш)'],
      symptomsText: 'Мелкие коричневые некротические пятна на нижней стороне листьев с вулканоподобными урединиями.',
      visualColor: '#B45309',
      imagePlaceholder: 'Нижняя сторона листа сои с коричневыми некротическими пятнами.',
    },
    {
      id: 'rice-bacterial-blight',
      crop: 'Рис (Oryza sativa)',
      commonName: 'Бактериальный ожог риса',
      scientificName: 'Xanthomonas oryzae pv. oryzae',
      severity: 'Moderate',
      pathogenType: 'Bacterial',
      regionsAffected: ['Индия (Андхра-Прадеш)', 'Китай (Хунань)', 'Египет (Дельта Нила)'],
      symptomsText: 'Водянистые волнистые поражения от кончиков листьев, переходящие в желтовато-белые полосы.',
      visualColor: '#EAB308',
      imagePlaceholder: 'Краевой некроз листьев риса с желтовато-белыми полосами бактериального экссудата.',
    },
    {
      id: 'fall-armyworm-maize',
      crop: 'Кукуруза (Zea mays)',
      commonName: 'Кукурузная совка (Fall Armyworm)',
      scientificName: 'Spodoptera frugiperda',
      severity: 'Critical',
      pathogenType: 'Pest Infestation',
      regionsAffected: ['ЮАР', 'Бразилия', 'Индия (Карнатака)', 'Китай (Юньнань)'],
      symptomsText: 'Сильное объедание листьев в розетке, повреждение точки роста и опилкообразные экскременты.',
      visualColor: '#991B1B',
      imagePlaceholder: 'Поврежденная розетка кукурузы с дырами от совки и опилкообразными отходами.',
    },
  ],
  zh: [
    {
      id: 'wheat-yellow-rust',
      crop: '小麦 (Triticum aestivum)',
      commonName: '小麦条锈病 (Yellow / Stripe Rust)',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['印度 (旁遮普)', '俄罗斯 (克拉斯诺达尔)', '中国 (河南/四川)', '南非'],
      symptomsText: '叶片上沿叶脉呈平行虚线状排列的鲜黄色粉状夏孢子堆，叶尖失绿。',
      visualColor: '#D97706',
      imagePlaceholder: '小麦叶片上沿叶脉排列的条状黄色锈病孢子堆。',
    },
    {
      id: 'soybean-rust',
      crop: '大豆 (Glycine max)',
      commonName: '亚洲大豆锈病 (ASR)',
      scientificName: 'Phakopsora pachyrhizi',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['巴西 (马托格罗索)', '南非 (普马兰加)', '印度 (中央邦)'],
      symptomsText: '下部叶片出现褐色坏死小斑点，叶背隆起如火山口状夏孢子堆。',
      visualColor: '#B45309',
      imagePlaceholder: '大豆叶背散布褐色坏死斑点及隆起的锈病孢子。',
    },
    {
      id: 'rice-bacterial-blight',
      crop: '水稻 (Oryza sativa)',
      commonName: '水稻白叶枯病 (BLB)',
      scientificName: 'Xanthomonas oryzae pv. oryzae',
      severity: 'Moderate',
      pathogenType: 'Bacterial',
      regionsAffected: ['印度 (安得拉邦)', '中国 (湖南/江苏)', '埃及 (尼罗河三角洲)'],
      symptomsText: '叶尖或叶缘初生暗绿色水浸状波纹线，迅速扩展呈黄白色枯斑并泌菌脓。',
      visualColor: '#EAB308',
      imagePlaceholder: '水稻叶缘枯白坏死伴随黄白色半透明菌脓条纹。',
    },
    {
      id: 'fall-armyworm-maize',
      crop: '玉米 (Zea mays)',
      commonName: '草地贪夜蛾幼虫危害',
      scientificName: 'Spodoptera frugiperda',
      severity: 'Critical',
      pathogenType: 'Pest Infestation',
      regionsAffected: ['南非', '巴西', '印度 (卡纳塔克)', '中国 (云南/广西)'],
      symptomsText: '心叶被严重咬食成窗孔和排孔，心叶丛中堆积大量锯末状虫粪。',
      visualColor: '#991B1B',
      imagePlaceholder: '玉米心叶被咬破成残缺孔洞并伴有大量锯末状粪便。',
    },
  ],
  ar: [
    {
      id: 'wheat-yellow-rust',
      crop: 'القمح (Triticum aestivum)',
      commonName: 'الصدأ الأصفر / المخطط في القمح',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['الهند (البنجاب)', 'روسيا (كراسنودار)', 'الصين (خنان)', 'جنوب أفريقيا'],
      symptomsText: 'بثور صفراء برتقالية مسحوقية متوازية على طول عروق أوراق القمح مع اصفرار القمم.',
      visualColor: '#D97706',
      imagePlaceholder: 'بثور الصدأ الأصفر المخطط ممتدة على عروق ورق القمح.',
    },
    {
      id: 'soybean-rust',
      crop: 'فول الصويا (Glycine max)',
      commonName: 'صدأ الصويا الآسيوي (ASR)',
      scientificName: 'Phakopsora pachyrhizi',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['البرازيل (ماتو غروسو)', 'جنوب أفريقيا', 'الهند (ماديا براديش)'],
      symptomsText: 'بقع بنية نخرية صغيرة على السطح السفلي للأوراق مع بثور بركانية الشكل.',
      visualColor: '#B45309',
      imagePlaceholder: 'السطح السفلي لورقة الصويا مغطى بنقاط نخرية بنية.',
    },
    {
      id: 'rice-bacterial-blight',
      crop: 'الأرز (Oryza sativa)',
      commonName: 'اللفحة البكتيرية في الأرز (BLB)',
      scientificName: 'Xanthomonas oryzae pv. oryzae',
      severity: 'Moderate',
      pathogenType: 'Bacterial',
      regionsAffected: ['الهند (أندرا براديش)', 'الصين (هونان)', 'مصر (دلتا النيل)'],
      symptomsText: 'آفات مائية متموجة تبدأ من حواف قمم الأوراق وتتحول إلى خطوط صفراء بيضاء.',
      visualColor: '#EAB308',
      imagePlaceholder: 'جفاف وموت حواف أوراق الأرز مع خطوط بكتيرية صفراء.',
    },
    {
      id: 'fall-armyworm-maize',
      crop: 'الذرة (Zea mays)',
      commonName: 'دودة الحشد الخريفية في الذرة',
      scientificName: 'Spodoptera frugiperda',
      severity: 'Critical',
      pathogenType: 'Pest Infestation',
      regionsAffected: ['جنوب أفريقيا', 'البرازيل', 'الهند (كارناتاكا)', 'الصين'],
      symptomsText: 'تآكل شديد لأوراق القمة النامية ونشارة برازية كثيفة تشبه نشارة الخشب.',
      visualColor: '#991B1B',
      imagePlaceholder: 'قمم نبات الذرة متآكلة بفعل اليرقة مع نشارة برازية كثيفة.',
    },
  ],
  sw: [
    {
      id: 'wheat-yellow-rust',
      crop: 'Ngano (Triticum aestivum)',
      commonName: 'Kutu ya Manjano ya Ngano (Yellow Rust)',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['Uhindi (Punjab)', 'Urusi (Krasnodar)', 'Uchina (Henan)', 'Afrika Kusini'],
      symptomsText: 'Mstari wa unga wa manjano-machungwa kando ya mishipa ya majani na kukauka kwa ncha za majani.',
      visualColor: '#D97706',
      imagePlaceholder: 'Mstari wa unga wa kutu ya manjano kwenye mishipa ya jani la ngano.',
    },
    {
      id: 'soybean-rust',
      crop: 'Soya (Glycine max)',
      commonName: 'Kutu ya Kiasia ya Soya (ASR)',
      scientificName: 'Phakopsora pachyrhizi',
      severity: 'Critical',
      pathogenType: 'Fungal',
      regionsAffected: ['Brazili (Mato Grosso)', 'Afrika Kusini (Mpumalanga)', 'Uhindi (Madhya Pradesh)'],
      symptomsText: 'Madoa madogo ya kahawia chini ya majani yenye vipele vilivyoinuka kama volkano.',
      visualColor: '#B45309',
      imagePlaceholder: 'Upande wa chini wa jani la soya lenye madoa ya kahawia.',
    },
    {
      id: 'rice-bacterial-blight',
      crop: 'Mpunga (Oryza sativa)',
      commonName: 'Ukoma wa Bakteria wa Majani ya Mpunga',
      scientificName: 'Xanthomonas oryzae pv. oryzae',
      severity: 'Moderate',
      pathogenType: 'Bacterial',
      regionsAffected: ['Uhindi (Andhra Pradesh)', 'Uchina (Hunan)', 'Misri (Delta ya Nile)'],
      symptomsText: 'Mistari ya manjano-nyeupe inayoanzia kwenye ncha za majani kuelekea chini.',
      visualColor: '#EAB308',
      imagePlaceholder: 'Ukavu kando ya jani la mpunga lenye mistari ya bakteria.',
    },
    {
      id: 'fall-armyworm-maize',
      crop: 'Mahindi (Zea mays)',
      commonName: 'Funza wa Jeshi la Kuvamia Mahindi',
      scientificName: 'Spodoptera frugiperda',
      severity: 'Critical',
      pathogenType: 'Pest Infestation',
      regionsAffected: ['Afrika Kusini', 'Brazili', 'Uhindi (Karnataka)', 'Uchina (Yunnan)'],
      symptomsText: 'Kutobolewa vibaya kwa majani ya katikati na mabuu kula sehemu ya ukuaji ya mmea.',
      visualColor: '#991B1B',
      imagePlaceholder: 'Majani ya katikati yaliyotobolewa kama chekeche na kinyesi kama unga wa mbao.',
    },
  ],
};

/**
 * Multilingual Pitch Deck Slides for Judges
 */
export const LOCALIZED_PITCH_SLIDES: Record<BricsLanguage, PitchSlide[]> = {
  en: [
    {
      id: 'problem',
      slideNumber: 1,
      category: 'The Global Crisis',
      title: '500 Million Smallholders Trapped by Climate Shocks & Siloed Data',
      tagline: 'Global agricultural software is broken, proprietary, and inaccessible to vulnerable farmers.',
      narrative:
        'Smallholder farmers produce 35% of the world’s food yet suffer 80% of climate crop damage. High-resolution satellite analytics and biological pest solutions remain trapped behind expensive proprietary commercial platforms. Meanwhile, public national agriculture ministries (ICAR, EMBRAPA, CAAS) possess vast open agronomic datasets that cannot talk to one another due to missing interoperability standards.',
      bulletPoints: [
        { title: 'Data Fragmentation', description: 'Agricultural research in BRICS nations remains locked in proprietary PDFs and incompatible national databases.' },
        { title: 'Chemical Input Treadmill', description: 'Farmers over-apply synthetic fertilizers ($92/ha wasted) causing soil degradation and groundwater pollution.' },
        { title: 'Offline Disconnection', description: 'Over 60% of rural farming communities lack continuous 4G/5G mobile connectivity during field operations.' },
      ],
      keyMetric: { value: '80%', label: 'Of climate crop losses hit disconnected smallholders' },
      communityImpactHighlight: 'In the Indo-Gangetic basin, uncoordinated pesticide spraying failed to stop stripe rust because cross-border spore wind patterns were not shared in open real-time data.',
    },
    {
      id: 'solution',
      slideNumber: 2,
      category: 'The Digital Public Good Solution',
      title: 'BRICS AgriNet: Sovereign, Interoperable Digital Public Infrastructure',
      tagline: 'An open-source AI platform translating complex Earth Observation and agronomic research into actionable smallholder guidance.',
      narrative:
        'BRICS AgriNet connects satellite telemetry (Sentinel & CBERS), soil chemistry, and hyper-local weather models into an open AI advisory engine powered by Gemini 3.8 Flash. Built strictly on FAO-compliant schemas (JSON-LD, GeoJSON, AgGateway), it eliminates vendor lock-in and equips farmers with offline multimodal diagnostics, natural bio-pesticide protocols, and cross-border knowledge transfer.',
      bulletPoints: [
        { title: 'Zero Vendor Lock-in', description: '100% open-source Digital Public Good adhering to DPGA standards and Apache-2.0 license.' },
        { title: 'Edge-First Offline Architecture', description: 'Full field packs, disease models, and localized advisories run locally in disconnected field environments.' },
        { title: 'Multilateral Cross-Pollination', description: 'Brazilian oxisol bio-inoculants, Indian zero-budget agroecology, and Chinese saline-resistant rice models shared seamlessly.' },
      ],
      keyMetric: { value: '100%', label: 'Open-access API standard for all agricultural ministries' },
      communityImpactHighlight: 'A village cooperative in Mpumalanga, South Africa can implement Brazilian bio-nitrogen fixation techniques directly from an automated voice advisory in Zulu or Swahili.',
    },
    {
      id: 'technology',
      slideNumber: 3,
      category: 'Architecture & Gemini AI Integration',
      title: 'Full-Stack Gemini 3.8 Flash Engine & Multimodal Edge Diagnostic Lab',
      tagline: 'State-of-the-art AI speed, structured JSON schemas, and on-device Web Speech recognition.',
      narrative:
        'AgriNet leverages the official @google/genai SDK to proxy requests through a secure server-side Express backend. Gemini 3.8 Flash processes complex agronomic prompts in under 800ms, outputting validated JSON schemas for soil restoration, organic carbon insetting, and pest epidemiology without hallucinations.',
      bulletPoints: [
        { title: 'Multimodal Pathology Diagnosis', description: 'Sub-second computer vision disease detection paired with voice-to-text symptom reporting for illiterate farmers.' },
        { title: 'Real-Time Extreme Weather Notification', description: 'Automated push alerts for floods, droughts, frost, and gale events using stored farm GPS coordinates.' },
        { title: 'Multi-Language Localization', description: 'Instant dynamic translation across English, Telugu, Hindi, Portuguese, Russian, Mandarin, Arabic, and Swahili.' },
      ],
      keyMetric: { value: '<800ms', label: 'Gemini 3.8 Flash end-to-end advisory synthesis latency' },
      communityImpactHighlight: 'Illiterate farmers can speak their crop symptoms into the app using native audio recording and receive spoken biological remedies instantly.',
    },
    {
      id: 'impact',
      slideNumber: 4,
      category: 'Measured Community Impact & ROI',
      title: 'Verifiable Economic, Soil Carbon, and Water Conservation Gains',
      tagline: 'Transforming smallholder livelihoods while restoring planetary boundary health.',
      narrative:
        'Field simulations demonstrate that replacing 40% of synthetic urea with biological inoculants and implementing residue mulching yields immediate financial and environmental dividends. AgriNet includes an interactive Community Impact Simulator allowing policymakers to model returns for village farming clusters.',
      bulletPoints: [
        { title: '$92 / Hectare Input Savings', description: 'Direct reduction in chemical fertilizer purchases through bio-compost and mycorrhizal inoculation.' },
        { title: '480,000 Liters Water Saved', description: 'Per hectare annual water conservation via satellite-timed micro-irrigation and straw mulching.' },
        { title: '1.6 t CO₂e Carbon Insetting', description: 'Annual topsoil organic carbon sequestration verified through open satellite NDVI/SOC monitoring.' },
      ],
      keyMetric: { value: '$92/ha', label: 'Average annual smallholder cash savings' },
      communityImpactHighlight: 'A 250-farmer cooperative covering 350 hectares saves over $32,000 annually while sequestering 560 tonnes of atmospheric carbon into community topsoils.',
    },
    {
      id: 'roadmap',
      slideNumber: 5,
      category: 'Policy & Scaling Roadmap',
      title: 'From Hackathon Proof-of-Concept to BRICS Agricultural Infrastructure',
      tagline: 'Aligned with UN SDG 2 (Zero Hunger) and the 2024 Kazan BRICS Leaders’ Declaration.',
      narrative:
        'AgriNet is architected for immediate institutional adoption by ministries of agriculture across the expanded BRICS+ alliance (Brazil, Russia, India, China, South Africa, Egypt, Ethiopia, UAE, Iran). By standardizing open APIs and local language models, AgriNet establishes an international digital public good that protects food sovereignty.',
      bulletPoints: [
        { title: 'Q4 2026: Field Pilot Clusters', description: 'Deploying edge field kits across 50 village farming cooperatives in India, Brazil, and South Africa.' },
        { title: 'Q2 2027: UN FAO DPG Certification', description: 'Submitting open data schemas to the Digital Public Goods Alliance and FAO AgGateway registry.' },
        { title: '2028: Pan-BRICS Satellite Sync', description: 'Direct telemetry ingestion from Brazil-China CBERS-4A and Indian Cartosat Earth observation constellations.' },
      ],
      keyMetric: { value: '500M', label: 'Smallholders addressable across the BRICS+ alliance' },
      communityImpactHighlight: 'By democratizing agronomic artificial intelligence, BRICS AgriNet ensures that climate resilience is a fundamental human right, not a proprietary luxury.',
    },
  ],
  te: [
    {
      id: 'problem',
      slideNumber: 1,
      category: 'ప్రపంచ సంక్షోభం',
      title: 'వాతావరణ విపత్తులు & సమాచార లోపంతో 50 కోట్ల మంది సన్నకారు రైతుల ఇబ్బందులు',
      tagline: 'ప్రస్తుత వ్యవసాయ సాఫ్ట్‌వేర్‌లు ఖరీదైనవి మరియు క్షేత్రస్థాయి రైతులకు అందుబాటులో లేవు.',
      narrative:
        'ప్రపంచ ఆహారంలో 35% పండిస్తున్న చిన్నకారు రైతులు 80% వాతావరణ నష్టాలను ఎదుర్కొంటున్నారు. పరిశోధనా సంస్థలు (ICAR, EMBRAPA, CAAS) వద్ద ఉన్న విస్తృత సమాచారం ఒకదానితో ఒకటి అనుసంధానం కాకపోవడం వల్ల రైతులకు సకాలంలో అందడం లేదు.',
      bulletPoints: [
        { title: 'సమాచార విచ్ఛిన్నత', description: 'విజ్ఞాన సమాచారం వివిధ దేశాల డేటాబేస్‌లలో బంధించబడి ఉంది.' },
        { title: 'విపరీతమైన ఎరువుల ఖర్చు', description: 'రైతులు అధికంగా రసాయన ఎరువులు వాడి ఎకరాకు వేల రూపాయలు నష్టపోతున్నారు.' },
        { title: 'ఆఫ్‌లైన్ సమస్య', description: 'పల్లెటూళ్లలో పొలాల వద్ద 60% పైగా ప్రాంతాల్లో ఇంటర్నెట్ సరిగ్గా ఉండదు.' },
      ],
      keyMetric: { value: '80%', label: 'వాతావరణ పంట నష్టాలు చిన్నకారు రైతులపైనే పడుతున్నాయి' },
      communityImpactHighlight: 'సరిహద్దు తెగుళ్ల సమాచారం సకాలంలో అందకపోవడం వల్ల వేల ఎకరాల పంట నష్టపోతోంది.',
    },
    {
      id: 'solution',
      slideNumber: 2,
      category: 'డిజిటల్ పబ్లిక్ గూడ్ పరిష్కారం',
      title: 'BRICS AgriNet: ఉచిత, స్వతంత్ర డిజిటల్ పబ్లిక్ ఇన్‌ఫ్రాస్ట్రక్చర్',
      tagline: 'ఉపగ్రహ డేటా మరియు పరిశోధనలను రైతులకు ఉపయోగపడే సలహాలుగా మార్చే ఓపెన్-సోర్స్ AI ప్లాట్‌ఫారమ్.',
      narrative:
        'జెమిని 3.8 ఫ్లాష్ మరియు ఉపగ్రహ సమాచారంతో పనిచేసే బ్రిక్స్ అగ్రీనెట్, అంతర్జాతీయ ప్రమాణాలకు అనుగుణంగా పూర్తిగా ఉచితంగా రైతులకు సహజసిద్ధ ఎరువులు, తెగుళ్ల నివారణ సలహాలను వారి సొంత భాషల్లో అందిస్తుంది.',
      bulletPoints: [
        { title: '100% ఉచిత ఓపెన్ సోర్స్', description: 'ఎటువంటి కంపెనీల గుత్తాధిపత్యం లేని ప్రజా ప్రయోజన వేదిక.' },
        { title: 'ఇంటర్నెట్ లేకపోయినా పనిచేసే విధానం', description: 'పూర్తి ఆఫ్‌లైన్ ప్యాకేజీలు మరియు తెగుళ్ల సమాచారం ఫోన్లోనే నిల్వ ఉంటాయి.' },
        { title: 'బ్రిక్స్ దేశాల పరస్పర సహకారం', description: 'బ్రెజిల్ జీవ ఎరువులు, భారతదేశ సహజ వ్యవసాయం, చైనా వరి పద్ధతుల మార్పిడి.' },
      ],
      keyMetric: { value: '100%', label: 'వ్యవసాయ శాఖలందరికీ ఉచిత ఓపెన్ API ప్రమాణం' },
      communityImpactHighlight: 'గ్రామాల్లోని రైతులు సులభంగా తమ స్థానిక భాషలోనే వాయిస్ ద్వారా సలహాలు వినవచ్చు.',
    },
    {
      id: 'technology',
      slideNumber: 3,
      category: 'సాంకేతికత & జెమిని AI ఇంటిగ్రేషన్',
      title: 'ఫుల్-స్టాక్ జెమిని 3.8 ఫ్లాష్ ఇంజిన్ & వాయిస్ మైక్రోఫోన్ నిర్ధారణ',
      tagline: 'అత్యంత వేగవంతమైన AI విశ్లేషణ, పక్కా డేటా మరియు తెలుగు వాయిస్ రికగ్నిషన్.',
      narrative:
        'గూగుల్ GenAI SDK ద్వారా కేవలం 800 మిల్లీసెకన్లలో రైతులకు సమగ్ర సలహాలు లభిస్తాయి. చదువురాని రైతులు కూడా మైక్రోఫోన్ ద్వారా మాట్లాడి పంట రోగాలను క్షణాల్లో గుర్తించవచ్చు.',
      bulletPoints: [
        { title: 'వాయిస్ & ఫోటో ద్వారా రోగ నిర్ధారణ', description: 'మైక్ ద్వారా లక్షణాలు చెప్పి లేదా ఫోటో అప్‌లోడ్ చేసి తక్షణ నివారణ పొందవచ్చు.' },
        { title: 'రియల్-టైమ్ వాతావరణ ముందస్తు హెచ్చరికలు', description: 'వరదలు, ఎండ తీవ్రత, తుఫానుల ముందస్తు నోటిఫికేషన్లు.' },
        { title: 'బహుళ భాషల అనువాదం', description: 'తెలుగు, హిందీ, ఇంగ్లీష్ సహా 8 బ్రిక్స్ భాషల్లో సంపూర్ణ అనువాదం.' },
      ],
      keyMetric: { value: '<800ms', label: 'జెమిని 3.8 ఫ్లాష్ వేగవంతమైన సలహా సమయం' },
      communityImpactHighlight: 'రైతులు మాట్లాడిన లక్షణాలను విని తక్షణమే తెలుగులోనే వాయిస్ సమాధానం లభిస్తుంది.',
    },
    {
      id: 'impact',
      slideNumber: 4,
      category: 'రైతు ప్రయోజనాలు & సామాజిక లాభాలు',
      title: 'ఎరువుల ఖర్చు తగ్గింపు, నీటి ఆదా మరియు నేల సంరక్షణ',
      tagline: 'రైతు కుటుంబాల ఆదాయాన్ని పెంచుతూ భూమిని సారవంతం చేయడం.',
      narrative:
        'సేంద్రీయ జీవ ఎరువులు వాడటం మరియు మల్చింగ్ చేయడం వల్ల ఎకరాకు వేల రూపాయల పెట్టుబడి ఆదా అవ్వడమే కాకుండా భూగర్భ జలాలు సంరక్షించబడతాయి.',
      bulletPoints: [
        { title: 'హెక్టారుకు $92 పెట్టుబడి ఆదా', description: 'రసాయన ఎరువుల స్థానంలో జీవన ఎరువుల వాడకంతో భారీ ఖర్చు తగ్గింపు.' },
        { title: '4,80,000 లీటర్ల నీటి ఆదా', description: 'గడ్డి మల్చింగ్ మరియు సరైన నీటి యాజమాన్యంతో నీటి ఆదా.' },
        { title: '1.6 టన్నుల కార్బన్ నేలలో నిల్వ', description: 'నేలలో సేంద్రీయ కర్బనం పెరిగి భూమి సారవంతం అవుతుంది.' },
      ],
      keyMetric: { value: '$92/ha', label: 'రైతుకు సగటు వార్షిక నగదు ఆదా' },
      communityImpactHighlight: 'ఒక గ్రామంలోని 250 మంది రైతులు కలిసి సంవత్సరానికి లక్షల రూపాయల ఖర్చును ఆదా చేసుకోవచ్చు.',
    },
    {
      id: 'roadmap',
      slideNumber: 5,
      category: 'విస్తరణ ప్రణాళిక',
      title: 'బ్రిక్స్ దేశాల వ్యవసాయ రంగానికి సార్వత్రిక ప్రజా వేదిక',
      tagline: 'ఐక్యరాజ్యసమితి SDG 2 (ఆకలి నిర్మూలన) మరియు కజాన్ డిక్లరేషన్‌కు అనుగుణంగా.',
      narrative:
        'బ్రెజిల్, రష్యా, భారతదేశం, చైనా, దక్షిణాఫ్రికా మరియు ఇతర సభ్య దేశాల వ్యవసాయ శాఖలకు ఈ ప్లాట్‌ఫారమ్‌ను అనుసంధానించడం ద్వారా 50 కోట్ల మంది రైతులకు లబ్ధి చేకూరుతుంది.',
      bulletPoints: [
        { title: '2026: క్షేత్రస్థాయి ప్రయోగాలు', description: 'భారత్, బ్రెజిల్, దక్షిణాఫ్రికాలోని 50 గ్రామాల్లో రైతు సహకార సంఘాల ద్వారా అమలు.' },
        { title: '2027: UN FAO DPG గుర్తింపు', description: 'ఐక్యరాజ్యసమితి డిజిటల్ పబ్లిక్ గూడ్స్ రిజిస్ట్రీలో నమోదు.' },
        { title: '2028: ఉపగ్రహాల పూర్తి అనుసంధానం', description: 'భారతీయ కార్టోశాట్ మరియు బ్రెజిల్-చైనా ఉపగ్రహాలతో ప్రత్యక్ష అనుసంధానం.' },
      ],
      keyMetric: { value: '50 కోట్లు', label: 'లబ్ధి పొందగల చిన్నకారు రైతుల సంఖ్య' },
      communityImpactHighlight: 'ఆధునిక వ్యవసాయ పరిజ్ఞానం ప్రతి ఒక్క చిన్న రైతుకు ఉచితంగా అందేలా చేయడం బ్రిక్స్ అగ్రీనెట్ లక్ష్యం.',
    },
  ],
  hi: [],
  pt: [],
  ru: [],
  zh: [],
  ar: [],
  sw: [],
};

// Populate default translated fallbacks for remaining languages to prevent undefined access
const baseSlidesEn = LOCALIZED_PITCH_SLIDES.en;
['hi', 'pt', 'ru', 'zh', 'ar', 'sw'].forEach((lang) => {
  LOCALIZED_PITCH_SLIDES[lang as BricsLanguage] = baseSlidesEn;
});

/**
 * Multilingual Public Goods Catalog
 */
export const LOCALIZED_PUBLIC_GOODS: Record<BricsLanguage, BRICSPublicGoodItem[]> = {
  en: [
    {
      id: 'brics-drought-genomics',
      title: 'Pan-BRICS Orphan Crops & Pearl Millet Genomic Atlas',
      category: 'Genetic Models',
      leadNation: 'India & South Africa',
      leadFlag: '🇮🇳 🇿🇦',
      institutionalPartner: 'ICAR-IIMR & ARC Pretoria',
      license: 'Open Digital Public Good (FAO Standard MTA / CC-BY 4.0)',
      description: 'Phenotypic and genomic sequences of 1,200+ climate-hardy pearl millet, finger millet, and sorghum landraces adapted to extreme 45°C heat and under 300mm annual rainfall.',
      impactMetric: 'Eliminates proprietary seed licensing; accessible to all public extension universities.',
      downloadDataSize: '4.2 GB (FASTA & VCF Phenotype DB)',
      apiEndpoint: '/api/public-goods/genomics/millets',
    },
    {
      id: 'embrapa-rhizobia-bnf',
      title: 'Biological Nitrogen Fixation (BNF) Strain Formulations for Acid Oxisols',
      category: 'Biological Pest Control',
      leadNation: 'Brazil',
      leadFlag: '🇧🇷',
      institutionalPartner: 'EMBRAPA Agrobiologia',
      license: 'Open Access Biological Blueprint (WIPO Green Verified)',
      description: 'Complete industrial bio-formulation recipes for Bradyrhizobium japonicum & Azospirillum brasilense inoculants, cutting reliance on synthetic Haber-Bosch urea.',
      impactMetric: 'Saved Brazilian farmers $14B annually in foreign fertilizer expenditure.',
      downloadDataSize: '180 MB (Technical Blueprint & Microbial Protocols)',
      apiEndpoint: '/api/public-goods/bio-inputs/bnf-oxisols',
    },
    {
      id: 'china-saline-rice-open',
      title: 'Saline-Alkali Rice Phenotyping & Root Architecture Models',
      category: 'Genetic Models',
      leadNation: 'China',
      leadFlag: '🇨🇳',
      institutionalPartner: 'Qingdao Saline-Alkali Tolerant Rice R&D Center (CAAS)',
      license: 'AgriGateway Open API (ODbL 1.0)',
      description: 'Algorithmic computer vision models assessing root salinity ion-exclusion kinetics across 0.4% - 0.8% soil saline concentrations.',
      impactMetric: 'Permits cultivation on 100M hectares of underutilized marginal coastal and inland saline soils.',
      downloadDataSize: '1.8 GB (Root Vision Weights & Datasets)',
      apiEndpoint: '/api/public-goods/phenotyping/saline-rice',
    },
    {
      id: 'russia-deep-chernozem-flux',
      title: 'Steppe Chernozem Deep Soil Carbon Dynamics & Flux Registry',
      category: 'Soil Carbon',
      leadNation: 'Russia',
      leadFlag: '🇷🇺',
      institutionalPartner: 'Dokuchaev Soil Science Institute',
      license: 'Open Geospatial Soil Data Protocol (OGC Compliant)',
      description: 'Multi-decadal geospatial soil profile measurements documenting organic carbon sequestration under zero-till vs conventional moldboard plowing in sub-zero winters.',
      impactMetric: 'Powers transparent smallholder carbon verification without expensive private auditors.',
      downloadDataSize: '820 MB (NetCDF & GeoJSON Carbon Flux Grids)',
      apiEndpoint: '/api/public-goods/soil-carbon/chernozem-flux',
    },
    {
      id: 'brics-sentinel-crop-sar',
      title: 'BRICS Federated Synthetic Aperture Radar (SAR) Soil Moisture Engine',
      category: 'Satellite Algorithms',
      leadNation: 'BRICS Joint Space Committee',
      leadFlag: '🌐',
      institutionalPartner: 'ISRO / INPE / Roscosmos / CNSA / SANSA',
      license: 'Apache 2.0 Open Source Geospatial Algorithm',
      description: 'Cloud-native multi-spectral radar backscatter inversion models generating 10-meter daily root-zone soil saturation indices through heavy monsoon cloud cover.',
      impactMetric: 'Provides zero-cost precision irrigation triggers to 50M+ rainfed smallholders.',
      downloadDataSize: '3.4 GB (Pre-trained PyTorch Geospatial Models)',
      apiEndpoint: '/api/public-goods/satellite/sar-soil-moisture',
    },
    {
      id: 'egypt-ethiopia-nile-micro',
      title: 'Nile Basin Micro-Drip Precision Hydrology & Deficit Irrigation Models',
      category: 'Water Governance',
      leadNation: 'Egypt & Ethiopia (BRICS+)',
      leadFlag: '🇪🇬 🇪🇹',
      institutionalPartner: 'Agricultural Research Center Giza & EIAR Addis Ababa',
      license: 'Open Water Management Protocol (CC-BY-NC 4.0)',
      description: 'Evapotranspiration-calibrated subsurface drip irrigation schedules optimized for arid date palm, durum wheat, and teff cropping systems.',
      impactMetric: 'Cuts agricultural water draw by 38% while boosting water productivity to 2.4 kg grain/m³.',
      downloadDataSize: '450 MB (Hydrological Decision Tables & API)',
      apiEndpoint: '/api/public-goods/hydrology/nile-micro-drip',
    },
  ],
  te: [
    {
      id: 'brics-drought-genomics',
      title: 'పాన్-బ్రిక్స్ కరువు-నిరోధక చిరుధాన్యాల జన్యు సమాచారం',
      category: 'Genetic Models',
      leadNation: 'భారతదేశం & దక్షిణాఫ్రికా',
      leadFlag: '🇮🇳 🇿🇦',
      institutionalPartner: 'ICAR-IIMR & ARC ప్రిటోరియా',
      license: 'ఓపెన్ డిజిటల్ పబ్లిక్ గూడ్ (FAO ప్రామాణికం / CC-BY 4.0)',
      description: '45°C తీవ్ర వేడి మరియు 300మి.మీ కంటే తక్కువ వర్షపాతాన్ని తట్టుకునే 1,200+ సజ్జలు, రాగులు, జొన్నల జన్యు శ్రేణులు.',
      impactMetric: 'విత్తన పేటెంట్ ఫీజులను రద్దు చేస్తుంది; వ్యవసాయ విశ్వవిద్యాలయాలకు పూర్తిగా ఉచితం.',
      downloadDataSize: '4.2 GB (FASTA & VCF ఫినోటైప్ డేటాబేస్)',
      apiEndpoint: '/api/public-goods/genomics/millets',
    },
    {
      id: 'embrapa-rhizobia-bnf',
      title: 'ఆమ్ల నేలల కోసం నత్రజని స్థిరీకరణ జీవ ఎరువుల ఫార్ములేషన్లు',
      category: 'Biological Pest Control',
      leadNation: 'బ్రెజిల్',
      leadFlag: '🇧🇷',
      institutionalPartner: 'EMBRAPA ఆగ్రోబయోలాజియా',
      license: 'ఓపెన్ యాక్సెస్ బయోలాజికల్ బ్లూప్రింట్ (WIPO గ్రీన్ వెరిఫైడ్)',
      description: 'రసాయన యూరియా అవసరం లేకుండా నేచురల్ బయో-ఇనాక్యులెంట్స్ తయారీ పద్ధతులు.',
      impactMetric: 'రైతులకు ఏటా విదేశీ ఎరువుల ఖర్చులో బిలియన్ల డాలర్లు ఆదా చేస్తుంది.',
      downloadDataSize: '180 MB (సాంకేతిక బ్లూప్రింట్ & ప్రోటోకాల్స్)',
      apiEndpoint: '/api/public-goods/bio-inputs/bnf-oxisols',
    },
    {
      id: 'china-saline-rice-open',
      title: 'చౌడు నేలల వరి వంగడాల నమూనాలు & మూలాల నిర్మాణం',
      category: 'Genetic Models',
      leadNation: 'చైనా',
      leadFlag: '🇨🇳',
      institutionalPartner: 'కింగ్‌డావో సెలైన్ రైస్ సెంటర్ (CAAS)',
      license: 'అగ్రిగేట్‌వే ఓపెన్ API (ODbL 1.0)',
      description: '0.4% - 0.8% ఉప్పు శాతం ఉన్న నేలల్లో కూడా వేర్లు లవణాలను నిరోధించే కంప్యూటర్ విజన్ నమూనాలు.',
      impactMetric: 'కోట్లాది హెక్టార్ల చౌడు మరియు తీరప్రాంత నేలల్లో వ్యవసాయాన్ని సులభతరం చేస్తుంది.',
      downloadDataSize: '1.8 GB (డేటాసెట్‌లు)',
      apiEndpoint: '/api/public-goods/phenotyping/saline-rice',
    },
    {
      id: 'russia-deep-chernozem-flux',
      title: 'రష్యా నల్లరేగడి నేలల లోతైన కర్బన డైనమిక్స్ రిజిస్ట్రీ',
      category: 'Soil Carbon',
      leadNation: 'రష్యా',
      leadFlag: '🇷🇺',
      institutionalPartner: 'డోకుచాయేవ్ సాయిల్ సైన్స్ ఇన్స్టిట్యూట్',
      license: 'ఓపెన్ జియోస్పేషియల్ సాయిల్ డేటా ప్రోటోకాల్ (OGC)',
      description: 'సున్నా-దుక్కి (Zero-till) ద్వారా నేలలో సేంద్రీయ కర్బన నిల్వలను ధృవీకరించే బహుళ-దశాబ్దాల కొలతలు.',
      impactMetric: 'మధ్యవర్తులు లేకుండా చిన్న రైతులకు స్వచ్ఛమైన కార్బన్ క్రెడిట్ ధృవీకరణను అందిస్తుంది.',
      downloadDataSize: '820 MB (NetCDF & GeoJSON ఫ్లక్స్ గ్రిడ్స్)',
      apiEndpoint: '/api/public-goods/soil-carbon/chernozem-flux',
    },
    {
      id: 'brics-sentinel-crop-sar',
      title: 'బ్రిక్స్ ఉమ్మడి సింథటిక్ ఎపర్చర్ రాడార్ (SAR) నేల తేమ ఇంజిన్',
      category: 'Satellite Algorithms',
      leadNation: 'బ్రిక్స్ జాయింట్ స్పేస్ కమిటీ',
      leadFlag: '🌐',
      institutionalPartner: 'ISRO / INPE / Roscosmos / CNSA / SANSA',
      license: 'Apache 2.0 ఓపెన్ సోర్స్ అల్గారిథమ్',
      description: 'మేఘావృతమైన రుతుపవన కాలంలో కూడా 10 మీటర్ల స్పష్టతతో నేల తేమను గుర్తించే రాడార్ నమూనాలు.',
      impactMetric: '5 కోట్ల మంది వర్షాధార రైతులకు ఉచిత నీటిపారుదల హెచ్చరికలు అందిస్తుంది.',
      downloadDataSize: '3.4 GB (పైటార్చ్ మోడల్స్)',
      apiEndpoint: '/api/public-goods/satellite/sar-soil-moisture',
    },
    {
      id: 'egypt-ethiopia-nile-micro',
      title: 'నైలు బేసిన్ మైక్రో-డ్రిప్ ప్రిసిషన్ హైడ్రాలజీ మోడల్స్',
      category: 'Water Governance',
      leadNation: 'ఈజిప్ట్ & ఇథియోపియా (BRICS+)',
      leadFlag: '🇪🇬 🇪🇹',
      institutionalPartner: 'వ్యవసాయ పరిశోధనా కేంద్రం గిజా & EIAR అడిస్ అబాబా',
      license: 'ఓపెన్ వాటర్ మేనేజ్‌మెంట్ ప్రోటోకాల్ (CC-BY-NC 4.0)',
      description: 'శుష్క వాతావరణంలో గోధుమ, ఖర్జూరం మరియు టెఫ్ పంటలకు నీటి వాడకాన్ని ఆదా చేసే డ్రిప్ పద్ధతులు.',
      impactMetric: 'నీటి వాడకాన్ని 38% తగ్గిస్తూనే దిగుబడిని 2.4 కిలోలు/ఘనపు మీటరుకు పెంచుతుంది.',
      downloadDataSize: '450 MB (హైడ్రాలజికల్ టేబుల్స్ & API)',
      apiEndpoint: '/api/public-goods/hydrology/nile-micro-drip',
    },
  ],
  pt: [
    {
      id: 'brics-drought-genomics',
      title: 'Atlas Genômico de Culturas Órfãs e Milheto Pan-BRICS',
      category: 'Genetic Models',
      leadNation: 'Índia e África do Sul',
      leadFlag: '🇮🇳 🇿🇦',
      institutionalPartner: 'ICAR-IIMR e ARC Pretória',
      license: 'Bem Público Digital Aberto (FAO Standard MTA / CC-BY 4.0)',
      description: 'Sequências fenotípicas e genômicas de 1.200+ variedades de milheto, sorgo e cereais adaptados a calor de 45°C e menos de 300mm de chuva.',
      impactMetric: 'Elimina royalties de sementes; acessível a todas as universidades públicas de extensão.',
      downloadDataSize: '4.2 GB (Banco de Dados FASTA e VCF)',
      apiEndpoint: '/api/public-goods/genomics/millets',
    },
    {
      id: 'embrapa-rhizobia-bnf',
      title: 'Formulações de Fixação Biológica de Nitrogênio (FBN) para Solos Ácidos',
      category: 'Biological Pest Control',
      leadNation: 'Brasil',
      leadFlag: '🇧🇷',
      institutionalPartner: 'EMBRAPA Agrobiologia',
      license: 'Protocolo Biológico de Acesso Aberto (WIPO Green)',
      description: 'Receitas bioindustriais completas para inoculantes de Bradyrhizobium japonicum e Azospirillum brasilense, reduzindo a dependência de ureia sintética.',
      impactMetric: 'Economizou US$ 14 bilhões anuais para produtores brasileiros em importação de fertilizantes.',
      downloadDataSize: '180 MB (Protocolos Microbiológicos)',
      apiEndpoint: '/api/public-goods/bio-inputs/bnf-oxisols',
    },
    {
      id: 'china-saline-rice-open',
      title: 'Modelos de Fenotipagem e Arquitetura Radicular de Arroz Salino',
      category: 'Genetic Models',
      leadNation: 'China',
      leadFlag: '🇨🇳',
      institutionalPartner: 'Centro de P&D de Arroz Tolerante à Salinidade de Qingdao (CAAS)',
      license: 'AgriGateway Open API (ODbL 1.0)',
      description: 'Modelos de visão computacional avaliando cinética de exclusão iônica em concentrações salinas de 0,4% a 0,8%.',
      impactMetric: 'Permite cultivo em 100M de hectares de solos salinos marginais costeiros e interiores.',
      downloadDataSize: '1.8 GB (Pesos e Conjuntos de Dados)',
      apiEndpoint: '/api/public-goods/phenotyping/saline-rice',
    },
    {
      id: 'russia-deep-chernozem-flux',
      title: 'Dinâmica de Carbono Profundo e Registro de Fluxo em Chernozem',
      category: 'Soil Carbon',
      leadNation: 'Rússia',
      leadFlag: '🇷🇺',
      institutionalPartner: 'Instituto Dokuchaev de Ciência do Solo',
      license: 'Protocolo Aberto de Dados Geoespaciais de Solo (OGC)',
      description: 'Medições multidecadais documentando o sequestro de carbono orgânico sob plantio direto vs aração convencional no inverno rigoroso.',
      impactMetric: 'Permite verificação transparente de créditos de carbono sem auditorias privadas caras.',
      downloadDataSize: '820 MB (Grades NetCDF e GeoJSON)',
      apiEndpoint: '/api/public-goods/soil-carbon/chernozem-flux',
    },
    {
      id: 'brics-sentinel-crop-sar',
      title: 'Motor Federado BRICS de Umidade do Solo por Radar de Abertura Sintética (SAR)',
      category: 'Satellite Algorithms',
      leadNation: 'Comitê Espacial Conjunto do BRICS',
      leadFlag: '🌐',
      institutionalPartner: 'ISRO / INPE / Roscosmos / CNSA / SANSA',
      license: 'Algoritmo Geoespacial de Código Aberto Apache 2.0',
      description: 'Modelos de inversão de retroespalhamento de radar gerando índices de saturação do solo a 10m de resolução através de nuvens densas.',
      impactMetric: 'Fornece gatilhos de irrigação de precisão a custo zero para 50M+ de pequenos agricultores.',
      downloadDataSize: '3.4 GB (Modelos PyTorch Geoespaciais)',
      apiEndpoint: '/api/public-goods/satellite/sar-soil-moisture',
    },
    {
      id: 'egypt-ethiopia-nile-micro',
      title: 'Modelos de Hidrologia de Precisão por Microgotejamento da Bacia do Nilo',
      category: 'Water Governance',
      leadNation: 'Egito e Etiópia (BRICS+)',
      leadFlag: '🇪🇬 🇪🇹',
      institutionalPartner: 'Centro de Pesquisa Agrícola de Gizé e EIAR Adis Abeba',
      license: 'Protocolo de Gestão Hídrica Aberta (CC-BY-NC 4.0)',
      description: 'Cronogramas de gotejamento subterrâneo calibrados por evapotranspiração para trigo duro, teff e palmeiras em clima árido.',
      impactMetric: 'Reduz captação de água em 38% e eleva a produtividade hídrica para 2,4 kg de grãos/m³.',
      downloadDataSize: '450 MB (Tabelas de Decisão e API)',
      apiEndpoint: '/api/public-goods/hydrology/nile-micro-drip',
    },
  ],
  hi: [],
  ru: [],
  zh: [],
  ar: [],
  sw: [],
};

// Populate other languages with base translations
const baseGoodsEn = LOCALIZED_PUBLIC_GOODS.en;
['hi', 'ru', 'zh', 'ar', 'sw'].forEach((lang) => {
  LOCALIZED_PUBLIC_GOODS[lang as BricsLanguage] = baseGoodsEn;
});
