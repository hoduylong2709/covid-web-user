import React, { Component } from 'react';

import New from '../../components/New/New';
import classes from './News.module.css';

class News extends Component {
  state = {
    listNews:
      [
        { id: 1, title: "Lorem Ipsum is simply dummy text of the printing and typesetting", content: "Lorem Ipsum is simply dummy text of the printing and typesetting", image: "https://picsum.photos/300/400" },
        { id: 2, title: "Lorem Ipsum is simply dummy text of the printing and typesetting", content: "Lorem Ipsum is simply dummy text of the printing and typesetting", image: "https://picsum.photos/300/400" },
        { id: 3, title: "Lorem Ipsum is simply dummy text of the printing and typesetting", content: "Lorem Ipsum is simply dummy text of the printing and typesetting", image: "https://picsum.photos/300/400" },
        { id: 4, title: "Lorem Ipsum is simply dummy text of the printing and typesetting", content: "Lorem Ipsum is simply dummy text of the printing and typesetting", image: "https://picsum.photos/300/400" },
        { id: 5, title: "Lorem Ipsum is simply dummy text of the printing and typesetting", content: "Lorem Ipsum is simply dummy text of the printing and typesetting", image: "https://picsum.photos/300/400" },
        { id: 6, title: "Lorem Ipsum is simply dummy text of the printing and typesetting", content: "Lorem Ipsum is simply dummy text of the printing and typesetting", image: "https://picsum.photos/300/400" },
        { id: 7, title: "Lorem Ipsum is simply dummy text of the printing and typesetting", content: "Lorem Ipsum is simply dummy text of the printing and typesetting", image: "https://picsum.photos/300/400" },
        { id: 8, title: "Lorem Ipsum is simply dummy text of the printing and typesetting", content: "Lorem Ipsum is simply dummy text of the printing and typesetting", image: "https://picsum.photos/300/400" },
        { id: 9, title: "Lorem Ipsum is simply dummy text of the printing and typesetting", content: "Lorem Ipsum is simply dummy text of the printing and typesetting", image: "https://picsum.photos/300/400" },
      ]
  };

  render() {
    let listNews = this.state.listNews.map(newPost => (
      <New
        key={newPost.id}
        title={newPost.title}
        image={newPost.image}
        className={classes.New}
      />
    ));

    return (
      <div className={classes.ListNews}>
        {listNews}
      </div>
    );
  }
}

export default News;