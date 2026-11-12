"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.celebrationYields = void 0;
/**
 * The difference celebrating makes to the squares `city` works. A square's own yields are worked out for a city that
 *  isn't celebrating, so for each of `YieldTypes` this takes what the square yields before the steps (its yields less
 *  those from `stepProviders`), runs it through `steps` again as a celebrating city and then through `afterSteps`, and
 *  returns the difference from what the square yields now, as a yield provided by `<tile id>: celebration`.
 */
const celebrationYields = (city, government, YieldTypes, stepProviders, steps, afterSteps) => city
    .tilesWorked()
    .entries()
    .flatMap((tile) => {
    const tileYields = tile.yields(city.player()), after = afterSteps(tile);
    return YieldTypes.flatMap((YieldType) => {
        const ofType = tileYields.filter((tileYield) => tileYield instanceof YieldType), current = ofType.reduce((total, tileYield) => total + tileYield.value(), 0), before = ofType
            .flatMap((tileYield) => tileYield.values())
            .filter(([, provider]) => !stepProviders.includes(provider))
            .reduce((total, [value]) => total + value, 0), value = after(steps(YieldType, before, government, true));
        if (value === current) {
            return [];
        }
        return [new YieldType(value - current, `${tile.id()}: celebration`)];
    });
});
exports.celebrationYields = celebrationYields;
exports.default = exports.celebrationYields;
//# sourceMappingURL=celebrationYields.js.map