import { Artwork } from '@art-vbst/art-types';
import { BaseModel } from './http';

export const ArtworkModel = new BaseModel<Artwork>('/artworks/');
