import React from 'react';
import * as T from 'fp-ts/lib/Task';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { AS } from '../logic/AppState';
import { UpdateState } from 'react-callback-router/dist/withCallbackRoutes';
import SquirrelRoute from './SquirrelRoute';
import SquirrelErrorRoute from './SquirrelErrorRoute';
import { getNutErrorFromREST, getTreeErrorFromREST } from '../logic/SquirrelREST';

const Landing = ({
  appState,
  updateState,
}: {
  appState: AS,
  updateState: UpdateState<AS>,
}) => {
  return (
    <div>
      <button
        onClick={() => {
          updateState({
            appState: {
              squirrelStuff: E.right({
                id: 100,
                name: 'Rocky',
              }),
            },
            route: '/squirrel',
          });
        }}
      >
        Summon squirrel
      </button>
      <button
        onClick={() => {
          const runRequest = pipe(
            getNutErrorFromREST(),
            T.map(resp => ({
              appState: { squirrelStuff: resp },
              route: '/nutError',
            })),
            T.map(updateState),
          );
          runRequest();
        }}
      >
        Request dangerous nut
      </button>
      <button
        onClick={() => {
          const runRequest = pipe(
            getTreeErrorFromREST(),
            T.map(resp => ({
              appState: { squirrelStuff: resp },
              route: '/treeError',
            })),
            T.map(updateState),
          );
          runRequest();
        }}
      >
        Request dangerous tree
      </button>
      <SquirrelRoute
        appState={appState}
        updateState={updateState}
        customColor='blue'
      />
      <SquirrelErrorRoute
        appState={appState}
        updateState={updateState}
      />
    </div>
  );
}

export default Landing;
