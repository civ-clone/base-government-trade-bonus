# base-government-trade-bonus

A government's bonus on what a city's squares yield, and the difference celebrating makes, as a library for a
ruleset's tile yield modifiers and city yield rules:

- `lib/tradeBonus`: `tradeBonus(BonusYieldType, Governments, CelebratingGovernments, amount = 1, threshold = 0)`
  returns a `TradeBonus`, `(YieldType, value, government, celebrating = false) => number`. A yield of
  `BonusYieldType` of more than `threshold` (a square that already has some) gains `amount` under one of
  `Governments`, or, while the city is celebrating, under one of `CelebratingGovernments`. A `null` government (a
  player with none yet) has no bonus.
- `lib/celebrationYields`: `celebrationYields(city, government, YieldTypes, stepProviders, steps, afterSteps)`, the
  yields to add to a celebrating city. A square's own yields are worked out for a city that isn't celebrating, so for
  each of `YieldTypes` this takes what each worked square yields before the government's steps (less the yields from
  `stepProviders`), runs it through `steps(YieldType, value, government, true)` and then `afterSteps(tile)`, and
  returns the difference, provided by `<tile id>: celebration`.

The ruleset says which governments, yield types and amounts, how its steps combine, and what follows them. A library:
it registers no rules. See `civ1-world` and `civ1-city-happiness` for Civilization's.
