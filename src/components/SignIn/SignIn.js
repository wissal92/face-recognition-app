import React, {Component} from 'react';

class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {email: '', password: ''};
  }

  handleChange = e =>{
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmitSignIn = e =>{
    //to send tha data to our server. fetch by default uses get request but if we wanna 
    //change it we could pass an object as a second parameter that describes what the 
    //request would be
    fetch('https://hidden-ravine-11639.herokuapp.com/signin', {method: 'post',
     headers:{'Content-Type': 'application/json'}, 
     body: JSON.stringify({email: this.state.email, password: this.state.password})}
    )
      .then(res => res.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.handleRouteChange('home');
        }
      })
  }

  render(){
    const {handleRouteChange} = this.props;
    return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email-address"
                onChange={this.handleChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={this.onSubmitSignIn}
              //onClick={() => handleRouteChange('home')}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p  onClick={() => handleRouteChange('register')} className="f6 link dim black db pointer">Register</p>
          </div>
        </div>
      </main>
    </article>
    );
  }
}

export default SignIn;