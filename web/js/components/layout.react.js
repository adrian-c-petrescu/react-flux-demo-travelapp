import React from 'react/addons';
import FilterPane from './UiParts/filterpane.react';
import SortPane from './UiParts/sortpane.react';
import ResultList from './UiParts/resultlist.react';
import Pagination from './UiParts/pagination.react';
import HotelsDataStore from '../stores/HotelsData.store';
import DataLoadService from '../services/DataLoad.service';

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this._buildState = this._buildState.bind(this);
        this._hotelsDataChanged = this._hotelsDataChanged.bind(this);
        this._onBusyChanged = this._onBusyChanged.bind(this);

        this.state = this._buildState();
    }

    componentDidMount() {
        HotelsDataStore.registerChangeListener(this._hotelsDataChanged);
        DataLoadService.addChangeListener(this._onBusyChanged);
    }

    componentWillUnmount() {
        HotelsDataStore.removeChangeListener(this._hotelsDataChanged);
        DataLoadService.removeChangeListener(this._onBusyChanged);
    }

    render () {
        return (
        <div className="container">
            <div className="row">
                <div className="col-sm-3 sidebar">
                    <FilterPane />
                    { this._renderBusy() }
                </div>

                <div className="col-sm-9">
                    <p>Found {this.state.resultsAvailable} items</p>

                    <SortPane />
                    <ResultList />
                    <Pagination />
                </div>
            </div>
        </div>);
    }

    _renderBusy() {
        if(this.state.busy) {
            return <img src="images/loader2.gif" style={{width: '100%'}} />;
        }

        return false;
    }

    _hotelsDataChanged() {
        this.setState(this._buildState());
    }

    _onBusyChanged() {
        this.setState(this._buildState());
    }


    _buildState() {
        return {
            resultsAvailable: HotelsDataStore.getAvailable(),
            busy: DataLoadService.getBusyState()
        };
    }
}

export default Layout;
