import * as Chai from 'chai';
import * as Mocha from 'mocha';

import {pathfinder} from '../../src-tested/pathfinding/pathfinder';
import {Point} from '../../src-tested/models/point';

describe('pathfinder', () => {
    it('should return an array', () => {
        const result = pathfinder(new Point(0, 0), new Point(0, 0));
        Chai.expect(result).to.be.instanceof(Array);
    });
    
    it('should throw if startPoint argument is not instance of point', () => {
        Chai.expect(() => pathfinder("" as any, new Point(0, 0))).to.throw('startPoint must be instanceof Point');
    });

    it('should throw if startPoint is null or undefined', () => {
        [null, undefined].forEach(v => {
            Chai.expect(() => pathfinder(v, new Point(0, 0))).to.throw('startPoint must be instanceof Point');
        });
    });

    it('should throw if endPoint argument is not instance of point', () => {
        Chai.expect(() => pathfinder(new Point(0, 0), "" as any)).to.throw('endPoint must be instanceof Point');
    });

    it('should throw if endPoint is null or undefined', () => {
        [null, undefined].forEach(v => {
            Chai.expect(() => pathfinder(new Point(0, 0), v)).to.throw('endPoint must be instanceof Point');
        });
    });
});