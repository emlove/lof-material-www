import EventIcon from '@mui/icons-material/Event';
import PaletteIcon from '@mui/icons-material/Palette';
import FestivalIcon from '@mui/icons-material/Festival';
import RadioIcon from '@mui/icons-material/Radio';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const MAX_DESCRIPTION_LENGTH = 200;

export const NAVIGATION_LINKS = [
  {
    title: 'Events',
    path: '/events',
    icon: EventIcon,
  },
  {
    title: 'Favorites',
    path: '/favorites',
    icon: FavoriteIcon,
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
    title: 'Radio SGC',
    path: '/radio',
    icon: RadioIcon,
  },
  {
    title: 'Art Cars',
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
