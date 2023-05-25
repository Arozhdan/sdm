import { type Media } from "./Media";

export interface Seo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: any;
  structuredData: any;
  metaViewport: any;
  canonicalURL: any;
  metaImage: MetaImage;
  metaSocial: MetaSocial[];
}
export interface MetaImage {
  id: number;
  attributes: Media;
}
export interface MetaSocial {
  id: number;
  socialNetwork: string;
  title: string;
  description: string;
}

export interface Image {
  data?: {
    id: number;
    attributes: Media;
  };
}
