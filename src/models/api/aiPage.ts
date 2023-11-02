import { Media } from "./Media";

export interface AiResponse {
  title1: string;
  title2: string;
  title3: string;
  testimonialsTItle: string;
  footerTitle: string;
  footerSubtitle: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  ctaTtitle: string;
  ctaSubtitle: string;
  media: {
    data: {
      attributes: Media;
    };
  };
  headerItems: HeaderItem[];
  helpsTo: HeaderItem[];
  steps: Step[];
  footerItems: FooterItem[];
  prompts: {
    data: Prompt[];
  };
}

export interface Prompt {
  id: number;
  attributes: {
    name: string;
    description: string;
  };
}

export interface HeaderItem {
  id: number;
  text: string;
}

export interface Step {
  id: number;
  title: string;
  subtitle?: string;
  image: {
    data: {
      attributes: Media;
    };
  };
}

export interface FooterItem {
  id: number;
  text: string;
}
