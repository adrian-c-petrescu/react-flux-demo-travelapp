import React from 'react/addons';
import { UiEventActions } from '../../actions/app.actions';

class SortPane extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);

        this.state = {
            sortField: 'None'
        };
    }

    render () {
        return (
            <div className="form">
                <div className="form-group">
                    <select id="sort" className="form-control" value={this.state.sortField} onChange={this._onChange}>
                        <option value="None">Order by</option>
                        <option value="Distance">Distance</option>
                        <option value="Stars">Stars</option>
                        <option value="MinCost">Minimum cost</option>
                        <option value="UserRating">User rating</option>
                    </select>
                </div>
            </div>);
    }

    _onChange(event) {
        if(event.target.id === 'sort') {
            this.setState({
                sortField: event.target.value
            });

            UiEventActions.sortChanged(event.target.value);
        }
    }
}
export default SortPane;
