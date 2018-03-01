import * as request from 'request-promise-native';

export class RetrieveBin {
    async retrieve(street: string, town: string): Promise<string> {
        const green = await this.retrieveBin(street, town, 'green');
        const grey = await this.retrieveBin(street, town, 'grey');

        return green;
    }

    async retrieveBin(street: string, town: string, bin: string): Promise<string> {
        const baseUrl = 'https://www.wirral.gov.uk/recycling/detailContentDru7.asp';
        const queryString = `?s=${street}&t=${town}`;
        let binQuery: string;
        if (bin === 'general') {
            binQuery = '&c=Non recycleable (green bin)';
        } else {
            binQuery = '&c=Paper and packaging (grey bin)';
        }
        const options = {
            uri: baseUrl + queryString + binQuery
        };

        const result = await request.get(options);
        console.log(result);

        return result.toString();
    }
}
