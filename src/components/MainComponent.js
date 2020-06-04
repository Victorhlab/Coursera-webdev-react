
import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

/* withRouter - required for configuring rect comp to connect to Redux*/
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {addComment, fetchDishes}  from '../redux/ActionCreators';

/*forms update */
import {actions} from 'react-redux-form';

/* mapStateToProps function. Maps redux store to Props
   State is from redux store */
const mapStateToProps =  state => {
  return {
     /* props : state */
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
  } 
}

/* Fn receive dispatch as a parm, 
   this dispatch is the dispatch fn from our store */
const mapDispatchToProps = (dispatch) => ({
  /*addcomment property: takes these 4 parameters => then dispatch(action)  */ 
                                                                 /* addComment returns a ActionObject*/
  // PROPS                                      => dispatch 
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  /* function that returns ...fn? */
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render () {

    const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
      }

      //Passes match, location, history
      const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
              addComment={this.props.addComment}
              />
        );
      };

    return (
        <div>
          <Header/>
          <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/contactus" component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm} /> } />
                <Route path="/aboutus" component={()=> <About leaders={this.props.leaders} /> } />

                <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} /> } />
                <Route path="/menu/:dishId" component={DishWithId} />
                
                <Redirect to="/home"/>
          </Switch>
          <Footer/>
        </div>
      );
  }
  
}

/* connecting component to react router */    
                          /*mapDispatchToProps Makes it avail in the main component above i.e usage of : this.props.addComment
                            and connect the dispatch() as an input parameter of mapDispatchToProps */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

/* The connect() function connects a React component to a Redux store. */