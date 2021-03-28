import React, { Component } from 'react';

// import Auxx from '../../hoc/Auxx/Auxx';
import Layout from '../../hoc/Layout/Layout';
import Banner from '../../components/Banner/Banner';
import New from '../../components/New/New';
import classes from './HomePage.module.css';

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <Banner />
        <h3 className={classes.Header}>News and Updates</h3>
        <div className={classes.ListNews}>
          <New image="https://picsum.photos/300/400" title="Lorem Ipsum is simply dummy text of the printing and typesetting" className={classes.New} />
          <New image="https://picsum.photos/300/400" title="Lorem Ipsum is simply dummy text of the printing and typesetting" className={classes.New} />
          <New image="https://picsum.photos/300/400" title="Lorem Ipsum is simply dummy text of the printing and typesetting" className={classes.New} />
          <New image="https://picsum.photos/300/400" title="Lorem Ipsum is simply dummy text of the printing and typesetting" className={classes.New} />
          <New image="https://picsum.photos/300/400" title="Lorem Ipsum is simply dummy text of the printing and typesetting" className={classes.New} />
          <New image="https://picsum.photos/300/400" title="Lorem Ipsum is simply dummy text of the printing and typesetting" className={classes.New} />
          <New image="https://picsum.photos/300/400" title="Lorem Ipsum is simply dummy text of the printing and typesetting" className={classes.New} />
          <New image="https://picsum.photos/300/400" title="Lorem Ipsum is simply dummy text of the printing and typesetting" className={classes.New} />
        </div>
      </Layout>
    );
  }
}

export default HomePage;