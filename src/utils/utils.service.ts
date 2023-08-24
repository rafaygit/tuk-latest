import { Injectable } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class UtilsService {
    constructor(private awsService: AwsService){}

    async uploadImages(files) {
        let images = {}
        for (let [filename, fileInfo] of Object.entries(files)) {
            const response = await this.awsService.uploadFile(fileInfo[0]);
            console.log(response)
            images[filename] = response.Location;
        }
        return images
    }
}
