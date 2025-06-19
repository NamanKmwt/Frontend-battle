export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  video: string;
  description: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  pricing: string;
  duration: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

export interface Client {
  id: string;
  name: string;
  logo: string;
}