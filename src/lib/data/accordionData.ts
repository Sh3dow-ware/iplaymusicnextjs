import type {AccordionItem} from '@/lib/types/accordion.types';
import { COLORS } from '@/lib/colors';

export const accordionData: AccordionItem[] = [
  {
    title: 'Alternative',
    color: COLORS.pink,
    subItems: []
  },
  {
    title: 'Blues',
    color: COLORS.red,
    subItems: [
      'Acoustic Blues',
      'Blues Rock',
      'Canadian Blues',
      'Jazz Blues',
      'Piano Blues',
      'Soul Blues',
      'Swamp Blues'
    ]
  },
  {
    title: 'Classical',
    color: COLORS.orange,
    subItems: [
      'Acoustic Blues',
      'Blues Rock',
      'Canadian Blues',
      'Jazz Blues',
      'Piano Blues',
      'Soul Blues',
      'Swamp Blues'
    ]
  },
  {
    title: 'Country',
    color: COLORS.yellow,
    subItems: [
      'Acoustic Blues',
    ]
  },
  {
    title: 'Dance',
    color: COLORS.lightGreen,
    subItems: [
      'Dancing sub-item',
    ]
  },
  {
    title: 'Electronic',
    color: COLORS.darkGreen,
    subItems: [
      'is this the green section?',
    ]
  },
  {
    title: 'Fitness & Workout',
    color: COLORS.teal,
    subItems: [
      'what is popping?',
    ]
  },
  {
    title: 'Hip-Hop/Rap',
    color: COLORS.lightBlue,
    subItems: [
      'yes',
    ]
  },
  {
    title: 'Industrial',
    color: COLORS.darkBlue,
    subItems: [
      'dark blue',
    ]
  },
];
