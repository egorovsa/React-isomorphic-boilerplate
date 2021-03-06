import { InitialStateUtils } from '../services/initial-state-utils';
import * as request from 'superagent';

export class Api {

    constructor(protected initialStateInstance: InitialStateUtils) {
        this.initialStateInstance = initialStateInstance;
    }

    protected async request(url: string, nameOfData?: string, checkExist: boolean = true): Promise<any> {
        if (nameOfData) {
            let existsData = '';

            if (checkExist) {
                existsData = this.initialStateInstance.getDataByName(nameOfData);
            }

            if (existsData) {
                return existsData;
            } else {
                try {
                    const response = await request.get(url);

                    if (response.body) {
                        this.initialStateInstance.setData(nameOfData, response.body);
                    }

                    return response.body;
                } catch (e) {
                    return Promise.reject(e);
                }
            }
        } else {
            try {
                const response = await request.get(url);
                return response.body;

            } catch (e) {
                return Promise.reject(e);
            }
        }
    }
}