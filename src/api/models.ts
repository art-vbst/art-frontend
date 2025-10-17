import { BaseModel } from './http';
import { Artwork } from './types';

export const ArtworkModel = new BaseModel<Artwork>('/artworks/');
