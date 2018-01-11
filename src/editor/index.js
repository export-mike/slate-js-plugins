import React from 'react';
import { Editor as SlateEditor } from 'slate-react';

const EditorWrapper = React.Fragment;

export class Editor extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.mapToSlateProps(props)
        };
    }
    mapToSlateProps = props => {
        const plugins = props.plugins.reduce((plugins, plugin) => {
            if (!plugin.plugin) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(`${plugin.name} - has been skipped, ensure plugin has the correct structure.`);
                }
                return plugins;
            }
            if (Array.isArray(plugin.plugin)) {
                return [...plugins, ...plugin.plugin]
            } else {
                return [...plugins, plugin.plugin];
            }
        }, []);

        const renderMark = props.plugins.reduce((renderMark, plugin) => {
            if (!plugin.renderMark) return renderMark;
            return props => {
                const result = renderMark(props);
                if (result) return result;
                return mergeMarkRenderers({
                    defaultRenderer: plugin.renderMark,
                    customRenderer: props.customRenderer
                })(props);
            }
        }, i => null)

        return {
            plugins,
            renderMark,
        }
    }
    componentWillReceiveProps = nextProps => {
        if (this.props.plugins !== nextProps.plugins) {
            this.setState({
                ...this.mapToSlateProps(nextProps)
            });
        }
    }
    render() {
        const rendered = <SlateEditor
            value={this.props.value}
            onChange={this.props.onChange}
            plugins={this.state.plugins}
            renderMark={this.state.renderMark}
        />;
        if (this.props.render) {
            return this.props.render({
                children: rendered,
                EditorWrapper
            });
        }
        return rendered;
    }
}

const noop = () => null;

export function mergeMarkRenderers({
    defaultRenderer,
    customRenderer
}) {
    const renderer = { ...defaultRenderer, ...customRenderer };
    return (props) => {
        const fn = renderer[props.mark.type] || noop;
        return fn(props);
    }
}