import { tick } from '../../actions/tick';
import { bleedOut } from '../../actions/bleeding';

import reduce from '../playerTick';

describe('The player tick reducer, on each tick : ', () => {
  it('lowers hydration, nourishment, and energy', () => {
    const initialState = {
      stats: {
        health: 100,
        hydration: 100,
        nourishment: 100,
        energy: 100,
      },
    };
    const finalState = reduce(initialState, tick());
    const expectedState = {
      stats: {
        health: 100,
        hydration: 99,
        nourishment: 99,
        energy: 99,
      },
    };
    expect(finalState).toEqual(expectedState);
  });
  it('lowers health if player has bleeding status effect', () => {
    const initialState = {
      stats: {
        health: 100,
        spirit: 100,
      },
      statusEffects: [
        bleedOut(5),
      ],
    };
    const finalState = reduce(initialState, tick());
    const expectedState = {
      stats: {
        health: 95,
        spirit: 100,
      },
      statusEffects: [
        bleedOut(5),
      ],
    };
    expect(finalState).toEqual(expectedState);
  });
});
