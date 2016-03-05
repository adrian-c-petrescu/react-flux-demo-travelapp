
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import { ServiceActions } from '../actions/app.actions';
import { UiMsg } from '../constants/constants';

class DataLoadService {
    constructor () {
        this._baseServiceUrl = 'http://hotels.com/';
    }

    loadData (filter, sort, pagination) {
        const queryDto = this._buildRequestDto(filter, sort, pagination);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', this._baseServiceUrl + 'api/hotelsdata/query');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                ServiceActions.setBusy(false);
                if(xhr.status >= 200 && xhr.status < 300) {
                    ServiceActions.dataReceived(JSON.parse(xhr.responseText));
                } else {
                    ServiceActions.error();
                }
            }
        };
        xhr.send(JSON.stringify(queryDto));
    }


    _buildRequestDto (filter, sort, pagination) {
        let dto = {
            Pagination: pagination,
            Sort: sort,
            Filters: filter
        };

        return dto;
    }
}

let dataLoadService = new DataLoadService();
export default dataLoadService;
