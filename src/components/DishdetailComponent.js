import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';



    function RenderComments({commentsArr}){
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

    function RenderDish({dish}) {
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

    const DishDetail = (props) => {

        if(props.dish != null) {
            var dishdetail = <RenderDish dish={props.dish} />
            var comments   = <RenderComments commentsArr={props.comments} />
        }
            
        return( <div>
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
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
        </div>
        );  
    }


export default DishDetail;