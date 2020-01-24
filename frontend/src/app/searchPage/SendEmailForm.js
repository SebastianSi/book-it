import React from "react";

export default class SendEmailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: `1 bitchulescu, 2 bitchulesti`,
            name: 'userul care viziteaza, sa-i zicem Sebi',
            email: 'paula.constantinescu07@gmail.com'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    sendFeedback (templateId, variables) {
        window.emailjs.send(
            'contact_service', templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
        // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('An error occured: ', err))
    }


    handleChange(event) {
        this.setState({feedback: event.target.value})
    }

    handleSubmit (event) {
        const templateId = 'template_edDa8Nzs';

        this.sendFeedback(templateId, {
            message_html: this.state.feedback,
            from_name: this.state.name,
            reply_to: this.state.email,
            to_name: 'Paula',
            user_email: 'paula.constantinescu07@gmail.com'
        })
    }

    render() {
        return (
            <form className="test-mailing">
                <h1>Let's see if it works</h1>
                <div>
      	<textarea
            id="test-mailing"
            name="test-mailing"
            onChange={this.handleChange}
            placeholder="Post some lorem ipsum here"
            required
            value={this.state.feedback}
            style={{width: '100%', height: '150px'}}
        />
                </div>
                <input type="button" value="Submit" className="btn btn--submit" onClick={this.handleSubmit} />
            </form>
        )
    }
}