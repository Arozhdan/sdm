import { type Media } from "./Media";
import { type Seo } from "./Seo";

export interface ServicesResponse {
  data: Service[];
}

export interface Service {
  id: number;
  attributes: ServiceAttributes;
}

export interface ServiceAttributes {
  title: string;
  subtitle?: string;
  subtitle2?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  slug: string;
  introItems: IntroItem[];
  reasons: Reason[];
  content: Content;
  bonuses: Bonus[];
  optional: Optional[];
  seo: Seo;
  image: {
    data: {
      id: number;
      attributes: Media;
    };
  };
  headerImage: {
    data: {
      id: number;
      attributes: Media;
    };
  };
  colorTheme?: "dark" | "primary" | "white";
  headerImagePosition?: "bottom" | "right";
  textColor?: "dark" | "white";
  pricing?: Pricing;
  headerItems?: Optional[];
}
export interface IntroItem {
  id: number;
  text: string;
}
export interface Reason {
  id: number;
  text: string;
}

export interface Content {
  id: number;
  title?: string;
  items: Item[];
}

export interface Bonus {
  id: number;
  title: string;
  pricing?: Pricing;
}

export interface Item {
  id: number;
  title: string;
  value: string;
}

export interface Optional {
  id: number;
  text: string;
}

export interface Pricing {
  id: number;
  rub: number;
  eur?: number;
}
