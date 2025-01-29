import React, { useState, useEffect } from 'react';

import { INITIAL_DATA, DataContext } from 'contexts/data';

import events from 'data/events.json';

function DataContextProvider({ children }) {
  const [dataState, setDataState] = useState(INITIAL_DATA);
  useEffect(() => {
    setDataState((old) => ({
      ...old,
      events: Object.fromEntries(
        events.map((event) => [event.event_id, event])
      ),
    }));

    const eventTimes = events.reduce((collectedTimes, event) => {
      return [
        ...collectedTimes,
        ...event.event_times.map((eventTime) => ({
          ...eventTime,
          event,
        })),
      ];
    }, []);
    setDataState((old) => ({
      ...old,
      eventTimes: Object.fromEntries(
        eventTimes.map((eventTime) => [eventTime.event_time_id, eventTime])
      ),
    }));
  }, []);
  return (
    <DataContext.Provider value={dataState}>{children}</DataContext.Provider>
  );
}

export default DataContextProvider;
