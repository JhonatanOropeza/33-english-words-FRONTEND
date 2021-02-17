import React, { Component } from "react";
import Pagination from "react-js-pagination";

export default class pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 15,
            actualPage: null,
            total: null
        };
    }
    UNSAFE_componentWillMount(){
        console.log(this.props);
        this.setState({actualPage: this.props.paginationActualPage});
        this.setState({total: this.props.paginationTotal});
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    componentDidMount(){
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        );
    }
}
