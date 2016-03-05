
import React from 'react/addons';
import { UiEventActions } from '../../actions/app.actions';
import FilterStore from '../../stores/Filter.store';

class FilterPane extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            starRating: 'allStarRatings',
            userRating: 'allUserRatings',
            minPrice: 'allPrices'
        };

        this._onChange = this._onChange.bind(this);
        this._onFilterClicked = this._onFilterClicked.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render () {
        return (
            <form role="form">
                <label><b>Filter</b></label>
                <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input type="text" id="name" className="form-control" value={this.state.name} onChange={this._onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="stars">Stars</label>
                    <select id="stars" className="form-control" value={this.state.starRating} onChange={this._onChange}>
                        <option value="allStarRatings">Star Rating</option>
                        <option value="5">5 stars</option>
                        <option value="4">4 stars</option>
                        <option value="3">3 stars</option>
                        <option value="2">2 stars</option>
                        <option value="1">1 stars</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="userRating">User rating</label>
                    <select id="userRating" className="form-control" value={this.state.userRating} onChange={this._onChange}>
                        <option value="allUserRatings">User Rating</option>
                        <option value="9-10" >9 to 10</option>
                        <option value="8-9" >8 to 9</option>
                        <option value="6-8" >6 to 8</option>
                        <option value="4-6">4 to 6</option>
                        <option value="2-4">2 to 4</option>
                        <option value="0-2">0 to 2</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="minPrice">MinPrice</label>
                    <select id="minPrice" className="form-control" value={this.state.minPrice} onChange={this._onChange}>
                        <option value="allPrices">--Min Price--</option>
                        <option value="250">&lt; 250</option>
                        <option value="500">&lt; 500</option>
                        <option value="750">&lt; 750</option>
                        <option value="1000">&lt; 1000</option>
                    </select>
                </div>
                <div className="form-group">
                    <a className="btn btn-primary pull-right" onClick={this._onFilterClicked}>Apply filter</a>
                </div>
            </form>
        );
    }

    _onChange(event) {
        let newState = this._cloneState();
        if(event.target.id === 'name') {
            newState.name = event.target.value;
        } else if(event.target.id === 'stars') {
            newState.starRating = event.target.value;
        } else if(event.target.id === 'userRating') {
            newState.userRating = event.target.value;
        } else if(event.target.id === 'minPrice') {
            newState.minPrice = event.target.value;
        } else {
            return;
        }

        this.setState(newState);
    }

    _onFilterClicked() {
        let filter = [];

        let name = this.state.name.slice(0); name.trim();
        if(name !== '') {
            filter.push({
                Type: 'Name',
                Value: name
            });
        }

        if(this.state.starRating !== 'allStarRatings') {
            filter.push({
                Type: 'Stars',
                Value: this.state.starRating
            });
        }

        if(this.state.userRating !== 'allUserRatings') {
            filter.push({
                Type: 'UserRating',
                Value: this.state.userRating
            });
        }

        if(this.state.minPrice !== 'allPrices') {
            filter.push({
                Type: 'MinCost',
                Value: this.state.minPrice
            });
        }

        UiEventActions.filterChanged(filter);
    }

    _cloneState() {
        return {
            name: this.state.name,
            starRating: this.state.starRating,
            userRating: this.state.userRating,
            minPrice: this.state.minPrice
        };
    }
}

export default FilterPane;
