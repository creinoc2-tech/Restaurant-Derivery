// src/client.tsx — versión correcta para tu versión instalada
import { StartClient } from '@tanstack/react-start/client'
import { hydrateRoot } from 'react-dom/client'

hydrateRoot(document, <StartClient />)