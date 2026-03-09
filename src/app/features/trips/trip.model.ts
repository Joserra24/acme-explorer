import { Entity } from '../../shared/entity.model';

export interface Trip extends Entity {
  ticker: string;
  title: string;
  description: string;
  price: number;
  city: string;
  country: string;
  difficulty: 'easy' | 'medium' | 'hard';
  maxParticipants: number;
  startDate: Date;
  endDate: Date;
  pictures?: string[];
  cancelled?: boolean;
  cancelReason?: string;
}
