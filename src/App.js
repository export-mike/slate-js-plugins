import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Value} from 'slate';
import {Editor} from './editor';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to SlateJS full Editor</h1>
        </header>
        <p className="App-intro">
          SlateJS Editor
        </p>
        <Toolbar onChange={this.onChange} value={this.state.value} render={({ DefaultButtons }) => <React.Fragment>
          <DefaultButtons />
          <HistoryButtons value={this.state.value} onChange={this.onChange} />
        </React.Fragment>}/>
        <Editor
          value={this.state.value}
          onChange={this.onChange}
          plugins={plugins}
        />
      </div>
    );
  }
}

export default App;
