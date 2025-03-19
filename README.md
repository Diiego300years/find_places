# 🌍 Angular Translation System with Strong Typing

This project uses Angular, TS, Python, and Flask_RESTful to handle dynamic translations effectively. Here's a detailed explanation of the recent improvements and changes related to language handling.

---

## Core concepts

### 1. **Handling translations**

The translation system follows a structured approach to ensure:

✅ Accurate language switching.</br>
✅ Efficient data fetching from the backend (Flask_RESTful).</br>
✅ Improved type safety through TypeScript.</br>
✅ Scalability for adding more languages in the future.</br>



### 2. **Grab emails**
The main idea is to quickly gather information about potential costs for birthday or other party. I'd like to know the prices of several locations.

### 3. **Send emails**
It'll work as udw in gmail app.

### 4. **Wait for answers**
You can log in after some time and check the answers. 

### Flask data structure
This is a temporary solution, before a well-protected backend
```json
{
  "search": {
    "pl": {
      "header": "Szukamy kontaktów!",
      "description": "Dane pomyślnie skopiowane:",
      "copy_button": "Kopiuj",
      "message_copy_button": "dane",
      "navigation": "Szukaj miejsca"
    },
    "en": {
      "header": "Looking for contacts!",
      "description": "Data copied successfully:",
      "copy_button": "Copy",
      "message_copy_button": "data",
      "navigation": "Search for a place"
    },
    "de": {
      "header": "Kontakte gesucht!",
      "description": "Daten erfolgreich kopiert:",
      "copy_button": "Kopie",
      "message_copy_button": "Daten",
      "navigation": "Suche nach einem Ort"
    }
  },
  "home": {
    "pl": {
      "header": "Witaj w wyszukiwarce miejsc",
      "button_input": "Filtruj według miasta lub nazwy",
      "search": "Szukaj",
      "name": "Nazwa",
      "city": "Miasto",
      "navigation": "Szukaj miejsca"
    },
    "en": {
      "header": "Welcome to the place finder",
      "button_input": "Filter by city or name",
      "search": "Search",
      "name": "Name",
      "city": "City",
      "navigation": "Search place"
    },
    "de": {
      "header": "Willkommen beim Ortsfinder",
      "button_input": "Filtern nach Stadt oder Name",
      "search": "suchen",
      "name": "Name",
      "city": "Stadt",
      "navigation": "Ort suchen"
    }
  }
}
```

### ⚠️ Notes on JSON Translation File
- **Ensure UTF-8 encoding** to avoid issues with Polish diacritics.
- For consistency, maintain uniform key order across language objects.

