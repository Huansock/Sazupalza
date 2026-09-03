import { DayMaster, DayMasterId } from '../models/sazu.model';

export const DAY_MASTERS: Record<DayMasterId, DayMaster> = {
  GAP: {
    id: 'GAP',
    index: 0,
    name: 'Gap (갑)',
    hanja: '甲',
    korean: '갑',
    element: 'Holz',
    polarity: 'Yang',
    elementEmoji: '🌲',
    symbol: 'Mächtige Eiche / Riesenbaum',
    title: 'Der unerschütterliche Pionier & Sturkopf',
    tagline: 'Bricht eher, als dass er sich biegt.',
    description: [
      'Wie eine 300 Jahre alte deutsche Eiche stehst du fest verwurzelt im Leben. Du bist von Natur aus eine geborene Führungspersönlichkeit, hasst Bevormundung und hast stets das große Ganze im Blick.',
      'Dein Gerechtigkeitssinn ist legendär: Wenn im Büro jemand unkollegial handelt, bist du der Erste, der die Grundsatzdebatte eröffnet. Du gibst anderen Schutz und Schatten, erwartest dafür aber stillschweigend Respekt und Loyalität.',
      'Biegen ist nicht deine Kernkompetenz. Wenn der Sturm tost, bleibst du stur stehen – ein echter Dickschädel mit goldenem Herzen und unbändiger Schaffenskraft.',
    ],
    strengths: [
      'Natürliche Führungsstärke',
      'Kompromisslose Geradlinigkeit',
      'Schützende Loyalität für Freunde',
      'Großes visionäres Denken',
    ],
    weaknesses: [
      'Sturheit wie getrockneter Zement',
      'Schwierigkeiten, sich zu entschuldigen',
      'Ungeduld bei Zauderern',
    ],
    germanArchetype: 'Der prinzipientreue Abteilungsleiter mit DIN-Norm im Blut',
    luckyItem: 'Laminiergerät (für wasserfeste Grundsatzentscheidungen)',
    luckyFood: 'Mettbrötchen mit extra Zwiebeln und Pfeffer',
    careerHint:
      'Start-up-Gründer, Projektleiter, Richter oder Vorstand der Eigentümergemeinschaft.',
    loveHint:
      'Braucht einen Partner mit sanftem Humor, der den Baum nicht fällen will, sondern gießt.',
    quote: '„Wer Recht hat, muss nicht leise sein.“',
    color: '#2e7d32',
    bgGradient: 'linear-gradient(135deg, #1b5e20, #4caf50)',
  },

  EUL: {
    id: 'EUL',
    index: 1,
    name: 'Eul (을)',
    hanja: '乙',
    korean: '을',
    element: 'Holz',
    polarity: 'Yin',
    elementEmoji: '🌿',
    symbol: 'Rankender Efeu / Geschmeidiger Bambus',
    title: 'Der charmante Überlebenskünstler & Meister-Netzwerker',
    tagline: 'Wer sich im Wind wiegt, bricht niemals.',
    description: [
      'Während Gap der starre Baum ist, bist du der smarte Efeu, der selbst an einer glatten Betonwand elegant nach oben klettert. Du besitzt eine unheimliche Anpassungsfähigkeit und überstehst jede Krise mit Stil.',
      'Du wirkst sanft, empathisch und diplomatisch, hast aber heimlich alle Fäden in der Hand. Dein Netzwerk reicht vom Hausmeister bis zum Vorstand – jeder mag dich, weil du aktiv zuhörst.',
      'Ohne Halt fühlst du dich manchmal unsicher. Doch sobald du deine Rankhilfe gefunden hast, blühst du auf und machst die trostloseste Umgebung wieder lebendig.',
    ],
    strengths: [
      'Phänomenale Anpassungsfähigkeit',
      'Diplomatisches Fingerspitzengefühl',
      'Hohe emotionale Intelligenz',
      'Unverwüstlicher Lebensmut',
    ],
    weaknesses: [
      'Kann schwer Nein sagen',
      'Weicht klaren Konflikten gern aus',
      'Braucht viel Bestätigung von außen',
    ],
    germanArchetype: 'Der smarte Betriebsrat, der alle Krisen bei Filterkaffee löst',
    luckyItem: 'Feiner Taschenkalender mit weicher Lederhülle',
    luckyFood: 'Frische Laugenbrezel mit Butter & Schnittlauch',
    careerHint: 'Mediation, PR, Personalentwicklung, Interior Design oder Psychologie.',
    loveHint: 'Braucht einen starken, zuverlässigen Halt, an dem man sich anlehnen kann.',
    quote: '„Der Klügere gibt nach – bis er sein Ziel erreicht hat.“',
    color: '#388e3c',
    bgGradient: 'linear-gradient(135deg, #2e7d32, #81c784)',
  },

  BYEONG: {
    id: 'BYEONG',
    index: 2,
    name: 'Byeong (병)',
    hanja: '丙',
    korean: '병',
    element: 'Feuer',
    polarity: 'Yang',
    elementEmoji: '☀️',
    symbol: 'Die sengende Mittagssonne',
    title: 'Das personifizierte Energiebündel & die Rampensau',
    tagline: 'Ohne mich bleibt es hier stockdunkel.',
    description: [
      'Was du fühlst, steht dir binnen Sekundenbruchteilen im Gesicht geschrieben. Du bist die strahlende Sonne im koreanischen Sazu: extrovertiert, leidenschaftlich, warmherzig und völlig unfähig, Geheimnisse für dich zu behalten.',
      'Was du fühlst, steht dir binnen Sekundenbruchteilen im Gesicht geschrieben. Du begeisterst Menschen im Handumdrehen für verrückte Ideen – auch wenn du morgen schon die nächste Vision jagst.',
      'Dunkle Stimmungen und passiv-aggressives Verhalten erträgst du nicht. Wenn dir etwas stinkt, gibt es ein kurzes reinigendes Sommergewitter – danach scheint wieder ungetrübt die Sonne.',
    ],
    strengths: [
      'Mitreißender Optimismus',
      'Absolute Ehrlichkeit und Offenheit',
      'Großzügiges Herz',
      'Enorme Strahlkraft und Motivation',
    ],
    weaknesses: [
      'Schnell entflammt, schnell gelangweilt',
      'Redet oft, bevor der Verstand zu Ende gedacht hat',
      'Gefahr von akutem Burnout',
    ],
    germanArchetype: 'Der charismatische Grillmeister beim Sommerfest mit 50 Gästen',
    luckyItem: 'Verspiegelte Piloten-Sonnenbrille',
    luckyFood: 'Berliner Currywurst mit Schärfegrad 4',
    careerHint: 'Marketing-Chef, Event-Moderation, Entertainer, Keynote-Speaker.',
    loveHint: 'Braucht jemanden, der die Hitze aushält und bei Bedarf liebevoll Schatten spendet.',
    quote: '„Warum leise flüstern, wenn die Welt Musik braucht?“',
    color: '#e64a19',
    bgGradient: 'linear-gradient(135deg, #d84315, #ff7043)',
  },

  JEONG: {
    id: 'JEONG',
    index: 3,
    name: 'Jeong (정)',
    hanja: '丁',
    korean: '정',
    element: 'Feuer',
    polarity: 'Yin',
    elementEmoji: '🕯️',
    symbol: 'Knisterndes Kaminfeuer / Feine Flamme',
    title: 'Der feinfühlige Stratege & heimliche Schweißbrenner',
    tagline: 'Wärmt die Seele, verbrennt bei Verrat gnadenlos.',
    description: [
      'Du bist nicht das grelle Sonnenlicht, sondern das gemütliche Kaminfeuer an einem kalten Winterabend. Du besitzt eine tiefe emotionale Wärme, scharfe Intuition und eine analytische Beobachtungsgabe.',
      'Nach außen hin wirkst du ruhig, höflich und zurückhaltend. Doch tief in deinem Inneren lodert ein hochpräziser Laser. Wenn du dich für eine Sache oder einen Menschen entschieden hast, brennst du mit unendlicher Hingabe.',
      'Wer dein Vertrauen missbraucht, wird deine Hitze spüren. Du bist geduldig, vergisst aber keinen Vertrauensbruch und weißt genau, wo die Achillesferse liegt.',
    ],
    strengths: [
      'Raffinierter strategischer Verstand',
      'Tiefgründige Empathie',
      'Unendliche Hingabe für Herzensprojekte',
      'Blick hinter alle Fassaden',
    ],
    weaknesses: [
      'Nachtragend bis zur Rente',
      'Neigt zu endlosem Gedankenkreisen',
      'Verschließt sich bei emotionaler Kälte',
    ],
    germanArchetype: 'Der belesene Philosoph beim Rotwein am Kachelofen',
    luckyItem: 'Massives Zippo-Feuerzeug oder handgegossene Duftkerze',
    luckyFood: 'Käsespätzle mit goldbraunen Röstzwiebeln',
    careerHint: 'Strategieberatung, Psychotherapie, Forschung, Schriftstellerei, Kunsthandwerk.',
    loveHint: 'Sucht eine Seelenverwandtschaft; oberflächlicher Smalltalk törnt dich sofort ab.',
    quote: '„Stille Feuer brennen am heißesten und schmelzen den härtesten Stahl.“',
    color: '#d32f2f',
    bgGradient: 'linear-gradient(135deg, #b71c1c, #ef5350)',
  },

  MU: {
    id: 'MU',
    index: 4,
    name: 'Mu (무)',
    hanja: '戊',
    korean: '무',
    element: 'Erde',
    polarity: 'Yang',
    elementEmoji: '⛰️',
    symbol: 'Mächtiges Bergmassiv / Urgestein',
    title: 'Der unerschütterliche Fels in der Brandung',
    tagline: 'Ich bewege mich nur, wenn tektonische Platten drängen.',
    description: [
      'Du bist die Zugspitze unter den Menschen: Felsenfeste Verlässlichkeit, stoische Ruhe und völlig immun gegen kurzlebige Modetrends oder Hektik. Wenn du dein Wort gibst, steht das fester als jedes Grundbuchamt.',
      'Entscheidungen triffst du nicht spontan, sondern wie ein Geologe – mit Bedacht und Gründlichkeit. Wenn du aber einen Entschluss gefasst hast, kann ihn kein Erdrutsch mehr revidieren.',
      'Deine Freunde schätzen deine absolute Verschwiegenheit. Manchmal bist du jedoch so unbeweglich, dass andere glauben, du hättest den Flugmodus für deine Emotionen aktiviert.',
    ],
    strengths: [
      'Unerschütterliche Loyalität',
      'Stoische Ruhe in jeder Krise',
      'Hervorragendes Urteilsvermögen',
      'Schafft Sicherheit für alle um sich herum',
    ],
    weaknesses: [
      'Trägheit bei nötigen Kurswechseln',
      'Gefühle werden tief vergraben',
      'Widerstand gegen jede Form von Spontaneität',
    ],
    germanArchetype: 'Der loyale Meister-Handwerker mit 40 Jahren Betriebstreue',
    luckyItem: 'Präzisions-Zollstock aus Buchenholz',
    luckyFood: 'Sauerbraten mit Apfelrotkohl und Kartoffelklößen',
    careerHint: 'Bauingenieur, Notar, Finanzvorstand, Qualitätsprüfung, Geologie.',
    loveHint: 'Braucht keinen Nervenkitzel, sondern Verlässlichkeit, Gemütlichkeit und Rituale.',
    quote: '„Ein guter Bauplan braucht keinen Wecker, sondern ein stabiles Fundament.“',
    color: '#795548',
    bgGradient: 'linear-gradient(135deg, #4e342e, #8d6e63)',
  },

  GI: {
    id: 'GI',
    index: 5,
    name: 'Gi (기)',
    hanja: '己',
    korean: '기',
    element: 'Erde',
    polarity: 'Yin',
    elementEmoji: '🌾',
    symbol: 'Fruchtbarer Gartenboden / Kleingarten-Erde',
    title: 'Die fürsorgliche Seele & geborene Organisator',
    tagline: 'Nährt jeden Keim, behält aber heimlich die Kontrolle.',
    description: [
      'Du bist der nahrhafte Mutterboden, auf dem alles gedeiht. Du hast ein natürliches Talent dafür, Menschen aufzubauen, Gemeinschaften zu stärken und dafür zu sorgen, dass niemand zu kurz kommt.',
      'In deinem Kopf existiert ein mentaler Ordner für alle Geburtstage, Allergien und Lieblingsgerichte deiner Freunde. Du bist bodenständig, praktisch veranlagt und pragmatisch.',
      'Weil du dich um jeden kümmerst, vergisst du oft dich selbst. Du ziehst die Sorgen anderer an wie ein Schwamm und wunderst dich dann, warum dir die Puste ausgeht.',
    ],
    strengths: [
      'Herzenswarme Fürsorge',
      'Exzellente organisatorische Gabe',
      'Praktischer Menschenverstand',
      'Brückenbauer zwischen Streitenden',
    ],
    weaknesses: [
      'Neigt zu innerer Zerrissenheit',
      'Kann schwer Grenzen ziehen',
      'Grübelt über die Urteile anderer',
    ],
    germanArchetype: 'Der Kleingarten-Vorsitzende, bei dem alles blüht und die Grillordnung stimmt',
    luckyItem: 'Tupperdose mit liebevoll geschnittenen Apfelschnitzen',
    luckyFood: 'Klassischer schwäbischer Kartoffelsalat mit Brühe',
    careerHint: 'Human Resources, Pädagogik, Gastronomie, Eventorganisation, Familienrecht.',
    loveHint:
      'Braucht jemanden, der auch mal für DICH kocht und dir die Decke über die Schultern legt.',
    quote: '„Ein sauberer Küchentisch ist die halbe Miete für ein glückliches Leben.“',
    color: '#8d6e63',
    bgGradient: 'linear-gradient(135deg, #5d4037, #a1887f)',
  },

  GYEONG: {
    id: 'GYEONG',
    index: 6,
    name: 'Gyeong (경)',
    hanja: '庚',
    korean: '경',
    element: 'Metall',
    polarity: 'Yang',
    elementEmoji: '⚔️',
    symbol: 'Schwert aus Solinger Stahl / Der Amboss',
    title: 'Der unerbittliche Krieger für Recht & Effizienz',
    tagline: 'Ich schneide durch Ausreden wie durch warme Butter.',
    description: [
      'Du bist das rohe, schwere Erz, das durch Druck und Hitze zu einer scharfen Klinge geschmiedet wird. Klarheit, Disziplin, Loyalität und schonungslose Direktheit sind deine Visitenkarte.',
      'Smalltalk und Heuchelei lösen bei dir körperliche Schmerzen aus. Du sagst immer genau das, was Sache ist – auch wenn es im ersten Moment wehtut. Wer dich zum Freund hat, hat einen Leibwächter fürs Leben.',
      'Du liebst klare Strukturen und Ergebnisse. Wenn Dinge ineffizient laufen, zückst du dein mentales Samuraischwert. Manchmal vergisst du dabei, dass Gefühle keine Excel-Zellen sind.',
    ],
    strengths: [
      'Kompromisslose Ehrlichkeit',
      'Furchtlose Entscheidungsfreude',
      'Eiserne Selbstdisziplin',
      'Unzerbrechlicher Schutzinstinkt',
    ],
    weaknesses: [
      'Schroffer Tonfall',
      'Geringe Geduld für emotionale Dramen',
      'Versteckt eigene Verwundbarkeit krampfhaft',
    ],
    germanArchetype: 'Der strenge TÜV-Prüfer, der Mängel schon am Motorengeräusch erkennt',
    luckyItem: 'Unverwüstlicher Edelstahl-Thermosbecher',
    luckyFood: 'Knusprige Schweinshaxe mit Sauerkraut',
    careerHint: 'Sanierungsmanager, Kriminalbeamter, Chirurg, Justiziar, Schiedsrichter.',
    loveHint: 'Wirkt wie eine eiserne Rüstung – schmilzt aber komplett dahin bei ehrlicher Treue.',
    quote: '„Klartext spart allen Beteiligten wertvolle Lebenszeit.“',
    color: '#546e7a',
    bgGradient: 'linear-gradient(135deg, #37474f, #78909c)',
  },

  SIN: {
    id: 'SIN',
    index: 7,
    name: 'Sin (신)',
    hanja: '辛',
    korean: '신',
    element: 'Metall',
    polarity: 'Yin',
    elementEmoji: '💎',
    symbol: 'Geschliffener Brillant / Juwel & Skalpell',
    title: 'Der stilvolle Perfektionist & scharfzüngige Ästhet',
    tagline: 'Klasse statt Masse – glänzt auch im dunkelsten Raum.',
    description: [
      'Während Gyeong das rohe Eisen ist, bist du das fertige Diamantschmuckstück oder die feingliedrige Schweizer Präzisionsuhr. Du hast einen erlesenen Geschmack, liebst Ästhetik und bemerkst jeden winzigen Schönheitsfehler sofort.',
      'Deine Zunge ist messerscharf: Deine ironischen Pointen treffen präziser als ein Schweizer Uhrwerk. Du verabscheust Schlampigkeit, schlechte Manieren und billige Notlösungen.',
      'Unter deiner makellosen Fassade verbirgt sich eine zarte Seele, die extrem empfindlich auf Respektlosigkeit reagiert. Ein Diamant verzeiht keine Kratzer – und du vergisst nichts.',
    ],
    strengths: [
      'Makelloses Stilgefühl',
      'Analytische Präzision bis ins kleinste Detail',
      'Scharfer, eleganter Witz',
      'Höchste Qualitätsansprüche',
    ],
    weaknesses: [
      'Überkritisch mit sich und anderen',
      'Nachtragend bei Kränkungen',
      'Hang zu Perfektionismus-Lähmung',
    ],
    germanArchetype: 'Der stilsichere Architekt im schwarzen Rollkragen mit Espresso-Kult',
    luckyItem: 'Schwerer Füllfederhalter mit gravierter Goldfeder',
    luckyFood: 'Frischer Beelitzer Spargel mit Sauce Hollandaise & Riesling',
    careerHint: 'Architektur, Luxusgüter-Design, Journalismus, feine Chirurgie, Kunsthandel.',
    loveHint: 'Braucht aufrichtige Wertschätzung und einen Partner mit Stil und Feingefühl.',
    quote: '„Das Leben ist zu kurz für schlechten Espresso und ungebügelte Hemden.“',
    color: '#78909c',
    bgGradient: 'linear-gradient(135deg, #455a64, #b0bec5)',
  },

  IM: {
    id: 'IM',
    index: 8,
    name: 'Im (임)',
    hanja: '壬',
    korean: '임',
    element: 'Wasser',
    polarity: 'Yang',
    elementEmoji: '🌊',
    symbol: 'Die offene Nordsee / Reißender Strom',
    title: 'Der weitsichtige Stratege & Freiheitsliebende',
    tagline: 'Wasser findet immer seinen Weg – oder reißt den Deich ein.',
    description: [
      'Du bist der weite Ozean: tief, geheimnisvoll, hochintelligent und niemals dauerhaft einzudämmen. Du denkst in globalen Zusammenhängen und besitzt eine intuitive Lebensweisheit.',
      'Freiheit ist dein Lebenselixier. Jeder Versuch, dich in ein enges bürokratisches Korsett zu zwängen, scheitert kläglich – du schwappst einfach elegant oder gewaltig darüber hinweg.',
      'Du kannst dich mit jedem unterhalten, vom Nobelpreisträger bis zum Straßenmusiker. Doch niemand weiß je zu 100%, welche Gedanken in deinen tiefsten Meeresgründen schlummern.',
    ],
    strengths: [
      'Große strategische Weitsicht',
      'Grenzenlose Flexibilität',
      'Tiefsinnige Intelligenz',
      'Kosmopolitischer Charme',
    ],
    weaknesses: [
      'Schwer greifbar für Mitmenschen',
      'Kann kühl oder unnahbar wirken',
      'Launisch wie die Gezeiten',
    ],
    germanArchetype: 'Der weltgewandte Hanseat mit Fernweh und Sinn für große Deals',
    luckyItem: 'Wasserdichter Expeditions-Rucksack',
    luckyFood: 'Frisches Matjesbrötchen am Hamburger Fischmarkt',
    careerHint: 'Globaler Handel, Philosophie, Venture Capital, Schifffahrt, Software-Architektur.',
    loveHint:
      'Braucht einen Partner, der nicht klammert, sondern gemeinsam ins offene Meer sticht.',
    quote: '„Grenzen sind nur Empfehlungen für Leute, die nicht schwimmen können.“',
    color: '#1565c0',
    bgGradient: 'linear-gradient(135deg, #0d47a1, #42a5f5)',
  },

  GYE: {
    id: 'GYE',
    index: 9,
    name: 'Gye (계)',
    hanja: '癸',
    korean: '계',
    element: 'Wasser',
    polarity: 'Yin',
    elementEmoji: '🌧️',
    symbol: 'Morgentau auf Blüten / Sanfter Frühlingsregen',
    title: 'Der geheimnisvolle Seelenleser & leise Visionär',
    tagline: 'Steter Tropfen höhlt den härtesten Stein.',
    description: [
      'Du bist wie der feine Morgennebel über dem Schwarzwald: mystisch, sensibel und mit einer beinahe telepathischen Intuition gesegnet. Du spürst Stimmungen im Raum, bevor jemand auch nur ein Wort sagt.',
      'Lautes Gehabe stößt dich ab. Du erreichst deine Ziele durch stille Beharrlichkeit, Klugheit und feines Gespür. Wie sanfter Regen dringst du tief in die Erde ein und nährst das Leben unbemerkt.',
      'Du hast eine reiche Gedanken- und Fantasiewelt. Wenn dir der Alltag zu laut und grell wird, ziehst du dich gern in deine Burg zurück, um neue seelische Kräfte zu sammeln.',
    ],
    strengths: [
      'Unfehlbare Menschenkenntnis',
      'Kreative und poetische Ader',
      'Sanfte Beharrlichkeit',
      'Gutes Gespür für zukünftige Trends',
    ],
    weaknesses: [
      'Überempfindlichkeit bei Hektik',
      'Flieht bei harten Konflikten in den Rückzug',
      'Neigt zu geheimniskrämerischem Verhalten',
    ],
    germanArchetype: 'Der tiefsinnige Drehbuchautor im verregneten Berliner Café',
    luckyItem: 'Hochwertiges Notizbuch mit unlinierten Seiten',
    luckyFood: 'Heißer Früchtetee mit Honig & ein frisches Franzbrötchen',
    careerHint: 'Psychologie, Zukunftsforschung, Musik/Literatur, Coaching, Data Science.',
    loveHint: 'Sucht eine tiefe Seelenharmonie ohne Drama und Gebrüll.',
    quote: '„Man sieht nur mit dem Herzen gut; der Verstand zählt am Ende bloß Erbsen.“',
    color: '#0288d1',
    bgGradient: 'linear-gradient(135deg, #01579b, #29b6f6)',
  },
};

export const STEM_KEYS: DayMasterId[] = [
  'GAP',
  'EUL',
  'BYEONG',
  'JEONG',
  'MU',
  'GI',
  'GYEONG',
  'SIN',
  'IM',
  'GYE',
];

export interface CompatibilityMatrixItem {
  score: number;
  badge: string;
  relationshipType: string;
  verdict: string;
  description: string;
  dailyLifeTip: string;
  conflictTrigger: string;
  greenFlag: string;
  redFlag: string;
}

// Key format: `${Stem1}_${Stem2}` (normalized or checked both ways)
export const SPECIAL_COMPATIBILITY: Record<string, CompatibilityMatrixItem> = {
  // --- CHEONGAN HAP (Himmlische Verschmelzung) ---
  GAP_GI: {
    score: 97,
    badge: 'Himmlisches Traumpaar 🌟',
    relationshipType: 'Himmlische Verschmelzung (Gap-Gi-Hap / 갑기합)',
    verdict: 'Der mächtige Baum wurzelt im besten Mutterboden. Besser als Bier und Brezeln!',
    description:
      'Eine der heiligsten Verbindungen im Sazu. Gap bringt die Vision und den starken Stamm, Gi schenkt die nährende Geborgenheit und Ordnung. Ihr ergänzt einander so mühelos, dass selbst Nachbarn neidisch werden.',
    dailyLifeTip:
      'Gi sollte Gap hin und wieder sanft einbremsen, Gap muss Gis Fürsorge ausdrücklich loben.',
    conflictTrigger: 'Wenn Gap vergisst, die Tupperdose abzuwaschen, die Gi liebevoll gepackt hat.',
    greenFlag:
      'Merkt sich ohne Notizen, welche Hafermilch du trinkst und kauft sie ungefragt nach.',
    redFlag: 'Wird extrem defensiv, wenn man seine feste Abendroutine um 10 Minuten verschiebt.',
  },
  EUL_GYEONG: {
    score: 96,
    badge: 'Stahlharte Romantik ⚔️🌿',
    relationshipType: 'Himmlische Verschmelzung (Eul-Gyeong-Hap / 을경합)',
    verdict: 'Die Schöne und das Schwert: Aus Härte wird Zärtlichkeit.',
    description:
      'Gyeong ist der strenge Ritter mit klaren Kanten, Eul die charmante Schlingpflanze, die sein Herz im Sturm erobert. Eul bändigt Gyeongs Schroffheit, während Gyeong für Eul eine unüberwindbare Schutzmauer baut.',
    dailyLifeTip:
      'Gyeong sollte Kritik dosieren; Eul darf Gyeongs direkte Art nicht als Liebesentzug deuten.',
    conflictTrigger: 'Gyeong kritisiert den Putzplan vor Zeugen; Eul schmollt drei Tage lautlos.',
    greenFlag:
      'Baut eine uneinnehmbare Schutzmauer gegen toxische Bekannte auf und stärkt dir bedingungslos den Rücken.',
    redFlag: 'Kritisiert deine Entscheidungen mit der Kälte und Härte eines Steuerprüfers.',
  },
  BYEONG_SIN: {
    score: 98,
    badge: 'Kosmischer Glanz ✨',
    relationshipType: 'Himmlische Verschmelzung (Byeong-Sin-Hap / 병신합)',
    verdict: 'Die Sonne bringt den Diamanten zum Funkeln. Pure Eleganz & Leidenschaft!',
    description:
      'Byeong strahlt voller Herzenswärme, Sin glänzt mit Stil und Perfektion. Zusammen seid ihr das absolute Vorzeigepaar auf jeder Party. Was der eine an Feuer hat, veredelt der andere zu purem Gold.',
    dailyLifeTip:
      'Lasst euch gegenseitig die Bühne, statt um das hellste Rampenlicht zu konkurrieren.',
    conflictTrigger: 'Wer darf entscheiden, welche Möbel für das Wohnzimmer gekauft werden.',
    greenFlag:
      'Macht dich auf jeder Party zum Star und feiert jeden deiner kleinen Erfolge wie einen Oscar.',
    redFlag:
      'Passive Aggressivität auf WhatsApp („Passt schon.“), wenn du nicht binnen 5 Minuten antwortest.',
  },
  JEONG_IM: {
    score: 97,
    badge: 'Magische Anziehungskraft 🌊🕯️',
    relationshipType: 'Himmlische Verschmelzung (Jeong-Im-Hap / 정임합)',
    verdict: 'Kaminfeuer spiegelt sich im Ozean. Tiefer als jede deutsche Philosophie!',
    description:
      'Im bringt den weiten Horizont und die Freiheit, Jeong die intime Wärme und seelische Tiefe. Hinter verschlossenen Türen herrscht zwischen euch eine fast telepathische Verbindung voller Magie.',
    dailyLifeTip:
      'Verliert euch nicht in Grübeleien – geht gemeinsam raus in die Natur und esst ein Eis.',
    conflictTrigger: 'Wenn Im plötzlich tagelang abtaucht und Jeong das Kopfkino anwirft.',
    greenFlag:
      'Deep Talk in der WG-Küche um 3 Uhr morgens mit echten, verletzlichen Seeleneinblicken.',
    redFlag:
      'Ghosting-Reflex: Taucht plötzlich für 48 Stunden ab, sobald Gefühle zu intensiv werden.',
  },
  MU_GYE: {
    score: 96,
    badge: 'Lebendige Oase ⛰️🌧️',
    relationshipType: 'Himmlische Verschmelzung (Mu-Gye-Hap / 무계합)',
    verdict: 'Frühlingsregen küsst den stolzen Berg. Hier blüht das pure Leben auf.',
    description:
      'Der unbewegliche Fels Mu bekommt durch das feinfühlige Wasser Gye Frische und Leben eingehaucht. Mu gibt Gye den sicheren Hafen, den Gye in der rauen Welt so verzweifelt sucht.',
    dailyLifeTip:
      'Mu sollte Gefühle öfter in Worte fassen; Gye darf Mus Schweigen nicht als Desinteresse werten.',
    conflictTrigger:
      'Wenn Mu stur auf dem Sofa hocken bleibt, während Gye über Gott und die Welt reden will.',
    greenFlag: 'Der stoische Fels in der Brandung, wenn bei dir die ganze Welt im Chaos versinkt.',
    redFlag:
      'Verweigert sonntags jede Spontaneität und braucht 3 Tage Vorwarnung für ein Café-Treffen.',
  },

  // --- CHEONGAN CHUNG (Himmlische Reibung / Clash) ---
  GAP_GYEONG: {
    score: 48,
    badge: 'Kettensägen-Diplomatie 💥',
    relationshipType: 'Elementare Kollision (Gap-Gyeong-Chung / 갑경충)',
    verdict: 'Axt trifft auf Mammutbaum. Funken fliegen garantiert!',
    description:
      'Zwei geborene Bosse prallen frontal aufeinander. Keiner von beiden gibt auch nur einen Millimeter nach. Wenn ihr lernt, gemeinsam ein Ziel zu attackieren, seid ihr unbesiegbar – privat braucht ihr getrennte Badezimmer.',
    dailyLifeTip:
      'Führt bei Diskussionen eine feste Redezeit-Uhr ein, sonst endet jede Planung vor dem Schiedsgericht.',
    conflictTrigger:
      'Wer recht hat bei der Frage, welcher Weg laut Google Maps um 30 Sekunden schneller gewesen wäre.',
    greenFlag:
      'Unglaubliches Power-Couple bei Großprojekten – ihr kriegt gemeinsam jede Krise gelöst.',
    redFlag:
      'Macht aus der Frage, wer den Müll falsch sortiert hat, eine grundlegende Grundsatzdebatte.',
  },
  EUL_SIN: {
    score: 44,
    badge: 'Rosenkrieg mit Stil ✂️🥀',
    relationshipType: 'Elementare Kollision (Eul-Sin-Chung / 을신충)',
    verdict: 'Die Heckenschere stutzt die Orchidee. Dramatischer als eine Tatort-Folge!',
    description:
      'Sins spitze Zunge trifft genau die empfindlichen Nerven von Eul. Eul reagiert mit passiver Verweigerung, was Sin noch zynischer macht. Hier braucht es Tonnen von emotionaler Reife und Pflaster.',
    dailyLifeTip:
      'Sin muss den inneren Kritiker ausschalten; Eul sollte Grenzen sofort und unmissverständlich benennen.',
    conflictTrigger:
      'Ein scheinbar harmloser Kommentar über die Frisur oder die Kleidung des anderen.',
    greenFlag:
      'Modisch und ästhetisch das mit Abstand bestangezogene Duo im gesamten Freundeskreis.',
    redFlag: 'Zynischer Witz trifft wunden Punkt – danach tagelange eisige Funkstille.',
  },
  BYEONG_IM: {
    score: 52,
    badge: 'Stürmische Brandung 🌊☀️',
    relationshipType: 'Elementare Kollision (Byeong-Im-Chung / 병임충)',
    verdict: 'Mittagssonne gegen Tsunami. Großes Kino, aber anstrengend.',
    description:
      'Beide sind Naturgewalten mit enormem Ego. Byeong will alles sofort und offen herausposaunen, Im plant im Verborgenen drei Schritte voraus. Wenn die Wellen sich beruhigen, fasziniert ihr euch maßlos.',
    dailyLifeTip:
      'Macht getrennte Urlaube oder vereinbart Tage, an denen einer das uneingeschränkte Kommando hat.',
    conflictTrigger:
      'Byeong lädt spontan 10 Freunde ein, während Im seine Ruhe am Schreibtisch genießen wollte.',
    greenFlag: 'Jedes Date fühlt sich an wie ein wilder Spontan-Trip nach Paris – null Routine.',
    redFlag:
      'Einer will Konflikte sofort lautstark klären, der andere blockt ab und geht einfach aus dem Raum.',
  },
  JEONG_GYE: {
    score: 42,
    badge: 'Nasse Streichhölzer 🌧️🕯️',
    relationshipType: 'Elementare Kollision (Jeong-Gye-Chung / 정계충)',
    verdict: 'Dauerregen auf Kerzenschein. Da erlischt die Flamme im Nu.',
    description:
      'Gyes emotionale Nebelschwaden ersticken Jeongs feines, leidenschaftliches Feuer. Beide neigen dazu, gekränkt zu schweigen statt Klartext zu reden. Eine Beziehung, die viel lüftende Frischluft verlangt.',
    dailyLifeTip:
      'Schreibt euch Briefe, wenn das Reden zu geladen ist. Klare Fakten helfen gegen Gefühlschaos.',
    conflictTrigger: 'Stundenlanges Anschweigen bei der Frage: „Was hast du denn?“ – „Nichts.“',
    greenFlag:
      'Beide spüren kleinste Stimmungsveränderungen des anderen im Raum sofort telepathisch.',
    redFlag:
      'Chronisches Overthinking: Stundenlange Panik wegen eines fehlenden Emojis in der Guten-Morgen-Nachricht.',
  },

  // --- SANGSAENG (Nährende Element-Partnerschaften) ---
  GAP_BYEONG: {
    score: 91,
    badge: 'Lagerfeuer-Euphorie 🔥🌲',
    relationshipType: 'Elementare Nahrung (Holz nährt Feuer)',
    verdict: 'Gap liefert das beste Holz, Byeong entfacht das wärmende Freudenfeuer!',
    description:
      'Ein wunderbares Team voller Tatkraft. Gap schätzt Byeongs ansteckende Begeisterung, Byeong profitiert von Gaps Ausdauer und Statur. Zusammen reißt ihr Bäume aus.',
    dailyLifeTip:
      'Achtet darauf, euch nicht gegenseitig in Projekte zu verrennen, bis die Puste ausgeht.',
    conflictTrigger: 'Wenn beide gleichzeitig die Führung für das Wochenendprogramm beanspruchen.',
    greenFlag: 'Mitreißende Energie – zusammen seid ihr die Stimmungskanonen auf jeder WG-Party.',
    redFlag: 'Wer hat das Sagen? Beide wollen vorne am Steuer sitzen und hassen Beifahrer-Rollen.',
  },
  EUL_JEONG: {
    score: 92,
    badge: 'Kaminfeuer-Idylle 🕯️🌿',
    relationshipType: 'Elementare Nahrung (Holz nährt Feuer)',
    verdict:
      'Sanftes Reisig nährt die feine Flamme. Gemütlicher als ein Sonntagnachmittag mit Tatort.',
    description:
      'Eine unglaublich feinfühlige, fast poetische Verbindung. Eul bringt charmante Ideen ein, Jeong vertieft sie mit Leidenschaft und Substanz. Ihr versteht euch oft ohne Worte.',
    dailyLifeTip: 'Ladet Freunde ein, um nicht in eurer kuscheligen Zweier-Kapsel zu versauern.',
    conflictTrigger: 'Wenn beide zu sensibel auf Nuancen reagieren und Probleme totschweigen.',
    greenFlag: 'Kuscheldecke, heißer Tee und bedingungslose Geborgenheit an verregneten Sonntagen.',
    redFlag: 'Beide schlucken Ärger wochenlang runter, bis plötzlich die aufgestaute Bombe platzt.',
  },
  BYEONG_MU: {
    score: 89,
    badge: 'Sonnige Berghütte ⛰️☀️',
    relationshipType: 'Elementare Nahrung (Feuer nährt Erde)',
    verdict: 'Die Sonne erwärmt den kalten Fels. Felsenfeste Wärme!',
    description:
      'Byeong bringt Schwung und Lebensfreude in Mus bisweilen träge Welt. Mu wiederum bietet Byeong den stabilen Boden, auf dem die feurige Energie sicher landen kann.',
    dailyLifeTip:
      'Byeong darf Mu nicht hetzen; Mu muss Byeongs Spontanität mit einem Lächeln honorieren.',
    conflictTrigger:
      'Byeong will sofort losfahren, Mu schnürt noch in Ruhe 20 Minuten die Wanderschuhe.',
    greenFlag: 'Bodenständige Sicherheit fängt deine verrückten Spontan-Ideen immer liebevoll auf.',
    redFlag:
      'Er will jetzt sofort los ins Café, sie sucht noch in aller Seelenruhe 20 Minuten die Sonnenbrille.',
  },
  JEONG_GI: {
    score: 90,
    badge: 'Warmer Mutterboden 🌾🕯️',
    relationshipType: 'Elementare Nahrung (Feuer nährt Erde)',
    verdict: 'Fruchtbare Wärme für den Garten. Harmonie wie bei Kaffee & Kuchen.',
    description:
      'Jeongs innere Tiefe trifft auf Gis häusliche Wärme und Fürsorge. Bei euch riecht die Wohnung immer nach frischem Gebäck und Sicherheit. Ein Paradebeispiel für verlässliche Liebe.',
    dailyLifeTip:
      'Gönnt euch Ausflüge aus der Komfortzone – bucht mal spontan ein Wellness-Wochenende.',
    conflictTrigger: 'Streit um die Haushaltskasse oder wer mehr zur Hausarbeit beigetragen hat.',
    greenFlag:
      'Pures Hygge-Gefühl: Bei euch riecht es immer nach Geborgenheit, Liebe und Zimtschnecken.',
    redFlag: 'Stille Abrechnung darüber, wer mehr mentale Last und Haushaltsarbeit übernommen hat.',
  },
  MU_GYEONG: {
    score: 88,
    badge: 'Erz im Fels ⛰️⚔️',
    relationshipType: 'Elementare Nahrung (Erde bringt Metall hervor)',
    verdict: 'Aus dem Berg wird der Krupp-Stahl gewonnen. Solide wie die Deutsche Bundesbank.',
    description:
      'Hier regieren Verlässlichkeit und Disziplin. Mu bietet den unerschütterlichen Rückhalt, Gyeong setzt Pläne mit eiserner Entschlossenheit um. Ihr baut gemeinsam Häuser fürs Leben.',
    dailyLifeTip: 'Vergesst über all den Zielen und Sparplänen nicht das Kuscheln und den Humor.',
    conflictTrigger:
      'Wenn beide stur auf ihren Prinzipien beharren und niemand den ersten Schritt macht.',
    greenFlag: 'Absprachen stehen bombenfest – kein Zaudern, kein Ghosting, 100% Verlässlichkeit.',
    redFlag:
      'Romantik und Komplimente geraten unter die Räder – fühlt sich manchmal an wie eine GmbH.',
  },
  GI_SIN: {
    score: 93,
    badge: 'Juwel im Samtkissen 💎🌾',
    relationshipType: 'Elementare Nahrung (Erde birgt Edelstein)',
    verdict: 'Gi poliert das Juwel Sin mit Liebe. Luxus trifft Bodenständigkeit!',
    description:
      'Sin fühlt sich von Gis bedingungsloser Fürsorge zutiefst verstanden und geborgen. Sin bringt Glanz und Eleganz in Gis Leben, während Gi Sin davor bewahrt, den Bodenkontakt zu verlieren.',
    dailyLifeTip:
      'Sin sollte Gis ehrliche Mühe mit Zärtlichkeit belohnen, statt Kritik am Besteck zu üben.',
    conflictTrigger:
      'Sin bemängelt die Qualität der Tischdeko, die Gi liebevoll stundenlang arrangiert hat.',
    greenFlag:
      'Verwöhnt dich bedingungslos mit Liebe, während der andere Stil, Glanz und Ästhetik schenkt.',
    redFlag:
      'Mäckelt an kleinen Haushaltsdingen herum, die der andere stundenlang vorbereitet hat.',
  },
  GYEONG_IM: {
    score: 89,
    badge: 'Klarer Gebirgsfluss ⚔️🌊',
    relationshipType: 'Elementare Nahrung (Metall klärt Wasser)',
    verdict: 'Schwert formt das Flussbett. Intellektuelles Power-Team!',
    description:
      'Gyeong bringt Struktur und Schärfe, Im die Weitsicht und Flexibilität. Zusammen könnt ihr Großkonzerne lenken oder weltweite Segeltörns planen. Große gegenseitige Hochachtung!',
    dailyLifeTip:
      'Bringt mehr emotionale Weichheit ins Spiel – ihr seid Partner, nicht Geschäftspartner.',
    conflictTrigger:
      'Wer das letzte Wort beim großen Zukunftsplan für die nächsten fünf Jahre hat.',
    greenFlag: 'Scharfsinnige Wortgefechte und grandiose Pläne auf absolut gleicher Augenhöhe.',
    redFlag: 'Beide verabscheuen Schwäche – emotionale Tränen werden krampfhaft weggedrückt.',
  },
  SIN_GYE: {
    score: 91,
    badge: 'Tautropfen auf Diamant 💎🌧️',
    relationshipType: 'Elementare Nahrung (Metall kondensiert Wasser)',
    verdict: 'Feinste Ästhetik und tiefe Gefühle. Stilvoller geht es kaum.',
    description:
      'Zwei Feingeister unter sich. Sins ästhetischer Anspruch harmoniert herrlich mit Gyes geheimnisvoller Sanftheit. Ihr versteht Blicke, die anderen verborgen bleiben.',
    dailyLifeTip: 'Meidet giftige äußere Einflüsse und schafft euch eine stilvolle Wohlfühloase.',
    conflictTrigger: 'Wenn beide sich in verletztem Stolz zurückziehen und keiner nachfragt.',
    greenFlag:
      'Feinsinniges Verständnis für Ästhetik, Kunst und Blicke, die sonst niemand versteht.',
    redFlag: 'Hyper-Sensibilität: Ein falscher Unterton bei der Begrüßung versaut den ganzen Tag.',
  },
  IM_GAP: {
    score: 93,
    badge: 'Wald am Flussufer 🌲🌊',
    relationshipType: 'Elementare Nahrung (Wasser nährt Holz)',
    verdict: 'Der gewaltige Strom lässt die Eiche in den Himmel wachsen!',
    description:
      'Ims unerschöpfliches Wissen und Weisheit nähren Gaps Tatendrang und Ambitionen. Gap bewundert Ims Weitsicht, Im liebt Gaps Geradlinigkeit und Standhaftigkeit.',
    dailyLifeTip:
      'Gap sollte Im nicht besitzen wollen; Im muss zu vereinbarten Treffpunkten pünktlich sein.',
    conflictTrigger:
      'Gaps Pünktlichkeitswahn kollidiert mit Ims „Ich lasse mich treiben“-Mentalität.',
    greenFlag:
      'Großzügige Freiheit und gegenseitige Motivation, persönliche Träume mutig umzusetzen.',
    redFlag: 'Pünktlichkeits-Fimmel kollidiert frontal mit der „Ich lass mich treiben“-Attitüde.',
  },
  GYE_EUL: {
    score: 94,
    badge: 'Morgentau auf der Wiese 🌿🌧️',
    relationshipType: 'Elementare Nahrung (Wasser nährt Holz)',
    verdict: 'Frühlingsregen lässt die zarten Pflanzen sprießen. Harmonisch wie Vivaldi.',
    description:
      'Gye schenkt Eul das nötige seelische Nass, damit Eul prächtig wachsen kann. Eul bedankt sich mit Zuneigung, Charme und Wärme. Eine fast konfliktfreie, sanfte Traumbeziehung.',
    dailyLifeTip:
      'Achtet darauf, dass die Welt draußen euch nicht überrollt – setzt Grenzen nach außen.',
    conflictTrigger:
      'Wenn alltägliche Probleme (wie Steuererklärungen) vor lauter Harmoniebedürfnis ignoriert werden.',
    greenFlag:
      'Sanfte Geborgenheit ohne Drama – fühlt sich an wie ein friedlicher, warmer Frühlingstag.',
    redFlag:
      'Reale bürokratische Pflichten (z.B. Steuererklärung) werden aus Harmoniesucht monatelang verdrängt.',
  },
};
