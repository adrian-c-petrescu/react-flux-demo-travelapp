
import React from 'react/addons';
import FilterStore from '../../stores/Filter.store';
import HotelDataStore from '../../stores/HotelsData.store';
import { UiEventActions } from '../../actions/app.actions';

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = this._getState();
        this._btnPrevClicked = this._btnPrevClicked.bind(this);
        this._btnNextClicked = this._btnNextClicked.bind(this);
        this._reloadState = this._reloadState.bind(this);
    }

    componentDidMount() {
        HotelDataStore.registerChangeListener(this._reloadState);
        FilterStore.registerChangeListener(this._reloadState);
    }

    componentWillUnmount() {
        HotelDataStore.removeChangeListener(this._reloadState);
        FilterStore.removeChangeListener(this._reloadState);
    }

    render () {
        return (
            <nav>
                <ul className="pagination">
                    <li className={this._classPrevBtn()}><a aria-label="Previous" onClick={this._btnPrevClicked}><span aria-hidden="true">&laquo;</span></a></li>

                    {this._renderNumbers()}

                    <li className={this._classNextBtn()}><a aria-label="Next" onClick={this._btnNextClicked}><span aria-hidden="true">&raquo;</span></a></li>
                </ul>
            </nav>);
    }

    _renderNumbers() {
        if(this.state.pageCount <= 10) {
            return this._renderAll();
        } else {
            return this._renderWithDots();
        }
    }

    _renderWithDots() {
        let result = [];

        if(this.state.currentPage <= 3) {
            for(let idx = 1; idx <= this.state.currentPage + 1; idx++) {
                result.push(this._renderBtn(idx));
            }
            result.push(this._renderDots('dot1'));
            result.push(this._renderBtn(this.state.pageCount - 1));
            result.push(this._renderBtn(this.state.pageCount));
        } else if(this.state.currentPage >= this.state.pageCount - 2) {
            result.push(this._renderBtn(1));
            result.push(this._renderBtn(2));
            result.push(this._renderDots('dot1'));
            for(let idx = this.state.currentPage - 1; idx <= this.state.pageCount; idx++) {
                result.push(this._renderBtn(idx));
            }
        } else {
            result.push(this._renderBtn(1));
            result.push(this._renderBtn(2));

            result.push(this._renderDots('dot1'));
            for(let idx = this.state.currentPage - 1; idx <= this.state.currentPage + 1; idx++) {
                result.push(this._renderBtn(idx));
            }
            result.push(this._renderDots('dot2'));

            result.push(this._renderBtn(this.state.pageCount - 1));
            result.push(this._renderBtn(this.state.pageCount));
        }
        return result;
    }

    _renderAll() {
        let result = [];
        for(let idx = 1; idx <= this.state.pageCount; idx++) {
            result.push(this._renderBtn(idx));
        }
        return result;
    }

    _renderBtn(idx) {
        if(idx === this.state.currentPage) {
            return <li key={idx} className="active"><a>{idx} <span className="sr-only">(current)</span></a></li>;
        } else {
            return <li key={idx} className="" onClick={this._btnClicked.bind(this, idx)}><a>{idx} <span className="sr-only"></span></a></li>;
        }
    }

    _renderDots(key) {
        return <li key={key} className=""><a>...<span className="sr-only"></span></a></li>;
    }


    _classPrevBtn() {
        return this.state.currentPage === 1 ? 'disabled' : '';
    }

    _classNextBtn() {
        return this.state.currentPage === this.state.pageCount ? 'disabled' : '';
    }

    _btnClicked(page) {
        UiEventActions.pageChanged(page);
    }

    _btnNextClicked() {
        UiEventActions.pageChanged(this.state.currentPage + 1);
    }

    _btnPrevClicked() {
        UiEventActions.pageChanged(this.state.currentPage - 1);
    }

    _getState() {
        let state = {
            currentPage: FilterStore.getCurrentPage(),
            pageCount: Math.floor((HotelDataStore.getAvailable() + 9) / 10)
        };

        return state;
    }

    _reloadState() {
        this.setState(this._getState());
    }
}

export default Pagination;

