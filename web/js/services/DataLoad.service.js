
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import { ServiceActions } from '../actions/app.actions';
import { UiMsg } from '../constants/constants';

class DataLoadService extends EventEmitter {
    constructor () {
        super();

        this._baseServiceUrl = 'http://hotels.com/';
        this._busy = false;
    }

    loadData (filter, sort, pagination) {
        this._setBusy(true);

        const queryDto = this._buildRequestDto(filter, sort, pagination);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', this._baseServiceUrl + 'api/hotelsdata/query');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                this._setBusy(false); //this will generate double rendering
                if(xhr.status < 300) {
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

    _setBusy(value) {
        this._busy = value;
        this.emit(UiMsg.BusyStateChanged);
    }

    addChangeListener(callback) {
        this.on(UiMsg.BusyStateChanged, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(UiMsg.BusyStateChanged, callback);
    }

    getBusyState() {
        return this._busy;
    }

}

let dataLoadService = new DataLoadService();
export default dataLoadService;
