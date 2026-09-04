import { AuraId, DatingContext, DayMasterId, RoastMode } from '../models/sazu.model';

export type Triple = readonly [string, string, string];
export type Seven = readonly [string, string, string, string, string, string, string];
export type ModeTriple = Readonly<Record<RoastMode, Triple>>;
export type ModeSeven = Readonly<Record<RoastMode, Seven>>;

export interface DayMasterRoastProfile {
  claims: Triple;
  actuals: Triple;
  redFlags: ModeTriple;
  groupChats: ModeTriple;
}

export const DAY_MASTER_ROASTS: Readonly<Record<DayMasterId, DayMasterRoastProfile>> = {
  GAP: {
    claims: [
      '„Ich übernehme nur, weil sonst niemand anfängt.“',
      '„Mir ist wirklich egal, wo wir hingehen.“',
      '„Ich will nur, dass alle eine gute Zeit haben.“',
    ],
    actuals: [
      'Du hast den Ablauf schon geplant, bevor die Gruppe überhaupt abgestimmt hat.',
      'Du sagst „mir egal“ und lehnst danach vier Restaurants mit einem Blick ab.',
      'Du verteilst Aufgaben, Deadlines und Erinnerungen für einen entspannten Abend.',
    ],
    redFlags: {
      soft: [
        'Du hilfst so engagiert, dass andere manchmal vergessen, selbst zu entscheiden.',
        'Spontane Planänderungen brauchen bei dir eine kurze innere Krisensitzung.',
        'Du erinnerst Menschen liebevoll an Dinge, die sie nie zugesagt haben.',
      ],
      honest: [
        'Du nennst es Organisation, aber führst den Freundeskreis wie ein schlecht bezahltes Start-up.',
        'Du sagst „mir egal“, bis jemand eine Option wählt, die nicht in deinem geheimen Plan stand.',
        'Du machst aus einem Abendessen ein Projekt mit Zuständigkeiten und Eskalationsstufe.',
      ],
      savage: [
        'Du fragst nach Meinungen, nachdem du Tisch, Uhrzeit und Sitzordnung längst beschlossen hast.',
        'Du behandelst fünf Minuten Verspätung wie einen persönlichen Angriff auf deine Führungsqualitäten.',
        'Du willst keine Kontrolle – du willst nur, dass alle exakt das tun, was du schon geplant hast.',
      ],
    },
    groupChats: {
      soft: [
        '„Ich habe mal einen kleinen Plan gemacht.“',
        '„Soll ich einfach reservieren?“',
        '„Kurze Erinnerung für später.“',
      ],
      honest: [
        '„Bitte stimmt bis 14 Uhr ab, sonst entscheide ich.“',
        '„Ich habe drei Optionen in die Tabelle gepackt.“',
        '„Wer zu spät kommt, sagt bitte jetzt Bescheid.“',
      ],
      savage: [
        '„Die Abstimmung ist beendet. Ihr wart zu langsam.“',
        '„Ich habe euch Kalendertermine geschickt. Keine Ausreden.“',
        '„Wenn noch einmal jemand ‚mal schauen‘ schreibt, plane ich allein.“',
      ],
    },
  },
  EUL: {
    claims: [
      '„Für mich ist alles okay.“',
      '„Ich kann wirklich Nein sagen.“',
      '„Ich mache das gern für dich.“',
    ],
    actuals: [
      'Du sagst zu, ärgerst dich später und hoffst, dass jemand deine Stimmung telepathisch versteht.',
      'Du formulierst eine Absage zwölfmal um und gehst am Ende trotzdem hin.',
      'Du hilfst sofort und führst danach innerlich eine detaillierte Rechnung darüber.',
    ],
    redFlags: {
      soft: [
        'Du möchtest niemanden enttäuschen und vergisst dabei gelegentlich dich selbst.',
        'Du brauchst etwas länger, um ein klares Nein auszusprechen.',
        'Du sammelst kleine Enttäuschungen, statt sie sofort anzusprechen.',
      ],
      honest: [
        'Du sagst dreimal Ja und bist dann sauer, dass niemand dein eigentliches Nein gehört hat.',
        'Du ghostest nicht aus Kälte, sondern weil jede ehrliche Absage sich wie eine Staatskrise anfühlt.',
        'Du nennst es Harmonie, während du heimlich eine Liste unbezahlter emotionaler Gefallen führst.',
      ],
      savage: [
        'Du buchst drei Verabredungen gleichzeitig und meldest dich am Abend bei zwei Personen plötzlich „krank“.',
        'Du erwartest Gedankenlesen und wertest jedes Scheitern daran als mangelnde Wertschätzung.',
        'Du lächelst freundlich, sagst „kein Problem“ und präsentierst den Vorfall drei Monate später als Beweisstück A.',
      ],
    },
    groupChats: {
      soft: [
        '„Was für euch passt, passt auch für mich.“',
        '„Ich frage nur kurz, ob alles okay ist.“',
        '„Sorry, falls das komisch klang.“',
      ],
      honest: [
        '„Kein Stress wirklich!!!“',
        '„Soll ich absagen oder ist das unhöflich?“',
        '„Ich glaube, sie ist sauer. Der Punkt am Ende war anders.“',
      ],
      savage: [
        '„Ich habe zugesagt und bereue bereits jede Sekunde.“',
        '„Sie hat ‚okay‘ geschrieben. Das war definitiv aggressiv.“',
        '„Ich antworte morgen, heute fehlt mir die emotionale Infrastruktur.“',
      ],
    },
  },
  BYEONG: {
    claims: [
      '„Ich brauche keine Aufmerksamkeit.“',
      '„Heute mache ich ganz entspannt.“',
      '„Ich erzähle die Geschichte nur ganz kurz.“',
    ],
    actuals: [
      'Du prüfst unauffällig, ob wirklich alle gesehen haben, dass du den Raum betreten hast.',
      'Aus einem Drink werden eine neue Freundesgruppe und fünfzehn Story-Clips.',
      'Deine Kurzfassung enthält Vorgeschichte, Nebenfiguren und eine Live-Rekonstruktion.',
    ],
    redFlags: {
      soft: [
        'Du teilst deine Energie großzügig und brauchst dafür sichtbare Resonanz.',
        'Ein ruhiger Abend entwickelt sich bei dir erstaunlich schnell zum Ereignis.',
        'Du erzählst gern lebendig und gelegentlich etwas ausführlicher.',
      ],
      honest: [
        'Du merkst nach sieben Minuten ohne Aufmerksamkeit plötzlich, dass die Stimmung „komisch“ ist.',
        'Du versprichst einen ruhigen Abend und stehst zwei Stunden später auf einer fremden Kücheninsel.',
        'Du machst aus jeder Anekdote eine Pressekonferenz mit dir in der Hauptrolle.',
      ],
      savage: [
        'Du bist nicht auf einer Party – du führst dort eine feindliche Übernahme der Aufmerksamkeit durch.',
        'Du brauchst nach jedem Auftritt sofort drei Zeuginnen, die bestätigen, dass du ikonisch warst.',
        'Du hörst anderen Geschichten nur zu, um den perfekten Übergang zurück zu deiner eigenen zu finden.',
      ],
    },
    groupChats: {
      soft: [
        '„Kommt ihr noch kurz mit?“',
        '„Nur ein Drink, versprochen.“',
        '„Ich muss euch etwas erzählen.“',
      ],
      honest: [
        '„Mädels, heute eskaliert nichts. Wirklich.“',
        '„Warum antwortet niemand auf mein Video?“',
        '„Setzt euch. Diese Story braucht Kontext.“',
      ],
      savage: [
        '„Ich kenne den DJ jetzt persönlich, fragt nicht.“',
        '„Wer hat mein legendäres Entrance-Video?“',
        '„Die Kurzfassung dauert elf Minuten und niemand unterbricht mich.“',
      ],
    },
  },
  JEONG: {
    claims: [
      '„Ich denke da nicht mehr drüber nach.“',
      '„Die Nachricht war bestimmt neutral gemeint.“',
      '„Ich brauche keine Bestätigung.“',
    ],
    actuals: [
      'Du führst das Gespräch später mit besseren Antworten noch einmal allein im Badezimmer.',
      'Du vergleichst Satzzeichen, Antwortzeit und Emoji-Wahl wie forensisches Material.',
      'Du fragst beiläufig drei Personen, ob du völlig überreagierst.',
    ],
    redFlags: {
      soft: [
        'Du nimmst Zwischentöne sehr genau wahr und denkst manchmal länger darüber nach.',
        'Unklare Nachrichten beschäftigen dich stärker, als du gern zugibst.',
        'Du holst dir gern eine zweite Meinung, bevor du emotional entscheidest.',
      ],
      honest: [
        'Du behauptest losgelassen zu haben und führst nachts noch Berufung gegen das Gesprächsurteil ein.',
        'Ein fehlendes Emoji eröffnet bei dir eine komplette interne Untersuchung.',
        'Du brauchst keine Bestätigung – nur drei Screenshots, zwei Sprachnachrichten und ein einstimmiges Urteil.',
      ],
      savage: [
        'Du kannst aus „bis später“ eine sechsteilige True-Crime-Serie über emotionalen Rückzug produzieren.',
        'Du analysierst eine Nachricht so lange, bis selbst der Absender nicht mehr weiß, was er angeblich meinte.',
        'Du suchst Rat, bis endlich jemand exakt die Antwort gibt, die du von Anfang an hören wolltest.',
      ],
    },
    groupChats: {
      soft: [
        '„Lese ich da zu viel rein?“',
        '„Klang das für euch auch etwas kühl?“',
        '„Ich schlafe eine Nacht darüber.“',
      ],
      honest: [
        '„Der Punkt am Ende war doch Absicht, oder?“',
        '„Ich habe den Chat exportiert. Bitte objektiv bleiben.“',
        '„Ich bin entspannt, aber warum war er vor 8 Minuten online?“',
      ],
      savage: [
        '„Screenshot 4 beweist, dass sich der Ton seit Dienstag verändert hat.“',
        '„Niemand antwortet, bis wir jedes Emoji ausgewertet haben.“',
        '„Ich habe losgelassen und überprüfe nur noch aus wissenschaftlichem Interesse.“',
      ],
    },
  },
  MU: {
    claims: [
      '„Ich bin spontan.“',
      '„Ich komme heute wirklich mit.“',
      '„Veränderung ist kein Problem für mich.“',
    ],
    actuals: [
      'Du brauchst für spontane Pläne zuerst Essen, Ladegerät und eine realistische Rückkehrzeit.',
      'Du freust dich auf das Treffen, bis der Moment kommt, die Wohnung tatsächlich zu verlassen.',
      'Du akzeptierst Veränderung, nachdem du sie mehrere Tage innerlich ignoriert hast.',
    ],
    redFlags: {
      soft: [
        'Du liebst Verlässlichkeit und brauchst für Spontaneität einen kleinen Vorlauf.',
        'Dein Zuhause ist manchmal überzeugender als jeder Abendplan.',
        'Neue Situationen dürfen bei dir erst einmal in Ruhe ankommen.',
      ],
      honest: [
        'Du nennst dich spontan, solange der Plan mindestens drei Werktage vorher feststeht.',
        'Du sagst begeistert zu und hoffst später heimlich auf eine wetterbedingte Absage.',
        'Du behandelst jede Veränderung wie ein Software-Update, das du wochenlang wegklickst.',
      ],
      savage: [
        'Du willst Abenteuer, aber bitte mit Sitzplatz, Snacks und verbindlichem Ende vor 22:30 Uhr.',
        'Deine häufigste Partybegleitung ist die Ausrede, warum du die Jogginghose nicht mehr wechselst.',
        'Du ignorierst Veränderungen so lange, bis sie mit gepackten Koffern in deinem Wohnzimmer stehen.',
      ],
    },
    groupChats: {
      soft: [
        '„Wie lange bleiben wir ungefähr?“',
        '„Können wir auch bei mir bestellen?“',
        '„Ich schaue spontan, wie fit ich bin.“',
      ],
      honest: [
        '„Ist Absagen jetzt noch sozial vertretbar?“',
        '„Gibt es dort Sitzplätze?“',
        '„Ich wäre emotional bereit für einen Film bei mir.“',
      ],
      savage: [
        '„Ich habe geduscht und damit meinen sozialen Beitrag geleistet.“',
        '„Mein Bett hat Gegenargumente vorgelegt.“',
        '„Wenn der Plan nach 21 Uhr beginnt, kennt ihr meine Antwort.“',
      ],
    },
  },
  GI: {
    claims: [
      '„Ich kümmere mich einfach gern.“',
      '„Ich erwarte nichts zurück.“',
      '„Ich mische mich wirklich nicht ein.“',
    ],
    actuals: [
      'Du bringst Snacks, Pflaster und ungefragte Hinweise zur Lebensplanung mit.',
      'Du erwartest nichts – bemerkst aber sekundengenau, wer sich nicht bedankt hat.',
      'Du stellst nur Fragen, bis die andere Person zufällig deine Lösung wählt.',
    ],
    redFlags: {
      soft: [
        'Deine Fürsorge kann manchmal etwas mehr Anleitung enthalten als bestellt.',
        'Dankbarkeit bedeutet dir mehr, als du offen aussprichst.',
        'Du möchtest helfen und stellst dafür gelegentlich sehr gezielte Fragen.',
      ],
      honest: [
        'Du verpackst Kontrolle in Snacks und nennst das dann liebevolle Fürsorge.',
        'Du erwartest nichts zurück, außer Erinnerung, Dankbarkeit und lebenslange Loyalität.',
        'Du mischst dich nicht ein – du führst nur ein Interview mit gewünschtem Endergebnis.',
      ],
      savage: [
        'Du reichst Suppe mit der einen Hand und einen vollständigen Optimierungsplan mit der anderen.',
        'Du speicherst jedes fehlende Danke in einem emotionalen Steuerkonto mit Zinsen.',
        'Du lässt Menschen frei entscheiden, nachdem du alle falschen Optionen gründlich demontiert hast.',
      ],
    },
    groupChats: {
      soft: [
        '„Habt ihr genug gegessen?“',
        '„Ich bringe vorsichtshalber etwas mit.“',
        '„Nur ein kleiner Tipp.“',
      ],
      honest: [
        '„Ich habe Snacks und eine ehrliche Meinung dabei.“',
        '„Kein Problem, ich mache es wieder allein.“',
        '„Du kannst selbst entscheiden, aber hör kurz zu.“',
      ],
      savage: [
        '„Ich rette euch erneut und erwarte diesmal schriftliche Dankbarkeit.“',
        '„Wer nichts gegessen hat, verliert sein Stimmrecht.“',
        '„Natürlich ist es deine Entscheidung. Hier sind 14 Gründe für meine.“',
      ],
    },
  },
  GYEONG: {
    claims: [
      '„Ich bin nur ehrlich.“',
      '„Mich verletzt so etwas nicht.“',
      '„Ich kann gut Kompromisse machen.“',
    ],
    actuals: [
      'Du lieferst ungefilterte Wahrheiten und bist überrascht, wenn danach niemand applaudiert.',
      'Du wirkst unberührt und formulierst innerlich bereits eine endgültige Antwort.',
      'Dein Kompromiss besteht oft darin, dass andere deine bessere Lösung übernehmen.',
    ],
    redFlags: {
      soft: [
        'Deine Direktheit ist hilfreich, kann aber manchmal härter landen als beabsichtigt.',
        'Du zeigst Verletzlichkeit lieber spät und sehr ausgewählt.',
        'Bei Kompromissen verteidigst du deine Position besonders überzeugend.',
      ],
      honest: [
        'Du nennst es Ehrlichkeit, andere nennen es eine ungefragte Leistungsbeurteilung.',
        'Du sagst „alles gut“ mit einer Stimme, die bereits sämtliche Zugänge gesperrt hat.',
        'Du verhandelst so lange, bis der Kompromiss verdächtig genau deiner Ausgangsposition entspricht.',
      ],
      savage: [
        'Du verteilst Wahrheiten wie Strafzettel und wunderst dich über die schlechte Stimmung.',
        'Du bist nicht nachtragend – du beendest nur still sämtliche emotionalen Dienstleistungen.',
        'Du gehst in Kompromisse wie in Auktionen: Am Ende besitzt du trotzdem alles.',
      ],
    },
    groupChats: {
      soft: [
        '„Soll ich ehrlich sein?“',
        '„Alles gut, wirklich.“',
        '„Wir finden schon eine Lösung.“',
      ],
      honest: [
        '„Ihr wolltet Ehrlichkeit. Jetzt seid nicht sauer.“',
        '„Ich bin nicht kalt, ich bin konsequent.“',
        '„Der Kompromiss steht. Ich habe entschieden.“',
      ],
      savage: [
        '„Ich könnte es netter sagen, aber dann wäre es weniger wahr.“',
        '„Zugang zu mir wurde bis auf Weiteres deaktiviert.“',
        '„Diskussion beendet. Das Urteil ist rechtskräftig.“',
      ],
    },
  },
  SIN: {
    claims: [
      '„Ich bin nicht anspruchsvoll.“',
      '„Das Detail sieht niemand.“',
      '„Ich brauche nicht lange zum Fertigmachen.“',
    ],
    actuals: [
      'Du hast nur klare Standards, die zufällig eine mehrseitige Anleitung ergeben.',
      'Du siehst das Detail und kannst ab diesem Moment nichts anderes mehr sehen.',
      'Du bist fast fertig, sobald Outfit, Licht und Stimmung gleichzeitig kooperieren.',
    ],
    redFlags: {
      soft: [
        'Du weißt genau, was du magst, und bemerkst kleine Details sehr schnell.',
        'Qualität ist dir wichtig und kleine Fehler lenken dich manchmal ab.',
        'Deine Vorbereitung dauert, weil du dich wirklich wohlfühlen möchtest.',
      ],
      honest: [
        'Du bist nicht anspruchsvoll, du hast nur 27 nicht verhandelbare Mindeststandards.',
        'Ein schiefer Kerzendocht kann für dich einen ganzen Abend emotional ruinieren.',
        '„Bin gleich da“ bedeutet bei dir, dass die finale Outfit-Runde begonnen hat.',
      ],
      savage: [
        'Du führst Dates wie verdeckte Qualitätsaudits und verschickst danach innerlich Mängelberichte.',
        'Du kannst eine perfekte Nacht wegen eines falschen Weinglases in Erinnerung als mittelmäßig abspeichern.',
        'Du kommst nicht zu spät – die Welt war einfach zu früh für deinen finalen Look.',
      ],
    },
    groupChats: {
      soft: [
        '„Welche Schuhe passen besser?“',
        '„Nur noch eine kleine Änderung.“',
        '„Der Ort ist schön, aber…“',
      ],
      honest: [
        '„Ich bin fertig, muss nur noch alles ändern.“',
        '„Seht ihr diesen einen Fehler auch?“',
        '„Er war nett, aber die Schuhe waren eine Entscheidung.“',
      ],
      savage: [
        '„Ich habe keine hohen Standards. Die Auswahl ist nur schwach.“',
        '„Das Date war 8/10, bis er dieses Glas bestellt hat.“',
        '„Noch zwölf Minuten. Mein Gesicht verhandelt nicht.“',
      ],
    },
  },
  IM: {
    claims: [
      '„Ich melde mich später.“',
      '„Ich brauche nur ein bisschen Freiheit.“',
      '„Ich habe keinen Fluchtreflex.“',
    ],
    actuals: [
      'Du öffnest die Nachricht, beantwortest sie im Kopf und verschwindest dann in einem neuen Plan.',
      'Du magst Nähe, solange sie keinen festen Kalendertermin für die nächsten sechs Monate verlangt.',
      'Sobald etwas verbindlich wird, recherchierst du auffällig viele Reiseziele.',
    ],
    redFlags: {
      soft: [
        'Du bist gedanklich oft unterwegs und Antworten rutschen dir gelegentlich durch.',
        'Du brauchst in Beziehungen spürbar Raum für eigene Pläne.',
        'Verbindlichkeit darf bei dir langsam und ohne Druck wachsen.',
      ],
      honest: [
        'Du beantwortest Nachrichten zuverlässig – nur manchmal 36 Stunden später in einer anderen Zeitzone.',
        'Du willst intensive Nähe mit jederzeit nutzbarem Notausgang.',
        'Du nennst es Fernweh, sobald jemand eine gemeinsame Zukunft konkret formuliert.',
      ],
      savage: [
        'Du lässt Menschen auf „gelesen“, während du online bereits dein nächstes Leben planst.',
        'Du willst Bindung wie Hotel-WLAN: stark, kostenlos und ohne langfristigen Vertrag.',
        'Du hörst „Was sind wir?“ und dein Nervensystem öffnet automatisch eine Flugsuchmaschine.',
      ],
    },
    groupChats: {
      soft: [
        '„Sorry, ich war komplett unterwegs.“',
        '„Lass uns spontan schauen.“',
        '„Ich brauche kurz Zeit für mich.“',
      ],
      honest: [
        '„Ich habe im Kopf geantwortet, zählt das?“',
        '„Bitte keine Pläne weiter als nächsten Dienstag.“',
        '„Ich bin nicht weg, nur gerade schwer lokalisierbar.“',
      ],
      savage: [
        '„Gelesen, emotional verarbeitet, Antwort auf unbestimmt verschoben.“',
        '„Exklusiv ja, aber geografisch flexibel.“',
        '„Er fragte nach Zukunft und ich habe Skyscanner geöffnet.“',
      ],
    },
  },
  GYE: {
    claims: [
      '„Ich spüre einfach, wenn etwas nicht stimmt.“',
      '„Ich bin nicht emotional investiert.“',
      '„Ich lasse Dinge leicht los.“',
    ],
    actuals: [
      'Du bemerkst eine minimale Stimmungsänderung und baust daraus eine vollständige Theorie.',
      'Du kennst bereits Lieblingssong, Geburtszeit und alte Urlaubsfotos der Person.',
      'Du lässt los, behältst aber Screenshots für den unwahrscheinlichen Revisionsfall.',
    ],
    redFlags: {
      soft: [
        'Deine feine Wahrnehmung erkennt manchmal auch Spannungen, die noch gar nicht ausgesprochen wurden.',
        'Wenn du jemanden magst, interessierst du dich sehr gründlich für diese Person.',
        'Du bewahrst Erinnerungen länger auf, als du eigentlich möchtest.',
      ],
      honest: [
        'Du verwechselst Intuition gelegentlich mit einer sehr gut ausgestatteten Fantasieabteilung.',
        'Du bist nicht investiert, kennst aber den Spotify-Jahresrückblick von 2021.',
        'Du hast losgelassen, nur der archivierte Chat und 46 Screenshots noch nicht.',
      ],
      savage: [
        'Du nennst es Bauchgefühl, nachdem du fünf Stunden digitale Spurensicherung betrieben hast.',
        'Du bist emotional neutral und weißt deshalb zufällig, wann die Schwester der Person Geburtstag hat.',
        'Du löschst die Nummer dramatisch und findest sie bei Bedarf in drei alten Gruppen wieder.',
      ],
    },
    groupChats: {
      soft: [
        '„Irgendetwas fühlt sich anders an.“',
        '„Ich habe nur kurz nachgesehen.“',
        '„Die Screenshots lösche ich bald.“',
      ],
      honest: [
        '„Meine Intuition sagt es. Die Recherche bestätigt nur.“',
        '„Ich stalke nicht, ich prüfe den Vibe.“',
        '„Gelöscht, aber vorsichtshalber archiviert.“',
      ],
      savage: [
        '„Ich habe nichts gesucht. Der Algorithmus hat mir seine Tante gezeigt.“',
        '„Die Beweise liegen in einem privaten Album namens ‚egal‘.“',
        '„Nummer gelöscht. Lebenslauf weiterhin vollständig bekannt.“',
      ],
    },
  },
};

export const AURA_DATING_EVIDENCE: Readonly<Record<AuraId, ModeSeven>> = {
  DOHWA: {
    soft: [
      'Du wirkst heute besonders offen und wirst leichter angesprochen.',
      'Ein ehrliches Kompliment landet heute überraschend gut.',
      'Dein Blickkontakt sagt heute mehr als jede Dating-Bio.',
      'Ein spontanes Gespräch kann länger nachwirken als erwartet.',
      'Heute fällt es dir leicht, charmant den ersten Schritt zu machen.',
      'Deine Ausstrahlung funktioniert heute auch ohne perfekten Plan.',
      'Ein kleines Flirtsignal reicht heute völlig aus.',
    ],
    honest: [
      'Du behauptest, nicht zu flirten, und hältst dabei drei Sekunden zu lange Blickkontakt.',
      'Heute reicht ein Story-Like und du schreibst innerlich bereits die Pilotfolge.',
      'Du weißt genau, dass dein „zufälliges“ Outfit nicht zufällig ist.',
      'Jemand lacht über deinen Witz und du prüfst sofort die romantische Kompatibilität.',
      'Du willst nur Spaß und kontrollierst trotzdem, wer deine Story zuerst gesehen hat.',
      'Dein Charme ist heute stärker als deine Fähigkeit, realistische Erwartungen zu behalten.',
      'Ein Kompliment später hast du den Namen bereits im Gruppenchat erwähnt.',
    ],
    savage: [
      'Ein Blickkontakt und dein Gehirn plant bereits den gemeinsamen Soft Launch.',
      'Du postest eine Story für genau eine Person und nennst das allgemeinen Content.',
      'Heute sammelst du Telefonnummern wie andere Menschen Pfandbons.',
      'Du erkennst Interesse sogar dort, wo nur höflicher Kundenservice war.',
      'Du flirtest offensiv und behauptest danach, die andere Person habe angefangen.',
      'Ein Feuer-Emoji reicht, damit du drei Freundinnen zur Krisensitzung einlädst.',
      'Du willst unverbindlich bleiben und analysierst trotzdem jede neue Followerin.',
    ],
  },
  YEOKMA: {
    soft: [
      'Ein Tapetenwechsel bringt heute frische Begegnungen.',
      'Spontane Pläne passen heute besser als lange Abstimmungen.',
      'Außerhalb deiner Routine wirkst du besonders lebendig.',
      'Ein neuer Ort kann heute einen überraschenden Kontakt bringen.',
      'Heute lohnt es sich, eine Einladung nicht sofort abzulehnen.',
      'Bewegung bringt deine Gedanken und dein Dating-Leben in Schwung.',
      'Ein kleiner Umweg könnte heute die bessere Geschichte liefern.',
    ],
    honest: [
      'Du suchst heute Abenteuer und antwortest deshalb auf keinen Chat länger als fünf Minuten.',
      'Ein neuer Ort wirkt sofort attraktiver als jedes bestehende Commitment.',
      'Du nennst es Spontaneität, andere nennen es unerreichbare Terminplanung.',
      'Heute verliebst du dich eher in einen Reiseplan als in eine Person.',
      'Du sagst „mal schauen“ und hast längst drei alternative Abende geplant.',
      'Nähe ist schön, solange niemand nach dem nächsten Wochenende fragt.',
      'Du brauchst heute Bewegung, bevor du wieder Gefühle beantworten kannst.',
    ],
    savage: [
      'Du buchst lieber einen Flug als ein klärendes Gespräch.',
      'Sobald jemand Verbindlichkeit erwähnt, entwickelst du akutes Fernweh.',
      'Du antwortest aus einer neuen Stadt auf eine Nachricht von vorgestern.',
      'Dein Dating-Typ ist heute: interessant, attraktiv und geografisch unpraktisch.',
      'Du nennst es Freiheit, während drei Menschen auf Terminbestätigung warten.',
      'Heute ist dein Fluchtreflex schneller als jedes öffentliche Verkehrsmittel.',
      'Du sammelst Reisepläne, damit keine Beziehung genug Zeit zum Definieren bekommt.',
    ],
  },
  HWAGAE: {
    soft: [
      'Ein ruhiges Gespräch fühlt sich heute wertvoller an als lauter Smalltalk.',
      'Deine nachdenkliche Seite zieht heute die richtigen Menschen an.',
      'Heute darf eine Verbindung langsam und ehrlich entstehen.',
      'Kreative Orte bringen dir heute bessere Gespräche.',
      'Du erkennst heute besonders klar, welche Begegnung Substanz hat.',
      'Ein stiller Moment kann heute überraschend intim wirken.',
      'Weniger Kontakte, dafür ein wirklich gutes Gespräch.',
    ],
    honest: [
      'Du willst Tiefe und stellst beim ersten Drink versehentlich Fragen für das dritte Beziehungsjahr.',
      'Smalltalk langweilt dich, aber emotionale Verfügbarkeit erschreckt dich ebenfalls.',
      'Du suchst heute Seelenverwandtschaft und überspringst dabei gern die Kennenlernphase.',
      'Ein guter Song reicht und du projizierst eine komplette Persönlichkeit.',
      'Du willst verstanden werden, erklärst dich aber nur in kryptischen Andeutungen.',
      'Heute prüfst du Gespräche auf Tiefe wie andere Menschen Restaurantbewertungen.',
      'Du findest Distanz mysteriös, bis sie wirklich konsequent wird.',
    ],
    savage: [
      'Du hörst denselben Song und erklärst eine fast fremde Person zur karmischen Lektion.',
      'Du verlangst seelische Tiefe, antwortest auf direkte Fragen aber mit einer Playlist.',
      'Ein philosophischer Satz und du vergibst sofort drei offensichtliche Red Flags.',
      'Du willst keine oberflächlichen Menschen und verliebst dich regelmäßig in emotional unlesbare.',
      'Du verwechselst kompliziert mit tief und Distanz mit geheimnisvoll.',
      'Heute reicht ein trauriger Blick für eine komplette Schicksalserzählung.',
      'Du suchst Bedeutung so intensiv, dass normale Zuneigung fast verdächtig wirkt.',
    ],
  },
};

export interface ContextRoastProfile {
  headline: string;
  redFlagLabel: string;
  sharePrompt: string;
  shareAnswers: Readonly<Record<RoastMode, string>>;
  claims: Readonly<Record<RoastMode, string>>;
  actuals: Readonly<Record<RoastMode, string>>;
  redFlags: ModeTriple;
  receipts: ModeSeven;
}

export const CONTEXT_ROASTS: Readonly<Record<DatingContext, ContextRoastProfile>> = {
  crush: {
    headline: 'Wird daraus ein Date oder nur Story-Views?',
    redFlagLabel: 'WAS EURE TALKING STAGE SABOTIERT',
    sharePrompt: 'WÜRDEST DU TROTZDEM SCHREIBEN?',
    shareAnswers: {
      soft: 'VIELLEICHT / ICH WARTE',
      honest: 'JA, LEIDER / ER ZUERST',
      savage: 'DOPPELTEXT / WÜRDE BEWAHREN',
    },
    claims: {
      soft: 'Ihr nennt es entspanntes Kennenlernen.',
      honest: 'Ihr behauptet beide, völlig locker zu sein.',
      savage: 'Ihr spielt beide Desinteresse und führt privat Vollzeit-Analysen.',
    },
    actuals: {
      soft: 'Antwortzeiten und kleine Signale beschäftigen euch trotzdem.',
      honest: 'Jede Antwortzeit wird bemerkt und später mit Freundinnen ausgewertet.',
      savage:
        'Zwei Menschen starren auf denselben Chat und warten darauf, dass die andere Person zuerst Würde verliert.',
    },
    redFlags: {
      soft: [
        'Unklare Signale bremsen euren Rhythmus.',
        'Ihr wartet beide etwas zu lange auf den ersten Schritt.',
        'Zu viel Vorsicht lässt Interesse wie Desinteresse wirken.',
      ],
      honest: [
        'Eure Kommunikation besteht aus Interesse, Tarnung und unnötig langen Antwortpausen.',
        'Ihr testet einander, statt eine konkrete Einladung auszusprechen.',
        'Story-Reaktionen ersetzen bei euch bereits ein vollständiges Gespräch.',
      ],
      savage: [
        'Ihr führt eine Beziehung aus Blickkontakten, Story-Views und komplett vermeidbaren Missverständnissen.',
        'Beide wollen begehrt werden, aber niemand möchte beim Schreiben zuerst emotional haftbar sein.',
        'Euer größtes Hindernis ist nicht das Schicksal, sondern kollektiv gespielte Gleichgültigkeit.',
      ],
    },
    receipts: {
      soft: [
        'Heute wäre eine klare Frage hilfreicher als ein weiteres Signal.',
        'Ein kurzer ehrlicher Chat kann heute viel Unsicherheit lösen.',
        'Eine konkrete Einladung wirkt heute besser als Andeutungen.',
        'Nicht jede langsame Antwort ist ein schlechtes Zeichen.',
        'Heute zählt Initiative mehr als perfekte Formulierung.',
        'Ein unkompliziertes Treffen sagt mehr als zehn Story-Reaktionen.',
        'Lasst heute wenigstens eine Person offen Interesse zeigen.',
      ],
      honest: [
        'Eine Person tippt, löscht und wartet dann wieder zwei Stunden.',
        'Ihr kennt gegenseitig eure Story-Zeiten, aber nicht den nächsten Treffpunkt.',
        'Heute wird ein Like wieder als diplomatische Kontaktaufnahme gewertet.',
        'Eine klare Einladung liegt bereit und wird trotzdem durch ein Meme ersetzt.',
        'Ihr seid beide online und antwortet aus taktischen Gründen später.',
        'Der Gruppenchat weiß längst mehr über diesen Crush als der Crush selbst.',
        'Heute entscheidet ein Satzzeichen über drei Stunden Stimmung.',
      ],
      savage: [
        'Heute wird wieder eine Story für exakt eine Person hochgeladen und als Zufall verkauft.',
        'Eine Person schreibt „haha“, die andere organisiert bereits eine Krisenkonferenz.',
        'Ihr wart beide online und habt kollektiv beschlossen, Kommunikation zu simulieren.',
        'Der nächste Schritt scheitert heute beinahe an zwei gleichzeitig verteidigten Egos.',
        'Ein Feuer-Emoji bekommt mehr Interpretationsarbeit als manche Abschlussarbeit.',
        'Der Crush erhält drei Wörter, der Gruppenchat eine zwölfminütige Sprachnachricht.',
        'Heute könnte ein Date entstehen, wenn jemand kurz aufhört, cool wirken zu wollen.',
      ],
    },
  },
  relationship: {
    headline: 'Langzeitpotenzial oder getrennte IKEA-Warenkörbe?',
    redFlagLabel: 'WAS EUREN ALLTAG SPRENGT',
    sharePrompt: 'ZIEHT IHR TROTZDEM ZUSAMMEN?',
    shareAnswers: {
      soft: 'JA / MIT PLAN',
      honest: 'JA, MIT REGELN / NIEMALS IKEA',
      savage: 'GETRENNTE DECKEN / GETRENNTE WOHNUNGEN',
    },
    claims: {
      soft: 'Ihr wollt ein verlässliches Team sein.',
      honest: 'Ihr sagt, der Alltag funktioniere eigentlich gut.',
      savage: 'Ihr nennt es Partnerschaft und führt nebenbei ein unbezahltes Beschwerdemanagement.',
    },
    actuals: {
      soft: 'Kleine Routinen brauchen trotzdem klare Absprachen.',
      honest: 'Dieselben drei Haushaltsfragen kehren zuverlässig in jeder Diskussion zurück.',
      savage:
        'Die Liebe ist groß, aber ein falsch eingeräumter Geschirrspüler kann jederzeit die Verfassungskrise auslösen.',
    },
    redFlags: {
      soft: [
        'Unausgesprochene Erwartungen machen den Alltag unnötig schwer.',
        'Unterschiedliche Routinen brauchen mehr klare Absprachen.',
        'Kleine Ärgernisse sollten früher ausgesprochen werden.',
      ],
      honest: [
        'Ihr streitet nicht über die Sache, sondern über die Bedeutung hinter der Sache.',
        'Euer Haushalt besitzt mehr ungelöste Zuständigkeiten als eine Koalitionsverhandlung.',
        '„Ist doch nicht so schlimm“ ist bei euch der offizielle Start jeder Eskalation.',
      ],
      savage: [
        'Ein offener Schrank kann bei euch sämtliche Konflikte der letzten zwei Jahre reaktivieren.',
        'Ihr führt dieselbe Diskussion in neuen Outfits und nennt das Beziehungsarbeit.',
        'Eure Liebe überlebt viel, aber möglicherweise keinen gemeinsamen IKEA-Samstag.',
      ],
    },
    receipts: {
      soft: [
        'Heute hilft eine klare Bitte mehr als stiller Ärger.',
        'Eine kleine gemeinsame Routine stärkt euren Alltag.',
        'Teilt Aufgaben heute sichtbar statt still vorauszusetzen.',
        'Ein ehrliches Danke entspannt heute erstaunlich viel.',
        'Plant heute auch Zeit ohne Organisation ein.',
        'Ein früher Kompromiss spart später eine lange Diskussion.',
        'Fragt nach, bevor ihr Absicht unterstellt.',
      ],
      honest: [
        'Heute sagt jemand „mach, wie du willst“ und meint nachweislich das Gegenteil.',
        'Eine Kleinigkeit im Haushalt erhält wieder symbolische Bedeutung.',
        'Der Wochenendplan wird heute zur verdeckten Machtfrage.',
        'Eine Person möchte reden, die andere möchte erst einmal den Geschirrspüler gewinnen.',
        'Heute werden alte Beispiele aus völlig anderen Streitfällen zugelassen.',
        'Ein fehlendes Danke eröffnet eine Bilanz der letzten sechs Monate.',
        'Ihr braucht heute weniger Recht und mehr konkrete Zuständigkeiten.',
      ],
      savage: [
        'Heute wird eine Tasse am falschen Ort zum Beweis fehlender Wertschätzung erklärt.',
        'Jemand sagt „alles gut“, während innerlich bereits die PowerPoint vorbereitet wird.',
        'Euer Abend kann heute an der Frage scheitern, wer „immer“ den Müll macht.',
        'Ein gemeinsamer Einkauf entwickelt sich zur Volksabstimmung über Verantwortung.',
        'Heute wird Nähe verlangt und gleichzeitig jede Lösung persönlich kritisiert.',
        'Die Diskussion beginnt bei Wäsche und endet bei eurer gesamten Zukunft.',
        'Ihr liebt euch – aber niemand liebt die Art, wie die andere Person Spülmaschinen einräumt.',
      ],
    },
  },
  bestie: {
    headline: 'Ride-or-die oder heimlicher Konkurrenzkampf?',
    redFlagLabel: 'WAS DEN GRUPPENCHAT ESKALIEREN LÄSST',
    sharePrompt: 'WER SAGT IMMER „BIN IN 5 MIN DA“?',
    shareAnswers: {
      soft: 'ICH / DU',
      honest: 'ICH / DIE ANDERE LÜGT',
      savage: 'BEIDE LÜGEN / NIEMAND IST FERTIG',
    },
    claims: {
      soft: 'Ihr seid immer füreinander da.',
      honest: 'Ihr nennt euch gegenseitig komplett unkompliziert.',
      savage:
        'Ihr würdet füreinander kämpfen und euch danach privat wegen einer Reaktion zerlegen.',
    },
    actuals: {
      soft: 'Manchmal erwartet ihr Unterstützung, bevor ihr sie klar aussprecht.',
      honest:
        'Loyalität wird streng geprüft, besonders bei Sitzordnung, Reaktionszeit und neuen Freundschaften.',
      savage:
        'Eure Freundschaft ist unzerstörbar, solange niemand ohne Vorwarnung mit einer anderen Person brunchen geht.',
    },
    redFlags: {
      soft: [
        'Unausgesprochene Erwartungen können kurz für Abstand sorgen.',
        'Neue Pläne sollten nicht als Loyalitätstest verstanden werden.',
        'Direkte Fragen helfen mehr als stille Enttäuschung.',
      ],
      honest: [
        'Ein Treffen ohne die andere Person wird schnell als strategischer Seitenwechsel ausgewertet.',
        'Ihr rottet euch liebevoll, trefft dabei aber gelegentlich einen echten Nerv.',
        'Wer im Gruppenchat nicht reagiert, muss später mit einer Untersuchung rechnen.',
      ],
      savage: [
        'Ihr seid Ride-or-die, bis eine Person eine Story mit einer neuen Freundin postet.',
        'Eure Insiderwitze sind Zuneigung, Waffe und historisches Archiv zugleich.',
        'Ihr verteidigt euch öffentlich und eröffnet privat sofort ein Disziplinarverfahren.',
      ],
    },
    receipts: {
      soft: [
        'Heute lohnt sich eine direkte Einladung statt stiller Erwartung.',
        'Ein ehrliches Kompliment stärkt euren Teamgeist.',
        'Lasst kleine Verspätungen heute wirklich klein bleiben.',
        'Ein neues gemeinsames Ritual tut euch gut.',
        'Fragt nach, bevor ihr euch ausgeschlossen fühlt.',
        'Heute darf jede Person auch eigene Pläne haben.',
        'Ein spontaner Check-in kommt heute genau richtig.',
      ],
      honest: [
        'Eine Person schreibt „bin unterwegs“ und sucht noch ihr Outfit.',
        'Heute wird eine neue Bekanntschaft diskret auf Bestie-Tauglichkeit geprüft.',
        'Ein ungelesener Chat erzeugt sofort die Frage, ob alles okay ist.',
        'Ihr beleidigt euch liebevoll, bis plötzlich eine Wahrheit trifft.',
        'Eine Story ohne Markierung wird heute kurz persönlich genommen.',
        'Heute muss wieder geklärt werden, wer wem zuerst etwas erzählt hat.',
        'Ein abgesagter Plan bekommt mehr Kontext als ein Behördenbrief.',
      ],
      savage: [
        '„Bin in fünf Minuten da“ wird heute aus der Dusche gesendet.',
        'Eine neue Freundin erscheint in der Story und der Gruppenchat eröffnet Ermittlungen.',
        'Ihr nennt es Spaß, bis jemand exakt die seit Jahren bekannte Schwachstelle trifft.',
        'Heute wird Loyalität an Sitzplatz, Like-Reihenfolge und Informationsvorsprung gemessen.',
        'Eine Person sagt ab und liefert vorsorglich Beweisfotos ihres Zustands.',
        'Ihr kennt alle Geheimnisse und verwendet sie nur in kontrollierten Roast-Situationen.',
        'Die Freundschaft hält alles aus – außer überraschende Brunch-Fotos ohne Einladung.',
      ],
    },
  },
  ex: {
    headline: 'Schicksalsverbindung oder Rückfallgefahr?',
    redFlagLabel: 'WARUM BLOCKIEREN GESÜNDER WÄRE',
    sharePrompt: 'NOCH EINE RUNDE?',
    shareAnswers: {
      soft: 'NEIN / NUR NACHDENKEN',
      honest: 'BLOCKIERT / NUR KURZ SCHAUEN',
      savage: 'NUMMER LÖSCHEN / RÜCKFALL IN 3…2…1',
    },
    claims: {
      soft: 'Ihr habt beide aus der Geschichte gelernt.',
      honest: 'Ihr behauptet, endgültig abgeschlossen zu haben.',
      savage: 'Ihr nennt es Closure und sucht in Wahrheit einen legalen Vorwand für Kontakt.',
    },
    actuals: {
      soft: 'Erinnerungen machen klare Grenzen manchmal trotzdem schwierig.',
      honest: 'Mindestens eine Person kennt noch Aktivitätszeiten und neue Follower.',
      savage:
        'Die Nummer ist gelöscht, der Chat archiviert und die Route zurück emotional vollständig ausgeschildert.',
    },
    redFlags: {
      soft: [
        'Nostalgie kann alte Probleme vorübergehend kleiner wirken lassen.',
        'Vertrautheit fühlt sich sicher an, löst aber nicht automatisch frühere Konflikte.',
        'Klare Grenzen schützen euch besser als ein weiteres unklares Gespräch.',
      ],
      honest: [
        'Ihr verwechselt bekannte Muster mit Schicksalsverbindung.',
        'Ein „Wie geht’s?“ reicht, um sämtliche Fortschritte kurz neu zu verhandeln.',
        'Die guten Erinnerungen bekommen Sendezeit, die Trennungsgründe bleiben stummgeschaltet.',
      ],
      savage: [
        'Ihr habt nicht abgeschlossen, ihr habt die Beweismittel nur in einen archivierten Chat verschoben.',
        'Jede „letzte Nachricht“ besitzt bei euch bemerkenswert viele Fortsetzungen.',
        'Das Universum nennt es Lektion, ihr nennt es Donnerstagabend und schreibt wieder.',
      ],
    },
    receipts: {
      soft: [
        'Heute ist Abstand hilfreicher als ein nostalgischer Check-in.',
        'Eine alte Erinnerung ist noch kein neues Zeichen.',
        'Schreib deine Gedanken lieber auf, statt sie sofort zu senden.',
        'Klare Grenzen fühlen sich heute später besser an.',
        'Frag dich, ob du die Person oder nur die Vertrautheit vermisst.',
        'Ein ruhiger Abend ohne Profilbesuch ist heute ein Gewinn.',
        'Lass alte Gründe genauso laut sein wie schöne Erinnerungen.',
      ],
      honest: [
        'Heute wird „nur kurz das Profil ansehen“ wieder sehr großzügig definiert.',
        'Eine alte Playlist versucht, sich als kosmisches Zeichen auszugeben.',
        'Der Entwurf „Hey, lange nichts gehört“ sollte heute ein Entwurf bleiben.',
        'Du vermisst gerade möglicherweise Gewohnheit mit gutem Marketing.',
        'Ein neuer Like wird heute fast zur diplomatischen Wiederaufnahme erklärt.',
        'Die Trennungsgründe brauchen heute denselben Erinnerungsplatz wie der Urlaub.',
        'Closure entsteht heute eher ohne neue Nachricht.',
      ],
      savage: [
        'Heute steht der Daumen wieder gefährlich nah über „Senden“, obwohl alle Beweise dagegen sprechen.',
        'Du nennst es Neugier und kennst plötzlich den kompletten neuen Freundeskreis.',
        'Eine traurige Playlist versucht erneut, toxische Nostalgie als Schicksal zu verkaufen.',
        'Die Nummer ist gelöscht, aber dein Muskelgedächtnis könnte sie leider noch wählen.',
        'Heute ist „nur eine letzte Nachricht“ wieder der Trailer für Staffel vier.',
        'Du vermisst nicht die Person, sondern die vertraute Dramaturgie.',
        'Blockieren wäre heute Selbstrespekt mit Benutzeroberfläche.',
      ],
    },
  },
};

export const SHARE_CTA: Readonly<Record<RoastMode, Triple>> = {
  soft: [
    'Wer erkennt mich trotzdem wieder?',
    'Welche Freundin bestätigt das?',
    'Ist das noch süß oder schon verdächtig genau?',
  ],
  honest: [
    'Wer hat die Screenshots dazu?',
    'Welche Freundin wusste das längst?',
    'Schick das der Person, die jetzt zu laut lacht.',
  ],
  savage: [
    'Markiere die Zeugin mit dem vollständigen Beweismaterial.',
    'Wer mich kennt, darf jetzt schweigen oder Beweise posten.',
    'Schick das der Freundin, die gerade „ENDLICH SAGT ES JEMAND“ denkt.',
  ],
};
