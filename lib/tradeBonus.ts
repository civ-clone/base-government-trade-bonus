import Government from '@civ-clone/core-government/Government';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';
import Yield from '@civ-clone/core-yield/Yield';

/**
 * What a government's bonus makes of one of a square's yields. `government` is `null` for a player with no government
 *  yet, which has no bonus.
 */
export type TradeBonus = (
  YieldType: typeof Yield,
  value: number,
  government: PlayerGovernment | null,
  celebrating?: boolean
) => number;

/**
 * A yield of `BonusYieldType` that is more than `threshold` (that is, a square that already has some) gains `amount`
 *  under one of `Governments`, or, while the city is celebrating, under one of `CelebratingGovernments`.
 */
export const tradeBonus =
  (
    BonusYieldType: typeof Yield,
    Governments: (typeof Government)[],
    CelebratingGovernments: (typeof Government)[],
    amount: number = 1,
    threshold: number = 0
  ): TradeBonus =>
  (
    YieldType: typeof Yield,
    value: number,
    government: PlayerGovernment | null,
    celebrating: boolean = false
  ): number =>
    value > threshold &&
    YieldType === BonusYieldType &&
    government !== null &&
    (celebrating
      ? government.is(...CelebratingGovernments)
      : government.is(...Governments))
      ? value + amount
      : value;

export default tradeBonus;
