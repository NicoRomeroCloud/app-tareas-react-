import React, { Component } from "react";


class TodoList extends Component {





    renderTabList = () => {
        return (
            <div className='my-5 tab-list'>
                <span
                    onClick={() => this.props.displayCompleted(true)}
                    className={this.props.viewCompleted ? "active" : ""}
                >
                    Completa
                </span>
                <span
                    onClick={() => this.props.displayCompleted(false)}
                    className={this.props.viewCompleted ? "" : "active"}
                >
                    Incompleta
                </span>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderTabList()}
            </div>
        )
    }
}

export default TodoList;