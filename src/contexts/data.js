import { useContext, createContext } from 'react';

export const INITIAL_DATA = {
  arts: null,
  events: null,
  eventTimes: null,
  camps: null,
  radios: null,
  vehicles: null,
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

export function useArts() {
  return useContext(DataContext).arts;
}

export function useArt(id) {
  const arts = useArts();
  return arts && arts[id];
}

export function useCamps() {
  return useContext(DataContext).camps;
}

export function useCamp(id) {
  const camps = useCamps();
  return camps && camps[id];
}

export function useRadios() {
  return useContext(DataContext).radios;
}

export function useRadio(id) {
  const radios = useRadios();
  return radios && radios[id];
}

export function useVehicles() {
  return useContext(DataContext).vehicles;
}

export function useVehicle(id) {
  const vehicles = useVehicles();
  return vehicles && vehicles[id];
}
