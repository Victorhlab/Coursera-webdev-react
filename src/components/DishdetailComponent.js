import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, ModalFooter,
        Button, 
        Form, Label, FormGroup, Input, Row, Col} from 'reactstrap';

import { Control, LocalForm, Errors} from 'react-redux-form';

import { Link } from 'react-router-dom';

const maxLength=(length) => (val) => !(val) || (val.length <= length);
const minLength=(length) => (val) => (val) && (val.length >= length);

    class CommentForm extends Component {

        constructor(props){
            super(props);
            
            this.state = {
                isModalOpen: false
            }

            this.toggleModal   = this.toggleModal.bind(this);
            this.handleComment = this.handleComment.bind(this);
    
        }
        
        
        toggleModal(){
            this.setState({isModalOpen: !this.state.isModalOpen});
        }

        handleComment(value){
            this.toggleModal();
            console.log("Current State is: " + JSON.stringify(value));
            alert("Current sate is: " + JSON.stringify(value));
           
        }

        render(){

            return(
            <> 
                <Button outline  color="secondary" onClick={this.toggleModal}>
                    <span className="fa fa-pencil">Submit Comment</span>
                </Button>{' '}
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Enter your comment</ModalHeader>

                    <ModalBody>
                        <LocalForm onSubmit={(value)=>this.handleComment(value)}>
                            <Row className="form-group">
                                <Label md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating" 
                                        className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        className="form-control"
                                        validators={{minLength: minLength(3), maxLength: maxLength(15)}}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model='.yourname'
                                        show="touched"
                                        messages={{
                                            /* if required is true- will display */
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea rows={6} model=".comment" id="comment" name="comment"
                                    className="form-control"/>
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
            )
        }
    }
    
    function RenderComments({commentsArr}){
        var commentSection = (<div></div>);

        if(commentsArr != null)
        {
             /*comment form component*/
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
                    <CommentForm/>
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