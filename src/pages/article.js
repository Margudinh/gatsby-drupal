import React from 'react';
import axios from 'axios';
import * as queryString from 'query-string';

import Layout from '../components/layout';

class Article extends React.Component {

    state = {
        body: "",
        title: "",
    }

    render() { 
        return (
            <Layout>
                <h3>{this.state.title}</h3>
                <div dangerouslySetInnerHTML = { {__html: this.state.body } }></div> 
            </Layout>
        )
    }

    componentDidMount(){

        const query = queryString.parse(this.props.location.search);

        if(query.node){
            axios.get(`http://localhost:8080/drupal-guide/node/${query.node}?_format=json`).then( res => {
                console.log(res.data);
                this.setState({
                    body: res.data.body[0].value,
                    title: res.data.title[0].value
                })
            }).catch(err => {
                this.props.navigate("/404");
            });
        }else{
            this.props.navigate("/404");
        }

        
    }
}

export default Article;