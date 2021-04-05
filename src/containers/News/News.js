import React, { Component } from 'react';
import { connect } from 'react-redux';

import New from '../../components/New/New';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './News.module.css';
import * as actions from '../../store/actions/index';

class News extends Component {
  componentDidMount() {
    this.props.onInitNews();
  }

  render() {
    let listNews = <Spinner />;

    if (this.props.news) {
      listNews = this.props.news.map(newPost => (
        <New
          key={newPost.id}
          newId={newPost.id}
          title={newPost.title}
          image={newPost.image}
          className={classes.New}
        />
      ));
    }

    return (
      <div className={classes.ListNews}>
        {listNews}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news.news,
    error: state.news.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitNews: () => dispatch(actions.initNews())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);