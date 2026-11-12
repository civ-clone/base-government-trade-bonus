import { Bread, Coin, Free, Open, Strict, governmentOf } from './lib';
import { expect } from 'chai';
import tradeBonus from '../lib/tradeBonus';

describe('tradeBonus', (): void => {
  const bonus = tradeBonus(Coin, [Free], [Open, Free]);

  it('adds 1 to a yield of the type that has some, under the listed governments', (): void => {
    expect(bonus(Coin, 1, governmentOf(Free))).to.equal(2);
    expect(bonus(Coin, 3, governmentOf(Free))).to.equal(4);
  });

  it('adds nothing to a yield of the type that has none', (): void => {
    expect(bonus(Coin, 0, governmentOf(Free))).to.equal(0);
  });

  it('adds nothing to any other yield type', (): void => {
    expect(bonus(Bread, 2, governmentOf(Free))).to.equal(2);
  });

  it('adds nothing under any other government, or none', (): void => {
    expect(bonus(Coin, 2, governmentOf(Strict))).to.equal(2);
    expect(bonus(Coin, 2, governmentOf(Open))).to.equal(2);
    expect(bonus(Coin, 2, null)).to.equal(2);
  });

  it('uses the celebrating governments while the city celebrates', (): void => {
    expect(bonus(Coin, 2, governmentOf(Open), true)).to.equal(3);
    expect(bonus(Coin, 2, governmentOf(Free), true)).to.equal(3);
    expect(bonus(Coin, 2, governmentOf(Strict), true)).to.equal(2);
    expect(bonus(Coin, 2, null, true)).to.equal(2);
  });

  it('takes the amount and the threshold as parameters', (): void => {
    const larger = tradeBonus(Coin, [Free], [], 2, 1);

    expect(larger(Coin, 1, governmentOf(Free))).to.equal(1);
    expect(larger(Coin, 2, governmentOf(Free))).to.equal(4);
  });
});
