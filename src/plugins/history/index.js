import React from 'react';

const DefaultHistoryButtons = ({ undo, redo}) => <React.Fragment>
        <button onMouseDown={undo}>Undo</button>
        <button onMouseDown={redo}>Redo</button>
    </React.Fragment>

export class HistoryButtons extends React.PureComponent {
    undo = (event) => {
        event.preventDefault()
        const { value } = this.props
        const change = value.change().undo()
        this.props.onChange(change)
    }
    redo = (event) => {
        event.preventDefault()
        const { value } = this.props
        const change = value.change().redo()
        this.props.onChange(change)
    }
    render() {
        return this.props.render ? this.props.render({
            undo: this.undo,
            redo: this.redo
        }): <DefaultHistoryButtons undo={this.undo} redo={this.redo} />
    }
}