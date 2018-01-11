import React from 'react';

// const defaultButtons = [
//     {type: 'mark', label: 'bold', action: 'format_bold'},
//     {type: 'mark', label: 'italic', action: 'format_italic'},
//     {type: 'mark', label: 'underlined', action: 'format_underlined'},
//     {type: 'mark', label: 'code', action: 'format_code'},
//     {type: 'node', label: 'heading-one', action: 'format_code'}
// ]

const DefaultToolbarWrapper = ({children}) => <div style={{
    display: 'flex',
    width: '100%',
    // justifyContent: 'space-around'
}}>
    {children}
</div>

const DefaultButton = ({ onMouseDown, labelShort }) =>
<button onMouseDown={onMouseDown}>
    {labelShort}
</button>

export class Toolbar extends React.PureComponent {
    onClickMark = (event, type) => {
        console.log('Here!!!', event, type);
        event.preventDefault();
        const { value } = this.props;
        const change = value.change().toggleMark(type);
        this.props.onChange(change);
    }
    render() {
        const ToolbarWrapper = this.props.toolbarWrapper || DefaultToolbarWrapper;
        const Button = this.props.button || DefaultButton;
        const DefaultButtons = () => <React.Fragment>
                <Button type="mark" label="Bold" labelShort="B" onMouseDown={(e) => this.onClickMark(e, 'bold')} />
                <Button type="mark" label="Italic" labelShort="I" onMouseDown={(e) => this.onClickMark(e, 'italic')} />
                <Button type="mark" label="underline" labelShort="U" onMouseDown={(e) => this.onClickMark(e, 'underline')} />
                <Button type="mark" label="code" labelShort="<>" onMouseDown={(e) => this.onClickMark(e, 'code')} />
                {/* <Button type="node" label="H1" labelShort="H1" onMouseDown={(e) => this.onClickMark(e, 'h1')} /> */}
            </React.Fragment>
            
        return <ToolbarWrapper>
            {this.props.render ? this.props.render({
                DefaultButtons,
                onClickMark: this.onClickMark
            }) : <DefaultButtons />}
        </ToolbarWrapper>
    }
}
