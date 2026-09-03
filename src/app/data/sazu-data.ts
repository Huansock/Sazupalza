import { AuraId, DayMaster, DayMasterId, SajuAuraStar } from '../models/sazu.model';

export const AURA_STARS: Record<AuraId, SajuAuraStar> = {
  DOHWA: {
    id: 'DOHWA',
    name: 'Dohwa-Aura',
    korean: '도화살 (Peach Blossom Star)',
    hanja: '桃花煞',
    emoji: '🌸',
    title: 'Der unbezähmbare Flirt-Magnet',
    headline: 'Warum du ungefragt alle Blicke (und Red Flags) magisch anziehst',
    tagline: 'Betritt den Raum und mindestens zwei Leute verlieben sich sofort.',
    description:
      'Im koreanischen Sazu ist Dohwa das legendäre „Pfirsichblüten-Charisma“. Du musst nicht einmal etwas sagen: Deine Körpersprache, dein Blick und deine Ausstrahlung ziehen Menschen magisch an. Dein Problem ist niemals, Dates zu finden – sondern die ganzen wandelnden Red Flags wieder loszuwerden.',
    datingCallout:
      'Dein Barista merkt sich deine Hafermilch-Bestellung nach einem Mal; dein Hinge-Match plant nach zwei Drinks die Verlobung.',
  },
  YEOKMA: {
    id: 'YEOKMA',
    name: 'Yeokma-Vibe',
    korean: '역마살 (Wanderlust Star)',
    hanja: '驛馬煞',
    emoji: '✈️',
    title: 'Die ruhelose Nomaden-Seele',
    headline: 'Chronisches Fernweh & allergisch gegen 9-to-5-Routine',
    tagline: 'Kann nicht länger als 3 Monate in derselben WG bleiben, ohne Fluchtpläne zu schmieden.',
    description:
      'Yeokma ist der koreanische Wanderer-Stern. Stillstand fühlt sich für dich an wie Ersticken. Du liebst Spontan-Trips mit Handgepäck, buchst Flüge um 2 Uhr nachts und bist im Mädelskreis immer die Erste, die vorschlägt: „Lass uns einfach nach Lissabon abhauen!“. Routine und Bequemlichkeit machen dir Panik.',
    datingCallout:
      'Lange Situationships ohne gemeinsame Abenteuer langweilen dich zu Tode. Wer dich einengen will, sieht nur noch Staub.',
  },
  HWAGAE: {
    id: 'HWAGAE',
    name: 'Hwagae-Spirit',
    korean: '화개살 (Artsy Mystic)',
    hanja: '華蓋煞',
    emoji: '🎨',
    title: 'Die tiefsinnige Ästhetin & Altbau-Poetin',
    headline: 'Vintage-Vibes, kreative Melancholie & heilige Me-Time',
    tagline: 'Liebt Regen, Pinterest-Moodboards und 48 Stunden soziale Unerreichbarkeit.',
    description:
      'Hwagae ist die „prächtige Haube“ der Kunst und Spiritualität. Du besitzt eine betörende, geheimnisvolle Aura, liebst Indie-Musik, alte Bücher und tiefe Gedanken. Du brauchst Tage des totalen Rückzugs, um deine Batterien aufzuladen – oberflächliche Partys laugen dich aus.',
    datingCallout:
      'Smalltalk über das Wetter törnt dich ab. Du brauchst um 3 Uhr morgens Deep Talks über Seelenverwandtschaft, Universum und Kindheitstraumata.',
  },
};

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
    title: 'Die unerschütterliche Alpha-Planerin & Mom-Friend',
    tagline: '„Ich habe keinen Kontrollzwang, ihr seid nur alle inkompetent.“',
    description: [
      'Wie eine 300 Jahre alte Eiche stehst du unerschütterlich im Leben. Du bist die geborene Anführerin der Mädelsgruppe: Wer den Wochenendtrip bucht, die Reservierung im Trend-Restaurant sichert und den Uber teilt, ist sonnenklar – du.',
      'Dein Gerechtigkeitssinn ist legendär. Wenn im Club jemand deine Freundin dumm anmacht oder ein Typ dreiste Spielchen treibt, bist du binnen 2 Sekunden an der Front und zerlegst ihn mit juristischer Präzision.',
      'Nachgeben oder sich entschuldigen? Fast unmöglich. Du bist stur wie Granit, hast aber das loyalste Herz der Welt: Für deine Mädels gehst du ohne Zögern durchs Feuer.',
    ],
    strengths: [
      'Organisiert Gruppenreisen in 15 Minuten per Excel-Tabelle',
      'Absolute, bedingungslose Loyalität für beste Freundinnen',
      'Furchtloser Beschützerinstinkt gegen toxische Typen',
      'Bringt jedes Mammutprojekt knallhart zu Ende',
    ],
    weaknesses: [
      'Kann niemals zugeben, dass sie sich geirrt hat',
      'Passive Aggressivität, wenn jemand den Zeitplan um 5 Minuten verfehlt',
      'Nimmt alles persönlich und schaltet sofort in den Boss-Modus',
    ],
    germanArchetype: 'Die Mädelsgruppen-Anführerin mit Google-Calendar-Sucht & Notion-Plan',
    luckyItem: 'Iced Americano & durchgetakteter Notion-Wochenplaner',
    luckyFood: 'Smashed Burger & Truffle Fries nach einem 12-Stunden-Power-Tag',
    careerHint: 'Creative Director, Start-up-Founderin, Projektleiterin oder Event-Chefin.',
    loveHint:
      'Braucht einen geduldigen Golden-Retriever-Typen, der ihr nicht widerspricht, sondern Snacks bringt und ihr den Rücken freihält.',
    quote: '„Wer bis 14 Uhr nicht geantwortet hat, fliegt aus der Urlaubsplanung.“',
    toxicTrait:
      'Macht aus einer simplen Meinungsverschiedenheit eine 45-minütige Grundsatzdebatte über gegenseitigen Respekt.',
    deluluScore: 25,
    whatsAppSignature:
      '„Mädels, ich habe den Tisch reserviert. Wer zu spät kommt, zahlt die erste Runde.“',
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
    symbol: 'Rankender Efeu / Sanfter Bambus',
    title: 'Die zuckersüße People-Pleaserin mit geheimer Weltherrschafts-Agenda',
    tagline: '„Ich weine kurz auf dem Klo, aber am Ende bekomme ich genau das, was ich will.“',
    description: [
      'Während Gap der starre Baum ist, bist du der smarte Efeu, der sich elegant um jeden Finger wickelt. Du wirkst sanft, süß und verständnisvoll, hast aber heimlich alle Fäden in der Hand.',
      'Dein soziales Gespür ist unheimlich: Du kennst jede Barkeeperin, jeden DJ und die Lebensgeschichte des Baristas. Jeder liebt dich, weil du aktiv zuhörst und das beste Pinterest-Gespür für Ästhetik hast.',
      'Dein größtes Laster ist die People-Pleaser-Falle. Du sagst zu drei Verabredungen am selben Abend zu, weil du niemanden verletzen willst – und liegst am Ende mit sozialer Überdosis im Bett.',
    ],
    strengths: [
      'Meisterin der Diplomatie und emotionalen Intelligenz',
      'Macht jede WG-Küche in 10 Minuten zum gemütlichen Pinterest-Traum',
      'Unverwüstliche Anpassungsfähigkeit an jeden Vibe',
      'Merkt sich jedes noch so kleine Detail über Menschen',
    ],
    weaknesses: [
      'Kann physisch nicht „Nein“ sagen',
      'Erfindet die wildesten Ausreden, um Verabredungen abzusagen',
      'Braucht alle 20 Minuten Bestätigung von außen',
    ],
    germanArchetype: 'Das süße Indie-Girl mit Pinterest-Traum-Wohnung & Zusage-Panik',
    luckyItem: 'Iced Oat Vanilla Matcha Latte & Noise-Cancelling-Kopfhörer',
    luckyFood: 'Avocado-Sourdough-Brot mit pochiertem Ei & Chili-Flakes',
    careerHint: 'Influencer-Marketing, Stylistin, Psychologin, PR-Agentur oder Interior Design.',
    loveHint:
      'Braucht jemanden mit klaren Kanten und stabiler Schulter, an den man sich sicher anlehnen kann.',
    quote: '„Klar kann ich helfen! (Hilfe, warum habe ich schon wieder Ja gesagt?)“',
    toxicTrait:
      'Sagt 30 Minuten vor dem Treffen mit einer absurden Ausrede ab, weil ihre soziale Batterie leer ist.',
    deluluScore: 65,
    whatsAppSignature: '„Omg sorry girl, mein Handy war den ganzen Tag auf Nicht-Stören!! 🥺🥺“',
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
    title: 'Die unzensierte Rampensau mit Main Character Energy & Zero Filter',
    tagline: '„Warum leise leiden, wenn man laut und dramatisch sein kann?“',
    description: [
      'Was du fühlst, steht dir binnen 0,1 Sekunden im Gesicht geschrieben. Du bist die strahlende Sonne im koreanischen Sazu: extrovertiert, leidenschaftlich, warmherzig und völlig unfähig, ein Geheimnis für dich zu behalten.',
      'Du betrittst den Raum und die Party beginnt. Du schließt auf dem Clubklo binnen 5 Minuten Freundschaft fürs Leben mit wildfremden Mädels und erzählst ihnen deine tiefsten Beziehungstraumata.',
      'Null Impulskontrolle ist dein Markenzeichen. Wenn dir nachts um 3 eine verrückte Idee kommt, schreibst du allen in Großbuchstaben – und wunderst dich am nächsten Morgen über das emotionale Chaos.',
    ],
    strengths: [
      'Macht aus einem tristen Dienstagabend eine unvergessliche Nacht',
      'Herzenswarme Großzügigkeit – teilt Drinks, Make-up und Liebe',
      'Mitreißende Begeisterung für alles Neue',
      'Absolute Ehrlichkeit ohne falsche Fassaden',
    ],
    weaknesses: [
      'Redet 100 Wörter pro Minute, bevor das Gehirn eingeschaltet ist',
      'Konzentrationsspanne eines Goldfischs bei langweiligen Aufgaben',
      'Akute Gefahr von impulsivem Texting an den toxischen Ex',
    ],
    germanArchetype: 'Die Clubklo-Therapeutin, die jedem Fremden Komplimente macht',
    luckyItem: 'Aperol Spritz & feuchtigkeitsspendender Lipgloss zum Nachziehen',
    luckyFood: 'Späti-Tacos, Pommes Schranke nachts um 4 & scharfes K-Streetfood',
    careerHint: 'Event-Host, Podcast-Hostess, TikTok-Creatorin, PR-Queen, Moderatorin.',
    loveHint:
      'Braucht jemanden, der ihre Flamme feiert, aber rechtzeitig ein Glas Wasser reicht, bevor die Bude brennt.',
    quote: '„Mädels, ich habe eine absolut fürchterliche Idee – wer kommt mit?“',
    toxicTrait:
      'Schreibt nachts um 4 Uhr mit 3 Promille „Ich vermiss dich“ an die größte Red Flag der Stadt.',
    deluluScore: 85,
    whatsAppSignature:
      '„HÖRT EUCH BITTE DIESE 7-MINÜTIGE SPRACHNACHRICHT AN ICH KANN NICHT MEHR 💀😭“',
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
    title: 'Die emotionale FBI-Agentin mit Deep-Talk-Obsession & Insta-Stalking-Diplom',
    tagline: '„Sag mir nicht, dass alles okay ist – ich weiß bereits, was du gestern getan hast.“',
    description: [
      'Du bist nicht das grelle Scheinwerferlicht, sondern das gemütliche Kaminfeuer bei Kerzenschein. Nach außen wirkst du ruhig, höflich und zurückhaltend, doch innerlich bist du eine wandelnde Analysemaschine.',
      'Dein Gespür für Lügen grenzt an Hellseherei. Wenn ein Typ sich seltsam verhält, hast du innerhalb von 15 Minuten sein gesamtes Umfeld bis zur Cousine zweiten Grades auf Social Media recherchiert.',
      'Wenn du liebst, liebst du mit jeder Faser deines Herzens. Aber wehe dem, der dein Vertrauen missbraucht: Deine Kälte danach ist tödlicher als jede Waffe, und du vergisst nichts bis ins Jahr 2045.',
    ],
    strengths: [
      'Unfehlbare Intuition und psychologischer Röntgenblick',
      'Tiefgründigste Vertraute für nächtliche Seelenkrisen',
      'Unendliche Hingabe für Herzensmenschen',
      'Scharfsinnige Menschenkenntnis',
    ],
    weaknesses: [
      'Nachtragend bis zur Ewigkeit',
      'Chronisches Overthinking wegen eines fehlenden Emojis in einer SMS',
      'Verschließt sich hermetisch bei kleinster Kränkung',
    ],
    germanArchetype: 'Die True-Crime-Süchtige, die dein Horoskop vor dem ersten Date stalkt',
    luckyItem: 'Handgegossene Duftkerze mit Feigen-Note & Ledertagebuch',
    luckyFood: 'Heißer Masala Chai & frische Zimtschnecken an Regentagen',
    careerHint: 'Psychotherapeutin, Investigativ-Journalistin, Profilerin, Drehbuchautorin.',
    loveHint:
      'Sucht diese eine seelenerschütternde Liebe – oberflächliche Hinge-Dates sind für sie Folter.',
    quote: '„Ich bin nicht paranoid oder eifersüchtig. Ich bin investigativ begabt.“',
    toxicTrait:
      'Analysiert 4 Stunden lang, warum er seinen Satz mit einem Punkt statt einem Smiley beendet hat.',
    deluluScore: 70,
    whatsAppSignature: '„Mädels, setzt euch hin. Ich habe Screenshots, die alles beweisen.“',
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
    title: 'Die stoische Sofa-Queen mit gewichteter Decke & Komfortzonen-Abo',
    tagline: '„Ich liebe euch alle über alles, aber mein Bett liebt mich einfach mehr.“',
    description: [
      'Du bist die Zugspitze unter den Menschen: Völlig unbeeindruckt von Trends, Hektik oder sinnlosem Drama. Während um dich herum alle den Verstand verlieren, bleibst du stoisch sitzen und isst deine Nudeln.',
      'Für deine Freundinnen bist du der verlässlichste Fels in der Brandung. Du plauderst niemals Geheimnisse aus und gibst den geerdetsten Rat. Wenn du dein Wort gibst, steht das felsenfest.',
      'Dich allerdings sonntags aus deiner Wohnung zu locken, erfordert die diplomatische Intervention der Vereinten Nationen. Spontane Pläne hasst du wie die Pest – du brauchst 3 Werktage Vorankündigung.',
    ],
    strengths: [
      'Unerschütterliche emotionale Stabilität im größten Chaos',
      'Die verschwiegenste und loyalste Freundin im Universum',
      'Absolut immun gegen toxische Moden und Party-Hektik',
      'Praktische Problemlöserin ohne Drama',
    ],
    weaknesses: [
      'Trägheit wie ein tonnenschwerer Granitblock',
      'Zeigt Gefühle oft erst nach 6 Monaten Bedenkzeit',
      'Hofft bei jeder Einladung heimlich, dass der andere absagt',
    ],
    germanArchetype: 'Die gemütliche Homebody-Queen mit gewichteter Decke & Komfort-Serien',
    luckyItem: 'Kuschelige 7kg-Gewichtsdecke & Noise-Cancelling-Kopfhörer',
    luckyFood: 'Große Schüssel Trüffel-Pasta oder cremiges Mac and Cheese',
    careerHint: 'Finanzstrategin, Architektin, Head of People, IT-Projektmanagement.',
    loveHint:
      'Braucht keinen Nervenkitzel, sondern Verlässlichkeit, Gemütlichkeit und gemeinsames Schweigen auf der Couch.',
    quote: '„Ich bin schon im Schlafanzug – das Thema Ausgehen ist für heute biologisch beendet.“',
    toxicTrait:
      'Ghostet den Gruppenchat für 48 Stunden, weil sie auf der Couch einen Serien-Marathon durchzieht.',
    deluluScore: 15,
    whatsAppSignature:
      '„Können wir das Treffen zu mir verlegen? Ich will meine Jogginghose nicht ausziehen.“',
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
    title: 'Die „Mama der Mädelsgruppe“ mit Notfall-Snacks & Kontrollzwang aus Liebe',
    tagline: '„Hast du heute schon genug Wasser getrunken und warum antwortest du ihm überhaupt noch?“',
    description: [
      'Du bist der nährende Gartenboden, auf dem jede Freundschaft erblüht. In deiner Canvas-Tote-Bag befinden sich zu jedem Zeitpunkt: Blasenpflaster, Kaugummi, Handdesinfektion, Paracetamol und zwei Müsliriegel.',
      'Du sorgst dafür, dass niemand betrunken verloren geht, teilst die Taxikosten gerecht auf und kochst die beste Tröst-Suppe bei Liebeskummer. Du bist warm, empathisch und pragmatisch.',
      'Weil du dich um das Seelenheil aller anderen kümmerst, saugst du deren Sorgen auf wie ein Schwamm. Am Ende liegst du mit Herzrasen wach, weil du über die Probleme von Leuten nachgrübelst, die selbst schon tief schlafen.',
    ],
    strengths: [
      'Beispiellose Fürsorge und Wärme für Freundinnen',
      'Detailverliebtes Organisationstalent für gemütliche Runden',
      'Hört immer zu und merkt sich jeden Geburtstag und jede Allergie',
      'Schlichtet jeden Streit mit hausgemachtem Gebäck',
    ],
    weaknesses: [
      'Kann physisch keine emotionalen Grenzen ziehen',
      'Nimmt die Probleme aller Freundinnen mit ins eigene Bett',
      'Heimlicher Kontrollzwang, verpackt als Fürsorge',
    ],
    germanArchetype: 'Die fürsorgliche Mädels-Mama mit Notfall-Apotheke in der Canvas-Tote-Bag',
    luckyItem: 'Canvas-Tote-Bag gefüllt mit Notfall-Snacks & Lippenbalsam',
    luckyFood: 'Frisch gebackenes Bananenbrot & warmer Hafer-Porridge',
    careerHint: 'Pädagogin, HR-Managerin, Ernährungsberaterin, Community-Chefin.',
    loveHint:
      'Braucht dringend einen Partner, der auch mal SIE bekocht und ihr die mentale Last abnimmt.',
    quote: '„Schreibt mir bitte alle in die Gruppe, sobald ihr zu Hause in eurem Bett liegt!!“',
    toxicTrait:
      'Macht sich mehr Sorgen um das Leben ihrer Freundin als die Freundin selbst und gibt ungefragt Lebensratschläge.',
    deluluScore: 40,
    whatsAppSignature:
      '„Girl, schick mir seinen Live-Standort für das erste Date, nur zur Sicherheit!!“',
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
    symbol: 'Schwert aus bestem Solinger Stahl',
    title: 'Die kompromisslose Girlboss mit eingebautem Bullshit-Detektor',
    tagline: '„Ich bin nicht gemein, ich bin nur ehrlich. Willst du Mitleid oder willst du die Wahrheit?“',
    description: [
      'Du bist das scharfe Samuraischwert im koreanischen Sazu. Höflichkeitsfloskeln, zögerliche Typen und scheinheiliges Getue lösen bei dir körperliche Schmerzen aus. Du sagst immer genau das, was alle heimlich denken.',
      'Wer dich zur besten Freundin hat, hat eine Leibwächterin fürs Leben. Wenn jemand deiner Freundin das Herz bricht, musst du aktiv davon abgehalten werden, sein Auto mit Schlüsseln zu verzieren.',
      'Deine Kanten sind scharf wie Rasierklingen. Du meinst es gut, aber deine schonungslose Direktheit überfordert sensiblere Gemüter. Du hast panische Angst davor, Schwäche oder eigene Verletzlichkeit zu zeigen.',
    ],
    strengths: [
      'Schneidet toxische Menschen ohne mit der Wimper zu zucken aus ihrem Leben',
      'Furchtloser Schutzinstinkt für den engsten Zirkel',
      'Kriegt jeden Job, jede Gehaltserhöhung und jede Wohnung durch Entschlossenheit',
      'Null falsches Gehabe – 100% Authentizität',
    ],
    weaknesses: [
      'Empathie-Filter manchmal komplett ausgeschaltet',
      'Verwechselt Schroffheit gelegentlich mit Charakterstärke',
      'Stößt Menschen weg, sobald es emotional zu intim wird',
    ],
    germanArchetype: 'Die toughe Freundin, die deinen Ex zur Schnecke macht, wenn er dir wehtut',
    luckyItem: 'Mattschwarzer Oversized-Lederblazer & eiskalter Espresso Tonic',
    luckyFood: 'Crispy Dumplings mit Chili-Öl & kühles Späti-Bier',
    careerHint: 'Unternehmensberaterin, Verhandlungsführerin, Strafverteidigerin, Tech-Lead.',
    loveHint:
      'Braucht einen Partner mit starkem Rückgrat auf absoluter Augenhöhe – Ja-Sager langweilen sie zu Tode.',
    quote: '„Entweder du blockierst ihn jetzt vor meinen Augen, oder ich rede heute nicht mehr mit dir.“',
    toxicTrait:
      'Macht aus jeder Bitte um emotionale Zuwendung eine Analyse über mangelnde Selbstdisziplin.',
    deluluScore: 10,
    whatsAppSignature: '„Schluss mit Heulen. Zieh dir was Nettes an, wir gehen jetzt raus.“',
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
    title: 'Die Clean-Girl Ästhetin & High-Maintenance Zynikerin mit Skalpell-Zunge',
    tagline: '„Mein Geschmack ist nicht teuer, er ist einfach makellos. Eure Standards sind nur zu niedrig.“',
    description: [
      'Während Gyeong das rohe Schwert ist, bist du der funkelnde Diamant oder das feinste Schmuckstück. Dein Geschmack ist erlesen, dein Style sitzt perfekt und du bemerkst sofort, wenn jemand die falsche Sockenfarbe trägt.',
      'Dein Humor ist gestochen scharf: Deine ironischen One-Liner sind gefürchtet und legendär. Du verabscheust Schlampigkeit, billige Ausreden und Männer, die ihre Schuhe nicht putzen.',
      'Hinter deiner perfekt kuratierten Fassade verbirgt sich eine hochsensible Seele. Ein Diamant verzeiht keine Kratzer: Wer dich einmal öffentlich blamiert oder respektlos behandelt, wird mit eisiger Verachtung gestraft.',
    ],
    strengths: [
      'Makelloses Stilgefühl und Trend-Gespür (Pinterest-Ästhetik in Perfektion)',
      'Gestochen scharfer, pointierter Witz',
      'Gibt sich niemals mit Mittelmaß zufrieden',
      'Beste Ratgeberin in Sachen Mode, Beauty und Lebensstil',
    ],
    weaknesses: [
      'Hyper-kritisch mit sich selbst und allen anderen',
      'Extrem empfindlich bei kleinsten Kränkungen',
      'Neigt zu zynischer Arroganz als Schutzschild',
    ],
    germanArchetype: 'Die Pinterest-Fashionista mit 12-Schritte-Skincare & 10/10 Wardrobe',
    luckyItem: 'Designer-Sonnenbrille, Lip Oil & feiner Goldschmuck',
    luckyFood: 'Sushi Omakase & ein Glas gekühlter Champagner oder Naturwein',
    careerHint: 'Creative Director Fashion, Luxusgüter-Branding, Ästhetische Medizin, Kunstkuratorin.',
    loveHint:
      'Braucht jemanden mit Stil, Bildung und tadellosen Manieren – schlechte Schuhe sind sofortiger Trennungsgrund.',
    quote: '„Es ist keine Arroganz, wenn es nun mal der Wahrheit entspricht.“',
    toxicTrait:
      'Schreibt Dates sofort ab und blockiert sie, weil sie die falsche Emoji-Kombination benutzt haben.',
    deluluScore: 50,
    whatsAppSignature:
      '„Girl, der Typ trägt Sneaker mit weißen Tennissocken zum Anzug... Bitte sag mir, dass du das nicht ernst meinst.“',
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
    title: 'Die unberechenbare Nomaden-Königin mit chronischer Bindungsangst',
    tagline: '„Ich melde mich nicht, weil ich dich hasse, sondern weil ich gerade mein Leben neu erfinde.“',
    description: [
      'Du bist der endlose Ozean im koreanischen Sazu: tiefsinnig, geheimnisvoll, hochintelligent und niemals dauerhaft einzudämmen. Du denkst in weltweiten Maßstäben und hast immer mindestens ein Flugticket gebucht.',
      'Routine ist für dich die Vorstufe zum Tod. Wenn eine Beziehung oder ein Job zu vorhersehbar wird, packt dich die Panik und du willst sofort nach Lissabon oder Bali auswandern.',
      'Man kann mit dir die faszinierendsten Nächte durchtanzen und über das Universum philosophieren. Doch sobald jemand fragt: „Was sind wir eigentlich?“, schaltet dein Fluchtreflex auf 100% und du tauchst für Tage ab.',
    ],
    strengths: [
      'Faszinierender Horizont und kosmopolitischer Charme',
      'Grenzenlose Spontaneität – mit ihr wird kein Wochenende langweilig',
      'Tiefgründige Weisheit und philosophischer Geist',
      'Lässt anderen alle Freiheiten der Welt',
    ],
    weaknesses: [
      'Ghosting-Reflex, sobald Gefühle zu verbindlich werden',
      'Schwer fassbare, wechselhafte Launen',
      'Vergesslich bei bürokratischen Alltagspflichten',
    ],
    germanArchetype: 'Das Backpacker-Girl mit analoger Leica-Kamera & ständigem Fernweh',
    luckyItem: 'Reisepass mit vielen Stempeln & Vintage-Sonnenbrille vom Flohmarkt',
    luckyFood: 'Frische Austern, scharfe Ramen oder Streetfood irgendwo in Südostasien',
    careerHint: 'Reisejournalistin, Techno-DJane, Philosophin, Trendscout, Freelance-Kreative.',
    loveHint:
      'Braucht einen Partner, der niemals klammert, sondern gemeinsam mit ihr in unbekannte Gewässer segelt.',
    quote: '„Lass uns spontan wegfahren. Nein, nicht nächsten Monat. Heute Nacht.“',
    toxicTrait:
      'Taucht für eine Woche ab und meldet sich dann mit einem Foto vom Strand in Portugal, als wäre nichts gewesen.',
    deluluScore: 60,
    whatsAppSignature: '„Hey sorry, war kurz im Off-Grid-Modus! Was ging die letzten 5 Tage bei dir?“',
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
    title: 'Die mystische Delulu-Queen & hochsensible Traumtänzerin',
    tagline: '„Ich habe geträumt, dass du gemein zu mir warst, also rede ich heute nicht mit dir.“',
    description: [
      'Du bist wie der sanfte Morgentau auf Rosenblättern: mystisch, unfassbar feinfühlig und mit einer telepathischen Antenne für Schwingungen gesegnet. Du spürst sofort, wenn in der Mädelsgruppe schlechte Stimmung herrscht.',
      'Du lebst zu 70% in deiner eigenen bunten Fantasiewelt. Wenn dir ein Typ beim zweiten Date die Wagentür aufhält, hast du im Kopf bereits die Dekoration für eure Sommerhochzeit in der Toskana geplant.',
      'Lautes Gehabe und raue Konflikte erträgst du nicht. Wenn dir jemand wehtut, ziehst du dich beleidigt zurück und schmolkst stundenlang, bis der andere errät, was er falsch gemacht hat.',
    ],
    strengths: [
      'Bezaubernde Empathie und seelenwarme Sanftheit',
      'Kreative und poetische Ader mit tiefem Musikgeschmack',
      'Spürt Gefühle anderer, bevor diese sie selbst verstehen',
      'Bringt Magie und Romantik in die nüchternste Welt',
    ],
    weaknesses: [
      'Verliert sich komplett in emotionalen Illusionen (Delulu-Gefahr 100%)',
      'Passiv-aggressives Schmollen statt offener Aussprache',
      'Nimmt die banalsten Dinge persönlich',
    ],
    germanArchetype: 'Die mystische Altbau-Freundin mit Tarot-Karten & emotionalem Schleudergang',
    luckyItem: 'Tarot-Kartendeck, Amethyst-Kristall & Kopfhörer für melancholische Playlists',
    luckyFood: 'Iced Matcha Latte, vegane Zimtschnecke & wärmende Miso-Suppe',
    careerHint: 'Astrologin, Kunsttherapeutin, Lyrikerin, Creative Copywriter, Musikmanagement.',
    loveHint:
      'Braucht einen sanften, liebevollen Beschützer, der ihre Träume ernst nimmt und sie niemals auslacht.',
    quote: '„Ich spüre eine komische Energie zwischen uns... hast du dein Karma heute schon gecheckt?“',
    toxicTrait:
      'Verliebt sich Hals über Kopf in Typen, die nur „Haha hey“ schreiben, und ignoriert 17 rote Flaggen gleichzeitig.',
    deluluScore: 95,
    whatsAppSignature:
      '„Mädels... ich glaube, er ist wirklich mein Seelenverwandter. Er hat dieselbe Augenfarbe wie mein Hund!! 🥺✨“',
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
  flirtScore: number;
  stabilityScore: number;
  toxicScore: number;
  memeVerdict: string;
}

// Key format: `${Stem1}_${Stem2}`
export const SPECIAL_COMPATIBILITY: Record<string, CompatibilityMatrixItem> = {
  // --- CHEONGAN HAP (Himmlische Verschmelzung) ---
  GAP_GI: {
    score: 97,
    badge: 'Himmlisches Traumpaar 🌟',
    relationshipType: 'Himmlische Verschmelzung (Gap-Gi-Hap / 갑기합)',
    verdict: 'Der mächtige Baum wurzelt im besten Mutterboden. Harmonie pur!',
    description:
      'Eine der heiligsten Verbindungen im Sazu. Gap bringt die große Vision, das Selbstbewusstsein und plant die Zukunft, während Gi die Geborgenheit, emotionale Wärme und Ordnung schenkt. Ihr ergänzt einander so mühelos, dass selbst Nachbarn neidisch werden.',
    dailyLifeTip:
      'Gi sollte Gap hin und wieder sanft einbremsen, Gap muss Gis liebevolle Fürsorge ausdrücklich und regelmäßig loben.',
    conflictTrigger:
      'Wer räumt die Pfandflaschen weg und warum hat Gap schon wieder ohne vorherige Absprache Pläne fürs gesamte Wochenende geschmiedet.',
    greenFlag:
      'Merkt sich ohne Notizen deine Hafermilch-Marke und bucht den Tisch im Trend-Restaurant ungefragt.',
    redFlag:
      'Wird extrem defensiv und passiv-aggressiv, wenn man seine feste Abendroutine um 10 Minuten verschiebt.',
    flirtScore: 88,
    stabilityScore: 98,
    toxicScore: 12,
    memeVerdict:
      '„Schick das deiner Freundin, die endlich jemanden gefunden hat, der all ihre Neurosen liebevoll erträgt.“',
  },

  EUL_GYEONG: {
    score: 96,
    badge: 'Stahlharte Romantik ⚔️🌿',
    relationshipType: 'Himmlische Verschmelzung (Eul-Gyeong-Hap / 을경합)',
    verdict: 'Die Schöne und das Schwert: Aus Schroffheit wird pure Hingabe.',
    description:
      'Gyeong ist die toughe Person mit scharfen Kanten, Eul die charmante Schlingpflanze, die das harte Herz im Sturm erobert. Eul bändigt Gyeongs Ruppigkeit, während Gyeong für Eul eine unüberwindbare Schutzmauer gegen toxische Menschen baut.',
    dailyLifeTip:
      'Gyeong sollte Kritik sanft dosieren; Eul darf Gyeongs direkte Art niemals als Liebesentzug deuten.',
    conflictTrigger:
      'Gyeong kritisiert Euls Outfit vor Freunden; Eul schmollt daraufhin drei Tage lang mit eisiger WhatsApp-Funkstille.',
    greenFlag:
      'Baut eine uneinnehmbare Schutzmauer gegen toxische Bekannte auf und stärkt dir bedingungslos den Rücken.',
    redFlag:
      'Kritisiert deine Lebensentscheidungen mit der emotionalen Kälte und Strenge eines Steuerprüfers.',
    flirtScore: 94,
    stabilityScore: 89,
    toxicScore: 32,
    memeVerdict:
      '„Die süße People-Pleaserin zähmt die unnahbare Girlboss / den Bad Boy. Funktioniert besser als jede Therapie.“',
  },

  BYEONG_SIN: {
    score: 98,
    badge: 'Kosmischer Glanz ✨',
    relationshipType: 'Himmlische Verschmelzung (Byeong-Sin-Hap / 병신합)',
    verdict: 'Die Sonne bringt den Diamanten zum Funkeln. Pure Eleganz & Leidenschaft!',
    description:
      'Byeong strahlt voller Herzenswärme und Main Character Energy, Sin glänzt mit Stil, Perfektion und High-Maintenance-Flair. Zusammen seid ihr das absolute Vorzeigepaar auf jeder Party und im Feed. Was der eine an Feuer hat, veredelt der andere zu purem Gold.',
    dailyLifeTip:
      'Lasst euch gegenseitig die Bühne, statt darum zu konkurrieren, wer heute der strahlendere Star ist.',
    conflictTrigger:
      'Wer von beiden auf der Party mehr Aufmerksamkeit bekommt und wer das gemeinsame Foto auf Instagram zuerst posten darf.',
    greenFlag:
      'Macht dich auf jedem Event zum Star und filmt 45 TikToks von dir, bis der Kamerawinkel perfekt sitzt.',
    redFlag:
      'Passive Aggressivität auf WhatsApp („Passt schon.“), wenn du nicht binnen 3 Minuten auf eine Story reagierst.',
    flirtScore: 99,
    stabilityScore: 82,
    toxicScore: 42,
    memeVerdict:
      '„Instagram-Power-Couple des Jahres: Main Character Energy trifft High-Maintenance Clean Girl Aesthetic.“',
  },

  JEONG_IM: {
    score: 97,
    badge: 'Magische Anziehung 🌊🕯️',
    relationshipType: 'Himmlische Verschmelzung (Jeong-Im-Hap / 정임합)',
    verdict: 'Kaminfeuer spiegelt sich im Ozean. Tiefer als jede Philosophie!',
    description:
      'Im bringt den weiten Horizont und die Freiheit, Jeong die intime Wärme und emotionale Tiefe. Hinter verschlossenen Türen herrscht zwischen euch eine fast telepathische Verbindung voller Magie und unwiderstehlicher sexueller Spannung.',
    dailyLifeTip:
      'Verliert euch nicht im emotionalen Kopfkino – geht zusammen raus an die frische Luft und holt euch ein Eis.',
    conflictTrigger:
      'Wenn Im plötzlich für 48 Stunden ohne Lebenszeichen abtaucht und Jeong das ganz große Stalking-Kopfkino startet.',
    greenFlag:
      'Deep Talk in der WG-Küche um 3 Uhr morgens mit echten, tränenreichen und heilsamen Seeleneinblicken.',
    redFlag:
      'Ghosting-Reflex: Taucht plötzlich für 3 Tage ab, sobald die Gefühle zu intensiv und verbindlich werden.',
    flirtScore: 99,
    stabilityScore: 72,
    toxicScore: 78,
    memeVerdict:
      '„Toxische Soulmates: Die emotionale FBI-Stalkerin trifft die Königin der Bindungsangst. Fatal attraction!“',
  },

  MU_GYE: {
    score: 96,
    badge: 'Lebendige Oase ⛰️🌧️',
    relationshipType: 'Himmlische Verschmelzung (Mu-Gye-Hap / 무계합)',
    verdict: 'Frühlingsregen küsst den stolzen Berg. Hier blüht das pure Leben auf.',
    description:
      'Der unbewegliche Fels Mu bekommt durch das feinfühlige Wasser Gye Frische, Fantasie und Leben eingehaucht. Mu schenkt Gye den sicheren, gemütlichen Hafen, den Gye in der rauen Welt so verzweifelt sucht.',
    dailyLifeTip:
      'Mu sollte Gefühle öfter aktiv aussprechen; Gye darf Mus Schweigen niemals als Desinteresse werten.',
    conflictTrigger:
      'Mu weigert sich sonntags aufzustehen, während Gye weint, weil Mu in ihrem Traum gemein zu ihr war.',
    greenFlag:
      'Der stoische Fels in der Brandung, wenn bei dir die ganze Welt im emotionalen Chaos versinkt.',
    redFlag:
      'Verweigert sonntags jede Spontaneität und braucht 3 Tage Vorwarnung für ein Treffen im Café.',
    flirtScore: 86,
    stabilityScore: 96,
    toxicScore: 18,
    memeVerdict:
      '„Die gemütliche Sofa-Queen rettet die Delulu-Freundin vor dem nächsten emotionalen Nervenzusammenbruch.“',
  },

  // --- CHEONGAN CHUNG (Himmlische Reibung / Clash) ---
  GAP_GYEONG: {
    score: 45,
    badge: 'Ego-Kollision 💥',
    relationshipType: 'Elementare Kollision (Gap-Gyeong-Chung / 갑경충)',
    verdict: 'Axt trifft auf Mammutbaum. Er wird dich in den Wahnsinn treiben, aber die Chemie brennt!',
    description:
      'Zwei geborene Alpha-Leader prallen frontal aufeinander. Keiner gibt auch nur einen Millimeter nach. Ihr könnt zusammen Konzerne gründen oder die Welt erobern – privat braucht ihr getrennte Schlafzimmer und feste Redezeit-Limits.',
    dailyLifeTip:
      'Führt bei Diskussionen eine Stoppuhr ein, sonst endet jeder Plan vor dem UN-Sicherheitsrat.',
    conflictTrigger:
      'Wer recht hat bei der Frage, welcher Weg laut Google Maps um 30 Sekunden schneller gewesen wäre.',
    greenFlag:
      'Unglaubliches Power-Couple bei Großprojekten – ihr kriegt gemeinsam jede Krise gelöst.',
    redFlag:
      'Macht aus der Frage, wer den Müll falsch sortiert hat, eine zweistündige Grundsatzdebatte.',
    flirtScore: 92,
    stabilityScore: 24,
    toxicScore: 94,
    memeVerdict:
      '„Zwei Wochen Love Bombing, 6 Monate Situationship und 3 Wochen stummer WhatsApp-Krieg.“',
  },

  EUL_SIN: {
    score: 42,
    badge: 'Designer-Rosenkrieg ✂️🥀',
    relationshipType: 'Elementare Kollision (Eul-Sin-Chung / 을신충)',
    verdict: 'Die Heckenschere stutzt die Orchidee. Dramatischer als der Bachelor!',
    description:
      'Sins spitze Zunge und High-Maintenance-Zynismus treffen genau die empfindlichsten Nerven von Eul. Eul reagiert mit passiver Verweigerung und Schmollen, was Sin noch sarkastischer macht. Hier braucht es Tonnen von Reife.',
    dailyLifeTip:
      'Sin muss den inneren Kritiker ausschalten; Eul sollte Grenzen sofort und laut benennen.',
    conflictTrigger:
      'Ein scheinbar beiläufiger zynischer Kommentar über das Outfit oder die Frisur der anderen.',
    greenFlag:
      'Modisch und ästhetisch das mit großem Abstand bestangezogene Duo im gesamten Freundeskreis.',
    redFlag:
      'Zynischer Witz trifft den wunden Punkt – danach tagelange eisige Funkstille im Chat.',
    flirtScore: 78,
    stabilityScore: 32,
    toxicScore: 91,
    memeVerdict:
      '„Schick das deiner Freundin, die sich immer wieder in Typen mit messerscharfer Skalpell-Zunge verliebt.“',
  },

  BYEONG_IM: {
    score: 48,
    badge: 'Sonne gegen Tsunami 🌊☀️',
    relationshipType: 'Elementare Kollision (Byeong-Im-Chung / 병임충)',
    verdict: 'Mittagssonne gegen Tsunami. Großes Drama, wilde Leidenschaft, aber anstrengend!',
    description:
      'Beide sind ungeheure Naturgewalten. Byeong will alles sofort und offen herausposaunen, Im plant im Verborgenen und haut plötzlich spontan ab. Wenn die Wogen sich glätten, fasziniert ihr euch maßlos.',
    dailyLifeTip:
      'Macht getrennte Urlaube oder vereinbart Tage, an denen einer das uneingeschränkte Kommando hat.',
    conflictTrigger:
      'Byeong lädt spontan 8 fremde Mädels aus dem Club ein, während Im seine Ruhe brauchte und abtaucht.',
    greenFlag:
      'Jedes Date fühlt sich an wie ein wilder Roadtrip nach Paris – null Routine, 100% Adrenalin.',
    redFlag:
      'Einer will Konflikte sofort lautstark klären, der andere blockt ab und verlässt wortlos den Raum.',
    flirtScore: 96,
    stabilityScore: 36,
    toxicScore: 93,
    memeVerdict:
      '„Pure Leidenschaft, Spontantrips nach Paris und abwechselndes gegenseitiges Blockieren auf Social Media.“',
  },

  JEONG_GYE: {
    score: 39,
    badge: 'Tränen & Overthinking 🌧️🕯️',
    relationshipType: 'Elementare Kollision (Jeong-Gye-Chung / 정계충)',
    verdict: 'Dauerregen auf Kerzenschein. Stundenlanges Overthinking statt Klartext.',
    description:
      'Gyes melancholische Nebelschwaden ersticken Jeongs feines, leidenschaftliches Feuer. Beide neigen dazu, gekränkt zu schweigen statt Klartext zu reden. Eine emotionale Achterbahnfahrt mit hoher Taschentuch-Gefahr.',
    dailyLifeTip:
      'Schreibt euch Briefe oder Sprachnachrichten, wenn das direkte Reden zu geladen ist.',
    conflictTrigger:
      'Stundenlanges Anschweigen bei der Frage: „Was hast du denn?“ – „Nichts.“',
    greenFlag:
      'Beide spüren kleinste Stimmungsveränderungen des anderen im Raum sofort telepathisch.',
    redFlag:
      'Chronisches Overthinking: Panikattacke wegen einer gelesenen, aber 3 Stunden unbeantworteten Nachricht.',
    flirtScore: 68,
    stabilityScore: 38,
    toxicScore: 87,
    memeVerdict:
      '„Zwei hochsensible Overthinker, die 5 Stunden über ein fehlendes Emoji grübeln.“',
  },

  // --- SANGSAENG (Nährende Element-Partnerschaften) ---
  GAP_BYEONG: {
    score: 91,
    badge: 'Lagerfeuer-Euphorie 🔥🌲',
    relationshipType: 'Elementare Nahrung (Holz nährt Feuer)',
    verdict: 'Gap liefert den stabilen Plan, Byeong entfacht das wärmende Freudenfeuer!',
    description:
      'Ein unschlagbares Power-Team voller Tatkraft. Gap schätzt Byeongs ansteckende Begeisterung, Byeong profitiert von Gaps Ausdauer und Statur. Zusammen reißt ihr Bäume aus und seid der Mittelpunkt jeder Party.',
    dailyLifeTip:
      'Achtet darauf, euch nicht gegenseitig in verrückte Projekte zu verrennen, bis die Puste ausgeht.',
    conflictTrigger:
      'Wenn beide gleichzeitig die Führung für das Wochenendprogramm beanspruchen.',
    greenFlag:
      'Mitreißende Energie – zusammen seid ihr die absoluten Stimmungskanonen auf jeder WG-Party.',
    redFlag:
      'Wer hat das Sagen? Beide wollen vorne am Steuer sitzen und hassen Beifahrer-Rollen.',
    flirtScore: 89,
    stabilityScore: 90,
    toxicScore: 28,
    memeVerdict:
      '„Wenn ihr beide denselben Club betretet, gehört euch der Laden nach 20 Minuten.“',
  },

  EUL_JEONG: {
    score: 92,
    badge: 'Kaminfeuer-Idylle 🕯️🌿',
    relationshipType: 'Elementare Nahrung (Holz nährt Feuer)',
    verdict: 'Sanftes Reisig nährt die feine Flamme. Gemütlicher als ein verregneter Sonntag.',
    description:
      'Eine unglaublich feinfühlige, fast poetische Verbindung. Eul bringt charmante Ästhetik und Leichtigkeit ein, Jeong vertieft sie mit Leidenschaft und emotionaler Substanz. Ihr versteht euch oft ohne Worte.',
    dailyLifeTip:
      'Ladet Freunde ein, um nicht in eurer kuscheligen Zweier-Kapsel zu versauern.',
    conflictTrigger:
      'Wenn beide zu sensibel auf Nuancen reagieren und reale Probleme totschweigen.',
    greenFlag:
      'Kuscheldecke, heißer Tee und bedingungslose Geborgenheit an verregneten Sonntagen.',
    redFlag:
      'Beide schlucken Ärger wochenlang runter, bis plötzlich die aufgestaute Bombe platzt.',
    flirtScore: 85,
    stabilityScore: 94,
    toxicScore: 22,
    memeVerdict:
      '„Pures Hygge-Gefühl: Matcha Latte, Duftkerzen und stundenlanger Deep Talk im Bett.“',
  },

  BYEONG_MU: {
    score: 89,
    badge: 'Sonnige Berghütte ⛰️☀️',
    relationshipType: 'Elementare Nahrung (Feuer nährt Erde)',
    verdict: 'Die Sonne erwärmt den kalten Fels. Felsenfeste Geborgenheit!',
    description:
      'Byeong bringt Schwung und Lebensfreude in Mus bisweilen träge Welt. Mu wiederum bietet Byeong den stabilen Boden, auf dem die feurige Energie sicher landen kann, ohne auszubrennen.',
    dailyLifeTip:
      'Byeong darf Mu nicht hetzen; Mu muss Byeongs Spontanität mit einem Lächeln honorieren.',
    conflictTrigger:
      'Byeong will sofort losfeiern, Mu schnürt noch in aller Seelenruhe 25 Minuten die Schuhe.',
    greenFlag:
      'Bodenständige Sicherheit fängt deine verrückten Spontan-Ideen immer liebevoll auf.',
    redFlag:
      'Sie will jetzt sofort raus ins Café, er sucht noch in Seelenruhe die Sonnenbrille.',
    flirtScore: 82,
    stabilityScore: 92,
    toxicScore: 25,
    memeVerdict:
      '„Die Partymaus und der Couch-Potato: Klingt unmöglich, hält aber ewig.“',
  },

  JEONG_GI: {
    score: 90,
    badge: 'Warmer Mutterboden 🌾🕯️',
    relationshipType: 'Elementare Nahrung (Feuer nährt Erde)',
    verdict: 'Fruchtbare Wärme für den Garten. Harmonie wie bei Kaffee & Zimtschnecken.',
    description:
      'Jeongs emotionale Tiefe trifft auf Gis häusliche Wärme und Fürsorge. Bei euch riecht die Wohnung immer nach Geborgenheit, frischem Gebäck und Sicherheit. Ein Paradebeispiel für verlässliche Seelenliebe.',
    dailyLifeTip:
      'Gönnt euch Ausflüge aus der Komfortzone – bucht mal spontan ein Wellness-Wochenende.',
    conflictTrigger:
      'Stille Abrechnung darüber, wer mehr mentale Last und Haushaltsarbeit übernommen hat.',
    greenFlag:
      'Pures Geborgenheitsgefühl: Bei euch fühlt sich jeder sofort wie zu Hause.',
    redFlag:
      'Stummes Aufrechnen von Gefälligkeiten, statt offen zu sagen, was man braucht.',
    flirtScore: 80,
    stabilityScore: 95,
    toxicScore: 18,
    memeVerdict:
      '„Harmonie pur: Hier gibt es keine toxischen Dramen, sondern frisch gebackenes Bananenbrot.“',
  },

  MU_GYEONG: {
    score: 88,
    badge: 'Erz im Fels ⛰️⚔️',
    relationshipType: 'Elementare Nahrung (Erde bringt Metall hervor)',
    verdict: 'Aus dem Berg wird der edle Stahl gewonnen. Felsenfeste Allianz!',
    description:
      'Hier regieren Verlässlichkeit und Disziplin. Mu bietet den unerschütterlichen Rückhalt, Gyeong setzt Pläne mit eiserner Entschlossenheit um. Ihr baut gemeinsam eine unbezwingbare Festung.',
    dailyLifeTip:
      'Vergesst über all den Zielen und Sparplänen nicht das Kuscheln und den Humor.',
    conflictTrigger:
      'Wenn beide stur auf ihren Prinzipien beharren und niemand den ersten Schritt zur Versöhnung macht.',
    greenFlag:
      'Absprachen stehen bombenfest – kein Zaudern, kein Ghosting, 100% Verlässlichkeit.',
    redFlag:
      'Romantik und Komplimente geraten unter die Räder – fühlt sich manchmal an wie eine GmbH.',
    flirtScore: 78,
    stabilityScore: 96,
    toxicScore: 19,
    memeVerdict:
      '„Das pragmatischste Power-Duo der Stadt – null Bullshit, maximale Verlässlichkeit.“',
  },

  GI_SIN: {
    score: 93,
    badge: 'Juwel im Samtkissen 💎🌾',
    relationshipType: 'Elementare Nahrung (Erde birgt Edelstein)',
    verdict: 'Gi poliert das Juwel Sin mit Liebe. Luxus trifft Geborgenheit!',
    description:
      'Sin fühlt sich von Gis bedingungsloser Fürsorge zutiefst verstanden und aufgefangen. Sin bringt Glanz, Stil und Eleganz in Gis Leben, während Gi Sin davor bewahrt, den Bodenkontakt zu verlieren.',
    dailyLifeTip:
      'Sin sollte Gis ehrliche Mühe mit Zärtlichkeit belohnen, statt Kritik am Besteck zu üben.',
    conflictTrigger:
      'Sin bemängelt die Ästhetik der Deko, die Gi stundenlang liebevoll arrangiert hat.',
    greenFlag:
      'Verwöhnt dich bedingungslos mit Liebe, während der andere Stil, Glanz und Ästhetik schenkt.',
    redFlag:
      'Mäckelt an kleinen Haushaltsdingen herum, die der andere liebevoll vorbereitet hat.',
    flirtScore: 84,
    stabilityScore: 95,
    toxicScore: 21,
    memeVerdict:
      '„High-Maintenance Clean Girl wird von fürsorglicher Mädels-Mama betüddelt – Match made in heaven.“',
  },

  GYEONG_IM: {
    score: 89,
    badge: 'Klarer Gebirgsfluss ⚔️🌊',
    relationshipType: 'Elementare Nahrung (Metall klärt Wasser)',
    verdict: 'Das Schwert formt das Flussbett. Intellektuelles Power-Team!',
    description:
      'Gyeong bringt Struktur und Schärfe, Im die Weitsicht und Flexibilität. Zusammen könnt ihr Großkonzerne lenken oder weltweite Segeltörns planen. Große gegenseitige Hochachtung!',
    dailyLifeTip:
      'Bringt mehr emotionale Weichheit ins Spiel – ihr seid Liebende, keine Geschäftspartner.',
    conflictTrigger:
      'Wer das letzte Wort beim großen Zukunftsplan für die nächsten fünf Jahre hat.',
    greenFlag:
      'Scharfsinnige Wortgefechte und grandiose Pläne auf absolut gleicher Augenhöhe.',
    redFlag:
      'Beide verabscheuen Schwäche – emotionale Tränen werden krampfhaft weggedrückt.',
    flirtScore: 87,
    stabilityScore: 88,
    toxicScore: 29,
    memeVerdict:
      '„Zwei scharfzüngige Strategen auf Augenhöhe – niemand kann euch das Wasser reichen.“',
  },

  SIN_GYE: {
    score: 91,
    badge: 'Tautropfen auf Diamant 💎🌧️',
    relationshipType: 'Elementare Nahrung (Metall kondensiert Wasser)',
    verdict: 'Feinste Ästhetik und tiefe Gefühle. Stilvoller geht es kaum.',
    description:
      'Zwei Feingeister unter sich. Sins ästhetischer Anspruch harmoniert herrlich mit Gyes geheimnisvoller Sanftheit. Ihr versteht Blicke und feine Untertöne, die allen anderen verborgen bleiben.',
    dailyLifeTip:
      'Meidet giftige äußere Einflüsse und schafft euch eine stilvolle Wohlfühloase.',
    conflictTrigger:
      'Wenn beide sich in verletztem Stolz zurückziehen und keiner nachfragt.',
    greenFlag:
      'Feinsinniges Verständnis für Ästhetik, Kunst und Blicke, die sonst niemand versteht.',
    redFlag:
      'Hyper-Sensibilität: Ein falscher Unterton bei der Begrüßung versaut den ganzen Abend.',
    flirtScore: 88,
    stabilityScore: 91,
    toxicScore: 26,
    memeVerdict:
      '„Pinterest-Ästhetik trifft Altbau-Poesie: Ihr versteht euch ohne ein einziges lautes Wort.“',
  },

  IM_GAP: {
    score: 93,
    badge: 'Wald am Flussufer 🌲🌊',
    relationshipType: 'Elementare Nahrung (Wasser nährt Holz)',
    verdict: 'Der gewaltige Strom lässt die stolze Eiche in den Himmel wachsen!',
    description:
      'Ims unerschöpfliche Freiheit und Wissen nähren Gaps Tatendrang und Ambitionen. Gap bewundert Ims Weitsicht, Im liebt Gaps Geradlinigkeit und Verlässlichkeit.',
    dailyLifeTip:
      'Gap sollte Im nicht besitzen wollen; Im muss zu vereinbarten Treffpunkten pünktlich sein.',
    conflictTrigger:
      'Gaps Pünktlichkeitswahn kollidiert mit Ims „Ich lasse mich treiben“-Mentalität.',
    greenFlag:
      'Großzügige Freiheit und gegenseitige Motivation, persönliche Träume mutig umzusetzen.',
    redFlag:
      'Pünktlichkeits-Fimmel kollidiert frontal mit der „Ich lass mich treiben“-Attitüde.',
    flirtScore: 90,
    stabilityScore: 92,
    toxicScore: 23,
    memeVerdict:
      '„Die Weltenbummlerin und die Alpha-Planerin: Zusammen reißt ihr die Welt ein.“',
  },

  GYE_EUL: {
    score: 94,
    badge: 'Morgentau auf der Wiese 🌿🌧️',
    relationshipType: 'Elementare Nahrung (Wasser nährt Holz)',
    verdict: 'Sanfter Frühlingsregen lässt die zarten Pflanzen erblühen. Pure Harmonie!',
    description:
      'Gye schenkt Eul das nötige seelische Nass, damit Eul prächtig wachsen und erblühen kann. Eul bedankt sich mit Zuneigung, Charme und Wärme. Eine fast konfliktfreie, wunderbar sanfte Traumbeziehung.',
    dailyLifeTip:
      'Achtet darauf, dass die Welt draußen euch nicht überrollt – setzt klare Grenzen nach außen.',
    conflictTrigger:
      'Wenn alltägliche Pflichten (wie die Steuererklärung) vor lauter Harmoniesucht ignoriert werden.',
    greenFlag:
      'Sanfte Geborgenheit ohne Drama – fühlt sich an wie ein friedlicher, sonniger Frühlingstag.',
    redFlag:
      'Reale bürokratische Pflichten werden aus Harmoniesucht monatelang verdrängt.',
    flirtScore: 84,
    stabilityScore: 96,
    toxicScore: 16,
    memeVerdict:
      '„Zero Toxic Traits: Bei euch gibt es nur Matcha, Kuscheldecken und Seelenruhe.“',
  },
};
