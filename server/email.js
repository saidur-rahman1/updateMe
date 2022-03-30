const sgMail = require('@sendgrid/mail');

class EmailClient {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        this.templates = {
            WELCOME: {
                subject: 'Welcome to updateMe',
                text: 'Get the latest updates from your favorite platforms',
                html: 'Get the latest updates from your favorite platforms',
            },
            WEEKLY_UPDATE: {
                subject: 'Your weekly review',
                templateId: 'd-bcfd0614034845f18163e5fbc99df383',
            },
        };
    }

    async sendEmail(data) {
        try {
            await sgMail.send(data);
            console.log('Email sent');
        } catch (err) {
            console.error(`There was an error sending the email: ${err}`)
        }
    }

    sendWelcome(toAddress) {
        this.sendEmail({
            to: toAddress,
            from: 'saidur.rahmann@gmail.com',
            ...this.templates.WELCOME
        });
    }

    sendWeeklySummary(toAddress, data) {
        this.sendEmail({
            from: 'saidur.rahmann@gmail.com',
            ...this.templates.WEEKLY_UPDATE,
            personalizations:[
                {
                   to: toAddress,
                   dynamicTemplateData:{
                      title0: data[0].title,
                      content0: data[0].content,
                      platform0: data[0].platform,
                      image0: data[0].image,
                      url0: data[0].url,

                      title1: data[1].title,
                      content1: data[1].content,
                      platform1: data[1].platform,
                      image1: data[1].image,
                      url1: data[1].url,

                      title2: data[2].title,
                      content2: data[2].content,
                      platform2: data[2].platform,
                      image2: data[2].image,
                      url2: data[2].url,

                      title3: data[3].title,
                      content3: data[3].content,
                      platform3: data[3].platform,
                      image3: data[3].image,
                      url3: data[3].url,

                      title4: data[4].title,
                      content4: data[4].content,
                      platform4: data[4].platform,
                      image4: data[4].image,
                      url4: data[4].url,

                      title5: data[5].title,
                      content5: data[5].content,
                      platform5: data[5].platform,
                      image5: data[5].image,
                      url5: data[5].url,

                      title6: data[6].title,
                      content6: data[6].content,
                      platform6: data[6].platform,
                      image6: data[6].image,
                      url6: data[6].url,

                      title7: data[7].title,
                      content7: data[7].content,
                      platform7: data[7].platform,
                      image7: data[7].image,
                      url7: data[7].url,

                      title8: data[8].title,
                      content8: data[8].content,
                      platform8: data[8].platform,
                      image8: data[8].image,
                      url8: data[8].url,

                      title9: data[9].title,
                      content9: data[9].content,
                      platform9: data[9].platform,
                      image9: data[9].image,
                      url9: data[9].url,
                    }
                }
            ]
        })
    }
}

const email = new EmailClient()

module.exports = email;