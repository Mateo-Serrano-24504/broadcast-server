import { Entity } from '../../../infraestructure';
import { RefreshTokenData } from './token.types';

export type RefreshTokenEntity = Entity<number> & RefreshTokenData;
