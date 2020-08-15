import React, {Component} from 'react';
import './App.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from "@material-ui/core/Card";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: [],
            selectedLanguage: '',
            isLoading: false,
            helloWorldText: 'Hello World'
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('https://cors-anywhere.herokuapp.com/' + 'https://thawing-ocean-61652.herokuapp.com/languages')
            .then(response => response.json())
            .then(data => this.setState({languages: data, isLoading: false}));
    }

    handleChange = (event) => {
        this.setState({selectedLanguage: event.target.value});
        console.log(event.target.value);
        this.fetchData(event.target.value);
    };

    fetchData(language) {
        fetch('https://cors-anywhere.herokuapp.com/' + `https://thawing-ocean-61652.herokuapp.com/hello?language=${language}`)
            .then(response => response.json())
            .then(data => this.setState({helloWorldText: data, isLoading: false}));
    }

    render() {
        return (
            <div><Card style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'column'
            }}>
                Hello World App
                <br/>
                <br/>
                <FormControl style={{width: 100}}>
                    <InputLabel id="demo-simple-select-label">Language</InputLabel>
                    <Select style={{width: 100}}
                            labelId="select-label"
                            id="demo-simple-select"
                            value={this.state.selectedLanguage}
                            onChange={this.handleChange}
                    >
                        {this.state.languages.map((value) => (
                            <MenuItem value={value}>{value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br/>
                {this.state.helloWorldText}
            </Card>
            </div>)
    }
}

export default App;
