# Social Em
This is a white-label social media engine.

## Shared Libraries
The Social Em suite includes shared libraries to streamline development across clients and servers. These libraries are accessible via standard path aliases defined in the `tsconfig.json` files for each application.

### Path Aliases
- `@lib`: Points to libraries shared across both clients and servers.

## Clients
The clients utilize TypeScript as the primary development language.

### Mobile
The mobile client is built using React Native.

### Web
The web client is built using React and Vite with TypeScript.

#### Setup
1. Navigate to the `clients` directory:
   ```bash
   cd clients
   ```

2. Install dependencies:
   ```bash
   cd web
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Server
The primary considerations for the server are security, scalability, and user privacy.

- The system uses separate microservices for authentication, authorization, content storage, and encryption key storage.
- Posts are encrypted.
- Encryption is handled through public/private key pairs. Friends share public keys to decrypt each other's messages.

### Shared Libraries
- `@server-lib`: Points to libraries shared across all server-side applications.

### Authorization
Used to sign users in and out of the system.

### Authentication
Handles user permissions.

### Content
Stored encrypted user content.  