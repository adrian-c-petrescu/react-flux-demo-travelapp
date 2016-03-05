
import React from 'react/addons';
import HotelsDataStore from '../../stores/HotelsData.store';


class ResultList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            busy: false
        };
        this._onDatasetReceived = this._onDatasetReceived.bind(this);
    }

    componentDidMount() {
        HotelsDataStore.registerChangeListener(this._onDatasetReceived);
    }

    componentWillUnmount() {
        HotelsDataStore.removeChangeListener(this._onDatasetReceived);
    }

    render () {
        return (
            <div className="list-group">
                { this.state.items.map(item => this._renderListItem(item)) }
            </div>
        );
    }


    _renderListItem(item) {
        return (
            <div className="list-group-item container-fluid" key={this.state.items.indexOf(item)}>
                <div className="pull-left" style={{marginRight: '20px' }}>
                    <span><img src={item.ThumbnailUrl} /></span>
                </div>
                <div className="pull-right" style={{height: '100%'}}>
                    <span className="glyphicon glyphicon-chevron-right" style={{display: 'inlineBlock', verticalAlign: 'middle'}}></span>
                </div>
                <div className="pull-right">
                    <label className="label label-success" style={{}} >£{item.MinCost}</label>
                    <label className="label label-default" >{item.Distance.toFixed(2)} miles away</label>
                </div>

                <div><label className="control-label">{item.Name}</label></div>
                <div><label className="label label-info">User rating: {item.UserRatingTitle}</label></div>
                <div><label className="label label-primary">Star rating: {item.Stars} stars</label></div>

            </div>
        );
    }

    _onDatasetReceived() {
        let data = HotelsDataStore.getData();
        //ideally, we would need to clone the object here
        this.setState({
            items: data,
            busy: this.state.busy
        });
    }
}

export default ResultList;
