import _ from 'lodash';
import React, { Component }  from 'react';
import ReactDom  from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetails from './components/video_details';

const API_KEY = 'AIzaSyBypwFsP30z1YzkRotV9uPVpOCKmYIngzM';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null 
        
        };
        this.searchVideo('surfboards');
       
        
    }
    searchVideo(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0] 
            });
        });
    }
    render() {
        const searchVideo = _.debounce((term) => { this.searchVideo(term),300})
        return (
            
            <div>
                <SearchBar onSearchTermChange={searchVideo}/>
                <VideoDetails video={this.state.selectedVideo}/>
                <VideoList videos={this.state.videos} 
                onVideoSelect={ selectedVideo => this.setState({selectedVideo})} 
                />
               
            </div>
            
        )
    }
}

// Take This component's generated HTML and put it on the page (in the dom)
ReactDom.render(<App/>, document.querySelector('.container'));