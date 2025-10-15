export type Artwork = {
  id: string;
  title: string;
  painting_number: number | null;
  painting_year: number | null;
  width_inches: number;
  height_inches: number;
  price_cents: number;
  paper: boolean | null;
  sort_order: number | null;
  sold_at: string | null;
  status: string;
  medium: string;
  category: string;
  images: Image[];
  created_at: string;
  order_id: string | null;
};

export type Image = {
  id: string;
  artwork_id: string;
  is_main_image: boolean;
  image_url: string;
  image_width: number | null;
  image_height: number | null;
  created_at: string;
};
