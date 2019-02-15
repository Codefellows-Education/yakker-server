import React from 'react';
import ClientConnection from './lib/subscriber';
import Publisher from './lib/publisher';
import 'animate.css';
import './design/troll.scss';

const Q = new Publisher();
const TrollClient = new ClientConnection('troll');

class TrollJohn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animateStyle: '',
      typedInput: '',
      words: '',
      history: [],
      like: [],
    };

    TrollClient.subscribe('message', payload => {
      this.updateWords(payload.payload);
      this.updateHistory(payload.messageHistory);
    });
  }
  
  updateHistory = messageHistory => {
    this.setState({history: messageHistory});
  }

  updateWords = words => {
    console.log('in updateWords with words: ', words);
    this.setState({ words:words, animateStyle:'animated rubberBand'});
    setTimeout(()=>{this.setState({ animateStyle:'' });}, 2000);
  };

  handleSubmit = event => {
    event.preventDefault();
    Q.publish('troll', 'message', this.state.typedInput);
  };

  handleNewWords = event => {
    this.setState({ typedInput: event.target.value });
  };

  likeRecord = (record) => {
    let arr = this.state.like
    arr.push(record);
    console.log('my like state!!!!!!!!!!!', this.state.like)
    this.setState({...this.state, like: arr });
  }

  unLikeRecord = (record) => {
    let newArr = [];
    this.state.like.filter(words => {
      if(words !== record){
        newArr.push(words);
      }
    })

    this.setState({ like: newArr });
  }

  animate = () => {

  }

  render() {
    return (
      <>
        <h2 onChange={this.animate}>Message: <div className={this.state.animateStyle}>{this.state.words}</div></h2>
        <ul>
        {this.state.history.map((word, i) =>  (
            <>
              <li className="messageHistory" key={i}>
                <a
                  onClick={()=> this.likeRecord(word)}
                  className="like"
                  >
                  ❤️ 
                </a>
                <span>
                  {word}
                </span>
              </li>
            </>
          )
        )}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            id="new_word"
            name='typedInput'
            placeholder='New Words'
            onChange={this.handleNewWords}
          />
        </form>
        <h2>Favorites</h2>
        <ul>
          {this.state.like.map((word, i) => (
            <li className='favorite'>
              <span 
                className='unlike'
                onClick={()=> this.unLikeRecord(word)}
              >
                X
              </span>
              <span>
                {word}
              </span>
            </li>
          ))}
        </ul>
      </>
    );
  }
}


export default TrollJohn;
