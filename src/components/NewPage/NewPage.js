import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './NewPage.module.css';
import NewLayout from '../../hoc/Layout/NewLayout';

import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

class NewPage extends Component {
  render() {
    const idOfNew = this.props.match.params.id;

    console.log(typeof idOfNew);

    const newPost = this.props.news.data.find(newPost => newPost.id === parseInt(idOfNew));

    return (
      <NewLayout>
        <div className={classes.Wrapper}>
          <div className={classes.ImageContainer}>
            <img src={newPost.image} alt="new-image" className={classes.PostImage} />
          </div>
          <div className={classes.NewContainer}>
            <div className={classes.HeaderContainer}>
              <div className={classes.HeaderContainer__date}>
                <span className={classes.Date}>April 6, 2021</span>
              </div>
              <h2 className={classes.HeaderContainer__title}>{newPost.title}</h2>
            </div>
            <div className={classes.ContentContainer}>
              <div dangerouslySetInnerHTML={{ __html: newPost.content }} />
            </div>
          </div>
          <div className={classes.Footer}>
            <div className={classes.TurnbackLinkContainer}>
              <KeyboardReturnIcon />
              <a href="/" className={classes.TurnbackLink}>Quay lại trang chủ</a>
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