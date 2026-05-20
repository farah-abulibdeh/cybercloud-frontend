# CyberCloud Frontend

React/Vite frontend for the CyberCloud microservices project.

## Services

The frontend calls these Azure Web App microservices through HTTPS:

- Account & Home Service
- Device Registry Service
- Device Control & Monitoring Service
- Security & Access Logging Service

The databases remain private behind each microservice.

## Configure API URLs

Update `.env.production` before deploying:

```env
VITE_ACCOUNT_HOME_API=https://accounttss-h6cbhuhjbtcadjfb.uaenorth-01.azurewebsites.net
VITE_DEVICE_REGISTRY_API=https://cybcercloud-dev-reg-d9c4emawaffvfeb8.switzerlandnorth-01.azurewebsites.net
VITE_DEVICE_CONTROL_API=https://device-control-service-chb2cgebcgbcc4d5.westeurope-01.azurewebsites.net
VITE_SECURITY_API=https://security-logging-service-ezd8dtdqatcba2f0.westeurope-01.azurewebsites.net/
```

Do not add a trailing slash at the end of URLs.

## Run locally for quick testing

```bash
npm install
npm run dev
```

## Build for Azure Static Web Apps

```bash
npm install
npm run build
```

Azure Static Web Apps settings:

- App location: `/`
- API location: leave empty
- Output location: `dist`
- Build command: `npm run build`

## CORS

After deploying the frontend, go to every backend Azure Web App:

`Web App -> API -> CORS`

Add the deployed Static Web App URL, for example:

```text
https://your-frontend.azurestaticapps.net
```

Also add `http://localhost:5173` only if testing locally.
