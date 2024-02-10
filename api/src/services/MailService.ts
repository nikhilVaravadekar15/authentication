import {
    SES,
    SESClientConfigType,
    SendEmailCommandInput,
    SendEmailCommandOutput
} from "@aws-sdk/client-ses";
import {
    verificationOtpEmailTemplate,
    userOnboardingEmailTemplate
} from "../assets/email-templates/template";
import { TEmail } from "../types";

class MailService {

    private awsSes: SES;
    private AWS_SES_SENDER_EMAIL: string;
    private AWS_SES_REGION: string;
    private AWS_ACCESS_KEY_ID: string;
    private AWS_SECRET_ACCESS_KEY: string;

    constructor() {

        this.AWS_SES_SENDER_EMAIL = process.env.AWS_SES_SENDER_EMAIL!
        this.AWS_SES_REGION = process.env.AWS_SES_REGION!
        this.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!
        this.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!

        if (
            !this.AWS_SES_SENDER_EMAIL || !this.AWS_SES_REGION || !this.AWS_ACCESS_KEY_ID || !this.AWS_SECRET_ACCESS_KEY
        ) {
            throw new Error("Missing ASW SES Security credentials in .env file")
        }

        const awsConfig: SESClientConfigType = {
            region: this.AWS_SES_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            }
        }

        this.awsSes = new SES(awsConfig)
    }

    async sendVerificationOtp(
        { username, email, otp }: { username: string, email: string, otp: number }
    ) {

        const params: SendEmailCommandInput = {
            Source: this.AWS_SES_SENDER_EMAIL,
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: verificationOtpEmailTemplate({
                            "username": username,
                            "otp": otp
                        }),
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'Auth.com | OTP Verification 🔒',
                },
            },
        };

        // send email
        const emailSent: SendEmailCommandOutput = await this.awsSes.sendEmail(params);
        console.log(`Otp verification email successfully sent to ${email} with message id ${emailSent.MessageId}}`)
    }

    async sendOnboardingMail(
        { email }: TEmail
    ) {

        const params: SendEmailCommandInput = {
            Source: this.AWS_SES_SENDER_EMAIL,
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: userOnboardingEmailTemplate()
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'Welcome to Auth.com! 👋',
                },
            },
        };

        // send email
        const emailSent: SendEmailCommandOutput = await this.awsSes.sendEmail(params);
        console.log(`Onboarding email successfully sent to ${email} with message id ${emailSent.MessageId}}`)
    }

}

export default new MailService()
