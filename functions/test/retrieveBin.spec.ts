import { RetrieveBin } from './../src/retrieveBin';
import * as chai from 'chai';
// tslint:disable-next-line:no-duplicate-imports
import { should } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

describe('Retrieve bin', () => {
    it("should get something for 'general'", async () => {
        const rb = new RetrieveBin();
        const result = await rb.retrieveBin('Riviera Drive', 'Rock Ferry', 'general');
        result.should.not.be.equal('');
    });

    it("should get something for 'grey'", async () => {
        const rb = new RetrieveBin();
        const result = await rb.retrieveBin('Riviera Drive', 'Rock Ferry', 'grey');
        result.should.not.be.equal('');
    });
});
