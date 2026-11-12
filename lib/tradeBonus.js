"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeBonus = void 0;
/**
 * A yield of `BonusYieldType` that is more than `threshold` (that is, a square that already has some) gains `amount`
 *  under one of `Governments`, or, while the city is celebrating, under one of `CelebratingGovernments`.
 */
const tradeBonus = (BonusYieldType, Governments, CelebratingGovernments, amount = 1, threshold = 0) => (YieldType, value, government, celebrating = false) => value > threshold &&
    YieldType === BonusYieldType &&
    government !== null &&
    (celebrating
        ? government.is(...CelebratingGovernments)
        : government.is(...Governments))
    ? value + amount
    : value;
exports.tradeBonus = tradeBonus;
exports.default = exports.tradeBonus;
//# sourceMappingURL=tradeBonus.js.map