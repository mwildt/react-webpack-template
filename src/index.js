import React, { Component} from 'react'
import ReactDOM from 'react-dom';

class App extends Component{
    render(){

        const val = this.props.demo?.undef || 'default';
        console.log('val', val);
        return(
            <div className="App">
                <h1> Hello, World! ({val})</h1>
            </div>
        );
    }
}

ReactDOM.render(
    <App demo={{undef: "Hu"}}/>,
    document.getElementById('root')
);