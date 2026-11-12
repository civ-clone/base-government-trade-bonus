import { Bread, Coin, Free, Open, Strict, governmentOf } from './lib';
import City from '@civ-clone/core-city/City';
import Government from '@civ-clone/core-government/Government';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';
import Tile from '@civ-clone/core-world/Tile';
import Yield from '@civ-clone/core-yield/Yield';
import celebrationYields from '../lib/celebrationYields';
import { expect } from 'chai';
import tradeBonus from '../lib/tradeBonus';

const PENALTY = 'penalty',
  BONUS = 'bonus',
  HALVED = 'halved';

// A stand-in for a ruleset's steps: a penalty on yields above 2 under `Strict` unless celebrating, then the bonus.
const bonus = tradeBonus(Coin, [Free], [Open, Free]),
  steps = (
    YieldType: typeof Yield,
    value: number,
    government: PlayerGovernment | null,
    celebrating: boolean
  ): number =>
    bonus(
      YieldType,
      value > 2 && !celebrating && government?.is(Strict) ? value - 1 : value,
      government,
      celebrating
    );

describe('celebrationYields', (): void => {
  const setUp = (
    GovernmentType: typeof Government,
    tileYields: Yield[],
    halved: boolean = false
  ): Yield[] => {
    const tile = {
        id: () => 'tile',
        yields: () => tileYields,
      } as unknown as Tile,
      city = {
        player: () => null,
        tilesWorked: () => ({ entries: () => [tile] }),
      } as unknown as City;

    return celebrationYields(
      city,
      governmentOf(GovernmentType),
      [Bread, Coin],
      [PENALTY, BONUS, HALVED],
      steps,
      () => (value: number) => halved ? Math.ceil(value / 2) : value
    );
  };

  const total = (yields: Yield[], YieldType: typeof Yield): number =>
    yields
      .filter((cityYield) => cityYield instanceof YieldType)
      .reduce((sum, cityYield) => sum + cityYield.value(), 0);

  it('gives back a penalty that celebrating lifts', (): void => {
    const yields = setUp(Strict, [
      new Bread(2, 'land'),
      new Bread(1, 'water'),
      new Bread(-1, PENALTY),
    ]);

    expect(total(yields, Bread)).to.equal(1);
    expect(total(yields, Coin)).to.equal(0);
  });

  it('adds a bonus that only celebrating gives', (): void => {
    const yields = setUp(Open, [new Bread(1, 'land'), new Coin(2, 'land')]);

    expect(total(yields, Coin)).to.equal(1);
    expect(total(yields, Bread)).to.equal(0);
  });

  it('returns nothing when celebrating changes nothing', (): void => {
    expect(setUp(Free, [new Coin(2, 'land'), new Coin(1, BONUS)])).to.be.empty;
    expect(setUp(Open, [new Bread(1, 'land')])).to.be.empty;
  });

  it('applies the after-steps hook to the celebrating value', (): void => {
    // 3 coin, halved to 2 for a city that isn't celebrating; celebrating, 4, halved to 2: no difference.
    expect(setUp(Open, [new Coin(3, 'land'), new Coin(-1, HALVED)], true)).to.be
      .empty;

    // 4 coin, halved to 2; celebrating, 5, halved (rounded up) to 3.
    const yields = setUp(
      Open,
      [new Coin(4, 'land'), new Coin(-2, HALVED)],
      true
    );

    expect(total(yields, Coin)).to.equal(1);
  });

  it('names the square in the provider', (): void => {
    const [celebration] = setUp(Open, [new Coin(1, 'land')]);

    expect(celebration.values()).to.deep.equal([[1, 'tile: celebration']]);
  });
});
