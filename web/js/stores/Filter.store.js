
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import DataLoadService from '../services/DataLoad.service';
import { UiMsg, UiEventMsg } from '../constants/constants';

class FilterStore extends EventEmitter {
    constructor () {
        super();

        this._onDispatcherMessage = this._onDispatcherMessage.bind(this);
        this._onFilterChanged = this._onFilterChanged.bind(this);
        this._onPagingChanged = this._onPagingChanged.bind(this);
        this._onSortChanged = this._onSortChanged.bind(this);

        this.filter = [];
        this._resetPagination();
        this.sort = null;

        AppDispatcher.register(this._onDispatcherMessage);
        this._getDataFromService();
    }

    getCurrentPage() {
        return this.currentPage;
    }

    _onDispatcherMessage (action) {
        switch(action.actionType) {
            case UiEventMsg.FilterChanged:
                this._onFilterChanged(action);
                break;
            case UiEventMsg.PagingChanged:
                this._onPagingChanged(action);
                break;
            case UiEventMsg.SortChanged:
                this._onSortChanged(action);
                break;
        }
    }

    _onFilterChanged(action) {
        this.filter = action.filter;
        this._resetPagination();
        this.emit(UiMsg.PaginationReset);
        this._getDataFromService();
    }

    _onPagingChanged(action) {
        this.currentPage = action.pageNumber;
        this._getDataFromService();
    }

    _onSortChanged(action) {
        if(action.sortField === 'None') {
            this.sort = null;
        } else {
            this.sort = {
                Field: action.sortField,
                Direction: this._getRelevantSortDirection(action.sortField)
            };
        }
        this._getDataFromService();
    }

    _getRelevantSortDirection(sortField) {
        switch(sortField) {
            case 'Stars': return 'Desc';
            case 'UserRating': return 'Desc';
            case 'MinCost': return 'Asc';
            case 'Distance': return 'Asc';
        }
        throw 'Field ' + sortField + ' not supported for sorting';
    }

    _resetPagination() {
        this.currentPage = 1;
    }

    _buildPagination() {
        return {
            Start: (this.currentPage - 1) * 10,
            Count: 10
        };
    }

    _getDataFromService () {
        DataLoadService.loadData(this.filter, this.sort, this._buildPagination());
    }

    registerChangeListener(callback) {
        this.on(UiMsg.PaginationReset, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(UiMsg.PaginationReset, callback);
    }
}

let filterStoreInstance = new FilterStore();
export default filterStoreInstance;


