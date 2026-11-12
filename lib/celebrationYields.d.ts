import City from '@civ-clone/core-city/City';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';
import Tile from '@civ-clone/core-world/Tile';
import Yield from '@civ-clone/core-yield/Yield';
/** The government's steps on one of a square's yields, for a city that is celebrating or not. */
export type GovernmentSteps = (
  YieldType: typeof Yield,
  value: number,
  government: PlayerGovernment | null,
  celebrating: boolean
) => number;
/** What happens to a square's yields after the government's steps (for example, a halving), per square. */
export type AfterSteps = (tile: Tile) => (value: number) => number;
/**
 * The difference celebrating makes to the squares `city` works. A square's own yields are worked out for a city that
 *  isn't celebrating, so for each of `YieldTypes` this takes what the square yields before the steps (its yields less
 *  those from `stepProviders`), runs it through `steps` again as a celebrating city and then through `afterSteps`, and
 *  returns the difference from what the square yields now, as a yield provided by `<tile id>: celebration`.
 */
export declare const celebrationYields: (
  city: City,
  government: PlayerGovernment,
  YieldTypes: (typeof Yield)[],
  stepProviders: string[],
  steps: GovernmentSteps,
  afterSteps: AfterSteps
) => Yield[];
export default celebrationYields;
