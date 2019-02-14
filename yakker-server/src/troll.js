import React from 'react';
import ClientConnection from './lib/subscriber';
import Publisher from './lib/publisher';

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
      this.updateWords(payload);
    });

    TrollClient.subscribe('history', payload =>{
      console.log('hellowi am in history and adam is drunk')
      this.setState({history:payload})

    });
  }


  updateWords = words => {
    console.log('in updateWords with words: ', words);
    this.setState({ words:words });
  };

  handleSubmit = event => {
    //console.log('submmit',event.target[0].value);
    event.preventDefault();
    Q.publish('troll', 'message', event.target[0].value);
  };

  handleNewWords = event => {
    console.log('in handleNewWords');
    console.log(event.target.value)
    this.setState({ typedInput: event.target.value });
  };

  render() {
    return (
      <>
        <h2>Where the words go: {this.state.words}</h2>
        {this.state.history.map(word => {
          return <p>{word}</p>
        })}
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
