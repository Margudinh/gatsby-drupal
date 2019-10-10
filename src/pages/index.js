import React from "react"
import { Link } from 'gatsby';
import axios from 'axios';

import Layout from "../components/layout"
import SEO from "../components/seo"

class Index extends React.Component{


  state = {
    articles: []
  }
  

  render(){
    return(
      <Layout>
        <SEO title="Home" />
        <ul>
          {this.state.articles.map( article => {
            return (
              <li> <Link dangerouslySetInnerHTML= {{__html: article.title}} to={`/article?node=${article.nid}`}></Link></li>
            )
          })}
        </ul>
      </Layout>
    )
  }

  componentDidMount(){
    axios.get(`http://localhost:8080/drupal-guide/node/rest?_format=json`).then( res => {
      this.setState({
          articles: res.data
      })
    })
  }

}

export default Index
