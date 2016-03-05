import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import { NetworkMsg, UiMsg } from '../constants/constants';


class HotelsDataStore extends EventEmitter {
    constructor () {
        super();

        this.count = 0;
        this.data = [];
        AppDispatcher.register(this._onDispatcherMessage.bind(this));
    }

    _onDispatcherMessage (action) {
        if(action.actionType === NetworkMsg.DataReceived) {
            this.data = action.data.Data;
            this.data = action.data.Data;
            this.count = action.data.AvailableCount;
            this.emit(UiMsg.DatasetReceived);
        }
    }

    getData () {
        return this.data;
    }

    getAvailable() {
        return this.count;
    }

    registerChangeListener(callback) {
        this.on(UiMsg.DatasetReceived, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(UiMsg.DatasetReceived, callback);
    }

}

let hotelsDataStoreInstance = new HotelsDataStore();
export default hotelsDataStoreInstance;
