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
        console.log(result);
        result.should.not.be.equal('');
    });
});

describe('retrieveDataFromHtml', () => {
    let html;
    beforeEach(() => {
        html =
            '<body>' +
            '	<label style="color: white; background-color:#999; font-weight: Bold; width:90%;">' +
            '    	&nbsp;The Dates Below Are For<br/>&nbsp;Paper and packaging (grey bin)' +
            '    	<br/>&nbsp;The next collection is:<br />' +
            '	</label>' +
            '' +
            '	<fieldset style="padding-left:3px; border:none;">' +
            '' +
            '' +
            '		<legend><span style="color: black; font-weight: Bold;">Wed, 14/03/2018</span></legend>' +
            '' +
            '</body>';
    });

    it('should return Wednesday, 14th March', () => {
        const rb = new RetrieveBin();
        const result = rb.retrieveDataFromHtml(html);
        result.should.be.equal('Wednesday, 14th March');
    });
});
