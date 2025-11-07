import type { Artwork, OrderPublic } from '@art-vbst/art-types';
import { BaseModel } from './http';

export const ArtworkModel = new BaseModel<Artwork>('/artworks');
export const OrderModel = new BaseModel<OrderPublic>('/orders/public');
