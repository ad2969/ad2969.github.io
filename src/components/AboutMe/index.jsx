import React from 'react';
import ReactFullpage from "@fullpage/react-fullpage";

import SimpleHeader from '../header/simpleHeader';
import NavMenu from '../navmenu/navMenu';

import * as COLORS from '../../constants/colors';
import menuColor from '../../functions/menuColor';

class AboutMePage extends React.Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
      doMenuOpen: false,
      doMenuClose: false,
      isMenuReady: true,

      menuColorFocus: 0,

      isScrolling: false,
      scrollPosition: 0,
    };
  }

  toggleMenu = () => {
    if(this.state.isMenuReady === false) return;
    this.setState(prevState => ({
       doMenuOpen: prevState.isMenuOpen ? false : true,
       doMenuClose: prevState.isMenuOpen ? true : false,
       isMenuOpen: !prevState.isMenuOpen,
       isMenuReady: false,
     }));
    setTimeout(() => {this.setState(prevState => ({
      isMenuReady: true,
    }))}, 3300);
  }

  setMenuFocus = (event) => {
    this.setState({
      menuColorFocus: event.currentTarget.dataset.focusid
    }, () => {console.log(this.state.menuColorFocus)});
  }

  resetMenuFocus = (event) => {
    this.setState({
      menuColorFocus: 0
    }, () => {console.log(this.state.menuColorFocus)});
  }

  componentDidUpdate() {
    if(this.state.doMenuOpen | this.state.doMenuClose) {
      this.setState(prevState => ({
        doMenuOpen: false,
        doMenuClose: false,
      }));
    }
  }

  handleScroll = () => {
    if(this.state.isScrolling) return;

    const newPosition = window.scrollY;
    if( newPosition > this.state.scrollPosition ) {
      this.setState({isScrolling: true});
      console.log("Scrolling to next!");
    }
    else if( newPosition < this.state.scrollPosition ) {
      this.setState({isScrolling: true});
      console.log("Scrolling to previous!");
    }

    setTimeout(() => {
      this.setState({isScrolling: false});
      console.log("Scrolling reset!");
    }, 3000);
  }

  componentDidMount() {
    document.title = "<AD2969 /> About Me";
  }

  render() {
    var {color1, color2, bcolor} = menuColor(this.state.menuColorFocus);

    return(
      <div className="page-container page-container--about">
        <SimpleHeader isMenuOpen      = {this.state.isMenuOpen}
                      isTransition    = {!this.state.isMenuReady}
                      toggleMenu      = {this.toggleMenu}
                      color1          = {color1}
                      color2          = {color2}
                      backgroundColor = {bcolor}
        />
        <NavMenu  visible       = {this.state.isMenuOpen}
                  doOpen        = {this.state.doMenuOpen}
                  doClose       = {this.state.doMenuClose}
                  isTransition  = {!this.state.isMenuReady}
                  setFocus      = {this.setMenuFocus}
                  resetFocus    = {this.resetMenuFocus}
        />

        <ReactFullpage
          scrollOverflow={true}
          sectionsColor={[ COLORS.CRYPTOPALETTE.medium,
                           COLORS.CRYPTOPALETTE.color1,
                           COLORS.CRYPTOPALETTE.color2,
                           COLORS.CRYPTOPALETTE.medium,
                           COLORS.CRYPTOPALETTE.medium,
                           COLORS.CRYPTOPALETTE.medium ]}
          render={({ state, fullpageApi }) => {
            return (
              <div id="fullpage-wrapper">
                <div className="section about-1">
                  <div className="section-div">
                    <h1>I am a Section</h1>
                  </div>
                </div>
                <div className="section about-2">
                  <div className="section-div">
                    <h1>I am a Section</h1>
                  </div>
                </div>
                <div className="section about-3">
                  <div className="section-div">
                    <h1>I am a Section</h1>
                  </div>
                </div>
                <div className="section about-4">
                  <div className="section-div">
                    <h1>I am a Section</h1>
                  </div>
                </div>
              </div>
            );
          }}
          />

      </div>
    );
  }
}

export default AboutMePage
