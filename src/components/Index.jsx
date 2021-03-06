import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bake_cookie, read_cookie } from 'sfcookies';
import Cookies from 'universal-cookie';
import '../App.css';
import NavBar from './NavBar';

class Index extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.state = {
            accessToken: cookies.get('access_token')
        }
    }

    componentDidMount() {
        const cookies = new Cookies();
        const accessToken = new URLSearchParams(window.location.search).get('access_token');
        if (typeof cookies.get('access_token') === 'undefined' && accessToken !== null) {
            
            this.setState({ accessToken });
            cookies.set('access_token', accessToken);
            console.log('a cookies:', cookies.get('access_token'));
        }   
    }

    render() {
        // const cookies = new Cookies();
        // console.log('cookies:', cookies.get('access_token'));
        // console.log('state:', this.state.cookies);
        return (
            <div className='App'>
                <NavBar />
                <div className="App-title">
                    Spotify Demo
                </div>
                <br/>
                {
                    typeof this.state.accessToken !== 'undefined'
                        ?
                        <div>
                            <div
                                className='track'
                            >
                                <a href='/newrelease'>
                                    <img
                                        src="data:image/png;base64,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"
                                        className='track-img'
                                        alt='new-release'
                                    />
                                    <p className='track-text'>
                                        New Release
                            </p>
                                </a>
                            </div>
                            <div
                                className='track'
                            >
                                <a href='/artist'>
                                    <img
                                        src="data:image/png;base64,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"
                                        className='track-img'
                                        alt='artist'
                                    />
                                    <p className='track-text'>
                                        Artist Search
                            </p>
                                </a>
                            </div>
                            <div
                                className='track'
                            >
                                <a href='/song'>
                                    <img
                                        src="data:image/png;base64,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"
                                        className='track-img'
                                        alt='song'
                                    />
                                    <p className='track-text'>
                                        Song Search
                            </p>
                                </a>
                            </div>
                        </div>
                        :
                        <div>
                            <a
                                href='https://spotify-demo-backend.herokuapp.com/login'
                                // href='http://localhost:8888/login'
                            >
                                <button
                                    className='btn btn-primary'
                                >
                                    Login with Spotify
                                </button>
                            </a>
                        </div>
                } 
            </div>
        )
    }
}

export default connect(null, null)(Index);