import * as Chai from 'chai';
import * as Mocha from 'mocha';
import { Point } from '../../src-tested/models/point';

describe('Point', () => {
    describe('constructor', () => {
        it('should save x arguments to local x property', () => {
            const sut = new Point(1, 0);
            Chai.expect(sut.x).to.be.equal(1);
            Chai.expect(sut.y).to.be.equal(0);
        });

        it('should save y arguments to local y property', () => {
            const sut = new Point(0, 1);
            Chai.expect(sut.x).to.be.equal(0);
            Chai.expect(sut.y).to.be.equal(1);
        });

        it('should set x property to 0 if provided with null or undefined x argument', () => {
            [null, undefined].forEach(v => {
                const sut = new Point(v, 1);
                Chai.expect(sut.x).to.be.equal(0);
                Chai.expect(sut.y).to.be.equal(1);
            });
        });
        
        it('should set x property to 0 if provided with null or undefined x argument', () => {
            [null, undefined].forEach(v => {
                const sut = new Point(1, v);
                Chai.expect(sut.x).to.be.equal(1);
                Chai.expect(sut.y).to.be.equal(0);
            });
        });
    });
    describe('equalTo', () => {
        let point: Point;
        before(() => {
            point = new Point(1, 1);
        });

        it('should return true if x and y on point are equal to x and y on otherPoint', () => {
            const result = point.equalTo(new Point(1, 1));
            Chai.expect(result).to.be.true;
        });
        
        it('should return false if x on point is not equal to x on otherPoint', () => {
            const result = point.equalTo(new Point(2, 1));
            Chai.expect(result).to.be.false;
        });
        
        it('should return false if y on point is not equal to y on otherPoint', () => {
            const result = point.equalTo(new Point(1, 2));
            Chai.expect(result).to.be.false;
        });
    });
});