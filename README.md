# Úkol: Interaktivní galerie obrázků se zobrazením polohy na mapě

## Akceptační kritéria

### Výsledný kód

1. Je validní dle W3C.
2. Je přístupný alespoň dle WCAG 2.1.
3. Je responzivní telefon—desktop.
4. Je optimalizovaný pro výkon a rychlé načítání (efektivní práce s daty).
5. Je statický a splňuje funkční požadavky.

### Vizuál

- **Desktop** — levý sloupec (šířka 2/3) obsahuje galerii obrázků a pravý mapu.
- **Telefon** — nahoře galerie (70% viewportu) a pod ní mapa vyplňující zbývající prostor.

### Funkční požadavky

1. Galerie funguje a zobrazuje se v posledních dvou verzích nejrozšířenějších prohlížečů.
2. Mapa dynamicky zobrazuje polohy všech obrázků ve viewportu. Při scrollování není žádoucí odstraňování markerů, uživatel má mít 
možnost se klikem n amarker vrátit na obrázek.
3. Při scrollu posouvat mapu, aby byly vidět markery z aktuálního viewportu.

Volitelně:

- Zobrazte cestu nebo trasu mezi jednotlivými body jako simulaci fyzického přemísťování mezi lokacemi.
- Pokud data obsahují informace o směru (azimutu), zobrazte je.

## Poznámky

> Zamyslete se nad tím, jak bude uživatel galerii ovládat. Jaká jsou očekávání uživatele od galerie obrázků.

- Preferováno použití HTML5, CSS, JS…
- Frameworky jako React nejsou povoleny, zdržují a svazují. Pište čistý funkční kód.
- Doporučení: knihovna `leaflet` pro mapové podklady.
- Doporučení: knihovna `exifr` pro práci s metadaty.

### Příklad sloučených metadat dat

```json
{
  "CountryCode": "ISR",
  "CreatorContactInfo": {
    "parseType": "Resource",
    "CiEmailWork": "photos@cebre.us",
    "CiUrlWork": "https://cebre.us"
  },
  "Location": "Baha’istické zahrady",
  "creator": "Cebreus",
  "DateTimeDigitized": "2022-10-20T08:50:41+02:00",
  "DateTimeOriginal": "2022-10-20T08:50:41+02:00",
  "GPSAltitude": 267.2,
  "GPSAltitudeRef": <Uint8Array 00>,
  "GPSImgDirection": 103.78,
  "GPSImgDirectionRef": "T",
  "GPSLatitude": [32, 36, 44.42039972432805],
  "GPSLongitude": [34, 55, 5.7288],
  "GPSSpeed": 0,
  "GPSSpeedRef": "K",
  "GPSTimeStamp": "6:50:41",
  "City": "Haifa",
  "Country": "Izrael",
  "DateCreated": "2022-10-20T08:50:41+02:00",
  "CreateDate": "2022-10-20T07:49:49",
  "ModifyDate": "2022-10-20T08:50:41+02:00",
  "WebStatement": "http://creativecommons.org/licenses/by-nc/4.0/",
  "GPSVersionID": "2.2.0.0",
  "GPSLatitudeRef": "N",
  "GPSLongitudeRef": "E",
  "GPSMapDatum": "WGS-84",
  "GPSDestBearingRef": "True North",
  "GPSDestBearing": 281.28466796875,
  "GPSDateStamp": "2022:10:20",
  "GPSHPositioningError": 3.5355339046563916,
  "latitude": 32.61233899992342,
  "longitude": 34.918257999999994
}
```
