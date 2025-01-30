import EventIcon from '@mui/icons-material/Event';
import PaletteIcon from '@mui/icons-material/Palette';
import FestivalIcon from '@mui/icons-material/Festival';
import RadioIcon from '@mui/icons-material/Radio';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

export const MAX_DESCRIPTION_LENGTH = 200;

export const NAVIGATION_LINKS = [
  {
    title: 'Events',
    path: '/events',
    icon: EventIcon,
  },
  {
    title: 'Art',
    path: '/art',
    icon: PaletteIcon,
  },
  {
    title: 'Camps',
    path: '/camps',
    icon: FestivalIcon,
  },
  {
    title: 'Radio',
    path: '/radio',
    icon: RadioIcon,
  },
  {
    title: 'Vehicles',
    path: '/vehicles',
    icon: DriveEtaIcon,
  },
];

export const EVENT_DAYS = [
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const EVENT_TIMEZONE = 'America/Detroit';
