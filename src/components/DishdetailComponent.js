import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);
    }

    renderComments(commentsArr){
        var commentSection = (<div></div>);

        if(commentsArr != null)
        {
            var comments = commentsArr.map( (item) => {
                    return(
                        <div key={item.id} >
                            <li className="list-unstyled">
                                <p>{item.comment}</p>
                                <p>--{item.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'} ).format( new Date(Date.parse(item.date)))}</p>
                            </li>
                        </div>
                    )
                }
            );

            commentSection = (
                <div>
                    <h4>Comments</h4>
                    {comments}
                </div>
            );  
        }

        return commentSection;
    }

    renderDish(dish) {
        let dishToRender;

        if( dish != null)
        {
            dishToRender = (
                <div>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
            dishToRender = (<div></div>)
        }

        return dishToRender;
    }

    render() {

        if(this.props.dish != null) {
            var dishdetail = this.renderDish(this.props.dish);
            var comments   = this.renderComments(this.props.dish.comments);
        }
            
        return( <div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {dishdetail}
                </div>
                <div className="col-12 col-md-5 m-1">
                    <ul>
                        {comments}
                    </ul>
                </div>
            </div>
            
        </div>
           
        );  
    }
}

export default DishDetail;