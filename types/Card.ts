export type Card = {
  id: string;
  name: string;
  prices?: {
    usd?: string;
  };

  mana_cost?: string;
  type_line?: string;
  oracle_text?: string;

  image_uris?: {
    normal: string;
    large: string;
  };
  
  printed_name?: string;
  printed_text?: string;

  card_faces?: {
  name: string;
  printed_name?: string;
  oracle_text?: string;
  printed_text?: string;
  image_uris?: {
    normal: string;
    large: string;
  };
}[];
}