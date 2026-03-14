export interface Contact {
    id: string,
    avatarUrl: string,
    name: string,
    phone: string,
    online: boolean,
    lastConnection: string,
    currentLocation: Locations,
    idChat: string
}

export interface ContactInputs {
    name: string,
    phone: string
}

export type Locations = 'Academia Mágica' | 'Centro de Indawo' | 'Sigtuna Beach' | "Ménima's Gym" | 'Palacio Real' | 'Desconocido'