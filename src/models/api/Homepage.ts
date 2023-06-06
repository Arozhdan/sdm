import { type Media } from "./Media";
import { type Meta } from "./Meta";
import { type Seo } from "./Seo";

export interface Homepage {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  createdAt: string;
  updatedAt: string;
  locale: string;
  title: string;
  aboutTitle: string;
  aboutText: string;
  aboutImage: {
    data: {
      id: number;
      attributes: Media;
    };
  };
  outro: string;
  twoBlocksTitle: string;
  gainTitle: string;
  headerLink: HeaderLink;
  video: {
    data: Video;
  };
  outroItems: OutroItem[];
  twoBlocks: TwoBlock[];
  seo: Seo;
  gains: Gain[];
}

export interface HeaderLink {
  id: number;
  label: string;
  url: string;
}

export interface Video {
  id: number;
  attributes: Media;
}

export interface OutroItem {
  id: number;
  text: string;
}

export interface Gain {
  id: number;
  text: string;
}

export interface TwoBlock {
  id: number;
  title: string;
  description: string;
  items: TwoBlockItem[];
}

export interface TwoBlockItem {
  id: number;
  text: string;
}

export interface Promo {
  id: number;
  attributes: {
    title: string;
    discount: number;
    link?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}
