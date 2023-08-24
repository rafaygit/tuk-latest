import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
	constructor(private config: ConfigService) {
		AWS.config.update({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.AWS_REGION || 'us-east-1',
			apiVersion: 'latest'
		});
	}
	private bucket = process.env.AWS_BUCKET_NAME || 'tuk-components';
	private s3 = new AWS.S3({
		credentials: {
			accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
			secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY')
		},
		region: process.env.AWS_REGION || 'us-east-1',
		apiVersion: 'latest'
	});
	// ses = new AWS.SES({
	// 	accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
	// 	secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
	// 	region: 'us-east-1',
	// 	apiVersion: 'latest'
	// });

	// async sendMailToAdmin(subject: string, description: string) {
	// 	var params = {
	// 		Destination: {
	// 			CcAddresses: [],
	// 			ToAddresses: ['no-reply@tuk.dev']
	// 		},
	// 		Message: {
	// 			Body: {
	// 				Html: {
	// 					Charset: 'UTF-8',
	// 					Data: description
	// 				},
	// 				Text: {
	// 					Charset: 'UTF-8',
	// 					Data: description
	// 				}
	// 			},
	// 			Subject: {
	// 				Charset: 'UTF-8',
	// 				Data: subject
	// 			}
	// 		},
	// 		Source: 'no-reply@tuk.dev',
	// 		ReplyToAddresses: []
	// 	};
	// 	try {
	// 		const sesResponse = await this.ses.sendEmail(params).promise();
	// 		return sesResponse;
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }

	// async sendMailToClient(subject: string, description: string, email: string) {
	// 	var params = {
	// 		Destination: {
	// 			CcAddresses: [],
	// 			ToAddresses: [
	// 				email
	// 				/* more items */
	// 			]
	// 		},
	// 		Message: {
	// 			Body: {
	// 				Html: {
	// 					Charset: 'UTF-8',
	// 					Data: description
	// 				},
	// 				Text: {
	// 					Charset: 'UTF-8',
	// 					Data: description
	// 				}
	// 			},
	// 			Subject: {
	// 				Charset: 'UTF-8',
	// 				Data: subject
	// 			}
	// 		},
	// 		Source: 'no-reply@tuk.dev',
	// 		ReplyToAddresses: []
	// 	};
	// 	try {
	// 		const sesResponse = await this.ses.sendEmail(params).promise();
	// 		console.log('Mail sent to client');
	// 		return sesResponse;
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }

	async uploadFile(file) {
		try {
			const name = file.originalname;
			const s3Response = await this.s3
				.upload({
					Bucket: this.bucket,
					Key: String(name),
					Body: file.buffer,
					ContentType: file.mimetype,
					ContentDisposition: 'inline'
				})
				.promise();

			return s3Response;
		} catch (e) {
			console.log(e);
		}
	}
}
