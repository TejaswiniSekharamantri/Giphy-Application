import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import './App.css';
import { API_KEY, GIF_API } from './constants';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      count:0,
      emptyData:false,
      page : 0,
      stateURL:``
    }
  }

  fetchAPI = (url) => {
    var offsetUrl   = url+ '&offset=' +this.state.page;
    var contentArray = this.state.content;
    fetch(offsetUrl)
      .then(response => response.json())
      .then(content => {
        if(content.pagination.count === 0){
          this.setState({ emptyData: true });
        }
        contentArray.push(...content.data)
        this.setState({ content: contentArray });
        this.setState({page: this.state.page + 1});
        
      })
      .catch(err => {
        console.error(err);
      })
    
  }
  componentDidMount() {
    let url = `${GIF_API}/trending?api_key=${API_KEY}&limit=9&rating=g`
    this.setState({stateURL:url});
    this.fetchAPI(url);
  }
 
  handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData(e.target);
    if(data.get('searchInput') !== ''){
      this.setState({count: this.state.count+1});
    }
    let url = `${GIF_API}/search?q=${data.get('searchInput')}&api_key=${API_KEY}&limit=9&rating=g`;
    this.setState({stateURL:url});
    this.setState({page:0, content:[]}, () => {
      this.fetchAPI(url);
    })
    
  }
  render() {
    const {count, content, emptyData, stateURL} = this.state;
    return (
      <div className="App">
        <h3> GIPHY APPLICATION </h3>
        <form onSubmit={this.handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl placeholder="search gif" aria-label="search gif" name='searchInput' aria-describedby="basic-addon2" />
            <InputGroup.Append>
              <Button variant="outline-secondary" type='submit' style={{background:'black', color:'white'}}><i className='fa fa-search'></i></Button>
              <span style={{fontSize:'22px'}}>&nbsp; Total Searches : ({count})</span>
            </InputGroup.Append>
          </InputGroup>
        </form>
        <Card content={content} emptyData={emptyData} fetchAPI={this.fetchAPI} url={stateURL}/>
      </div>
    );
  }
}

export default App;
