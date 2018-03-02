import * as request from 'request-promise-native';
import * as moment from 'moment';
const DOMParser = require('xmldom').DOMParser;

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

        return this.retrieveDataFromHtml(result);
    }

    retrieveDataFromHtml(html: string): string {
        const doc = new DOMParser().parseFromString(html, 'application/html');
        const legends = doc.getElementsByTagName('legend');
        if (!!legends) {
            for (const legend in legends) {
                const l = legends[legend];
                if (!!l.firstChild && !!l.firstChild.firstChild) {
                    const data = l.firstChild.firstChild.data;
                    const date = this.createDateFromData(data);
                    return date;
                }
            }
        }

        return '';
    }

    createDateFromData(data: string): string {
        if (!!data === false) {
            return null;
        }
        const dataParts = data.split(',');
        const dateParts = dataParts[1].trim().split('/');
        const day = Number(dateParts[0]);
        const month = Number(dateParts[1]) - 1;
        const year = Number(dateParts[2]);
        const date = new Date(year, month, day, 0, 0, 0, 0);
        const result = moment(date).format('dddd, Do MMMM');
        return result;
    }
}
