import React from 'react';
import ClientConnection from './lib/subscriber';
import Publisher from './lib/publisher';
import './design/troll.scss';

const Q = new Publisher();
const TrollClient = new ClientConnection('troll');

class TrollJohn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedInput: '',
      words: '',
      history: []
    };

    TrollClient.subscribe('message', payload => {
      this.updateWords(payload.payload);
      this.updateHistory(payload.messageHistory);
    });

  }

  updateHistory = messageHistory => {
    console.log('in update history with: ', messageHistory);
    this.setState({history: [messageHistory]});
  }

  updateWords = words => {
    console.log('in updateWords with words: ', words);
    this.setState({ words:words });
  };

  handleSubmit = event => {
    event.preventDefault();
    Q.publish('troll', 'message', event.target[0].value);
  };

  handleNewWords = event => {
    console.log(event.target.value)
    this.setState({ typedInput: event.target.value });
  };

  render() {
    return (
      <>
        <h2>Where the words go: {this.state.words}</h2>
        <ul>
        {this.state.history.map(((word, i) => {
          return (<li className="messageHistory" key={i}>{word}</li>)
        }))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            name='typedInput'
            placeholder='New Words'
            onChange={this.handleNewWords}
          />
        </form>
      </>
    );
  }
}

export default TrollJohn;
