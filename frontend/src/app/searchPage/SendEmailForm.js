import React from "react";
import './SendEmailForm.css';
import { Modal, Input, Tooltip, Icon, Result, Button } from 'antd';

const { TextArea } = Input;

export default class SendEmailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailWasSent: false,
            isLoading: false,
            feedback: '',
            name: '',
            email: ''
        };
    }

    componentDidMount() {
        this.setState({
            name: this.props.name,
            email: this.props.email
        })
    }

    sendFeedback (templateId, variables) {
        window.emailjs.send(
            'contact_service', templateId,
            variables
        ).then(res => {
            this.setState({emailWasSent: true, isLoading: false});
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('An error occured: ', err))
    }


    handleEmailBodyChange = e => {
        this.setState({feedback: e.target.value})
    };

    handleSubmit = e => {

        const templateId = 'template_edDa8Nzs';

        this.sendFeedback(templateId, {
            message_html: this.state.feedback,
            to_name: this.state.name,
            user_email: this.state.email
        });

        setTimeout(()=> {
            this.props.goBack();
        }, 6000)
    };

    handleOk = e => {
        this.setState({isLoading: true});
        this.handleSubmit();
    };

    handleCancel = e => {
        this.props.goBack();
    };

    render() {
        return (
            <>
                <Modal
                    title={`Contact ${this.state.name} via email`}
                    visible={true}
                    onCancel={this.handleCancel}
                    cancelButtonProps={{ disabled: false }}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button
                            disabled={!this.state.feedback.length}
                            key="submit" type="primary"
                            loading={this.state.isLoading}
                            onClick={this.handleOk}
                        >
                            Send email
                        </Button>,
                    ]}
                >
                    {this.state.emailWasSent ?
                        <Result
                            status="success"
                            title="Email Sent!"
                            subTitle="You will now be redirected to the trainer details."
                        />
                        :
                        <div style={{height: '20vh'}}>
                            <p>
                                <span style={{marginRight: 15}}>
                                    Your message below:
                                </span>
                            <Tooltip
                                title="Note: we already fill the email subject so the
                                trainer knows it's through our platform">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                            </p>

                        <TextArea
                            style={{maxHeight: 100}}
                            allowClear
                            onChange={this.handleEmailBodyChange}
                            value={this.state.feedback}
                            rows={5}
                        />
                        </div>
                    }
                </Modal>
            </>
        )
    }
}