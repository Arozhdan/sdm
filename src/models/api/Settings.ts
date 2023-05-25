export interface Settings {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    siteName: string;
    contacts: Contacts;
  };
}

export interface Contacts {
  email: string;
  telegram: string;
  instagram: string;
  whatsapp: string;
  address: string;
  phone: string;
}
