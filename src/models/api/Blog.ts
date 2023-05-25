import { type Media } from "./Media";
import { type Seo } from "./Seo";

export interface BlogPage {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    title: string;
    locale: string;
    seo: Seo;
    image: {
      data: {
        id: number;
        attributes: Media;
      };
    };
  };
}

export interface Blog {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    title: string;
    description: string;
    slug: string;
    seo: Seo;
    layout: Layout[];

    image: {
      data: {
        id: number;
        attributes: Media;
      };
    };
  };
}

export interface Layout {
  id: number;
  __component: string;
  text?: string;
  image?: {
    data: {
      attributes: Media;
    };
  };
}
