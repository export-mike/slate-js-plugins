# WIP - I need a kitchen sink editor - I'm using this to create it.
```js
import { plugin as markShortcutsPlugin } from './plugins/mark-shortcuts';
import { Toolbar, plugin as toolbarPlugin } from './plugins/toolbar';
import { HistoryButtons } from './plugins/history';

const plugins = [
  markShortcutsPlugin(),
  toolbarPlugin()
]
class App extends Component {
  state = {
    value: Value.fromJSON({
      document: {
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: ''
                  }
                ]
              }
            ]
          }
        ]
      }
    })
  }
  onChange = ({value}) => {
    this.setState({
      value
    });
  }
  render() {
    return (
      <div className="App">
        <Toolbar onChange={this.onChange} value={this.state.value}
          render={() => <React.Fragment>
            <HistoryButtons onChange={this.onChange} value={this.state.value}/>
          </React.Fragment>}
        />
        <Editor
          value={this.state.value}
          onChange={this.onChange}
          plugins={plugins}
        />
      </div>
    );
  }
}


```
