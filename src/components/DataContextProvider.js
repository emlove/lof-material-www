import React, { useState, useEffect } from 'react';

import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { INITIAL_DATA, DataContext } from 'contexts/data';

import arts from 'data/art.json';
import events from 'data/events.json';
import camps from 'data/camps.json';
import radios from 'data/radio.json';
import vehicles from 'data/vehicles.json';

import { EVENT_TIMEZONE } from 'const';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

function DataContextProvider({ children }) {
  const [dataState, setDataState] = useState(INITIAL_DATA);
  useEffect(() => {
    const parsedEvents = events.map((event) => ({
      ...event,
      event_times: event.event_times.map((eventTime) => ({
        ...eventTime,
        starting: dayjs.tz(eventTime.starting, EVENT_TIMEZONE),
        ending: dayjs.tz(eventTime.ending, EVENT_TIMEZONE),
      })),
    }));

    setDataState((lastState) => ({
      ...lastState,
      events: Object.fromEntries(
        parsedEvents.map((event) => [event.event_id, event])
      ),
    }));

    const eventTimes = parsedEvents.reduce((collectedTimes, event) => {
      return [
        ...collectedTimes,
        ...event.event_times.map((eventTime) => ({
          ...eventTime,
          event,
        })),
      ];
    }, []);
    setDataState((lastState) => ({
      ...lastState,
      eventTimes: Object.fromEntries(
        eventTimes.map((eventTime) => [eventTime.event_time_id, eventTime])
      ),
    }));

    setDataState((lastState) => ({
      ...lastState,
      arts: Object.fromEntries(arts.map((art) => [art.id, art])),
    }));

    setDataState((lastState) => ({
      ...lastState,
      camps: Object.fromEntries(camps.map((camp) => [camp.id, camp])),
    }));

    setDataState((lastState) => ({
      ...lastState,
      radios: Object.fromEntries(
        radios.map((radio) => [
          radio.id,
          {
            ...radio,
            radio_time: dayjs.tz(radio.radio_time, EVENT_TIMEZONE),
          },
        ])
      ),
    }));

    setDataState((lastState) => ({
      ...lastState,
      vehicles: Object.fromEntries(
        vehicles.map((vehicle) => [vehicle.id, vehicle])
      ),
    }));
  }, []);
  return (
    <DataContext.Provider value={dataState}>{children}</DataContext.Provider>
  );
}

export default DataContextProvider;
