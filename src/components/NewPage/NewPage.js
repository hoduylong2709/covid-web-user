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
        <div className={classes.NewContainer}>
          <div className={classes.Wrapper}>
            <div className={classes.TitleAndContent}>
              <h1>{newPost.title}</h1>
              <p>{newPost.content}</p>
            </div>
            <img src={newPost.image} alt="new-image" />
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