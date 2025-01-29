import { useContext, createContext } from 'react';

export const INITIAL_DATA = {
  events: null,
  eventTimes: null,
};

export const DataContext = createContext(INITIAL_DATA);

export function useEvents() {
  return useContext(DataContext).events;
}

export function useEvent(id) {
  const events = useEvents();
  return events && events[id];
}

export function useEventTimes() {
  return useContext(DataContext).eventTimes;
}

export function useEventTime(id) {
  const eventTimes = useEventTimes();
  return eventTimes && eventTimes[id];
}
