
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import { NetworkMsg, UiMsg, UiEventMsg} from '../constants/constants';

class ServiceStateStore extends EventEmitter {
    constructor() {
        super();

        this.state = {
            busy: true,
            error: false
        };

        this._onDispatcherMessage = this._onDispatcherMessage.bind(this);
        AppDispatcher.register(this._onDispatcherMessage);
    }

    _onDispatcherMessage(action) {
        switch(action.actionType) {
            case UiEventMsg.FilterChanged:
            case UiEventMsg.PagingChanged:
            case UiEventMsg.SortChanged:
                this.state.busy = true;
                this.emit(UiMsg.ServiceStateChanged);
                break;

            case NetworkMsg.SetBusy:
                this.state.busy = action.busy;
                this.emit(UiMsg.ServiceStateChanged);
                break;
            case NetworkMsg.Error:
                this.state.error = true;
                this.emit(UiMsg.ServiceStateChanged);
                break;
        }
    }

    getServiceState() {
        return this.state;
    }

    registerChangeListener(callback) {
        this.on(UiMsg.ServiceStateChanged, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(UiMsg.ServiceStateChanged, callback);
    }
}

let serviceStateStoreInst = new ServiceStateStore();

export default serviceStateStoreInst;
