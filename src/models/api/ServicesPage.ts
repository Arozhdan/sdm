import { type Media } from "./Media";

export interface ServicesPage {
  data: {
    id: number;
    attributes: Attributes;
  };
}

export interface Attributes {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  headerLink: HeaderLink;
  video: Media;
}

export interface HeaderLink {
  id: number;
  label: string;
  url: string;
}
