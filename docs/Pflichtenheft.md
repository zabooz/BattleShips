# Pflichtenheft für "Schiffe versenken" Spiel

## 1. Einleitung

### 1.1 Zielsetzung
Das Ziel dieses Projekts ist die Entwicklung eines "Schiffe versenken"-Spiels, das über einen Server läuft und mehrere Clients unterstützt. Spieler können sich einloggen, eine Lobby betreten und gegeneinander oder gegen eine KI (künstliche Intelligenz) spielen. Das System soll erweiterbar sein, um später eine Datenbank zu integrieren.

### 1.2 Abgrenzung
Dieses Projekt beschränkt sich auf die grundlegenden Funktionen des Spiels: Anmeldung, Lobby-Management, Spielstart, Spielverlauf und Kommunikation zwischen Client und Server, sowie die Integration einer KI als Gegenspieler. Sowohl der Server als auch der Client müssen erstellt werden.

## 2. Systemübersicht

### 2.1 Komponenten
- **Client**: Benutzeroberfläche, über die Spieler interagieren.
- **Server**: Verarbeitet Anmeldungen, verwaltet Spiele und Spielinstanzen, sowie KI-Interaktionen.
- **KI**: Selbst programmierte KI und/oder eine externe KI (z.B. ChatGPT), die als Gegenspieler fungieren können.

## 3. Anforderungen

### 3.1 Funktionale Anforderungen

#### 3.1.1 Anmeldung
- Spieler können sich mit einem Benutzernamen einloggen.
- Doppelter Name  --> uuid
- Der Server authentifiziert die Spieler und gibt eine Bestätigung oder Fehlermeldung zurück.

#### 3.1.2 Lobby-Management
- Nach erfolgreicher Anmeldung können Spieler der Spiellobby beitreten.
- In der Lobby können Spieler einem Spiel beitreten oder eine neue Spielinstanz erstellen.
<!-- - Spieler können ein Spiel erstellen und dabei den Namen der Instanz sowie optional ein Passwort festlegen. -->
<!-- - Spieler, die einem passwortgeschützten Spiel beitreten möchten, müssen das Passwort eingeben, um Zugang zu erhalten. -->
- Die Lobby zeigt eine Liste der verfügbaren Spiele und deren Status.
- Die Lobby hat einen Refresh-Button, mit dem die Liste der verfügbaren Spiele und deren Status aktualisiert werden kann.
- Spieler können wählen, ob sie gegen einen anderen Spieler oder gegen eine KI spielen möchten.
  - **Selbst programmierte KI:** Eine interne KI, die nach festgelegten Algorithmen agiert.
  - **Externe KI (z.B. ChatGPT):** Eine KI, die über eine API angesprochen wird, um Spielzüge zu berechnen und zu liefern.
- Der Server muss in der Lage sein, Spielzüge der KI zu verarbeiten und entsprechend auf den Client zu reagieren.


#### 3.1.3 Player Handshake
- Wenn ein Spieler einem Spiel beitritt, wird eine Anfrage an beide Spieler gesendet, ob sie bereit sind.
- Beide Spieler müssen ihre Bereitschaft bestätigen, bevor das Spiel startet.
- Der Server überprüft die Bereitschaft beider Spieler und initiiert das Spiel, sobald beide Spieler bereit sind.
- Die Startdaten des Spiels werden an beide Clients übermittelt.

#### 3.1.4 Spielverlauf und Spielende
- Spieler setzen ihre Schiffe und geben Schusskoordinaten durch Klick auf das Spielfeld der Benutzeroberfläche ein.
- Der Server überprüft die Schüsse und gibt Rückmeldung, ob ein Schiff getroffen oder verfehlt wurde.
- Der Spielstand wird aktualisiert und an beide Spieler übertragen.
- Nach dem Spielende erhalten die Spieler die Möglichkeit, entweder ein neues Spiel zu starten oder zurück in die Lobby zu kehren.
- Eine entsprechende Benutzeroberfläche wird angezeigt, um die Auswahl zu ermöglichen.

### 3.2 Nicht-funktionale Anforderungen
- **Performance**: Der Server muss mehrere gleichzeitige Spielinstanzen verwalten können.
<!-- - **Benutzerfreundlichkeit**: Die Benutzeroberfläche muss intuitiv und leicht verständlich sein. -->

## 4. Technische Spezifikationen

### 4.1 Technologien
- **Programmiersprache**: TypeScript
- **Frameworks**: Express für den Server, tailWind für den Client
- **Validierung**: Joi zur Validierung von sämtlichen api-kommunikation.
- **Datenbank**: Die Spiele werden im Cache gespeicher und gehen verloren, aber das System soll erweiterbar sein, um später eine Datenbank (z.B. PostgreSQL oder MongoDB) zu integrieren.
- **Kommunikationsprotokoll**: REST für die Kommunikation zwischen Client und Server
- **UUID**: Spiel-IDs werden mit UUIDs (Universally Unique Identifiers) erstellt.

### 4.2 Systemarchitektur
- **Client-Server-Architektur**: Der Client kommuniziert über REST-API-Endpunkte (HTTP/HTTPS) mit dem Server.
- **KI-Integration**: computer gegner modulare archtikture über schnitt stelle verschiedene gegner, eigen ki mit eigenen strategie
  - Selbst programmierte KI: Läuft auf dem Server und wird direkt angesprochen.
  - Externe KI (z.B. ChatGPT): Kommunikation über eine API (z.B. OpenAI API) zur Berechnung von Spielzügen.
- **Datenfluss**:
  - **Anmeldung**: Client → Server (Login-Request) → Server (Validierung mit Joi, Authentifizierung) → Client (Login-Response)
  - **Lobby-Management**: Client → Server (Lobby-Request) → Server (Lobby-Management) → Client (Lobby-Update)
  - **Spielstart**: Client → Server (Bereitschaftsanfrage) → Server (Bereitschaftsbestätigung) → Client (Spielstart)
  - **Spielverlauf**: Client → Server (Spielzug-Request) → Server (Spielzug-Verarbeitung) → Client (Spielzug-Response)
  - **KI-Interaktion**: Server → KI (Spielzug-Request) → KI (Spielzug-Response) → Server → Client
  - **Spielende**: Server → Client (Spielende-Benachrichtigung) → Client (Auswahl Neues Spiel oder Lobby)
  - **Passwortgeschützte Spielinstanz**: Client → Server (Spielerstellung mit Passwort) → Server (Spielverwaltung) → Client (Passworteingabe bei Spielbeitritt)

## 5. Implementierungsdetails

### 5.1 Anmeldung
1. **Client**: Login-Formular zur Eingabe von Benutzername.
2. **Server**: Empfang der Anmeldedaten, Validierung mit Joi, Rückmeldung an den Client.

### 5.2 Lobby-Management
1. **Client**: Anzeige der Spiel-Liste und Option zur Erstellung eines neuen Spiels.
2. **Server**: Verwaltung der Spiele, Hinzufügen neuer Spieler, Aktualisierung der Spiel-Liste.
3. **Client**: Möglichkeit, beim Erstellen eines neuen Spiels ein Passwort festzulegen.
4. **Server**: Speichern und Verwalten der Passwortinformationen für die Spielinstanz.
5. **Client**: Aufforderung zur Passworteingabe, wenn ein Spieler einem passwortgeschützten Spiel beitreten möchte.
6. **Server**: Überprüfung des Passworts und Zulassen oder Verweigern des Zugangs zum Spiel.
7. **Refresh-Button**: Aktualisierung der Spiel-Liste durch eine Anfrage an den Server, um die neuesten Informationen abzurufen und anzuzeigen.

### 5.3 Player Handshake
1. **Client**: Anzeige der Bereitschaftsanfrage an beide Spieler, wenn ein Spieler einem Spiel beitritt.
2. **Server**: Empfang der Bereitschaftsbestätigungen beider Spieler, Überprüfung der Bereitschaft, und Start des Spiels, sobald beide Spieler bereit sind.
3. **Client**: Empfang der Spielstartdaten nach Bestätigung der Bereitschaft.

### 5.4 Spielverlauf und Spielende
1. **Client**: Spieler setzen ihre Schiffe und geben Schusskoordinaten durch Klick auf das Spielfeld der Benutzeroberfläche ein.
2. **Server**: Überprüfung der Schüsse, Aktualisierung des Spielstands, Rückmeldung an die Clients.
3. **Client und Server**: Nach dem Spielende erhalten die Spieler die Möglichkeit, entweder ein neues Spiel zu starten oder zurück in die Lobby zu kehren. Eine entsprechende Benutzeroberfläche wird angezeigt, um die Auswahl zu ermöglichen.

### 5.5 Spielen gegen KI
1. **Client**: Spieler wählt die Option, gegen eine KI zu spielen.
2. **Server**:
   - Bei einer selbst programmierten KI: Berechnung der Spielzüge nach festgelegten Algorithmen.
   - Bei einer externen KI (z.B. ChatGPT): Anfragen der Spielzüge über eine API und Verarbeitung der Antworten.
3. **Client**: Empfang der Spielzugdaten von der KI und Fortsetzung des Spiels.

## 6. Projektplanung

### 6.1 Meilensteine

**Phase 1: Implementierung der Grundfunktionalitäten**
- **M1**: Entwicklung der Anmeldefunktionalität
  - **Schritte**: Implementierung des Login-Formulars, Validierung mit Joi, Server-Authentifizierung
- **M2**: Entwicklung des Lobby-Managements
  - **Schritte**: Implementierung der Lobby-Oberfläche, Erstellung und Beitritt zu Spielen, Passwortschutz
- **M3**: Entwicklung der Player Handshake-Funktionalität
  - **Schritte**: Implementierung der Bereitschaftsanfragen und -bestätigungen
- **M4**: Implementierung der Spielverlauf-Logik
  - **Schritte**: Setzen der Schiffe, Eingabe und Überprüfung der Schusskoordinaten, Spielstandaktualisierung
- **M5**: Implementierung der Spielende-Optionen
  - **Schritte**: Anzeige der Optionen für neues Spiel oder Rückkehr zur Lobby

**Phase 2: Erweiterte Funktionalitäten und Tests**
- **M6**: Implementierung der KI-Logik
  - **Schritte**: Entwicklung der selbst programmierten KI, Integration der externen KI
- **M7**: Erstellung und Fertigstellung des Clients
  - **Schritte**: Entwicklung der Benutzeroberfläche für Anmeldung, Lobby, Spielverlauf und Spielende
- **M8**: Durchführung der Tests und Fehlerbehebung



