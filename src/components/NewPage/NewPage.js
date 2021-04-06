import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './NewPage.module.css';
import NewLayout from '../../hoc/Layout/NewLayout';

class NewPage extends Component {
  render() {
    const idOfNew = this.props.match.params.id;

    console.log(typeof idOfNew);

    const newPost = this.props.news.find(newPost => newPost.id === parseInt(idOfNew));

    return (
      <NewLayout>
        <div className={classes.Wrapper}>
          <div className={classes.ImageContainer}>
            <img src={newPost.image} alt="new-image" />
          </div>
          <div className={classes.NewContainer}>
            <div className={classes.HeaderContainer}>
              <div className={classes.HeaderContainer__date}>
                <span>April 6, 2021</span>
              </div>
              <h2 className={classes.HeaderContainer__title}>{newPost.title}</h2>
            </div>
            <div className={classes.ContentContainer}>
              <p>{newPost.content}</p>
            </div>
          </div>
        </div>
      </NewLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news.news
  };
};

export default connect(mapStateToProps, null)(NewPage);