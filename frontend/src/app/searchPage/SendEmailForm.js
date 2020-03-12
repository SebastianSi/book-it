import React, {useState} from "react";
import './SendEmailSmsForms.css';
import { Modal, Input, Tooltip, Icon, Result, Button } from 'antd';

const { TextArea } = Input;

export default function SendEmailModal (props) {

    const [emailWasSent, setEmailWasSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState('');

    const sendFeedback = (templateId, variables) => {
        window.emailjs.send(
            'contact_service', templateId,
            variables
        ).then(() => {
            setEmailWasSent(true);
            setIsLoading(false);
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('An error occured: ', err))
    };


    const handleEmailBodyChange = e => {
        setFeedback(e.target.value);
    };

    const handleSubmit = () => {

        const templateId = 'template_edDa8Nzs';

        sendFeedback(templateId, {
            message_html: feedback,
            to_name: props.name,
            user_email: props.email
        });

        setTimeout(()=> {
            props.goBack();
        }, 7000)
    };

    const handleOk = () => {
        setIsLoading(true);
        handleSubmit();
    };

    const handleCancel = () => {
        props.goBack();
    };


    return (
        <>
            <Modal
                title={`Contact ${props.name} via email`}
                visible={true}
                onCancel={handleCancel}
                cancelButtonProps={{ disabled: false }}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button
                        disabled={!feedback.length}
                        key="submit" type="primary"
                        loading={isLoading}
                        onClick={handleOk}
                    >
                        Send email
                    </Button>,
                ]}
            >
                {emailWasSent ?
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
                            onChange={handleEmailBodyChange}
                            // value={feedback}
                            rows={5}
                        />
                    </div>
                }
            </Modal>
        </>
    )

}