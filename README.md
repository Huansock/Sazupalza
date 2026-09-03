# SAZU PALZA (사주팔자) – K-Horoskop auf Deutsch

Koreanische Schicksalsanalyse (Sazu) und Partner-Check auf Deutsch – Mobile-Only Webapp gebaut mit **Angular 22 (Standalone Components + Signals)**.

## Funktionen

1. **Mein Sazu (내 사주/성격)**:
   - Eingabe von Name, Geburtsdatum (Sonnenkalender), optionaler Geburtszeit und Geschlecht.
   - Präzise astronomische Berechnung des **Tagesmeisters (일간 / Day Master)** über Julian Day Number (JDN).
   - Deutsche Wesens-Archetypen (z.B. *„Der prinzipientreue Abteilungsleiter mit DIN-Norm“*), deutsches Schutzgut (*Laminiergerät*, *Mettbrötchen* etc.) und humorvolle Persönlichkeitsanalyse.
   - Asiatische Doppelstunde (chinesische Tierkreis-Stunde).

2. **Partner-Check (궁합 / Gunghap)**:
   - Eingabe der Geburtsdaten zweier Personen.
   - Berechnung der Beziehungs-Chemie (0–100%) basierend auf den Fünf Elementen (상생, 상극, 비견) und Himmelsverschmelzungen (천간합: Gap-Gi, Eul-Gyeong, Byeong-Sin, Jeong-Im, Mu-Gye).
   - Humorvolles deutsches Fazit, Alltagstipp und typischer Zündstoff.

3. **Teilen & Kopieren**:
   - Web Share API mit automatischer Zwischenablage-Fallback-Funktion.

## Entwicklung & Build

```bash
# Entwicklungsserver starten
npm start

# Unit Tests (Vitest) ausführen
npm test

# Production Build erstellen
npm run build
```
