# base-government-trade-bonus

A government's bonus on what a city's squares yield, as a library for a ruleset's tile yield modifiers:

- `lib/tradeBonus`: `tradeBonus(BonusYieldType, Governments, CelebratingGovernments, threshold = 0, amount = 1)`
  returns a `TradeBonus`, `(YieldType, value, government, celebrating = false) => number`. A yield of
  `BonusYieldType` of more than `threshold` (a square that already has some) gains `amount` under one of
  `Governments`, or, while the city is celebrating, under one of `CelebratingGovernments`. A `null` government (a
  player with none yet) has no bonus.

The ruleset says which governments and yield type, the threshold and the amount. A library: it registers no rules.
See `civ1-world` for Civilization's.
