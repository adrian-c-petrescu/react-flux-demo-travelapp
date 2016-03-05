import AppDispatcher from '../dispatcher/AppDispatcher';
import { NetworkMsg, UiEventMsg } from '../constants/constants';

export const ServiceActions = {
    dataReceived(data) {
        AppDispatcher.dispatch({
            actionType: NetworkMsg.DataReceived,
            data
        });
    }
};

export const UiEventActions = {
    filterChanged(filter) {
        AppDispatcher.dispatch({
            actionType: UiEventMsg.FilterChanged,
            filter
        });
    },
    sortChanged(sortField) {
        AppDispatcher.dispatch({
            actionType: UiEventMsg.SortChanged,
            sortField
        });
    },
    pageChanged(pageNumber) {
        AppDispatcher.dispatch({
            actionType: UiEventMsg.PagingChanged,
            pageNumber
        });
    }
};
