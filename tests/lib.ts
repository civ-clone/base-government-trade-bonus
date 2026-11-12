import AvailableGovernmentRegistry from '@civ-clone/core-government/AvailableGovernmentRegistry';
import Government from '@civ-clone/core-government/Government';
import Player from '@civ-clone/core-player/Player';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Yield from '@civ-clone/core-yield/Yield';

export class Bread extends Yield {}
export class Coin extends Yield {}

export class Strict extends Government {}
export class Open extends Government {}
export class Free extends Government {}

export const governmentOf = (
  GovernmentType: typeof Government
): PlayerGovernment => {
  const ruleRegistry = new RuleRegistry(),
    playerGovernment = new PlayerGovernment(
      new Player(ruleRegistry),
      new AvailableGovernmentRegistry(),
      ruleRegistry
    );

  playerGovernment.set(new GovernmentType());

  return playerGovernment;
};
